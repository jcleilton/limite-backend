module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.route('/competidor').all(app.config.passport.authenticate())
    .get(app.api.competidor.getCompetidores)
    app.route('/competidor/:id').all(app.config.passport.authenticate())
    .delete(app.api.competidor.remove)
    app.route('/categoria').all(app.config.passport.authenticate())
    .get(app.api.categoria.getCategoria)
    
    



}