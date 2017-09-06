<template>
  <svg version="1.1" :class="clazz" :style="style" :role="label ? 'img' : 'presentation'" :aria-label="label" :x="x"
       :y="y" :width="width" :height="height" :viewBox="box">
    <slot>
      <template v-if="icon && icon.paths">
        <path v-for="path in icon.paths" v-bind="path"/>
      </template>
      <template v-if="icon && icon.polygons">
        <polygon v-for="polygon in icon.polygons" v-bind="polygon"/>
      </template>
      <template v-if="icon && icon.raw">
        <g v-html="icon.raw"></g>
      </template>
    </slot>
  </svg>
</template>
<script>
  import Vue from 'vue'

  let icons = {}

  export default {
    name: 'Icon',
    props: {
      name: {
        type: String,
        validator (val) {
          if (val) {
            if (!(val in icons)) {
              Vue.util.warn(`Invalid prop: prop "icon" is referring to an unregistered icon "${val}".` +
                `\nPlesase make sure you have imported this icon before using it.`, this)
              return false
            }
            return true
          }
          return null
        }
      },
      scale: [Number, String],
      spin: Boolean,
      inverse: Boolean,
      pulse: Boolean,
      flip: {
        type: String,
        validator (val) {
          return val === 'horizontal' || val === 'vertical' || val === 'normal'
        }
      },
      label: String
    },
    data () {
      return {
        x: false,
        y: false,
        childrenWidth: 0,
        childrenHeight: 0,
        outerScale: 1
      }
    },
    computed: {
      normalizedScale () {
        let scale = this.scale
        scale = typeof scale === 'undefined' ? 1 : Number(scale)
        if (isNaN(scale) || scale <= 0) {
          Vue.util.warn(`Invalid prop: prop "scale" should be a number over 0.`, this)
          return this.outerScale
        }
        return scale * this.outerScale
      },
      clazz () {
        return {
          'md-icon': true,
          'md-spin': this.spin,
          'md-reverse': this.reverse,
          'md-pulse': this.pulse,
          'md-flip-normal': this.flip === 'normal',
          'md-flip-horizontal': this.flip === 'horizontal',
          'md-flip-vertical': this.flip === 'vertical'
        }
      },
      icon () {
        if (this.name) {
          return icons[this.name]
        }
        return null
      },
      style () {
        if (this.normalizedScale === 1) {
          return false
        }
        return {
          fontSize: this.normalizedScale + 'em'
        }
      },
      ratio () {
        if (!this.icon) {
          return 1
        }
        let { width, height } = this.icon
        return Math.max(width, height) / 16
      },
      width () {
        return this.childrenWidth || this.icon && this.icon.width / this.ratio * this.normalizedScale || 0
      },
      height () {
        return this.childrenHeight || this.icon && this.icon.height / this.ratio * this.normalizedScale || 0
      },
      box () {
        if (this.icon) {
          return `0 0 ${this.icon.width} ${this.icon.height}`
        }
        return `0 0 ${this.width} ${this.height}`
      }
    },
    mounted () {
      if (this.icon) { // 单个图标
        return
      }
      this.$children.forEach(child => {
        child.outerScale = this.normalizedScale
      })

      let width = 0
      let height = 0
      this.$children.forEach(child => {
        width = Math.max(width, child.width)
        height = Math.max(height, child.height)
      })
      this.childrenWidth = width
      this.childrenHeight = height

      this.$children.forEach(child => {
        child.x = (width - child.width) / 2
        child.y = (height - child.height) / 2
      })
    },
    register (data) { // 注册图标
      for (let name in data) {
        let icon = data[name]

        if (!icon.paths) {
          icon.paths = []
        }
        if (icon.d) {
          icon.paths.push({ d: icon.d })
        }

        if (!icon.polygons) {
          icon.polygons = []
        }
        if (icon.points) {
          icon.polygons.push({ points: icon.points })
        }

        icons[name] = icon
      }
    },
    icons
  }
</script>
<style>
  .md-icon {
    display: inline-block;
    fill: currentColor;
  }
  .md-flip-normal {
    transform: scale(1);
  }
  .md-flip-horizontal {
    transform: scale(-1, 1)
  }
  .md-flip-vertical {
    transform: scale(1, -1)
  }
  .md-spin {
    animation: md-spin 1s 0s infinite linear;
  }
  .md-reverse {
    color: #fff;
  }
  .md-pluse {
    animation: md-spin 1s infinite steps(8);
  }
  @keyframes md-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
