import ImageLoader from "./util/ImageLoader";

class Iboot {
  constructor(ele, config = {}) {
    this.config = Object.assign({
      list: [],
      baseHeight: 400,
      render: this.renderSlop,
      lazy: false,
      resize: false
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
      loaded: [],
      list: [],
      errorList: []
    }
    this.init()
  }

  init() {
    if(!this.ele) {
      console.error('ele is required')
      return
    }

    this.bindEvent()
    this.resize()
    this.initData()

    // 开启加载线程
    this.loadList()
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
    let renderList = []
    for(let index=0; index<this.config.list.length; index++) {
      let dlItem = await ImageLoader(this.config.list[index].src)
      if(dlItem.isSuccess) {
        let resize = this.scaleImageByHeight(dlItem.img, this.config.baseHeight)
        this.memeorySave.loaded.push(dlItem)
        renderList.push(dlItem)
        this.memeorySave.nowLoadWidth += resize.width

        // 到临界点去渲染
        if(this.memeorySave.nowLoadWidth >= this.eleInfo.width) {
          this.renderByList(renderList)
          this.memeorySave.nowLoadWidth = 0
          renderList = []
        } else {
          // 到最后的时候
          
        }

      } else {
        this.memeorySave.errorList.push(dlItem)
      }
    }
  }

  renderByList(list) {
    let width = this.memeorySave.nowLoadWidth

    let bi = width / this.config.baseHeight

    let targetHeight = this.eleInfo.width / bi

    let html = ''

    list.forEach(item=> {
      html += this.render({
        width: this.scaleImageByHeight(item.img, targetHeight).width,
        height: targetHeight,
        src: item.src
      })
    })

    this.appendChild(html)
  }

  appendChild(html) {
    this.ele.innerHTML += html
  }

  scaleImageByHeight(img, target) {
    let pi = img.width / img.height
    return {
      width: target * pi,
      height: target
    }
  }

  renderSlop(dom) {
    return dom
  }

  render(item) {
    return `<div class="iboot-item" style="height: ${item.height}px; width: ${item.width}px"><img src="${item.src}" alt="${item.alt}"></div>`
  }

  loadMore() {}
  beforeLoad(){}
  afterLoad(){}

  bindEvent() {
    window.addEventListener('resize', this.eventSave.resize = this.resize.bind(this))
  }
  unBindEvent() {
    window.removeEventListener('resize', this.eventSave.resize)
  }

  resize() {
    this.eleInfo.width = this.ele.offsetWidth
    this.eleInfo.height = this.ele.offsetHeight
  }

  // 销毁
  destroy() {
    this.unBindEvent()
  }
}

export default Iboot
