#!/bin/bash

# 确保脚本抛出遇到的错误
set -e

# 变量
proj_name=markdown
images_path=images
bundle_path=.vitepress/dist
dist_path=dist

function echoRed() {
  echo -e "\033[31m>>>>> $1\033[0m"
}

# 开始打包
echoRed '开始打包'
yarn run docs:build

# 删除根目录下的dist
echoRed '删除根目录下的dist'
if [ -d "$dist_path" ]; then
  rm -rf "$dist_path"
fi

# 复制图片
echoRed '复制图片'
cp  -r "$images_path" "$bundle_path"

# 移动dist
echoRed '移动dist'
mv -f "$bundle_path" "$dist_path"

# 切换分支
echoRed '切换分支'
git checkout gh-pages

# 将..gitignore node_modules移动到dist
echoRed '将.gitignore node_modules移动到dist'
mv .gitignore "$dist_path"
mv node_modules "$dist_path"

# 将dist移动到上层目录
echoRed '将dist移动到上层目录'
mv "$dist_path" ../"$dist_path"

# 删除当前目录所有文件
echoRed '删除当前目录所有文件'
git rm -rf .

# 将dist目录下的文件移到当前目录
echoRed '将dist目录下的文件移到当前目录'
mv ../"$dist_path" .
mv "$dist_path"/.gitignore .
mv "$dist_path"/node_modules .
mv -f "$dist_path"/* .

# 删除dist目录
echoRed '删除dist目录'
rm  -rf "$dist_path"

# 加至暂存区并提交
echoRed '加至暂存区并提交'
git add .
git commit -m "build: 📦打包"
git push origin
git push -f github

# 返回master分支
echoRed '返回master分支'
git checkout master

echo -e "\033[32m操作完成\033[0m"
