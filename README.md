# antds
An enterprise-class UI design language and Svelte-based implementation

// TODO
package.json
sideeffects
engine >= 16.0.0
peerdependencies


## 报错
### import { performance } from 'node:perf_hooks'

node版本

### vite找不到页面
vite serve site 指定目录

## 语法
```
$$restProps
```
```
$$props.$$slot
```

可选参数，将参数导出为undefined, export let a = undefined

button中的两字中文间隔功能，原来是获取children中的内容来做判断，
现在使用指令，通过node原生直接操作

context不能动态更新，且只能从父组件setContext 子组件getContext

$$props是组件接收到的数据，不是全部

if判断条件不能直接用于slot, 比如{#if xxx}<slot />{/if}， 此为错误

## WIP
- [ ] affix
- [x] alert
- [ ] anchor
- [ ] auto-complete
- [ ] avatar
- [ ] back-top
- [ ] badge
- [ ] breadcrumb
- [x] button
- [ ] calendar
- [ ] carousel
- [ ] cascader
- [ ] checkbox
- [x] col
- [ ] collapse
- [ ] color-picker
- [ ] comment
- [x] divider
- [x] grid
- [x] icon
- [x] layout
- [x] row
- [x] switch
- [x] steps

## 功能
判断是否支持flex

## TODO: 
alert animate

事件统一dispatch 不是props



