/**
 * 复制 material-design-icons 下所有 svg 图标
 * 在执行之前，确保与你项目同级目录下有 material-design-icons 目录
 */
// var mdicons = require('material-design-icons')
// console.log(mdicons)
var rd = require('rd')
var path = require('path')
var fs = require('fs')
var cp = require('cp')
var nodeCp = require('node-cp')
var ICON_CATEGORIES = [
  'action',
  'alert',
  'av',
  'communication',
  'content',
  'device',
  'editor',
  'file',
  'hardware',
  'image',
  'maps',
  'navigation',
  'notification',
  'places',
  'social',
  'toggle',
]

for (var i = 0, len = ICON_CATEGORIES.length; i < len; i++) {
	var iconCategory = ICON_CATEGORIES[i]
	var svgCategories = ['design', 'production'] // svg 图标分为 设计和生产（压缩）
	svgCategories.forEach(function (svgCategory) {
		var svgCategoryDir = `../../material-design-icons/${iconCategory}/svg/${svgCategory}` // 图标分类下的 设计和生产目录
		rd.readFileSync(path.join(__dirname, svgCategoryDir)).forEach(function (srcFile) { // 读取 设计和生产 目录下所有图标
			var size = srcFile.match(/\w+(\d{2}).*/) // 图标名称 和 大小
      var distFile =  path.join(__dirname, `../assets/svg/${svgCategory}/${size[1]}px/${size[0]}`) // 目标目录
      cp(srcFile, distFile, function () {})
      // cp.sync(srcFile, distFile) // 同步 复制
      // nodeCp(srcFile, distFile, function (err, files) { console.log(srcFile, distFile, files) })
		})
	})
}
