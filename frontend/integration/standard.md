# 规范的整合

## git

### Commitlint

```text
# install
npm install @commitlint/{cli,config-conventional} --save-dev  --save-exact

# configuration
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

### Commitizen

```text
# install
npm install commitizen --save-dev --save-exact

# init project to use cz-conventional-changelog adapter
npx --no -- commitizen init cz-conventional-changelog --save-dev --save-exact
```

### Husky

```text
# install
npm install husky --save-dev --save-exact

# husky init
npx husky init

# add prepare-commit-msg hook
echo "exec < /dev/tty && npx cz --hook || true" > .husky/prepare-commit-msg

# add commit-msg hook, 整合commitizen后，可以不必使用commitlint了
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```
