# The build process

## Step 1. Modules dependencies graph

Each import is treated as a module.

Each module contains imports it needs.

Generate dependencies' tree.

## Step 2. Chunk graph

<span hl>Chunk graph</span> is the kind of how webpack splits the application into parts.

Each chunk contains the modules it needs.

## Step 3. Optimization available modules

Get all modules and create available modules list.

An available module must be a ESM module and synchronous.

## Step 4. Concatenate modules

Try all dependencies optionally.

<span hl>Hoist module scope and delete duplicated modules</span>.

## Step 5. Ids

Give every module and every chunk an numeric id. More often used modules get a smaller id and less often used modules get a higher id.

## Step 6. Code generation

Generate code for all modules. Inject runtime code into entry-point chunks. Wrap each module into a function and pass `__magic__(__webpack_require__)` function and exports object into the module.

## Step 7. Assets

Generate assets.

<span hlbg>参考链接：</span>

- [Manually Bundling an Application](https://www.youtube.com/watch?v=UNMkLHzofQI)
- [Demo code above](https://github.com/sokra/webpack-meetup-2018-05)
