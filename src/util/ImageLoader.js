export default async function (src) {
  return new Promise((resolve)=> {
    let img = new Image()
    img.onload = function () {
      resolve({
        isSuccess: true,
        img,
        width: img.width,
        height: img.height,
        src
      })
    }
    img.onerror = function () {
      resolve({
        isSuccess: false,
        img
      })
    }
    img.src = src
  })
}
