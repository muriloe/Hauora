var Pessoas = require('../models/pessoaModel');

module.exports = function(app){
    app.get('/api/setupPessoas', function(req, res){
        var iniciaPessoas = [{
            nome: 'Murilo',
            email: 'murilo0121@gmail.com',
            telefone: '41996833605',
            sexo: 1,
            data_nascimento: new Date(1994, 01, 21)
        },
        {
            nome: 'Daniel Santanna',
            email: 'danielsadoliveira@gmail.com',
            telefone: '41996833605',
            sexo: 1,
            data_nascimento: new Date(1996, 01, 21)
        },
        {
            nome: 'Caroline Erhardt',
            email: 'caroline_erhardt@gmail.com',
            telefone: '41996833605',
            sexo: 0,
            data_nascimento: new Date(1987, 05, 7)
        },
    ];
    Pessoas.create(iniciaPessoas, function(err, results){
        res.send(results);
        });
    });
}
