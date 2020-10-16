class IbootImage {
  constructor(config) {
    const { isSuccess = true, img, width, height, src, element } = config
    this.isSuccess = isSuccess
    this.img = img
    this.width = width
    this.height = height
    this.src = src
    this.element = element || null
  }
}

export default IbootImage
