export default (src, type) => {
  if (type) {
    const str = src.split('.')

    let mime = str.pop()
    if (['jpeg', 'jpg'].includes(mime)) {
      mime = 'jpg'
    }

    return str.join('.') + `-${type}.` + mime
  }

  return src
}