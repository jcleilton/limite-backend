const app = require('express')()
const db = require('./config/db')
const consign = require('consign')

consign().include('./config/passport.js').then('./config/middlewares.js').then('./api').then('./config/routes.js').into(app)

app.db = db

const porta = process.env.PORT || 3000;
app.listen(porta, () => {
    console.log(`Backend executando na porta ${porta}...`)
})

