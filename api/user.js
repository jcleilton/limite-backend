const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                callback('123456')
            } else {
                bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
            }
            
        })
    }

    const save = (req, res) => {
        obterHash(req.body.senha, hash => {
            const password = hash
            const body = req.body
            app.db('competidor').insert({ 
                nome: req.body.nome, 
                email: req.body.email, 
                senha: password, 
                sobre_nome: req.body.sobre_nome, 
                data_nascimento: req.body.data_nascimento, 
                data_cadastro: req.body.data_cadastro, 
                peso: req.body.peso, 
                id_categoria: req.body.id_categoria, 
                idade: req.body.idade, 
                id_equipe: req.body.id_equipe, 
                id_evento_ultimo: req.body.id_evento_ultimo, 
                whatsapp: req.body.whatsapp, 
                id_faixa: req.body.id_faixa, 
                cidade: req.body.cidade, 
                uf: req.body.uf, 
                pais: req.body.pais, 
                logradouro: req.body.logradouro, 
                numero_casa: req.body.numero_casa, 
                complemento: req.body.complemento, 
                bairro: req.body.bairro, 
                cep: req.body.cep, 
                observacao: req.body.observacao, 
                is_admin: req.body.is_admin, 
                apelido: req.body.apelido,
                sexo: req.body.sexo }).then(_ => res.status(204).send()).catch(err => res.status(400).json(err))
        })
    }

    const update = (req, res) => {
        
        const password = hash
        app.db('competidor').where({ id: req.body.id }).first().update({ 
            nome: req.body.nome, 
            sobre_nome: req.body.sobre_nome, 
            data_nascimento: req.body.data_nascimento, 
            data_cadastro: req.body.data_cadastro, 
            peso: req.body.peso, 
            id_categoria: req.body.id_categoria, 
            idade: req.body.idade, 
            id_equipe: req.body.id_equipe, 
            id_evento_ultimo: req.body.id_evento_ultimo, 
            whatsapp: req.body.whatsapp, 
            id_faixa: req.body.id_faixa, 
            cidade: req.body.cidade, 
            uf: req.body.uf, 
            pais: req.body.pais, 
            logradouro: req.body.logradouro, 
            numero_casa: req.body.numero_casa, 
            complemento: req.body.complemento, 
            bairro: req.body.bairro, 
            cep: req.body.cep, 
            observacao: req.body.observacao, 
            is_admin: req.body.is_admin, 
            apelido: req.body.apelido,
            sexo: req.body.sexo }).then(_ => res.status(204).send()).catch(err => res.status(400).json(err))
        
    }

    return { save, update }
}