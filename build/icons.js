const path = require('path')
const fs = require('fs')
const icons = require('../assets/icons.json')

const moduleTpl = fs.readFileSync(path.join(__dirname, './icon.tpl'), 'utf8')
const ICON_PATH = path.join(__dirname, '../src/icons')

let indexModule = ''
const names = Object.keys(icons)
names.forEach(function (name) {
  const icon = {}
  icon[name] = icons[name]
  fs.writeFileSync(`${ICON_PATH}/${name}.js`, moduleTpl.replace('${icon}', JSON.stringify(icon)))
  indexModule += `import './${name}'\n`
})

fs.writeFileSync(ICON_PATH + '/index.js', indexModule)
console.log(names.length + ' icon modules generated.')
