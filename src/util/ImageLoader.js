import IbootImage from "./IbootImage";

export default async function (src) {
  return new Promise((resolve)=> {
    let img = new Image()
    img.onload = function () {
      resolve(new IbootImage({
        isSuccess: true,
        img,
        width: img.width,
        height: img.height,
        src
      }))
    }
    img.onerror = function () {
      resolve(new IbootImage({
        isSuccess: false,
        img
      }))
    }
    img.src = src
  })
}
