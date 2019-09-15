
module.exports = app => {
    const getEvento = (req, res) => {
        app.db('evento')
        .join('evento_imagem','evento.id','evento_imagem.id_evento')
        .join('imagem', 'evento_imagem.id_imagem', 'imagem.id')
        .then((eventos) => {
            res.json(eventos)
        }).catch((err) => {
            res.status(400).json({ message: 'Erro ao tentar carregar eventos!', err })
        })
    }

   
    return { getEvento }
}

    