const ejs = require('ejs')
const path = require('path')
const { readFile } = require('fs').promises
const test = require('tape')

test('Message Template: should produce message as expected', async (t) => {
  const templateContent = await readFile(path.join(__dirname, '../template/', 'message.txt'), 'utf8')
  const msgTemplate = ejs.compile(templateContent)

  const mockMessage = `New PHP rule in the Registry:
🤖 test-id (https://semgrep.dev/r?q=test-id)
#️⃣  #php
📋 Hello world`

  const tweetMessage = msgTemplate({
    lang: 'PHP',
    message: 'Hello world',
    id: 'test-id',
    registryId: 'test-id',
    technology: ['php'],
    userName: null,
    userLink: null
  })

  t.equal(tweetMessage, mockMessage)
  t.end()
})

test('Message Template: should produce message with user as expected', async (t) => {
  const templateContent = await readFile(path.join(__dirname, '../template/', 'message.txt'), 'utf8')
  const msgTemplate = ejs.compile(templateContent)

  const mockMessage = `New PHP rule by inkz (https://github.com/inkz):
🤖 test-id (https://semgrep.dev/r?q=test-id)
#️⃣  #php
📋 Hello world`

  const tweetMessage = msgTemplate({
    lang: 'PHP',
    message: 'Hello world',
    id: 'test-id',
    registryId: 'test-id',
    technology: ['php'],
    userName: 'inkz',
    userLink: 'https://github.com/inkz'
  })

  t.equal(tweetMessage, mockMessage)
  t.end()
})
