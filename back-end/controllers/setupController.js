var Pessoas =       require('../models/pessoaModel');
var Clientes =      require('../models/clienteModel');
var Anamneses =     require('../models/anamneseModel');
var Doencas =       require('../models/doencaModel');
var Consumos =      require('../models/consumoModel');
var Remedios =      require('../models/remedioModel');
var Alimento =      require('../models/alimentoModel');
var Grupo =         require('../models/grupoModel');
var Nutricionista = require('../models/nutricionistaModel');
var mongoose =      require('mongoose');

module.exports = function(app){

    app.get('/api/teste', function(req, res){
        res.send('AEEEEE MERMÃO');
    });

    app.get('/api/pessoas', function(req, res){
        Clientes.find({}, function (err, aaa){
            res.send(aaa);
        });
    });

    //Método utilizada para instanciar os alimentos e grupos
    app.get('/api/iniciaAlimentos', function(req, res){
     
        //criação dos grupos
        var carboidratos = new Grupo({titulo: 'Carboidratos Média (150 Kcal)'});
        var carnesEOvos = new Grupo({titulo: 'Carnes e ovos Média (190 Kcal)'});
        var frutas = new Grupo({titulo: 'Frutas Média (70 Kcal)'});  
        var legumesVerduras = new Grupo({titulo: 'Legumes e Verduras Média (15 Kcal)'});  
        var leguminosas = new Grupo({titulo: 'Leguminosas Média (55 Kcal)'});  
        var leiteQueijoIogurte = new Grupo({titulo: 'Leites, Queijos e Iogurtes Média (120 Kcal)'});
        var oleosGorduras = new Grupo({titulo: 'Óleos e Gorduras Média (73 Kcal)'});
        

        //criacao dos alimentos
        var alimentos = [   {nome: 'Arroz Branco Cozido', porcao: '4 Col. Sopa (125g/ml)', grupo: carboidratos._id},
                            {nome: 'Arroz Integral Cozido', porcao: '4 Col. Sopa (140g/ml)', grupo: carboidratos._id},
                            {nome: 'Batata Doce Cozida', porcao: '1 Col. De Servir e Meia(150g/ml)', grupo: carboidratos._id},
                            {nome: 'Batata Inglesa Cozida Picada', porcao: '2 Col. De Sopa (90g/ml)', grupo: carboidratos._id},
                            {nome: 'Bolo de Cenoura', porcao: '1 Pedaço Peq (90g/ml)', grupo: carboidratos._id},
                            {nome: 'Farinha de Aveia', porcao: '2 Col. de Sopa (30g/ml)', grupo: carboidratos._id},
                            {nome: 'Farinha de Mandioca', porcao: '2 Col. de Sopa (30g/ml)', grupo: carboidratos._id},
                            {nome: 'Inhame Cozido', porcao: '3 Col. De Servir e Meia (126g/ml)', grupo: carboidratos._id},
                            {nome: 'Macarrão Cozido', porcao: '3 Col. De Servir e Meia (105g/ml)', grupo: carboidratos._id},
                            {nome: 'Mandioca Cozida', porcao: '3 Col. De Sopa (96g/ml)', grupo: carboidratos._id},
                            {nome: 'Pão de Batata', porcao: '1 Unidade Média (50g/ml)', grupo: carboidratos._id},
                            {nome: 'Pão de Centeio', porcao: '2 Fatias (50g/ml)', grupo: carboidratos._id},
                            {nome: 'Pão de Forma Tradicional', porcao: '2 Fatias (50g/ml)', grupo: carboidratos._id},
                            {nome: 'Pão de Queijo', porcao: '2 Unidades Médias (40g/ml)', grupo: carboidratos._id},
                            {nome: 'Pão Francês', porcao: '1 Unidade Média (50g/ml)', grupo: carboidratos._id},
                            {nome: 'Polenta Frita', porcao: '2 Unidades Médias (80g/ml)', grupo: carboidratos._id},
                            {nome: 'Purê de Batata', porcao: '2 Colheres de Servir (135g/ml)', grupo: carboidratos._id},
                            
                            {nome: 'Atum em Lata', porcao: '2 Col. de Sopa (90g/ml)', grupo: carnesEOvos._id},
                            {nome: 'Bife de Fígado Frito', porcao: '1 Unidade Média (110g/ml)', grupo: carnesEOvos._id},
                            {nome: 'Bife Grelhado', porcao: '1 Unidade Média (90g/ml)', grupo: carnesEOvos._id},
                            {nome: 'Camarão Frito', porcao: '10 Unidades (80g/ml)', grupo: carnesEOvos._id},
                            {nome: 'Carne Assada', porcao: '1 Fatia Pequena (75g/ml)', grupo: carnesEOvos._id},
                            {nome: 'Carne Moída Refogada', porcao: '5 Colheres de Sopa (90g/ml)', grupo: carnesEOvos._id},
                            {nome: 'Carne Seca', porcao: '2 Unidades Pequenas (40g/ml)', grupo: carnesEOvos._id},
                            {nome: 'Costela Bovina Assada', porcao: '1 Pedaço Pequeno (40g/ml)', grupo: carnesEOvos._id},
                            {nome: 'Filé de Frango à Milanesa', porcao: '1 Filé Pequeno (80g/ml)', grupo: carnesEOvos._id},
                            {nome: 'Filé de Frango Grelhado', porcao: '1 Filé Médio (100h/ml)', grupo: carnesEOvos._id},
                            {nome: 'Frango Assado', porcao: '1 Pedaço de Peito ou 1 Coxa (100g)', grupo: carnesEOvos._id},
                            {nome: 'Hamburguer Grelhado', porcao: '1 Unidade (100g)', grupo: carnesEOvos._id},
                            {nome: 'Linguiça de Porco Cozida', porcao: '1 Gomo (50g/ml)', grupo: carnesEOvos._id},
                            {nome: 'Lombo de Porco Assado', porcao: '1 Fatia (80g/ml)', grupo: carnesEOvos._id},
                            {nome: 'Merluza Cozida', porcao: '2 Filés (200g/ml)', grupo: carnesEOvos._id},
                            {nome: 'Mortadela', porcao: '3 Fatias (45g/ml)', grupo: carnesEOvos._id},
                            {nome: 'Omelete Simples', porcao: '1 Unidade (75g/ml)', grupo: carnesEOvos._id},
                            {nome: 'Ovo Cozido ', porcao: '2 Unidade (100g/ml)', grupo: carnesEOvos._id},
                            {nome: 'Ovo Frito', porcao: '1 Unidade (50g/ml)', grupo: carnesEOvos._id},
                            {nome: 'Salsicha', porcao: '1 Unidade e meia (60g/ml)', grupo: carnesEOvos._id},
                            {nome: 'Sardinha em Conserva', porcao: '1 Unidade (40g/ml)', grupo: carnesEOvos._id},

                        
                            {nome: 'Abacate', porcao: '1 Colher de Sopa  (32g/ml)', grupo: frutas._id},
                            {nome: 'Abacaxi', porcao: '1 Fatia Grande (130g/ml)', grupo: frutas._id},
                            {nome: 'Acerola', porcao: '32  (224g/ml)', grupo: frutas._id},
                            {nome: 'Ameixa-preta Seca ', porcao: '3 Unidades (30g/ml)', grupo: frutas._id},
                            {nome: 'Ameixa-vermelha ', porcao: '4 Unidades (130g/ml)', grupo: frutas._id},
                            {nome: 'Banana Nanica', porcao: '1 Unidade (80g/ml)', grupo: frutas._id},
                            {nome: 'Banana Prata ', porcao: '1 Unidade (86g/ml)', grupo: frutas._id},
                            {nome: 'Caju', porcao: '2 Unidades e Meia (147g/ml)', grupo: frutas._id},
                            {nome: 'Caqui', porcao: '1 Unidade (113g/ml)', grupo: frutas._id},
                            {nome: 'Carambola', porcao: '2 Unidades (220g/ml)', grupo: frutas._id},
                            {nome: 'Cereja ', porcao: '24 Unidades (96g/ml)', grupo: frutas._id},
                            {nome: 'Damasco Seco ', porcao: '4 Unidades  (30g/ml)', grupo: frutas._id},
                            {nome: 'Fruta do Conde ', porcao: 'Meia Unidade (75g/ml)', grupo: frutas._id},
                            {nome: 'Goiaba  ', porcao: 'Meia Unidade (95g/ml)', grupo: frutas._id},
                            {nome: 'Jabuticaba ', porcao: '20 Unidades (140g/ml)', grupo: frutas._id},
                            {nome: 'Jaca  ', porcao: '4 Bagos (132g/ml)', grupo: frutas._id},
                            {nome: 'Kiwi  ', porcao: '2 Unidades (154g/ml)', grupo: frutas._id},
                            {nome: 'Laranja Baia ', porcao: '8 Gomos (144g/ml)', grupo: frutas._id},
                            {nome: 'Laranja-pêra ', porcao: '1 Unidade (137g/ml)', grupo: frutas._id},
                            {nome: 'Limão ', porcao: '4 Unidades (252g/ml)', grupo: frutas._id},
                            {nome: 'Maçã ', porcao: '1 Unidade (130g/ml)', grupo: frutas._id},
                            {nome: 'Mamão Formosa  ', porcao: '1 Fatia (160g/ml)', grupo: frutas._id},
                            {nome: 'Mamão Papaia  ', porcao: '1/2 Unidade  (140g/ml)', grupo: frutas._id},
                            {nome: 'Manga ', porcao: '1 Unidade (110g/ml)', grupo: frutas._id},
                            {nome: 'Maracujá (Suco Puro) ', porcao: '1/2 Xícara de Chá  (94g/ml)', grupo: frutas._id},
                            {nome: 'Melancia ', porcao: '2 Fatias (296g/ml)', grupo: frutas._id},
                            {nome: 'Melão ', porcao: '2 Fatias (230g/ml)', grupo: frutas._id},
                            {nome: 'Morango ', porcao: '10 Unidades (240g/ml)', grupo: frutas._id},
                            {nome: 'Nectarina ', porcao: '2 Unidades (184g/ml)', grupo: frutas._id},
                            {nome: 'Pêra ', porcao: '1 Unidade (133g/ml)', grupo: frutas._id},
                            {nome: 'Pêssego ', porcao: '2 Unidades (266g/ml)', grupo: frutas._id},
                            {nome: 'Salada de Frutas (Banana, Maçã, Laranja e Mamão)', porcao: '1/2 Xícara de Chá (125g/ml)', grupo: frutas._id},
                            {nome: 'Suco de Abacaxi  ', porcao: '1/2 Copo de Requeijão (125g/ml)', grupo: frutas._id},
                            {nome: 'Suco de Laranja (Puro)  ', porcao: '3/4 de Copo de Requeijão (187g/ml)', grupo: frutas._id},
                            {nome: 'Suco de Melão (Puro)  ', porcao: '3/4 de Copo de Requeijão (187g/ml)', grupo: frutas._id},
                            {nome: 'Suco de Tangerina ', porcao: '3/4 de Copo de Requeijão (187g/ml)', grupo: frutas._id},
                            {nome: 'Tangerina ', porcao: '1 Unidade (148g/ml)', grupo: frutas._id},
                            {nome: 'Uva Comum  ', porcao: '22 Unidades (100g/ml)', grupo: frutas._id},
                            {nome: 'Uva Itália  ', porcao: '8 Uvas (100g/ml)', grupo: frutas._id},
                            {nome: 'Uva Passa ', porcao: '1 Colher de Sopa (17g/ml)', grupo: frutas._id},
                            {nome: 'Uva Rubi  ', porcao: '8 Uvas (100g/ml)', grupo: frutas._id},
                            
                            
                            {nome: 'Abóbora Cozida', porcao: '1 Colher de Sopa e Meia (53,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Abobrinha Cozida', porcao: '3 Colheres de Sopa (81,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Acelga Cozida ', porcao: '2 Colheres de Sopa e Meia (81,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Acelga Crua Picada', porcao: '9 Colheres de Sopa (90,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Agrião', porcao: '22 Ramos (130,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Aipo Cru', porcao: '2 Unidades (80,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Alcachofra Cozida ', porcao: '1/4 de Unidade (35,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Alface', porcao: '15 Folhas (130,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Almeirão', porcao: '5 Folhas (65,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Aspargo em Conserva ', porcao: '8 Unidades (80,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Berinjela Cozida', porcao: '2 Colheres de Sopa (60,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Beterraba Cozida', porcao: '3 Fatias (30,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Beterraba Crua Ralada ', porcao: '2 Colheres de Sopa (40,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Brócolis Cozido ', porcao: '4 Colheres de Sopa (60,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Broto de Alfafa Cru ', porcao: '1 Xícara de Chá e Meia (50,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Broto de Feijão Cozido', porcao: '1 Colher de Servir e Meia (81,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Cenoura Cozida', porcao: '7 Fatias (35,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Cenoura Cozida Picada ', porcao: '1 Colher de Servir (36,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Cenoura Crua Picada ', porcao: '1 Colher de Servir (36,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Chuchu Cozido ', porcao: '2 Colheres de Servir e Meia (57,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Couve-Flor Cozido ', porcao: '3 Ramos (69,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Couve-manteiga Cozida ', porcao: '1 Colher de Servir (42,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Ervilha em Conserva ', porcao: '1 Colher de Sopa (13,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Ervilha Fresca', porcao: '1 Colher de Sopa e Meia (19,50g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Escarola', porcao: '15 Folhas (83,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Espinafre Cozido', porcao: '3 Colheres de Sopa (60,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Jiló Cozido ', porcao: '1 Colher de Sopa e Meia (40,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Mostarda', porcao: '8 Folhas (83,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Palmito em Conserva ', porcao: '2 Unidades (100,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Pepino Japonês', porcao: '1 Unidade (130,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Pepino Picado ', porcao: '4 Colheres de Sopa (116,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Pimentão Cru Fatiado', porcao: '10 Fatias (70,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Pimentão Cru Picado ', porcao: '3 Colheres de Sopa (72,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Quiabo Cozido ', porcao: '2 Colheres de Sopa (80,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Rabanete', porcao: '3 Unidades (102,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Repolho Branco Cozido ', porcao: '5 Colheres de Sopa (75,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Repolho Branco Cru Picado ', porcao: '6 Colheres de Sopa (72,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Repolho Roxo Cru Picado ', porcao: '5 Colheres de Sopa (60,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Rúcula', porcao: '15 Folhas (83,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Salsão Cru', porcao: '2 Colheres de Sopa (38,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Tomate Caqui', porcao: '2 Fatias e Meia (75,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Tomate Cereja ', porcao: '7 Unidades (70,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Tomate Gaúcho ', porcao: '4 Fatias (80,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Vagem ', porcao: '2 Unidades (11,00g/ml)', grupo: legumesVerduras._id},
                            {nome: 'Vagem Cozida', porcao: '2 Colheres de Sopa (44,00g/ml)', grupo: legumesVerduras._id},
                            
                            
                            {nome: 'Ervilha Seca Cozida ', porcao: '2 Colheres de Sopa e Meia (73,00g/ml)', grupo: leguminosas._id},
                            {nome: 'Feijão Branco Cozido', porcao: '1 Colher de Sopa e Meia (48,00g/ml)', grupo: leguminosas._id},
                            {nome: 'Feijão Cozido (Somente Grãos) ', porcao: '2 Colheres de Sopa (50,00g/ml)', grupo: leguminosas._id},
                            {nome: 'Feijão Preto Cozido (50% caldo) ', porcao: '1 Concha (86,00g/ml)', grupo: leguminosas._id},
                            {nome: 'Grão de Bico Cozido ', porcao: '1 Colher de Sopa e Meia (36,00g/ml)', grupo: leguminosas._id},
                            {nome: 'Lentilha Cozida ', porcao: '2 Colheres de Sopa (48,00g/ml)', grupo: leguminosas._id},
                            {nome: 'Soja Cozida ', porcao: '1 Colher de Servir (43,00g/ml)', grupo: leguminosas._id},
                            
                            {nome: 'Coalhada', porcao: 'Meio Copo de Reiqueijão (100,00g/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Iogurte Desnatado de Frutas ', porcao: '1 Pote(140,00/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Iogurte Integral Natural', porcao: '1 Copo de Requeijão (200,00/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Iorgurte Desnatado Natural', porcao: '1 Copo(200,00/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Leite de Cabra Integral ', porcao: '1 Copo(180,00/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Leite em Pó Desnatado ', porcao: '2 Colheres de Sopa(30,00/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Leite em Pó Integral', porcao: '2 Colheres de Sopa(30,00/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Leite em Pó Integral tipo "Ninho" ', porcao: '2 Colheres de Sopa(30,00/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Leite Integral Longa Vida ', porcao: '1 Copo(180,00/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Leite Semi-desnatado Longa Vida ', porcao: '1 Copo(180,00/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Leite Tipo B 3,5% de Gordura', porcao: '1 Copo(180,00/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Leite Tipo C 3,0% de Gordura', porcao: '1 Copo(180,00/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Queijo Pasteurizado ', porcao: '2 Unidades(35,00/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Queijo Prato', porcao: '2 Fatias(40,00/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Queijo Provolone', porcao: '1 Fatia (35,00/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Queijo Tipo Minas ', porcao: '1 Fatia e Meia(50,00/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Queijo Tipo Mussarela ', porcao: '3 Fatias(45,00/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Queijo Tipo Parmesão Ralado ', porcao: '2 Colheres de Sopa(30,00/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Requeijão Cremoso ', porcao: '1 Colher de Sopa e Meia (45,00/ml)', grupo: leiteQueijoIogurte._id},
                            {nome: 'Ricota', porcao: '2 Fatias(100,00/ml)', grupo: leiteQueijoIogurte._id},
                            
                            
                            {nome: 'Azeite de Dendê ', porcao: '1/2 Colher de Sopa (9,20g/ml)', grupo: oleosGorduras._id},
                            {nome: 'Azeite de Oliva ', porcao: '1 Colher de Sopa (7,60g/ml)', grupo: oleosGorduras._id},
                            {nome: 'Bacon (gordura) ', porcao: '1/2 Fatia (7,50g/ml)', grupo: oleosGorduras._id},
                            {nome: 'Banha de Porco', porcao: '1/2 Colher de Sopa (7,00g/ml)', grupo: oleosGorduras._id},
                            {nome: 'Creme Vegetal ', porcao: '1 Colher de Sopa (14,00g/ml)', grupo: oleosGorduras._id},
                            {nome: 'Halvarina ', porcao: '1 Colher de Sopa (20,00g/ml)', grupo: oleosGorduras._id},
                            {nome: 'Manteiga', porcao: '1/2 Colher de Sopa (10,00g/ml)', grupo: oleosGorduras._id},
                            {nome: 'Margarina Culinária ', porcao: '1/10 de Tablete (10,00g/ml)', grupo: oleosGorduras._id},
                            {nome: 'Margarina Líquida ', porcao: '1 Colher de Sopa (10,00g/ml)', grupo: oleosGorduras._id},
                            {nome: 'Margarina Vegetal ', porcao: '1/2 Colher de Sopa (9,70g/ml)', grupo: oleosGorduras._id},
                            {nome: 'Óleo Vegetal de Canola', porcao: '1 Colher de Sopa (8,00g/ml)', grupo: oleosGorduras._id},
                            {nome: 'Óleo Vegetal de Girassol', porcao: '1 Colher de Sopa (8,00g/ml)', grupo: oleosGorduras._id},
                            {nome: 'Óleo Vegetal de Milho ', porcao: '1 Colher de Sopa (8,00g/ml)', grupo: oleosGorduras._id},
                            {nome: 'Óleo Vegetal de Soja', porcao: '1 Colher de Sopa (8,00g/ml)', grupo: oleosGorduras._id},
                            ];

        carboidratos.save(function (err) {
            if (err) return handleError(err);
        });

        carnesEOvos.save(function (err) {
            if (err) return handleError(err);
        });

        frutas.save(function (err) {
            if (err) return handleError(err);
        });
        
        legumesVerduras.save(function (err) {
            if (err) return handleError(err);
        });
        
        leguminosas.save(function (err) {
            if (err) return handleError(err);
        });
        
        leiteQueijoIogurte.save(function (err) {
            if (err) return handleError(err);
        });
        
        oleosGorduras.save(function (err) {
            if (err) return handleError(err);
        });

        //Usado para saber quando terminou de gravar a lista
        var contador = 0;
        alimentos.forEach(alimento => {
            var ali = new Alimento({nome: alimento.nome, porcao: alimento.porcao, grupo: alimento.grupo });
            ali.save(function (err) {

                if (err){
                    console.log('Erro ao salvar grupo de alimento');
                    return handleError(err);
                } 
                contador++; 
                if (contador === alimentos.length) {
                    res.send('criou alimentos');
                }
            });
        });
    });

    app.get('/api/iniciaNutricionista', function(req, res){
        let nutricionista = new Nutricionista({
            sexo: 'FEMININO',
            telefone: '4196833605',
            email: 'nutri@email.com',
            nome: 'Caroline Erhardt',
            senha: '123456',
            foto: 'https://scontent.fbfh3-1.fna.fbcdn.net/v/t1.0-9/149206_1659326998012_5031848_n.jpg?_nc_cat=0&_nc_eui2=v1%3AAeG6lm5CJss3-yEmUZOE5w9EwxBFrNezNldEoHci1XBctaOl8bYkYi3ri9F_QS-670BMOQ4_lnutg9o-1TYUuwoM0ggapTOKypCDOUeMcK46-Q&oh=d0bc8d40c5833ed8a40e067c933ffbce&oe=5B90AA85',
            data_nascimento: new Date(),
        });
        nutricionista.save(function (err, results) {
            console.log("iniciando salvção de nutri");
            if(err) {
                console.log("Erro ao salvar nutri"); 
                reject({"status":false, "message":"Erro ao salvar nutri", "error": err});
            }
            else{
                console.log("Salvou nutri");
            }
        });
        res.send(nutricionista);
    });

    /*
    //Método utilizado para inicar a base de dados
    app.get('/api/iniciarBanco', function(req, res){
        
        //Cria uma pessoa
        var iniciaCliente = new Clientes({
            nome: 'Murilo',
            email: 'murilo0121@gmail.com',
            senha: '123456',
            telefone: '41996833605',
            sexo: "Macho",
            data_nascimento: new Date(1994, 01, 21),
            objetivo: "Ficar gordão",
            acesso: false
        });
        iniciaCliente.save(function (err) {
            if (err) return handleError(err);
        });
        res.send('DEU BOIAa');
    });
    

    //Método utilizado para limpar a base de dados
    app.get('/api/deletarTudoIniciarBanco', function(req, res){
        deletarTudo();

        res.redirect('/api/iniciarBanco');
    });

    app.get('/api/deletarTudo', function(req, res){
        deletarTudo();
        res.send("Foi deletado absolutamente TUDO!")
       
    });

    function deletarTudo(){
        mongoose.connection.collections['clientes'].drop( function(err) {
            console.log('clientes dropped');
        });
        mongoose.connection.collections['pessoas'].drop( function(err) {
            console.log('pessoas dropped');
        });
        mongoose.connection.collections['anamneses'].drop( function(err) {
            console.log('anamneses dropped');
        });
        mongoose.connection.collections['remedios'].drop( function(err) {
            console.log('remedios dropped');
        });
        mongoose.connection.collections['consumos'].drop( function(err) {
            console.log('consumos dropped');
        });
        mongoose.connection.collections['doencas'].drop( function(err) {
            console.log('doencas dropped');
        });
    }
*/
}


