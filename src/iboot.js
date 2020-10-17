import ImageLoader from "./util/ImageLoader";
import IbootImage from "./util/IbootImage";

class Iboot {
  constructor(ele, config = {}) {
    this.config = Object.assign({
      list: [],
      baseHeight: 400,
      render: this.renderSlop,
      lazy: false,
      resize: false,
      hideHeight: 300,
      resizeTime: 100
    }, config)
    this.ele = ele

    this.eleInfo = {
      width: 0,
      height: 0
    }

    this.eventSave = {
      resize: null
    }

    this.memeorySave = {
      nowLoadIndex: 0,
      nowLoadWidth: 0,
      nowCacheWidth: 0,
      loaded: [],
      list: [],
      errorList: [],
      status: {
        loading: false
      }
    }

    this.handler = {
      resize: null
    }

    this.init()
  }

  init() {
    if(!this.ele) {
      console.error('ele is required')
      return
    }

    this.initDom()

    this.bindEvent()
    this.resize(false)
    this.initData()

    // 开启加载线程
    this.loadList()
  }

  initDom() {
    this.ibootParent = document.createElement('div')
    this.ibootParent.className = 'iboot-box'
    this.ele.appendChild(this.ibootParent)
  }

  initData() {
    this.config.list.forEach(item=> {
      this.memeorySave.list.push({
        src: item.src,
        alt: item.alt
      })
    })
  }

  // 加载列表
  async loadList() {
    this.memeorySave.status.loading = true
    await this.layoutList(this.memeorySave.list, 'img')
    this.memeorySave.list = this.memeorySave.list.filter(item2=>!item2.loaded)
    this.memeorySave.status.loading = false
  }

  async layoutList(renderList, mode = 'img', done = function (){}) {
    let renderedList = []

    let index = 0
    let repeatItem = renderList[index]
    while (repeatItem) {
      let dlItem = null
      if(mode === 'img') {
        dlItem = await ImageLoader(repeatItem.src)
      } else if(mode === 'cache') {
        dlItem = renderList[index]
      } else {
        console.warn('mode is error')
        return
      }

      repeatItem.loaded = true

      if(dlItem.isSuccess) {

        let resize = dlItem.scaleImageByHeight(this.config.baseHeight)

        if(mode === 'img') {
          this.memeorySave.loaded.push(dlItem)
        }

        renderedList.push(dlItem)

        if(mode === 'img') {
          this.memeorySave.nowLoadWidth += resize.width
          // 到临界点去渲染
          if(this.memeorySave.nowLoadWidth >= this.eleInfo.width) {
            this.renderByList(renderedList, mode)
            this.memeorySave.nowLoadWidth = 0
            renderedList = []
          } else {
            // 到最后的时候
            if(index === renderList.length - 1) {
              if(renderedList.length > 0) {
                this.renderByList(renderedList, mode)
              }
              this.memeorySave.nowLoadWidth = 0
            }
          }

        } else if(mode === 'cache') {
          this.memeorySave.nowCacheWidth += resize.width
          // 到临界点去渲染
          if(this.memeorySave.nowCacheWidth >= this.eleInfo.width) {
            this.renderByList(renderedList, mode)
            this.memeorySave.nowCacheWidth = 0
            renderedList = []
          } else {
            // 到最后的时候
            if(index === renderList.length - 1) {
              if(renderedList.length > 0) {
                this.renderByList(renderedList, mode)
              }
              this.memeorySave.nowCacheWidth = 0
            }
          }
        }
      }

      index++
      repeatItem = renderList[index]
    }
  }

  renderByList(list, mode) {

    let width = 0

    if(mode === 'img') {
      width = this.memeorySave.nowLoadWidth
    } else if(mode === 'cache') {
      width = this.memeorySave.nowCacheWidth
    }

    let bi = width / this.config.baseHeight
    let targetHeight = this.eleInfo.width / bi

    if(mode === 'img') {
      // let html = ''
      // list.forEach(item=> {
      //   html += this.render({
      //     width: this.scaleImageByHeight(item, targetHeight).width,
      //     height: targetHeight,
      //     src: item.src,
      //     display: targetHeight >= this.config.hideHeight ? 'none' : 'block'
      //   })
      // })

      list.forEach(item=> {
        item.element = this.render({
          width: this.scaleWidthByPercentage(
            this.scaleImageByHeight(item, targetHeight).width
          ),
          height: targetHeight,
          src: item.src,
          display: targetHeight >= this.config.hideHeight ? 'none' : 'block'
        })
        this.appendChild(item.element)
      })

    } else if(mode === 'cache') {
      list.forEach(item=> {
        item.element.style.width = this.scaleWidthByPercentage(
          this.scaleImageByHeight(item, targetHeight).width
        )
        item.element.style.height = targetHeight  + 'px'
        if(targetHeight >= this.config.hideHeight) {
          item.element.style.display = 'none'
        } else {
          item.element.style.display = 'block'
        }
        console.log(item.element.style, 'item.element.style')
      })
    }
  }

  appendChild(html) {
    // this.ibootParent.innerHTML += html
    this.ibootParent.appendChild(html)
  }

  scaleImageByHeight(img, target) {
    let pi = img.width / img.height
    return {
      width: target * pi,
      height: target
    }
  }

  scaleWidthByPercentage(Width) {
    // let fl = parseInt(Width)
    // console.log(fl, this.eleInfo.width, '<------------')
    return (Width / this.eleInfo.width) * 100 + '%'
  }

  renderSlop(dom) {
    return dom
  }

  render(item) {
    let div = document.createElement('div')
    div.className = 'iboot-item'
    div.style.height = item.height + 'px'
    div.style.width = item.width
    div.style.display = item.display

    div.innerHTML = `<img class="iboot-img" src="${item.src}" alt="${item.alt}">`

    return div
  }

  // 加载更多
  loadMore(list) {
    // this.load
    this.memeorySave.list.push(...list)

    // 没有加载重新调用方法
    if(!this.memeorySave.status.loading) {
      this.loadList()
    }
  }

  beforeLoad(){}
  afterLoad(){}

  bindEvent() {
    window.addEventListener('resize', this.eventSave.resize = this.resize.bind(this))
  }
  unBindEvent() {
    window.removeEventListener('resize', this.eventSave.resize)
  }

  resize(needLayout = true) {
    this.eleInfo.width = this.ele.offsetWidth
    this.eleInfo.height = this.ele.offsetHeight

    if(needLayout) {
      // 重排element
      clearTimeout(this.handler.resize)
      this.handler.resize = setTimeout(()=> {
        this.reLayoutElements()
      }, this.config.resizeTime)
    }
  }

  reLayoutElements() {
    this.layoutList(this.memeorySave.loaded, 'cache')
  }

  // 销毁
  destroy() {
    this.unBindEvent()
  }
}

export default Iboot
