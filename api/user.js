const bcrypt = require('bcrypt-nodejs')


module.exports = app => {
    const nodemail = require('nodemailer')
    var remetente = nodemail.createTransport({
        host: 'smtp-mail.outlook.com',
        service: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth:{
        user: 'uds_unofficial@outlook.com',
        pass: '@uds4414@' },
        tls: {
            ciphers:'SSLv3'
        }
    })

    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                callback('123456')
            } else {
                bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
            }
            
        })
    }

    const sendEmail = (text, destiny) => {
        var emailASerEnviado = {
            from: 'uds_unofficial@outlook.com',
            to: destiny,
            subject: 'Recuperação de senha - Pautas App',
            text: text,
        }

        remetente.sendMail(emailASerEnviado, function(error){
            if (error) {
                console.log(error);
            } else {
                console.log('Email enviado com sucesso.');
            }
        })
    }

    const gerarPassword = () => {
        return Math.random().toString(36).slice(-10);
    }

    const recuperarSenha = (req, res) => {
        const mail = req.params.email || 'teste@teste.com'
        const senha = gerarPassword()
        const text = 'Senha para recuperação: ' + senha
        obterHash(senha, hash => {
            const password = hash
            app.db('usuarios')
            .where({ email: mail })
            .update({ senha: password })
            .then(_ => {
                
                console.log(_)
                if (_ == 0) {
                    return res.status(400).send()
                }
                sendEmail(text, mail)
                res.status(204).send()
            })
            .catch(err => res.status(400).json(err))
        })
    }

    const save = (req, res) => {
        obterHash(req.body.senha, hash => {
            const password = hash
            app.db('usuarios').insert({ 
                nome: req.body.nome, 
                email: req.body.email, 
                senha: password, 
            }).then(_ => res.status(204).send()).catch(err => res.status(400).json(err))
        })
    }

    const update = (req, res) => {
        
        const password = hash
        app.db('usuarios').where({ id: req.body.id }).first().update({ 
            nome: req.body.nome, 
            sobre_nome: req.body.sobre_nome
        }).then(_ => res.status(204).send()).catch(err => res.status(400).json(err))
        
    }

    return { save, update, recuperarSenha }
}