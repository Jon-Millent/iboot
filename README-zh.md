# iboot 

木桶图片流布局  
barrel image stream layout 

[English](https://github.com/Jon-Millent/iboot/blob/master/README.md)
[中文](https://github.com/Jon-Millent/iboot/blob/master/README-zh.md)

![version](https://img.shields.io/github/package-json/v/jon-millent/iboot.svg)

#### 它的工作原理？

![](https://user-gold-cdn.xitu.io/2018/10/12/166675fe71c0aadd?w=1152&h=648&f=gif&s=48735)

## 安装
```shell script
npm install iboot-layout
```
or
```shell script
yarn add iboot-layout
```
or
```html
<script src="https://cdn.jsdelivr.net/npm/iboot-layout@2.1.0/dist/iboot.min.js"></script>
```

## 使用
```javascript
import Iboot from 'iboot-layout'
let photos = new Iboot(document.getElementById('box'),  {
  list: [
    {
      src: 'http://xxxx',
      alt: 'my-photo'
    }
    ...
  ],
  baseHeight: 300,
})
```

## Api
```javascript
new Iboot(element,  config = {
  list: [
    {
      src: 'http://xxxx',
      alt: 'my-photo'
    }
  ],
  baseHeight: 400,
  render: function(item) {
    return item
  },
  resize: false,
  hideHeight: 300,
  resizeTime: 100
})
```
### element
传入初始化的dom元素
```javascript
new Iboot(document.getElementById('xxx'))
```

### config
##### config.list
渲染的图片数组。

```javascript
config.list = [
  // 普通图片
  { 
    src: 'http://xxxx', // 图片地址
    alt: 'my-photo' // 图片备注
  },
  
  // 特殊占位
  { 
    type: 'block', // 类型：block
    width: 300, // 宽度
    height: 80, // 高度
    render(ele) { // 渲染函数
      // @ele 渲染的父元素
      ele.innerHTML = '<span>show</span>'
    }
  } 
]
```

##### config.baseHeight
`默认：300`  
图片基准高度，所有的图片缩放都基于这个基准高度。

##### config.render
允许用户重写render方法，对每一个渲染列表进行自定义。render方法需要返回自定义好的element
```javascript
config.render = function(element, item) {
  // @element 当前渲染的element
  // @item 当前item的信息
  
  // 例子
  item.className += ' some'
  return item
}
```

#### config.resize
`默认：true`  
是否根据浏览器窗口缩放重新渲染排列。

#### config.hideHeight
`默认：300`  
当渲染的时候，如果目标高度缩放比例超出这个数字就会隐藏。

#### config.resizeTime
`默认：100`  
配置当浏览器窗口改变的时候频繁调用间隔，单位`ms`。

### methods
实例方法

#### Iboot.resize
重新布局
```javascript
let photo = new Iboot(...)
photo.resize()
```

#### Iboot.loadMore
加载更多
```javascript
let photo = new Iboot(...)
photo.loadMore(@config.list)
```

#### Iboot.destroy
销毁实例
```javascript
let photo = new Iboot(...)
photo.destroy()
```
