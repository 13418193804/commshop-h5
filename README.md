# vue-commshop-h5

> vue全家桶+typescript重构商城H5



## 说明

> 本项目是基于我的原生 js 项目重构完成。在此期间，参考了一些vue与typescript的整合的教程，对我帮助挺大的，感谢写这些教程的作者们，在这里由衷的感谢！以下是参考的教程：

1. [vue + typescript 新项目起手式](https://segmentfault.com/a/1190000011744210#articleHeader12)

2. [Vue2.5+ Typescript 引入全面指南 - Vuex篇](https://segmentfault.com/a/1190000011864013)


## 安装方法

打开终端 ，输入：

```bash
git clone git@github.com:13418193804/commshop-h5.git
```

切换到克隆下来的文件夹：

```bash
cd commshop-h5
```

然后输入：

```bash
yarn
```

然后运行

```bash
npm run dev
```

最后在浏览器中打开 http://localhost:8080/

## 项目结构

使用[see-dirtree](https://github.com/shenzekun/see-dirtree) 显示目录树

```
vue-qq-music
├──LICENSE
├──README.md
├──index.html
├──package.json
├──tsconfig.json
├──tslint.json
├──yarn.lock
├──static
├──src
│  ├──App.vue
│  ├──main.ts
│  ├──vue-shim.d.ts
│  ├──style
│  │  ├──_var.scss
│  │  └──reset.scss
│  ├──store
│  │  ├──action.ts
│  │  ├──index.ts
│  │  ├──mutation-types.ts
│  │  └──mutations.ts
│  ├──service
│  │  └──getData.ts
│  ├──router
│  │  └──index.ts
│  ├──pages
│  │  ├──search
│  │  │  └──search.vue
│  │  ├──recommend
│  │  │  └──recommend.vue
│  │  ├──rank
│  │  │  └──rank.vue
│  ├──config
│  │  ├──api.ts
│  │  ├──fetch.ts
│  │  ├──mixin.ts
│  │  └──utils.ts
│  ├──components
│  │  ├──NavHeader.vue
│  │  ├──Player.vue
│  │  └──Swipe.vue
│  ├──assets
│  │  ├──clock_ic.png
│  │  ├──default_pic.jpg
│  │  ├──favicon.ico
│  │  ├──icon_loading.png
│  │  ├──list_sprite.png
│  │  ├──loading.gif
│  │  ├──logo.png
│  │  ├──search_sprite.png
│  │  └──sprite_play.png
├──config
│  ├──dev.env.js
│  ├──index.js
│  └──prod.env.js
├──build
│  ├──build.js
│  ├──check-versions.js
│  ├──logo.png
│  ├──utils.js
│  ├──vue-loader.conf.js
│  ├──webpack.base.conf.js
│  ├──webpack.dev.conf.js
│  └──webpack.prod.conf.js

16 directories, 48 files.
```

## 使用的组件

1. [swiper](https://github.com/nolimits4web/swiper)
2. [vue-lazyload](https://github.com/hilongjw/vue-lazyload)