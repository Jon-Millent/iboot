import IbootImage from "./IbootImage";

export default function (input) {
  const { width, height, type, render } = input
  return new IbootImage({
    isSuccess: true,
    width: width,
    height: height,
    type,
    render
  })
}
