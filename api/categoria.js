
module.exports = app => {
    const getCategoria = (req, res) => {
        app.db('competidor').where({ id: req.user.id }).then(users => {
            if (users.length > 0) {
                var user = users[0]
                app.db('categoria')
                .where({ sexo: user.sexo })
                // .where({ id_faixa: user.id_faixa })
                .where('peso_final', '>=', user.peso)
                //.where('peso_final', '>=', user.peso)
                .where('idade_final', '>=', user.idade)
                //.where('idade_final', '>=', user.idade)
                .orderBy('idade_inicial')
                .then(categ => res.json(categ)).catch(err => res.status(400).json(user))
            } else {
                res.json('Dados não encontrados!')
            }
            
        })
        
    }

    

    // const remove = (req, res) => {
    //     app.db('categoria').where({ id: req.params.id }).del()
    //     .then(rowsDeleted =>{
    //         if (rowsDeleted > 0) {
    //             res.status(204).send()
    //         } else { 
    //             const msg = `Não foi encontrada a categoria com id ${req.params.id}`
    //             res.status(400).send(msg)
    //         }
    //     }).catch(err => res.status(400).json(err))
    // }


    return { getCategoria }
}