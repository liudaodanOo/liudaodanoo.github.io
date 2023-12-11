# 问题快反

> 以数据驱动+智能化模式提升问题管理能力，实现问题追踪透明化，处理经验自动化，问题反馈统一化，问题处理智能化。以问题处理为切入口，改善企业管理水平。

## 相关网址

### 应用

> PS: 预生产与生产环境地址相同，点击「切换」即可切换至生产环境。

- [测试区 - HuaWei](https://athena-test.digiwincloud.com.cn/)
- [测试区 - 微软](https://athena-test.digiwincloud.com/)
- [预生产 - HuaWei](https://athena.digiwincloud.com.cn/)
- [预生产 - 微软](https://athena.digiwincloud.com/)

### 前端代码仓库

> PS: 本地 clone 仓库前，请与 SM @高雅 确认仓库权限。

- [Web端 - GitLab](http://47.102.222.172:22691/app/FRC)
- [移动端 - GitBlit](http://172.16.2.111:8089/summary/FRC%2Ffrcdigiwinmobile.git)

### CI/CD

> PS: 打包/部署前，请与 SM @高雅 确认账号权限

- [Web端 - Jenkins](https://athena-devops-jenkins.digiwincloud.com.cn/job/MUI/job/frc/)
- [移动端 - Jenkins](http://172.16.2.116:22690/job/frcdigiwinmobile/)
- [移动端 - Jenkins](http://172.16.2.116:22690/job/frcdigiwinmobile/)
- [部署 - DevOps](https://ops.digiwincloud.com.cn/login)

### 平台相关

- [鼎捷雅典娜开发平台](https://athena-dev-platform-test.digiwincloud.com.cn/)
- [智驱中台知识库](http://172.16.2.230/athena-doc-center/)
- [亿信ABI报表](https://digiwinabi-test.apps.digiwincloud.com.cn/abi/eacl/login.do#navigator:/eanalysemgr/analysedefaultpage.do?eana_isSys=false&rshid=eanalysemgr-analysedefaultpage)

## 开发规范

### Web端

1. Git 分支管理 [地址](#前端代码仓库)

   每次迭代基于上个迭代分支创建新的开发分支，如：

   ```
   # 命名规范：feature/[年份]s[迭代]
   feature/2023s14 -> feature/2023s15
   ```

2. 打包 [地址](#ci-cd)

   a. 确认配置

   Web端当前迭代第一次打包时，需先添加 Jenkins 的分支配置：Jenkins -> Configure -> Choices/Description -> 点击「Save」或「Apply」。

   b. 执行打包

   Jenkins -> Build with Parameters -> 选择需打包的分支 -> 点击「Build」

   c. 查看版本号

   Jenkins -> 点击最新的 Build History -> Console Output —> 日志最下方查看本次打包的版本号

   打包完成后需确认版本号，格式如：2.1.3.2004。

3. 部署 [地址](https://ops.digiwincloud.com.cn/login)

   首页 -> 部署中心 -> 流水线部署 -> 选择对应的项目 -> 选择正确的版本部署至PaaS区 -> 部署至 HuaWei 测试区

   - Web端的项目名：FRCPACKAGE
   - 移动端的项目名：FRCDIGIWINMOBILE
