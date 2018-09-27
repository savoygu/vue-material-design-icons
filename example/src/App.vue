<template>
  <div id="app">
    <div id="logo" @mouseenter="toggle" @mouseleave="toggle" @click="change" :title="logo">
      <icon :name="logo" scale="4"></icon>
    </div>
    <h1><a href="https://github.com/savoygu/vue-material-design-icons">Vue-Material-Design-Icons</a></h1>
    <demonstration
        tag="h2"
        :show-content="false"
        class="desc">
      <template slot="description">
        <span>Google's material design icons component for Vue.js, using inline SVG.</span>
      </template>
    </demonstration>
    <demonstration
        title="示例"
        anchor="demo-code-title"
        :highlight="sourcecode"
        :multiple="true">
      <template>
        <div class="btn-group">
          <button class="btn" @click="scale=1;spin=false;flip='normal'"
                  :class="{active: scale===1 && spin===false && flip==='normal'}">重置
          </button>
          <button class="btn" @click="scale=4" :class="{active: scale===4}">缩放</button>
          <button class="btn" @click="spin=!spin" :class="{active: spin}">旋转</button>
          <button class="btn" @click="flip='horizontal'" :class="{active: flip==='horizontal'}">水平翻转</button>
          <button class="btn" @click="flip='vertical'" :class="{active: flip==='vertical'}">垂直翻转</button>
        </div>
      </template>
      <template slot="source">
        <div class="source">
          <div class="vd-demo__block vd-demo__block-1">
            <div><span class="vd-demo__demonstration">3d_rotation</span></div>
            <icon name="3d_rotation" :spin="spin" :scale="scale" :flip="flip"></icon>
          </div>
          <div class="vd-demo__block vd-demo__block-1">
            <div><span class="vd-demo__demonstration">add_alert</span></div>
            <icon name="add_alert" :spin="spin" :scale="scale" :flip="flip"></icon>
          </div>
          <div class="vd-demo__block vd-demo__block-1">
            <div><span class="vd-demo__demonstration">add_to_queue</span></div>
            <icon name="add_to_queue" :spin="spin" :scale="scale" :flip="flip"></icon>
          </div>
          <div class="vd-demo__block vd-demo__block-1">
            <div><span class="vd-demo__demonstration">business</span></div>
            <icon name="business" :spin="spin" :scale="scale" :flip="flip"></icon>
          </div>
          <div class="vd-demo__block vd-demo__block-1">
            <div><span class="vd-demo__demonstration">add</span></div>
            <icon name="add" :spin="spin" :scale="scale" :flip="flip"></icon>
          </div>
          <div class="vd-demo__block vd-demo__block-1">
            <div><span class="vd-demo__demonstration">access_alarm</span></div>
            <icon name="access_alarm" :spin="spin" :scale="scale" :flip="flip"></icon>
          </div>
        </div>
      </template>
      <template slot="explanation">
        通过 <code>scale</code> 对图标进行缩放（单位em），<code>spin</code> 指定图标是否旋转，<code>flip</code> 指定图标翻转的方向，可选值有 'normal', 'horizontal', 'vertical'。
      </template>
    </demonstration>
    <demonstration
      title="屏幕阅读器"
      anchor="screen-readers"
      :highlight="sourcecodeA">
      <template slot="description">通过添加 <code>label</code> 属性支持屏幕阅读器访问。</template>
      <template slot="source">
        <div class="source">
          <icon name="code" label="Source Code"></icon>
        </div>
      </template>
      <template slot="explanation">
      </template>
    </demonstration>
    <demonstration
        title="堆叠图标"
        anchor="screen-readers"
        :highlight="sourcecodeB">
      <template slot="source">
        <div class="source">
          <icon label="No Photos">
            <icon name="camera_enhance"></icon>
            <icon name="not_interested" scale="2" class="alert"></icon>
          </icon>
        </div>
      </template>
      <template slot="explanation">
      </template>
    </demonstration>
    <demonstration
        title="自定义图标"
        anchor="custom-icon"
        :highlight="sourcecodeC">
      <template slot="description">
        你可以注册自己的图标
      </template>
      <template slot="source">
        <div class="source">
          <icon name="baidu"></icon>
        </div>
      </template>
      <template slot="explanation">
      </template>
    </demonstration>
    <demonstration
        title="多色图标"
        anchor="multi-color-icon"
        :highlight="sourcecodeD">
      <template slot="description">
        使用更高级的方式注册图标以发挥SVG的全部功能。
      </template>
      <template slot="source">
        <div class="source">
          <icon name="webpack"></icon>
          <icon name="vue"></icon>
          <icon name="html5-c"></icon>
        </div>
      </template>
      <template slot="explanation">
      </template>
    </demonstration>
    <demonstration
        title="图标集合"
        anchor="tu-biao-ji-he"
        :show-content="false">
      <template>
        <div class="icon-search">
          <input type="text" v-model="keyword" placeholder="输入英文关键词搜索，比如 heart">
          <p>点击下面的图标按钮可以直接复制组件代码</p>
        </div>
        <div class="icons">
          <div class="icons-item"
               v-for="(icon, index) in icons"
               @click="handleClickIcon(icon, index, $event)"
               @mouseleave="handleMouseleave()"
               @mousemove="handleMousemove(icon, index)">
            <icon :name="icon" scale="2"></icon>
            <p>{{icon}}</p>
          </div>
          <transition name="copy">
            <div class="copied" v-show="showCopy" :style="{ top, left }">Copied!</div>
          </transition>
        </div>
      </template>
    </demonstration>
  </div>
</template>

<script>
  import Icon from '../../src/components/Icon.vue'
  import '../../src/icons'
  Icon.register({
    baidu: {
      width: 23.868,
      height: 26,
      d: 'M3.613 13.701c2.827-.608 2.442-3.986 2.357-4.725-.138-1.139-1.477-3.128-3.296-2.971C.386 6.21.052 9.515.052 9.515c-.309 1.528.74 4.793 3.561 4.186zm3.002 5.875c-.083.238-.268.846-.107 1.375.315 1.187 1.346 1.24 1.346 1.24h1.48v-3.619H7.749c-.713.213-1.057.767-1.134 1.004zM8.86 8.035c1.562 0 2.823-1.797 2.823-4.019C11.683 1.796 10.421 0 8.86 0 7.301 0 6.036 1.796 6.036 4.016c0 2.222 1.265 4.019 2.824 4.019zm6.724.265c2.087.271 3.429-1.956 3.695-3.644.272-1.686-1.074-3.644-2.552-3.98-1.48-.339-3.329 2.032-3.497 3.578-.2 1.89.271 3.778 2.354 4.046zm5.114 9.923s-3.229-2.498-5.113-5.198c-2.555-3.981-6.185-2.361-7.399-.337-1.209 2.024-3.093 3.305-3.36 3.644-.271.334-3.9 2.293-3.095 5.871.806 3.576 3.635 3.508 3.635 3.508s2.085.205 4.504-.336c2.42-.537 4.503.134 4.503.134s5.652 1.893 7.199-1.751c1.545-3.645-.874-5.535-.874-5.535zm-9.671 5.423H7.352c-1.587-.316-2.219-1.4-2.299-1.584-.078-.188-.528-1.059-.29-2.539.686-2.219 2.642-2.379 2.642-2.379h1.956V14.74l1.666.025v8.881zm6.844-.025h-4.229c-1.639-.423-1.716-1.587-1.716-1.587v-4.677l1.716-.027v4.203c.104.447.661.529.661.529h1.742v-4.705h1.825v6.264zm5.986-12.486c0-.808-.671-3.239-3.159-3.239-2.492 0-2.825 2.295-2.825 3.917 0 1.548.131 3.71 3.227 3.641 3.096-.068 2.757-3.507 2.757-4.319z'
    }
  })

  Icon.register({
    webpack: {
      width: 1200,
      height: 1200,
      paths: [
        {
          style: 'fill:#8ED6FB',
          d: 'M1035.6 879.3l-418.1 236.5V931.6L878 788.3l157.6 91zm28.6-25.9V358.8l-153 88.3V765l153 88.4zm-901.5 25.9l418.1 236.5V931.6L320.3 788.3l-157.6 91zm-28.6-25.9V358.8l153 88.3V765l-153 88.4zM152 326.8L580.8 84.2v178.1L306.1 413.4l-2.1 1.2-152-87.8zm894.3 0L617.5 84.2v178.1l274.7 151.1 2.1 1.2 152-87.8z'
        },
        {
          style: 'fill:#1C78C0',
          d: 'M580.8 889.7l-257-141.3v-280l257 148.4v272.9zm36.7 0l257-141.3v-280l-257 148.4v272.9zm-18.3-283.6zM341.2 436l258-141.9 258 141.9-258 149-258-149z'
        }
      ]
    }
  })

  Icon.register({
    vue: {
      width: 256,
      height: 221,
      polygons: [
        {
          style: 'fill:#41B883',
          points: '0,0 128,220.8 256,0 204.8,0 128,132.48 50.56,0 0,0'
        },
        {
          style: 'fill:#35495E',
          points: '50.56,0 128,133.12 204.8,0 157.44,0 128,51.2 97.92,0 50.56,0'
        }
      ]
    }
  })

  Icon.register({
    'html5-c': {
      width: 512,
      height: 512,
      raw: '<path fill="#E34F26" d="M71,460 L30,0 481,0 440,460 255,512"/><path fill="#EF652A" d="M256,472 L405,431 440,37 256,37"/><path fill="#EBEBEB" d="M256,208 L181,208 176,150 256,150 256,94 255,94 114,94 115,109 129,265 256,265zM256,355 L255,355 192,338 188,293 158,293 132,293 139,382 255,414 256,414z"/><path fill="#FFF" d="M255,208 L255,265 325,265 318,338 255,355 255,414 371,382 372,372 385,223 387,208 371,208zM255,94 L255,129 255,150 255,150 392,150 392,150 392,150 393,138 396,109 397,94z"/>'
    }
  })
  import { sourcecode, sourcecodeA, sourcecodeB, sourcecodeC, sourcecodeD } from './template'
  import Clipboard from 'clipboard'

  const keys = Object.keys(Icon.icons)

  function randomIcon () {
    return keys[Math.floor(Math.random() * keys.length)]
  }

  export default {
    data () {
      return {
        logo: randomIcon(),
        running: true,
        spin: false,
        scale: 1,
        flip: 'normal',
        sourcecode,
        sourcecodeA,
        sourcecodeB,
        sourcecodeC,
        sourcecodeD,
        keyword: '',
        top: 0,
        left: 0,
        showCopy: false
      }
    },
    computed: {
      icons () {
        return keys.filter(key => {
          return key.indexOf(this.keyword) > -1
        })
      }
    },
    methods: {
      change () {
        this.logo = randomIcon()
      },
      toggle () {
        this.running = !this.running
      },
      handleClickIcon (icon, index, event) {
        var clip = new Clipboard('.icons', {
          text () {
            return `<icon name="${icon}"></icon>`
          }
        })

        clip.on('success', e => {
          e.clearSelection();
          clip.destroy();
          this.left = index % 5 * 200 + 70 + 'px'
          this.top = (Math.floor(index / 5) + 1) * 100 + 'px'
          this.showCopy = true
        })
      },
      handleMousemove (icon, index) {
      },
      handleMouseleave () {
        this.showCopy = false
      }
    },
    mounted () {
      setInterval(() => {
        if (this.running) {
          this.change()
        }
      }, 200)
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #app {
    padding: 60px;
  }
  #logo {
    position: relative;
    display: block;
    width: 120px;
    height: 120px;
    margin: 20px auto 40px;
    padding: 20px;
    color: #41b883;
    background-color: #35495e;
    border-radius: 50%;
    cursor: pointer;
    user-select: none;
    transition: all .3s;
    &:hover {
      margin: 10px auto 30px;
      padding: 30px;
      color: #35495e;
      background-color: #41b883;
    }
    .md-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  h1 {
    margin-bottom: 1em;
    font-family: Dosis, Source Sans Pro, Helvetica Neue, Arial, sans-serif;
    color: #2c3e50;
    font-weight: 300;
    text-align: center;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  .desc {
    .vd-demo__desc {
      font-size: 16px;
      text-align: center;
      color: #7f8c8d;
    }
  }
  .md-icon {
    transition: all .3s;
  }
  .btn-group {
    padding: 10px 0;
  }
  .btn {
    margin-right: 10px;
    padding: 5px 10px;
    color: #41b883;
    background-color: #35495e;
    border: 1px solid #35495e;
    border-radius: 3px;
    cursor: pointer;
    transition: all .3s;
    &:hover,
    &.active {
      color: #35495e;
      background-color: #41b883;
      border: 1px solid #41b883;
    }
  }
  .alert {
    color: red;
  }
  .icon-search {
    margin: 20px auto 30px;
    text-align: center;
    input {
      width: 500px;
      margin: 0 auto;
      padding: 8px 0;
      font-size: 14px;
      text-align: center;
      color: #5e6d82;
      background-color: #eff2f7;
      border: 0;
      border-radius: 4px;
      outline: none;
    }
    p {
      margin-top: 20px;
    }
  }
  .icons {
    position: relative;
    overflow: hidden;
    padding-bottom: 50px;
    zoom: 1;
    .copy-enter-active,
    .copy-leave-active {
      transition: opacity .5s
    }
    .copy-enter, .copy-leave-to {
      opacity: 0
    }
    .copied {
      position: absolute;
      left: 0;
      top: 30px;
      z-index: 99;
      padding: 5px 8px;
      font: normal normal 11px/1.5 Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
      color: #fff;
      text-align: center;
      text-decoration: none;
      text-shadow: none;
      text-transform: none;
      letter-spacing: normal;
      -ms-word-wrap: break-word;
      word-wrap: break-word;
      white-space: pre;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 3px;
      -webkit-font-smoothing: subpixel-antialiased;
      &:before {
        position: absolute;
        top: -10px;
        left: 25px;
        width: 0;
        height: 0;
        color: rgba(0, 0, 0, 0.8);
        pointer-events: none;
        content: "";
        border: 5px solid transparent;
        border-bottom-color: rgba(0, 0, 0, 0.8);
      }
    }
    .icons-item {
      float: left;
      width: 200px;
      height: 90px;
      padding-top: 10px;
      color: #5c6b77;
      text-align: center;
      cursor: pointer;
      p {
        margin: 5px;
        padding-top: 15px;
        font-size: 14px;
      }
    }
  }
</style>
