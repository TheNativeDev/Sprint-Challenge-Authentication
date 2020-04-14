const User = require('./users-model');
const db = require('../database/dbConfig');

describe('halo model', function() {

    describe('test environment', function() {
        it('should use the testing environment', function() {
            // is testing switch to be to soemthing else to fail.
            expect(process.env.DB_ENV).toBe('testing');
        })
    })


    describe('insert()', function() {
            //runs before test
        beforeEach(async () => {
            await db('users').truncate();
        })


////////////////FAILING/////////////////////
        it('adds the new char to db', async function() {
            //call insert passin a hobbit
            await User.add({username: 'ben', password: 117});
            //await Halo.add({name: 'lock'});

            //open the db and see taht hobbit is there
          const user = await db('users');
          expect(user).toHaveLength(1);
        })
    })
})