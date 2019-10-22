
![tim 20181012160547](https://user-images.githubusercontent.com/17584565/46856490-2a200780-ce39-11e8-95b1-0b7ce3031bac.png)


<h4 align="center">
jQuery木桶流图片布局插件 v1.0.0
</h4>



<h5 align="center">
DEMO
</h4>

<div align="center">
  <img src="https://i.loli.net/2019/10/22/7FPIfsKTwqiY3MR.png">
  
</div>

<div align="center">
  <a href="http://show.verydog.cn/iboot">在线演示</a>
</div>  


## 原理

![](https://user-gold-cdn.xitu.io/2018/10/12/166675fe71c0aadd?w=1152&h=648&f=gif&s=48735)

## Install
```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="./iboot.js"></script>
```

## Use
### 初始化
```html
  <div class="iboot-controller clear">

  </div>
```

```css
.clear:after {
  content: '';
  display: block;
  clear: both;
  width: 100%;
}
```

```js
var iboot = new Iboot($('.iboot-controller'), {
  list: [
    {
      src: 'https://picsum.photos/600/600',
      alt: 'xxx'
    }
    ...
  ]
})
```
### Iboot参数
`Iboot(ele, config)`

#### ele
当前选中的元素
#### config
* <a href="#list">list</a> 
* <a href="#baseheight">baseHeight</a>  
* <a href="#template">template</a>  
* <a href="#afterload">afterLoad</a>  
* <a href="#beforeload">beforeLoad</a>  
* <a href="#resize">resize</a>  
* <a href="#loadmore">loadMore</a>  

#### list
图片列表
```js
[
  {
    src: '',
    alt: 'xxx'
  }
]
```
#### baseHeight
基准高度，图片会再次基础上放大或缩小，默认 `400`。

#### template
模板函数，此方法允许你在渲染的时候操作dom，以完成对列表自定义的一些操作，必须返回操作后的dom。

```js
template: function (dom) {
  dom.addClass('some')
  return dom
}
```

#### beforeLoad
加载图片前的回掉函数

#### afterLoad
加载图片后的回调函数

#### resize
此方法会对列表重新排版，用于窗口大小改变的时候。
```js
$(window).resize(function () {
  iboot.resize()
})

```

##### loadMore
加载更多图片
```js
iboot.loadMore([
  {
     src: 'xxx',
     alt: 'xxx'
  }
])
```

## 请我喝杯咖啡，支持更多开源
![1024.png](https://i.loli.net/2018/07/25/5b57cb91a44a1.png)
## LICENSE
<a href="http://opensource.org/licenses/MIT">MIT</a>
