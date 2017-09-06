# vue-md-icons

> Created by google's material-design-icons with Vue 2.x inspired(cp? chaoxi? yeah, whatever.) by @Justineo vue-awesome

## Installation

### NPM

```bash
$ npm install vue-md-icons
```

### manual

Just download `lib/vue-md-icons.js` and include it in your HTML file:

```html
<script src="path/to/vue-md-icons/lib/vue-md-icons.js"></script>
```

## Usage

```html
<!-- basic 基本用法 -->
<icon name="add_alert"></icon>

<!-- with options 附加参数 -->
<icon name="3d_rotation" scale="2" spin></icon>
<icon name="business" flip="horizontal"></icon>
<icon name="code" label="Source Code"></icon>

<!-- stacked icons 堆叠图标 -->
<icon label="No Photos">
<icon name="camera_enhance"></icon>
<icon name="not_interested" scale="2" class="alert"></icon>
</icon>
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run demo:dev

# build for demo with minification
npm run demo:build

# build for gh-pages with minification
npm run demo:prepublish

# build for production with minification
npm run build

# copy material design icons
npm run cp

# tranform svg to json
npm run md2json

#  transfrom svg to json & generate corresponding js file
npm run icons
```
