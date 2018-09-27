# vue-material-design-icons

> Created by google's material-design-icons with Vue 2.x inspired by @Justineo vue-awesome

## Installation

### NPM

```bash
npm install @savoygu/vue-material-design-icons
```

### manual

Just download `lib/icons.js` and include it in your HTML file:

```html
<script src="path/to/vue-material-design-icons/lib/icons.js"></script>
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

### ES Modules with NPM & vue-loader (Recommended)

```html
import Vue from 'vue'

/* Pick one way between the 2 following ways */

// only import the icons you use to reduce bundle size
import 'vue-material-design-icons/src/icons/3d_rotation'

// or import all icons if you don't care about bundle size
import 'vue-material-design-icons/src/icons'

/* Register component with one of 2 methods */
import Icon from 'vue-material-design-icons/src/components/Icon'

// globally (in your main .js file)
Vue.component('icon', Icon)

// or locally (in your component file)
export default {
  components: {
    Icon
  }
}
```

### CommonJS with NPM without ES Next support

```js
var Vue = require('vue')

// requiring the UMD module
var Icon = require('vue-material-design-icons')

// or with vue-loader you can require the src directly
var Icon = require('vue-material-design-icons/src/components/Icon.vue')

// register component to use
```

### AMD

```js
require.config({
  paths: {
    'vue-material-design-icons': 'path/to/vue-material-design-icons'
  }
})

require(['vue-material-design-icons'], function (Icon) {
  // register component to use...
})
```

### Global variable

The component class is exposed as window.VueMaterialDesignIcons.

## Styling

### Dynamic sizing

You can make the icons scale dynamically according to your `font-size` by adding the following CSS:

```css
.md-icon {
  width: auto;
  height: 1em; /* or any other relative font sizes */
}
```

### Colors

The icon color is inherited from the font color of the parent element by default. You can easily change it to any other color by specifying the `color` property.

## Local development

```bash
$ yarn install
OR
$ npm install
$ npm run demo:dev
```

### Updating icons

Don't touch files in `src/icons` but update `assets/icons.json` instead and run `npm run generate:json` to re-generate icon module files.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run demo:dev

# build for demo with minify
npm run demo:build

# build for gh-pages with minify
npm run demo:prepublish

# build for production with minify
npm run build

# copy material design icons
npm run generate:svg

# transform svg to json
npm run generate:json

# generate corresponding js file
npm run generate:icons

# copy material design icons & transform svg to json & generate corresponding js file
npm run generate

# deploy example to branch gh-pages
npm run deploy

# release project to github and npm
npm run release
```
