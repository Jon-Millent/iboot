class IbootImage {
  constructor(config) {
    const { isSuccess = true, img, width, height, src, element, type, render} = config
    this.isSuccess = isSuccess
    this.img = img
    this.width = width
    this.height = height
    this.src = src
    this.element = element || null
    this.scale = width / height
    this.type = type || 'image'
    this.render = render
  }

  scaleImageByHeight(height) {
    return {
      width: height * this.scale,
      height: height
    }
  }
}

export default IbootImage
