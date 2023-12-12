#!/bin/bash

echo -e "\033[32m开始执行\033[0m"

# 变量
dist_path=.vitepress/dist

# 函数
function echoRed() {
  echo -e "\033[31mexcute>>>>: $1\033[0m"
}

echoRed 'npm run docs:build'
npm run docs:build

if [ -d "$dist_path" ]
then
  cd "$dist_path"
else
  echoRed "$dist_path'不存在'"
  exit 0
fi

echoRed 'git init'
git init

echoRed 'git remote add origin git@gitee.com:liudaodanOo/markdown.git'
git remote add origin git@gitee.com:liudaodanOo/markdown.git

echoRed 'git remote add github git@github.com:liudaodanOo/liudaodanoo.github.io.git'
git remote add github git@github.com:liudaodanOo/liudaodanoo.github.io.git

echoRed 'git fetch --prune'
git fetch --prune

echoRed 'git checkout -b gh-pages'
git checkout -b gh-pages

echoRed 'git add .'
git add .

echoRed 'git commit -m "build: 📦"'
git commit -m "build: 📦"

echoRed 'git branch --set-upstream=origin/gh-pages gh-pages'
git branch --set-upstream-to=origin/gh-pages gh-pages

echoRed 'git push -f'
git push -f

echoRed 'git push -f github'
git push -f github

cd ../../
rm -rf "$dist_path"

echo -e "\033[32m执行完毕\033[0m"
