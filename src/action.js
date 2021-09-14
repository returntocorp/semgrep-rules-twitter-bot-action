const { readableLanguageName } = require('./utils')
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

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

    const id = rules[i].id
    const registryId = rules[i].registryId
    const message = rules[i].message
    const lang = readableLanguageName(rules[i].languages[0])

    const imgSettings = { ruleId: id, message, lang }
    const picture = await imageGenerator.produce(imgSettings)

    const tweetMessage = msgTemplate({ id, message, lang, registryId })
    console.log(`sending tweet for: ${registryId}`)
    await tweetBot.tweet(id, tweetMessage, picture)
  }
}

module.exports = twitterBotAction
