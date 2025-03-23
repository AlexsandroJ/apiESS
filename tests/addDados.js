const request = require('supertest');

async function add() {
    const BASE_URL = process.env.TEST_URL || 'http://opinai.ddns.net:5001';

    const newUser = {
        name: "alex",
        email: 'ajs6@gmail.com',
        password: "123456789"
    }
    const notas = [
        {
            email: newUser.email,
            title: "Um Sonho de Liberdade",
            note: "muito emocionantes porem algo esta acontecendo                                                                                "
        },
        {
            email: newUser.email,
            title: "O Poderoso Chefão",
            note: "uma obra de primeira qualidade"
        },
        {
            email: newUser.email,
            title: "O Cavaleiro das Trevas",
            note: "um ótimo filme"
        },
        {
            email: newUser.email,
            title: "12 Homens e uma Sentença",
            note: "um clássico intenso e reflexivo"
        },
        {
            email: newUser.email,
            title: "A Lista de Schindler",
            note: "uma história emocionante e impactante"
        },
        {
            email: newUser.email,
            title: "O Senhor dos Anéis: O Retorno do Rei",
            note: "uma jornada épica inesquecível"
        },
        {
            email: newUser.email,
            title: "Pulp Fiction: Tempo de Violência",
            note: "uma narrativa não linear brilhante"
        },
        {
            email: newUser.email,
            title: "Três Homens em Conflito",
            note: "um faroeste clássico e envolvente"
        },
        {
            email: newUser.email,
            title: "O Senhor dos Anéis: A Sociedade do Anel",
            note: "uma introdução magistral à saga"
        },
        {
            email: newUser.email,
            title: "Clube da Luta",
            note: "uma crítica social profunda e provocativa"
        },
        {
            email: newUser.email,
            title: "Forrest Gump: O Contador de Histórias",
            note: "uma história cativante sobre a vida"
        },
        {
            email: newUser.email,
            title: "Star Wars: Episódio V - O Império Contra-Ataca",
            note: "o melhor da franquia Star Wars"
        },
        {
            email: newUser.email,
            title: "Matrix",
            note: "uma revolução visual e filosófica"
        },
        {
            email: newUser.email,
            title: "Os Bons Companheiros",
            note: "uma viagem pela máfia italiana"
        },
        {
            email: newUser.email,
            title: "A Origem",
            note: "um enredo complexo e fascinante"
        },
        {
            email: newUser.email,
            title: "Interestelar",
            note: "uma jornada cósmica emocional"
        },
        {
            email: newUser.email,
            title: "Parasita",
            note: "uma crítica social afiada e surpreendente"
        },
        {
            email: newUser.email,
            title: "Cidadão Kane",
            note: "um marco na história do cinema"
        },
        {
            email: newUser.email,
            title: "Gladiador",
            note: "uma aventura histórica grandiosa"
        },
        {
            email: newUser.email,
            title: "O Resgate do Soldado Ryan",
            note: "uma experiência de guerra visceral e tocante"
        }
    ];

    try {
        await request(BASE_URL)
            .post('/users/add/')
            .send(newUser);

        for (element of notas) {
            const res = await request(BASE_URL)
                .post('/notes/add/')
                .send(element)

        }
        console.log("dados adicionados");
    } catch (error) {
        
        console.log(error);
    }
}
 add() ;
