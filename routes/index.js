module.exports = app => {

  app.use('/', require('./base.routes.js'))
  app.use('/', require('./user.routes.js'))
  app.use('/event', require('./event.routes.js'))
  app.use('/comment', require('./comment.routes.js'))

}