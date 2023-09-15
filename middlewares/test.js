function testMiddleware () {
  return (req, res, next) => {
    res.locals.test = 'TEST OK'
    next()
  }
}

export default testMiddleware
