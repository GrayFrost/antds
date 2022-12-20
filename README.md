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

无法使用cloneElement来修改子组件的props，只能通过context的方式

在slot外包裹一层，然后用use指令，可以改一些slot的数据，比如说动态修改class

## WIP
- [x] affix
- [x] alert
- [x] anchor
- [ ] auto-complete
- [ ] avatar
- [x] back-top
- [ ] badge
- [ ] breadcrumb
- [x] button
- [ ] calendar
- [ ] carousel
- [ ] cascader
- [ ] checkbox
- [x] col
- [ ] collapse
- [ ] date-picker
- [ ] desciprtions
- [x] divider
- [ ] drawer
- [ ] dropdown
- [ ] empty
- [ ] form
- [x] grid
- [x] icon
- [ ] input
- [ ] input-number
- [x] layout
- [ ] list
- [ ] mentions
- [ ] menu
- [ ] message
- [ ] modal
- [ ] notification
- [ ] pagination
- [ ] popconfirm
- [ ] popover
- [x] progress
- [ ] radio
- [ ] rate
- [x] row
- [ ] select
- [ ] skeleton
- [ ] slider
- [ ] spin
- [x] steps
- [x] switch
- [ ] table
- [ ] tabs
- [x] tag
- [ ] time-picker
- [ ] timeline
- [ ] tooltip
- [ ] transfer
- [ ] tree-select
- [ ] typograhpy
- [ ] upload

## 功能
判断是否支持flex

## TODO: 
alert animate改进
progress transition, line文字同一行样式

tag wave

事件统一dispatch 不是props

ant-design-vue 的几个问题：

有些class是[object Object]




