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
        await pool.query("delete from regPlates;");
    });

    it('Should check if the registration already exists', async function (){
        await registrationTest.poolNameIn("CA 123456")

        assert.equal("This registration already exists", await registrationTest.poolNameIn("CA 123456"))
    });

    it('Should check if the registration matches the format', async function (){
        await registrationTest.poolNameIn("CA 123")

        assert.equal("does not match check the format!", await registrationTest.poolNameIn("CA 123"))
    });

    it('should get the registration from the database and display it', async function () {

        await registrationTest.poolNameIn("CA 123456")
        await registrationTest.getDBreg()

        var arrayValue = []
        var valueFromDB = await registrationTest.getDBreg();
        valueFromDB.forEach(element => {
            arrayValue.push({ reg: element.reg })
        });

        assert.deepEqual([{ reg: "CA 123456" }], arrayValue)

    });

    it('Should filter registrations according to town and display it', async function () {

        await registrationTest.poolNameIn("CA 123456")
        await registrationTest.poolNameIn("CJ 123456")
        await registrationTest.getDBreg()

        var arrayValue = []
        var valueFromDB = await registrationTest.filterRegistration("CA");
        valueFromDB.forEach(element => {
            arrayValue.push({ reg: element.reg })
        });

        assert.deepEqual([{ reg: "CA 123456" }], arrayValue)

    });

    it('Should delete all names from the database', async function (){
        await registrationTest.getDBreg()

        assert.equal(undefined, await registrationTest.deleteRecords())
    });
    


    after(function () {
        pool.end();
    })
});