module.exports = app => {

  app.use('/', require('./base.routes'))
  app.use('/', require('./auth.routes'))
  app.use('/myprofile', require('./user.routes'))
  app.use('/event', require('./event.routes'))
  app.use('/comment', require('./comment.routes'))
  app.use('/api', require('./api.routes'))
  app.use('/rating', require('./rating.routes'))

}