const { Pool } = require("pg");

module.exports = function registrations(pool) {
    var addedMessage = '';

    //add upper function to make reg(CA,CF,CL) caps

    async function poolNameIn(regEntered) {
        // regEntered = await pool.query('SELECT reg Upper(reg) FROM regplates') 
        const dbAccess = await pool.query('SELECT reg FROM regPlates WHERE reg = $1', [regEntered]);

        if (regEntered != await getDBreg()) {

            if (/[A-Z]{2}\s[0-9]{3}\-[0-9]{3}/g.test(regEntered) || /[A-Z]{2}\s[0-9]{5}/g.test(regEntered) || /[A-Z]{2}\-[0-9]{3}\-[0-9]{3}/g.test(regEntered)) {
                if (regEntered.length > 8 && regEntered.length <= 10) {
                    if (dbAccess.rows.length === 0) {
                        await getTag(regEntered)
                        // pool.query('insert into regPlates (reg) values($1)', [regEntered])reg_number
                        addedMessage = "Your registration number has been added"
                    }
                    // else if (dbAccess.rows[0] == regEntered) {
                    //     addedMessage = 'This registration already exists'
                    // }
                }
                else {
                    addedMessage = "not enough characters more or less!"
                }
            }
            else if (!/[A-Z]{2}\s[0-9]{3}\-[0-9]{3}/g.test(regEntered) || !/[A-Z]{2}\s[0-9]{5}/g.test(regEntered) || !/[A-Z]{2}\-[0-9]{3}\-[0-9]{3}/g.test(regEntered)) {
                addedMessage = "does not match check the format!"
            }
        }
        else if (regEntered == await getDBreg()) {
            addedMessage = 'This registration already exists'
        }
        // return addedMessage;
    }

    async function getDBreg() {
        const gettingReg = await pool.query('SELECT reg FROM regPlates')

        return gettingReg.rows;
    }

    async function deleteRecords() {
        const deleteAll = await pool.query('DELETE FROM regPlates')

    }

    async function regTag(registration) {
        const townTag = registration.substring(0, 2)
        const regTag = await pool.query('SELECT id FROM regTown WHERE townSymbol = $1', [townTag])
        return regTag.rows[0].id
    }

    async function getTag(reg) {
        const townTag = reg.substring(0, 2)
        const checkTownID = await regTag(townTag)
        // console.log(checkTownID)

        const insertID = await pool.query('INSERT INTO regPlates (reg, regTown_id) values ($1, $2)', [reg, checkTownID])

    }

    async function filterRegistration(radioCheck) {
        const checkTownID = await regTag(radioCheck)
        const getID = await pool.query('SELECT reg FROM regPlates WHERE regTown_id = $1', [checkTownID])
        // if(getID.rows == ""){
        //     noTowns = "There are no registrations for the town selected"
        // }
        return getID.rows;



    }


    async function values() {
        return {
            add: addedMessage,
        }
    }


    return {
        getTag,
        filterRegistration,
        poolNameIn,
        getDBreg,
        values,
        deleteRecords,
    }

}