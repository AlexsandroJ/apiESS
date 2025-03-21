
const { BeforeAll, AfterAll, Given, When, Then } = require("@cucumber/cucumber");
const request = require('supertest');
const assert = require('assert');
const app = require('../../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');// Banco Em memoria para Tests

let mongoServer;
const user = {
    name: "alex",
    email: 'ajs6@gmail.com',
    password: "123456789"
}

BeforeAll(async function () {
    try {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);

        const res = await request(app)
            .post('/users/add/')
            .send(user)
            .expect(201);

            assert.strictEqual(res.status.toString(), "201");
        

    } catch (error) {
        console.log(error);
    }
});

AfterAll(async function () {
    try {
        await mongoose.disconnect();
        await mongoServer.stop();
    } catch (error) {
        console.log(error);
    }
});

Given('as seguintes notas do usuario {string} existem:', async function (string, dataTable) {
    const dataTableNew = dataTable.hashes();
    for (element of dataTableNew) {
        const res = await request(app)
            .post('/notes/add/')
            .send({
                email: string,
                title: element.title,
                note: element.note
            })
            .expect(201);
            assert.strictEqual(res.status.toString(), "201");
        
    }
});

Then('as seguintes notas devem existir do usuario {string}:', async function (string, dataTable) {
    const dataTableNew = dataTable.hashes();
    const res = await request(app)
        .get(`/notes/${string}`)
        .expect(200);
    expect(res.statusCode).toBe(200);
    for (let index = 0; index < dataTableNew.length; index++) {
        assert.strictEqual(res.notes[index].title.toString(), dataTableNew[index].title);
        assert.strictEqual(res.notes[index].note.toString(), dataTableNew[index].note);
        
    }
});

When('adiciono uma nova nota para o title {string}, com o seguinte texto {string} do usuario {string}', async function (string, string1, string2) {
    let newNote = {
        email: string2,
        title: string,
        note: string1
    };
    const res = await request(app)
        .post('/notes/add/')
        .send(newNote)
        .expect(201);
        assert.strictEqual(res.statusCode.toString(), "201");
    
});

When('edito a nota do title {string} para {string} do usuario {string}', async function (string, string1, string2) {
    const res = await request(app)
        .put('/notes/edit')
        .send({
            email: string2,
            title: string,
            note: string1
        })
        .expect(200);
        assert.strictEqual(res.statusCode.toString(), "200");
});

When('remover a nota do title {string} do usuario {string}', async function (string, string1) {
    const res = await request(app)
        .del('/notes/dell')
        .send({
            email: string1,
            title: string
        })
        .expect(200);
        assert.strictEqual(res.statusCode.toString(), "200");
});

