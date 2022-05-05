const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const { readableLanguageName } = require('./utils')

async function twitterBotAction (event, rulesFetcher, imageGenerator, tweetBot) {
  const templateContent = await fs.promises.readFile(path.join(__dirname, 'template/', 'message.txt'), 'utf8')
  const msgTemplate = ejs.compile(templateContent)

  // fetching new rules
  const repo = event.repository.name
  const owner = event.repository.owner.name
  const rules = []
  console.log(`${event.commits.length} commits found`)
  for (let i = 0; i < event.commits.length; i++) {
    const refId = event.commits[i].id
    console.log(`fetching rules from: ${refId}`)
    const newRules = await rulesFetcher.getNewSemgrepRules(owner, repo, refId)
    rules.push(...newRules)
  }
  // generating picture for tweet and posting it to Twitter
  for (let i = 0; i < rules.length; i++) {
    console.log(`creating picture for: ${rules[i].id}`)
    const picture = await imageGenerator.produce(rules[i])
    const tweetMessage = msgTemplate({
      lang: readableLanguageName(rules[i].languages[0]),
      message: rules[i].message,
      id: rules[i].id,
      technology: (rules[i].metadata && rules[i].metadata.technology),
      userName: rules[i].contributor && rules[i].contributor.name,
      userLink: rules[i].contributor && rules[i].contributor.url
    })
    console.log(`sending tweet for: ${rules[i].registryId}`)
    await tweetBot.tweet(rules[i].id, tweetMessage, picture)
  }
}

module.exports = twitterBotAction
