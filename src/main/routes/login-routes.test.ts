import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'
import request from 'supertest'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Lou',
          email: 'lourene.camargo@gmail.com',
          password: '159753',
          passwordConfirmation: '159753'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('159753', 12)
      await accountCollection.insertOne({
        name: 'Lou',
        email: 'lourene.camargo@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'lourene.camargo@gmail.com',
          password: '159753'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'lourene.camargo@gmail.com',
          password: '159753'
        })
        .expect(401)
    })
  })
})
