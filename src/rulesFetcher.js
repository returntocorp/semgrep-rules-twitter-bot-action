const { Octokit } = require('@octokit/rest')
const path = require('path')
const YAML = require('yaml')
const { URL } = require('url')

const yamlExtNames = ['.yml', '.yaml']

class RulesFetcher {
  constructor (githubAuthKey) {
    this.octokit = new Octokit({
      userAgent: 'try-it-out/tryit-action v1.1',
      auth: githubAuthKey
    })
  }

  async _getFileContents (contentsUrl) {
    const { data } = await this.octokit.request(`GET ${contentsUrl}`)
    return Buffer.from(data.content, 'base64').toString('ascii')
  }

  async _getUserOrgs (login) {
    const { data } = await this.octokit.request('GET /users/{user}/orgs', {
      user: login
    })
    return data || []
  }

  async _getContributorInfo (refInfo) {
    const { commit, author } = refInfo
    if (!commit || !commit.author || !commit.author.name || !author || !author.login) {
      return null
    }
    // check if PR Bot
    if (author.login === 'semgrep-dev-pr-bot[bot]') {
      return null
    }
    const orgs = await this._getUserOrgs(author.login)
    // check if R2C contributor
    if (orgs.map(org => org.login).includes('returntocorp')) {
      return null
    }
    return {
      login: author.login,
      url: author.html_url,
      name: commit.author.name,
      avatarUrl: author.avatar_url
    }
  }

  async getNewSemgrepRules (owner, repo, ref) {
    const semgrepRules = []
    const { data } = await this.octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
      owner,
      repo,
      ref
    })
    const files = Array.isArray(data.files) ? data.files : []
    const newYamlFiles = files.filter(file => {
      return file.status === 'added' && yamlExtNames.includes(path.extname(file.filename))
    })

    if (newYamlFiles.length) {
      const contributor = await this._getContributorInfo(data)
      for (let i = 0; i < newYamlFiles.length; i++) {
        try {
          const content = await this._getFileContents(newYamlFiles[i].contents_url)
          let { rules } = YAML.parse(content)
          if (!Array.isArray(rules)) {
            continue
          }
          const contentsUrl = new URL(newYamlFiles[i].contents_url)
          const ids = decodeURIComponent(contentsUrl.pathname).split('contents/')[1]
          const idParts = ids.replace(/\.yaml/g, '').replace(/\.yml/g, '').split('/')
          rules = rules.map(rule => {
            rule.registryId = [...idParts, rule.id].join('.')
            rule.contributor = contributor
            return rule
          })
          semgrepRules.push(...rules)
        } catch (err) {
          continue
        }
      }
    }

    return semgrepRules
  }
}

module.exports = RulesFetcher
