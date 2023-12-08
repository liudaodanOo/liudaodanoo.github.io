#!/bin/bash

# 确保脚本抛出遇到的错误
set -e

# 变量
proj_name=markdown
images_path=images
bundle_path=.vitepress/dist
dist_path=dist

# 开始打包
echo -e "\033[31m>>>>> 开始打包\033[0m"
yarn run docs:build

# 删除根目录下的dist
echo -e "\033[31m>>>>> 删除根目录下的dist\033[0m"
if [ -d "$dist_path" ]; then
  rm -rf "$dist_path"
fi

# 复制图片
cp  -r "$images_path" "$bundle_path"

# 移动dist
echo -e "\033[31m>>>>> 移动dist\033[0m"
mv -f "$bundle_path" "$dist_path"

# 切换分支
echo -e "\033[31m>>>>> 切换分支\033[0m"
git checkout gh-pages

# 将..gitignore node_modules移动到dist
echo -e "\033[31m>>>>> 将.gitignore node_modules移动到dist\033[0m"
mv .gitignore "$dist_path"
mv node_modules "$dist_path"

# 将dist移动到上层目录
echo -e "\033[31m>>>>> 将dist移动到上层目录\033[0m"
mv "$dist_path" ../"$dist_path"

# 删除当前目录所有文件
echo -e "\033[31m>>>>> 删除当前目录所有文件\033[0m"
git rm -rf .

# 将dist目录下的文件移到当前目录
echo -e "\033[31m>>>>> 将dist目录下的文件移到当前目录\033[0m"
mv ../"$dist_path" .
mv "$dist_path"/.gitignore .
mv "$dist_path"/node_modules .
mv -f "$dist_path"/* .

# 删除dist目录
echo -e "\033[31m>>>>> 删除dist目录\033[0m"
rm  -rf "$dist_path"

# 加至暂存区并提交
echo -e "\033[31m>>>>> 加至暂存区并提交\033[0m"
git add .
git commit -m "build: 📦打包"
git push origin
git push -f github

echo -e "\033[32m操作完成\033[0m"
