module.exports = {
    async nome(req, res) {
        res.render('nome.html');
    },

    async chat(req, res) {
        res.render('chat.html');
    },

    async json(req, res) {
        console.log('json')
        res.json({nome: req.params.nome});
    }
}
