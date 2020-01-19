const { authSecret } = require('../env_file')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Dados incompletos')
        }
        const user = await app.db('usuarios').whereRaw("LOWER(email) = LOWER(?)", req.body.email).first()

        if (user) {
            bcrypt.compare(req.body.password, user.senha, (err, isMatch) => {
                if (err || !isMatch) {
                    return res.status(401).send()
                }
                const payload = {id: user.id}
                res.json({
                    usuario: { id: user.id, nome: user.nome, email: user.email },
                    token: jwt.encode(payload, authSecret),
                })
            })
        } else {
            res.status(400).send('Email não encontrado!')
        }
    }

    return { signin }
}