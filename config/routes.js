module.exports = app => {
    app.post('/cadastro', app.api.user.save)
    app.post('/login', app.api.auth.signin)
    app.route('/pauta').all(app.config.passport.authenticate())
    .get(app.api.pauta.getPautas)
    app.route('/pauta/:id').all(app.config.passport.authenticate())
    .delete(app.api.pauta.remove)
    app.route('/pauta/:id').all(app.config.passport.authenticate())
    .put(app.api.pauta.togglePauta)
    app.route('/pauta').all(app.config.passport.authenticate())
    .post(app.api.pauta.save)
    app.get('/recuperarsenha/:email', app.api.user.recuperarSenha)
}