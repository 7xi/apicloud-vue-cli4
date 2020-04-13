# vue-cli4 + ApiCloud 脚手架

apicloud下app开发脚手架

## Description

**ApiCloud 脚手架工具**, 可快速开发基于vue-cli4打包的混合app，该脚手架使用vant前端框架，在vue-cli4的基础上增加了很多apicloud的兼容方案！


## Usage

### Download and Project setup

``` bash
git clone https://github.com/7xi/apicloud-vue-cli4.git
cd apicloud-vue-cli4
npm install 或 yarn install
```

### Compiles and hot-reloads for development
``` bash
yarn run serve
```
### Compiles and minifies for production
``` bash
yarn run build
```

### Lints and fixes files
``` bash
yarn run lint
```

目录结构
```
├─public
│  └─res  //这个必须留着，不然安卓无法上架
└─src
    ├─i18n //国际化
    ├─api  //api接口
    ├─assets
    │  ├─language //语言包
    │  ├─images
    │  │  └─svg  //svg图标目录
    │  └─styles  //css样式
    ├─components
    │  ├─SvgIcons //svg精灵图模板
    │  └─vue-route-transition  //页面切换模板
    ├─pages
    │  ├─components
    │  ├─Home
    │  ├─Member
    │  ├─News
    │  ├─Products
    │  └─TempIcons
    ├─router //vue路由
    ├─store //vuex
    └─util  //工具函数
```

### ------2020-04-12 升级------
#### 1.更新部分模块
#### 2.修复语言切换错误
#### 3.增加拍照演示
#### 4.增加app下真机同步方法，步骤如下：


 - 5.1将apicloud项目根目录下的app.json文件打开（如果没这个文件，可以先给项目介绍的步骤过一遍），修改url地址为http地址，例如酱紫
```
{
    "name": "root",
    "url": "http://192.168.1.100:8080/#/",
    "bgColor": "#fff",
    "title": "首页",
    "hideNavigationBar": true
}
```
 - 5.2修改src\main.ts中Vue.prototype.appGlobal状态改为true
 - 5.3在src\util\http.ts文件中可以看到这一段代码，根据自己的实际情况修改，这段代码的含义是如果是apicloud模式，就使用全路径访问，因为apicloud模式下请求使用的是api.ajax方法，没法使用代理访问，这个请求方法不需要考虑跨域问题，所以需要参照如下写法给完全路径补上 感谢QQ @我命由我不由天给 的建议：
```
  if(Vue.prototype.appGlobal){
    axios.defaults.baseURL = 'https://www.fastmock.site/mock/6d41e4a585f6e3529e633c2d4e78cbba/api';
  }else{
    axios.defaults.baseURL = '/api';
  }
```

### ------2020-03-14 升级------
#### 1.增加vant语言包
#### 2.增加获取系统权限方法


### ------2020-03-12 升级------
#### 1.更改配置文件,增加WKWebView,不加编译的包无法发布到IOS端
#### 2.WKWebView下localStorage无法使用,在util.js文件中封装了方法,保证在h5和app端都能读写

### ------2020-03-08 升级------
#### 1.升级依赖模块
#### 2.增加国际化支持

### **项目介绍**
#### **1.技术栈**
##### vue-cli4 + typescript + vuex + vue-router + vant + axios + fastclick + lodash + svg-sprite-loader + webpack-merge + LESS

#### **2.app解决方案**
##### 2.1 封装了svg精灵图插件，如果使用了svg图标，可直接把图标放入src/assets/images文件夹中，在需要引入的页面引入方式
``` bash
svg-icon :class="class名称，可不传" :icon-class="文件名称" />
```
/TempIcons页面下会遍历src/assets/images文件夹下的所有svg图标，可供参考查看

##### 2.2 页面仿原生切换效果（无需再手动设置）

##### 2.3 解决页面头部底部使用fiexd固定在app下闪动问题，需要页面使用如下写法
``` bash
<template>
  <router-layout>
    <header slot="header">
      需要固定的头部
    </header>
    页面正文部分
	<footer slot="footer">
      需要固定的头部
    </header>
  </router-layout>
</template>
```
##### 2.4 沉浸式头部字体颜色（默认黑色），如需修改，可自行到src/App.vue下修改
##### 2.5 沉浸式状态下头部和ios下底部间距解决方案：在app启动后会使用api方法自动获取一次顶部和底部的高度，高度值存在vuex中，部分页面需要做适配的时候直接从vuex中读取高度值，然后设置到相关dom元素中，头部和底部高度默认为0
``` bash
appConfig: {
    appSafeAreaHeader: 0, //app下头部高度
    appSafeAreaFooter: 0, //app下底部高度
}
```
##### 2.6 页面调走后再返回上一页保留上一页页面tab切换状态：需要动态把tab切换的active值存放到url的参数中，可参考srcpages\Member\Member.vue页面切换效果

##### 2.7 运行项目报错简单处理（按顺序执行以下四步命令，需要区别于linux和window）
``` bash
rm -rf node_modules 或 del node_modules
rm package-lock.json 或 del package-lock.json
npm cache clear --force
npm install
```

##### 2.8 接口请求:只需要考虑在本地测试环境中运行，编译后放到apicloud中会切换到apicloud的接口请求方式
接口api路径src\api\api.ts

##### 2.9 关于编译：如果要打包到app中，需要先将src\main.ts文件中的Vue.prototype.appGlobal状态改为true，不然接口请求会出现跨域问题，并且页面中所有的api方法都应该使用if(Vue.prototype.appGlobal)包起来
接口api路径src\api\api.ts

##### 2.10 关于同步代码：apicloud项目根目录应该先删除所有文件和文件夹，只保留config.xml文件，然后将vue-cli编译好的文件复制到apicloud文件夹中，然后执行同步。

##### 2.11 侧滑返回上一页：如果某个页面需要能够侧滑返回上一页，需要手动在src\router\index.ts增加isback: true,

##### 2.12 缓存页面：如果某个页面需要缓存，需要手动在src\router\index.ts增加keepAlive: true

##### 2.13 断网识别：使用src\router\index.ts下代码监听是否断网了，如果断网了，就跳转到没有网络页面；如果没有网络的状态下有网络了，会自动返回上一页
```
    api.addEventListener(
      {
        name: 'offline',
      },
      (ret: object) => {
        if (ret) {
          alert('没有网络啦~');
        }
      }
    );

    // 判断是否有网

    api.addEventListener(
      {
        name: 'online',
      },
      (ret: object) => {
        if (ret) {
          router.go(-1);
        }
      }
    );
```


### **暂时无法解决的问题**
##### 1.在填写表单时，app的头部会被推上去
##### 2.一些api方法没有开启关闭，设置了以后会影响到全局页面，需要自己根据实际业务逻辑增加判断条件，例如
```
api.addEventListener({
    name:'resume'
}, function(ret, err){        
    alert('应用回到后台');
});
```
##### 3.IOS端返回上一页页面切换无法停留

### **开始一个app**
##### 1.修改src\main.ts中Vue.prototype.appGlobal状态改为true
##### 2.修改public\config.xml中id="A0000000000000"中的id为自己实际appid，否则无法同步代码代码
##### 3.运行npm run build打包代码
##### 4.将打包好的代码（dist文件夹下）文件复制到apicloud项目文件夹下

![](http://img.somaqu.com/1575602231032.gif)

该脚手架已经有上架到安卓和ios的APP项目了，而且相较于官方写法，速度更快，兼容性更好，对ui的还原度支持会比较好。
赶紧clone下来试一下吧，如果对你有帮助，欢迎star~；如果有疑问，可以提lssues或加我QQ 669476900一起讨论！
