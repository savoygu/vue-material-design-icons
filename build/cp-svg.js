const fs = require('fs')
const path = require('path')
const rd = require('rd')
const nodeCp = require('node-cp')
const mkdirp = require('mkdirp')
const materialDesignIcons = require('../submodule/material-design-icons')

const MATERIAL_DESIGN_ICONS_PATH =  materialDesignIcons.STATIC_PATH
const MATERIAL_DESIGN_ICONS_TYPES = ['design', 'production']
const MATERIAL_DESIGN_ICONS_EXCLUDES = ['iconfont', 'sprites']

const walk = (dir, done) => {
  let results = []
  fs.readdir(dir, (err, list) => {
    if (err) return done(err)

    list.forEach((fileName) => {
      const file = path.resolve(dir, fileName)
      const stat = fs.statSync(file)
      if (stat && stat.isDirectory()) {
        results.push(fileName)
      }
    })

    results = results.filter(v => MATERIAL_DESIGN_ICONS_EXCLUDES.indexOf(v) === -1)
    return done(null, results)
  })
}

walk(MATERIAL_DESIGN_ICONS_PATH, (err, results) => {
  if (err) throw err

  for (let i = 0, length = results.length; i < length; i++) {
    const category = results[i]
    const types = MATERIAL_DESIGN_ICONS_TYPES // svg 图标分为 设计和生产（压缩）

    types.forEach(function (type) {
      const typeDir = path.resolve(MATERIAL_DESIGN_ICONS_PATH, `${category}/svg/${type}`) // 图标分类下的 设计和生产目录
      rd.readFileSync(typeDir).forEach(function (iconFilesSource) { // 读取 设计和生产 目录下所有图标
        const [fileName, iconSize] = iconFilesSource.match(/\w+(\d{2}).*/) // 图标名称 和 大小
        const iconFilesDest = path.join(__dirname, `../assets/svg/${type}/${iconSize}px`) // 目标目录
        if (!fs.existsSync(iconFilesDest)) {
          mkdirp.sync(iconFilesDest)
        }
        nodeCp(iconFilesSource, iconFilesDest, function (err, list) {
          if (err) console.log(err)
          console.log(`复制 ${category} - ${iconSize} - ${fileName} 完成`)
        })
      })
    })
  }

})
