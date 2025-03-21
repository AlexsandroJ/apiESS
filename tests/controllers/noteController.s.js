require('dotenv').config();
const request = require('supertest');
const { expect, beforeAll, afterAll } = require('@jest/globals');
const app = require('../../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const users = [
  {
    name: "paulo",
    email: 'jnp@gmail.com',
    password: "123456789"
  },
  {
    name: "jj",
    email: 'jj@gmail.com',
    password: "123456789"
  },
  {
    name: "alex",
    email: 'ajs6@gmail.com',
    password: "123456789"
  },
]
const notes = [
  {
    email: 'jnp@gmail.com',
    title: "Um Sonho de Liberdade",
    note: "muito emocionantes"
  },
  {
    email: 'jj@gmail.com',
    title: "O Poderoso Chefão",
    note: "uma obra de primeira qualidade"
  },
  {
    email: 'ajs6@gmail.com',
    title: "O Cavaleiro das Trevas",
    note: "um ótimo filme"
  }
]
let mongoServer;
beforeAll(async () => {
  try {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    for (element of users) {
      const res = await request(app)
        .post('/users/add/')
        .send(element)
        .expect(201);
      expect(res.statusCode).toBe(201);
    }

  } catch (error) {
    console.log(error);
  }

});

afterAll(async () => {
  try {
    await mongoose.disconnect();
    await mongoServer.stop();
  } catch (error) {
    console.log(error);
  }
});

describe('Tests Routes Notes', () => {

  test('Test post /add', async () => {
    for (element of notes) {
      const res = await request(app)
        .post('/notes/add/')
        .send(element)
        .expect(201);
      expect(res.statusCode).toBe(201);
    }
  });

  test('Test get /:email', async () => {
    const res = await request(app)
      .get(`/notes/${notes[2].email}`)
      .expect(200);
    expect(res.statusCode).toBe(200);
  });

  test('Test get /find', async () => {
    const res = await request(app)
      .get('/notes/find')
      .send({
        email: 'ajs6@gmail.com',
        title: "O Cavaleiro das Trevas"
      })
      .expect(200);
    expect(res.statusCode).toBe(200);
  });

  test('Test put /edit', async () => {
    const res = await request(app)
      .put('/notes/edit')
      .send({
        email: 'jnp@gmail.com',
        title: "Um Sonho de Liberdade",
        note: "muito longo"
      })
      .expect(200);
    expect(res.statusCode).toBe(200);
  });

  test('Test dell /', async () => {
    const res = await request(app)
      .del('/notes/dell')
      .send({
        email: 'ajs6@gmail.com',
        title: "O Cavaleiro das Trevas"
      })
      .expect(200);
    expect(res.statusCode).toBe(200);
  });
});

