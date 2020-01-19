const moment = require('moment')

module.exports = app => {
    const getPautas = (req, res) => {
        const status = req.query.status ? req.query.status : 0
        app.db('pautas')
        .where({ userId: req.user.id })
        .where('status', '=', status)
        .orderBy('data')
        .then(pautas => res.json(pautas))
        .catch(err => res.status(400).json(err))
    }
    const save = (req, res) => {
        if (!req.body.descricao.trim()) {
            return res.status(400).send('Descrição é um campo requerido.')
        }
        if (!req.body.detalhes.trim()) {
            return res.status(400).send('Detalhes é um campo requerido.')
        }
        if (!req.body.titulo.trim()) {
            return res.status(400).send('Título é um campo requerido.')
        }
        req.body.userId = req.user.id

        app.db('pautas')
        .insert(req.body)
        .then(_ => res.status(204).send())
        .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('pautas').where({ id: req.params.id, userId: req.user.id }).del()
        .then(rowsDeleted =>{
            if (rowsDeleted > 0) {
                res.status(204).send()
            } else { 
                const msg = `Não foi encontrada pauta com id ${req.params.id}`
                res.status(400).send(msg)
            }
        }).catch(err => res.status(400).json(err))
    }

    const updateTaskStatus = (req, res, status) => {
        app.db('pautas')
        .where({ id: req.params.id, userId: req.user.id })
        .update({ status })
        .then(_ => res.status(204).send())
        .catch(err => res.status(400).json(err))
    }

    const togglePauta = (req, res) => {
        app.db('pautas').where({ id: req.params.id, userId: req.user.id }).first().then( task => {
            if (!task) {
                const msg = `Pauta com id ${req.params.id} não encontrada.`
                return res.status(400).send(msg)
            }
            const status = (task.status == 1) ? 0 : 1
            updateTaskStatus(req, res, status)
        }).catch(err => res.status(400).json(err))
    }

    return { getPautas, save, remove, togglePauta }
}