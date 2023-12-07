# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn run docs:build

# 进入生成的文件夹
cd ./.vitepress/dist

git init
git add -A
git commit -m "🚀: deploy"

# 推到远程仓库
git push -f master:build

cd -
