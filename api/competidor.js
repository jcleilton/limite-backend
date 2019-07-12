const moment = require('moment')

module.exports = app => {
    const getCompetidores = (req, res) => {
        app.db('competidor').then(comps => res.json(comps)).catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('competidor').where({ id: req.params.id }).del()
        .then(rowsDeleted =>{
            if (rowsDeleted > 0) {
                res.status(204).send()
            } else { 
                const msg = `Não foi encontrado competidor com id ${req.params.id}`
                res.status(400).send(msg)
            }
        }).catch(err => res.status(400).json(err))
    }


    return { getCompetidores, remove }
}