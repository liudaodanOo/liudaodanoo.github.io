# ChatFile

> 基于鼎捷知识中台构建的企业知识类机器人。通过NLP及OpenAI的技术，它可以自动提取、处理PDF、OFFICE等多种文件格式中的文字信息和图像，进行分类和汇总，为用户提供知识智能交互体验。企业用户可以通过ChatFile,以自然语言交互的方式，高效，准确的获取知识，同时确保知识运用的合规及安全性要求。ChatFile助力企业构建全新的知识管理、复用能力，以低成本构建企业知识创新。

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

- [KCF - Jenkins](http://172.16.2.116:22690/job/kcf-mobile/)
- [部署 - DevOps](https://ops.digiwincloud.com.cn/login)

### 平台相关

暂无。

### 其他

暂无。

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

   首页 -> 部署中心 -> 流水线部署 -> 选择对应的项目 -> 选择正确的版本部署至PaaS区 -> 部署至 HuaWei 测试区

   - 项目名：KCF
