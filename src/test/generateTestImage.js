const ImageGenerator = require('../imageGenerator')
const YAML = require('yaml')
const { writeFile, readFile } = require('fs').promises

const imageGenerator = new ImageGenerator()

/*
Example: node generateTestImage.js path/to/image.png path/to/rule
*/
;(async () => {
  const rulesContent = await readFile(process.argv[3], { encoding: 'utf-8' })
  const { rules } = YAML.parse(rulesContent)
  const picture = await imageGenerator.produce(rules[0])
  const buff = Buffer.from(picture, 'base64')
  await writeFile(process.argv[2], buff)
  await imageGenerator.close()
  console.log('done!')
})()
