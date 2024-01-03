# ChatFile

## 相关网址

### 应用

- [测试区 - HuaWei](https://kcf-mobile-test.apps.digiwincloud.com.cn/)
- [测试区 - 微软](https://kcf-mobile-test.apps.digiwincloud.com/)
- [预生产 - HuaWei](https://kcf-mobile.apps.digiwincloud.com.cn/)
- [预生产 - 微软](https://kcf-mobile.apps.digiwincloud.com/)

### 前端代码仓库

> PS: 本地 clone 仓库前，请与 SM @陈雪英 确认仓库权限。

- [KCF - GitTea](http://172.16.101.224:22691/chatFile/kcf_frontend_mobile)

### CI/CD

> PS: 打包/部署前，请与 SM @陈雪英 确认账号权限

`develop` 分支有提交时，自动在 `GitTea` 上进行打包。打包完毕需查看**版本号**，请 SM @陈雪英 帮忙部署。

- [KCF - GitTea](http://172.16.101.224:22690/chatFile/kcf_frontend_mobile/)
- <span style="text-decoration: red line-through;">[部署 - DevOps]（废弃）(https://ops.digiwincloud.com.cn/login)</span>
- <span style="text-decoration: red line-through;">[KCF - Jenkins（废弃）](http://172.16.2.116:22690/job/kcf-mobile/)</span>

### 平台相关

- [移动端JSSDK文档](https://mobile-digiwin.yuque.com/cog7oa/gbmk5r/cs9bql#ALEr8)

### 其他

- [禅道](https://essc-devops-zentao.digiwincloud.com.cn/my/)
- [专项计划表](https://docs.qq.com/sheet/DR0ZISW9ZcFFHellI?tab=jg43me)

## 开发规范

### Web端

1. Git 分支管理 [地址](#前端代码仓库)

   a. KCF直接在 `develop` 分支上开发

2. 打包 [地址](#ci-cd)

   a. 执行打包

   Jenkins -> Build with Parameters -> 选择需打包的 `develop` 分支 -> 点击「Build」

   b. 查看版本号

   Jenkins -> 点击最新的 Build History -> Console Output —> 日志最下方查看本次打包的版本号

   打包完成后需确认版本号，格式如：2.1.3.2004。

3. 部署 [地址](https://ops.digiwincloud.com.cn/login)

   首页 -> 部署中心 -> 流水线部署 -> 选择对应的项目 -> 选择正确的版本部署至 HuaWei 测试区

   - 项目名：KCF-MOBILE
