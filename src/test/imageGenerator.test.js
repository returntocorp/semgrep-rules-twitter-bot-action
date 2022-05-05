const test = require('tape')
const ImageGenerator = require('../imageGenerator')

test('ImageGenerator: should generate image', async (t) => {
  const imageGenerator = new ImageGenerator()
  const rule = {
    id: 'test-id',
    languages: ['js'],
    message: 'Hello world',
    metadata: {
      cwe: 'CWE-123: Vulnerability',
      technology: ['tape']
    }
  }
  const picture = await imageGenerator.produce(rule)
  await imageGenerator.close()
  t.equal(!!(picture), true)
  t.end()
})

test('ImageGenerator: should generate image without metadata', async (t) => {
  const imageGenerator = new ImageGenerator()
  const rule = {
    id: 'test-id',
    languages: ['js'],
    message: 'Hello world'
  }
  const picture = await imageGenerator.produce(rule)
  await imageGenerator.close()
  t.equal(!!(picture), true)
  t.end()
})

test('ImageGenerator: should fail without rule id and message', async (t) => {
  const imageGenerator = new ImageGenerator()
  let error = null
  try {
    await imageGenerator.produce({})
  } catch (err) {
    error = err
  }
  await imageGenerator.close()
  t.equal(!!(error), true)
  t.end()
})
