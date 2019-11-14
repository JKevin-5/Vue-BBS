# BISTU-BBS
> 这是BISTU校园BBS项目 web前端开发代码说明文档

## 开发环境
>相关下载安装直接点击列表连接即可，有教程有规范

| node.js  | vue-cli  | bootstrap-vue |
| :----: | :----: | :----: |
| [v12.7.0](https://nodejs.org/zh-cn/) | [4.0.5](https://segmentfault.com/a/1190000014627083#articleHeader3) | [v2.0.4](https://bootstrap-vue.js.org/) |

## 项目目录介绍

- bbs
  - public
  - src 主要代码
    - assets 放置静态的图标等媒体文件
    - components 组件页
      - Signin.vue 登录组件
      - Signup.vue 注册组件
      - Navbar.vue 主界面全局导航栏
      - User-info.vue 个人主页界面
      - Forum.vue 首页（论坛）界面
      - Userinfo.vue 个人信息界面
      - Userinfo 个人主页面组件存放
        - Focus.vue 我的关注
        - Header.vue 顶部显示栏
        - Info.vue 底部显示界面
    - router 路由
    - store 
    - views 主要页面框架
      - Home.vue 主界面
      - welcome.vue 登录注册界面
  - test/unit 单元测试

## 已解决的问题及技术解决思路
- 父子组件通信问题(prop+watch)
- 全局cookie校验(vue-cookie)
- 强制组件刷新(毁掉重载入)
- axios实现花样请求API
- form表单的花样校验(结合正则)

## 待解决及可进行改进的问题
- 跳转页面的规范路由url书写
- token代替localStorage
