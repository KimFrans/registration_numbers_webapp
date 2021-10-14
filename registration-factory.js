const { Pool } = require("pg");

module.exports = function registrations(pool) {

    var addedMessage = ""
    var clearMessage = ""
    var empty = "Please enter a registration number"

    //add upper function to make reg(CA,CF,CL) caps

    async function poolNameIn(regEntered) {

        // console.log(regEntered)

        // regEntered = await pool.query('SELECT (reg) Upper(reg)FROM regplates') 

    
        const dbAccess = await pool.query('SELECT reg FROM regPlates WHERE reg = $1', [regEntered]);

        if (/[A-Z]{2}\s[0-9]{3}\-[0-9]{3}/g.test(regEntered) || /[A-Z]{2}\s[0-9]{5}/g.test(regEntered) || /[A-Z]{2}\-[0-9]{3}\-[0-9]{3}/g.test(regEntered)) {
            if (regEntered.length > 8 && regEntered.length <= 10) {
                if (dbAccess.rows.length === 0) {
                    await getTag(regEntered)
                    // pool.query('insert into regPlates (reg) values($1)', [regEntered])
                    addedMessage = "Your registration number has been added"
                }
                else if(dbAccess.rows[0] = regEntered) {
                    addedMessage = 'This registration already exists'
                }
                // addedMessage = "Your registration number has been added"
                
            }
            else if(regEntered.length < 8 && regEntered.length > 10){
                addedMessage = "not enough characters more or less!"
                // console.log('in else if')
            }
            
        }
        else if (!/[A-Z]{2}\s[0-9]{3}\-[0-9]{3}/g.test(regEntered) || !/[A-Z]{2}\s[0-9]{5}/g.test(regEntered) || !/[A-Z]{2}\-[0-9]{3}\-[0-9]{3}/g.test(regEntered)) {
            addedMessage = "does not match check the format!"
            
        }

        return addedMessage;

    }

    async function getDBreg() {
        const gettingReg = await pool.query('SELECT reg FROM regPlates')

        return gettingReg.rows;
    }

    async function deleteRecords() {
        const deleteAll = await pool.query('DELETE FROM regPlates')
        clearMessage = "All registrations have been cleared!"
        
    }

    async function getTag(reg){
        const townTag = reg.substring(0,2)

        const regTag = await pool.query('SELECT id FROM regTown WHERE townSymbol = $1', [townTag])
        console.log(regTag.rows[0].id);
        const insertID = await pool.query('INSERT INTO regPlates (reg, regTown_id) values ($1, $2)', [reg,regTag.rows[0].id])
        
        // return regTag && insertID;
    }

    async function filterRegistration(radioCheck) {


    }


    async function values() {
        return {
            addMessage: addedMessage,
            cleared: clearMessage,
            noInput : empty,
        }
    }

    return {
        getTag,
        filterRegistration,
        poolNameIn,
        getDBreg,
        deleteRecords,
        values,
    }

}