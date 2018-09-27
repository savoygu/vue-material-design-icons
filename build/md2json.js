const fs = require('fs')
const path = require('path')

const svgDir = path.join(__dirname, '../assets/svg/production/24px') // 生产目录下 24px

const icons = {}
fs.readdirSync(svgDir).forEach(function (file) {
	const svg = fs.readFileSync(path.join(svgDir, file), 'utf8')
	const sizeMatch = svg.match(/ viewBox="0 0 (\d+) (\d+)"/)
	const dMatch = svg.match(/ d="([^"]+)"/)
	if (!sizeMatch || !dMatch) {
		return
	}
	const icon = {}
	const name = file.replace(/^ic_/, '').replace(/_24px.svg$/, '')
	icons[name] = {
		width: parseInt(sizeMatch[1], 10),
		height: parseInt(sizeMatch[2], 10),
		paths: [{
			d: dMatch[1]
		}]
	}
})

fs.writeFileSync(path.join(__dirname, '../assets/icons.json'), JSON.stringify(icons, null, '  '))
