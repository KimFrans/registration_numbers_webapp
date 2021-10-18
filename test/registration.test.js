const assert = require('assert');
const registration = require('../registration-factory');
const pg = require("pg");
// const registrationTest = registration()
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/registrationtest';

const pool = new Pool({
    connectionString
});

const registrationTest = registration(pool)

describe('The registration web app', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from my_registrations;");
    });

    it('should get the registration from the database and display it', async function () {

        await registrationTest.poolNameIn("CA 123456")
        await registrationTest.getDBreg()

        var arrayValue = []
        var valueFromDB = await registrationTest.getDBinfo();
        valueFromDB.forEach(element => {
            arrayValue.push({ username: element.reg })
        });

        assert.deepEqual([{ reg: "CA 123456" }], arrayValue)


    });

    it('Should display error messsage when no registration has been entered', async function () {

        await registrationTest.poolNameIn(" ")

        assert.equal("Please enter a registration number", await registrationTest.values().add)

    });
    


    after(function () {
        pool.end();
    })
});