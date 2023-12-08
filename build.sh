#!/bin/bash

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn run docs:build

# 移动dist
mv .vitepress/dist dist

# 切换分支
git checkout gh-pages

# 将dist目录下的文件移到上一层
mv dist/* .

# 加至暂存区并提交
git add .
git commit -m "build: 📦打包"
git push origin
git push -f github

cd -
