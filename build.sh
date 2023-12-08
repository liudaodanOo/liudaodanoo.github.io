# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn run docs:build

# 切换分支
git stash
git checkout gh-pages
git stash pop

# 加至暂存区并提交
git add .
git commit -m "build: 📦打包"
git push origin
git push github

cd -
