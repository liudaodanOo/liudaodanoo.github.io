#!/bin/bash

echo -e "\033[32m开始执行\033[0m"

# 函数
function echoRed() {
  echo -e "\033[31mexecute>>>>: $1\033[0m"
}

echoRed 'npm run build'
npm run build

echoRed 'cp -r images .vitepress/dist/images'
cp -r images .vitepress/dist/images

echoRed 'cp -r docs .vitepress/dist/docs'
cp -r docs .vitepress/dist/docs

echoRed 'cd .vitepress/dist'
cd .vitepress/dist

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

echoRed 'rm -rf .vitepress/dist'
rm -rf .vitepress/dist

echoRed 'git checkout master'
git checkout master

echo -e "\033[32m执行完毕\033[0m"
