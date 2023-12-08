#!/bin/bash

# 确保脚本抛出遇到的错误
set -e

# 变量
images_path=images
bundle_path=.vitepress/dist
dist_path=dist

# 开始打包
echo -e "\033[31m>>>>> 开始打包"
yarn run docs:build

# 删除根目录下的dist
echo -e ">>>>> 删除根目录下的dist"
if [ -d "$dist_path" ]; then
  rm -rf "$dist_path"
fi

# 复制图片
cp  -r "$images_path" "$bundle_path"

# 移动dist
echo -e ">>>>> 移动dist"
mv -f "$bundle_path" "$dist_path"

# 切换分支
echo -e ">>>>> 切换分支"
git checkout gh-pages

# 将.git .gitignore node_modules移动到dist
echo -e ">>>>> 将.git .gitignore node_modules移动到dist"
mv .git "$dist_path"
mv .gitignore "$dist_path"
mv node_modules "$dist_path"
