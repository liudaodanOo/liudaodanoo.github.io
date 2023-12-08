#!/bin/bash

# 确保脚本抛出遇到的错误
set -e

# 变量
images_path=images
images_cp_path=.vitepress/dist
dist_path=dist

# 删除根目录下的dist
if [ -d "$dist_path" ]; then
  rm -rf "$dist_path"
fi

# 生成静态文件
yarn run docs:build

# 复制图片
cp  -r "$images_path" "$images_cp_path"

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

echo -e "\033[32m操作完成\033[0m"