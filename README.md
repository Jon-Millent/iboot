# iboot 

木桶图片流布局  
barrel image stream layout 

[English](https://github.com/Jon-Millent/iboot/blob/master/README.md)
[中文](https://github.com/Jon-Millent/iboot/blob/master/README-zh.md)

![version](https://img.shields.io/github/package-json/v/jon-millent/iboot.svg)

#### How it work？

![](https://user-gold-cdn.xitu.io/2018/10/12/166675fe71c0aadd?w=1152&h=648&f=gif&s=48735)

## Install
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

## Use
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
pass in the initialized dom element
```javascript
new Iboot(document.getElementById('xxx'))
```

### config
##### config.list
the rendered image array.

```javascript
config.list = [
  // normal image
  { 
    src: 'http://xxxx', // address
    alt: 'my-photo' // image alt
  },
  
  // special placeholder
  { 
    type: 'block', // type：block
    width: 300, // width
    height: 80, // height
    render(ele) { // render function
      // @ele parent element
      ele.innerHTML = '<span>show</span>'
    }
  } 
]
```

##### config.baseHeight
`default: 300`  
the base height of the picture, all picture zooming are based on this base height.

##### config.render
allow users to override the render method and customize each rendering list. The render method needs to return a custom element
```javascript
config.render = function(element, item) {
  // @element currently rendered element
  // @item current item information
  
  // eg
  item.className += ' some'
  return item
}
```

#### config.resize
`default: true`  
whether to re-render the arrangement according to the zoom of the browser window.

#### config.hideHeight
`default: 300`  
when rendering, if the target height zoom ratio exceeds this number, it will be hidden.

#### config.resizeTime
`default: 100`  
configure the frequent call interval when the browser window is changed, the unit is `ms`.

### methods
instance method

#### Iboot.resize
arrange again

```javascript
let photo = new Iboot(...)
photo.resize()
```

#### Iboot.loadMore
load more

```javascript
let photo = new Iboot(...)
photo.loadMore(@config.list)
```

#### Iboot.destroy
destroy the instance

```javascript
let photo = new Iboot(...)
photo.destroy()
```
