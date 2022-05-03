const ImageGenerator = require('../imageGenerator')
const { writeFile } = require('fs').promises

const imageGenerator = new ImageGenerator()

/*
Example: node generateTestImage.js path/to/image.png rule-id ruby 'Hello world'
*/

const imgSettings = {
  ruleId: process.argv[3],
  lang: process.argv[4],
  message: process.argv[5]
}

;(async () => {
  const picture = await imageGenerator.produce(imgSettings)
  const buff = Buffer.from(picture, 'base64')
  await writeFile(process.argv[2], buff)
  console.log('done!')
})()
