const { Pool } = require("pg");

module.exports = function registrations(pool) {

    var addedMessage = ""
    var clearMessage = ""
    var empty = "Please enter a registration number"


    async function poolNameIn(regEntered) {

        // console.log(regEntered)

        const dbAccess = await pool.query('SELECT reg FROM regPlates WHERE reg = $1', [regEntered]);

        if (/[A-Z]{2}\s[0-9]{3}\-[0-9]{3}/g.test(regEntered) || /[A-Z]{2}\s[0-9]{5}/g.test(regEntered) || /[A-Z]{2}\-[0-9]{3}\-[0-9]{3}/g.test(regEntered)) {
            if (regEntered.length > 8 && regEntered.length <= 10) {
                if (dbAccess.rows.length === 0) {
                    await pool.query('insert into regPlates (reg) values($1)', [regEntered])
                    addedMessage = "Your registration number has been added"
                }
                else if(dbAccess.rows[0] = regEntered) {
                    addedMessage = 'This registration already exists'
                }
                // addedMessage = "Your registration number has been added"
                
            }
            else{
                addedMessage = "not enough characters more or less!"
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


    function filterRegistration(radioCheck) {
        capeArr = []
        stellArr = []
        bellArr = []
        paarArr = []
        for (i = 0; i < regList.length; i++) {
            if (radioCheck == "cape-town") {
                if (regList[i].startsWith("CA")) {
                    capeArr.push(regList[i])
                }
            }
            if (radioCheck == "stellenbosch") {
                if (regList[i].startsWith("CL")) {
                    stellArr.push(regList[i])
                }
            }
            if (radioCheck == "bellville") {
                if (regList[i].startsWith("CY")) {
                    bellArr.push(regList[i])
                }
            }
            if (radioCheck == "paarl") {
                if (regList[i].startsWith("CJ")) {
                    paarArr.push(regList[i])
                }
            }
            if (radioCheck == "all") {
                return regList
            }
        }

    }


    function values() {
        return {
            addMessage: addedMessage,
            cleared: clearMessage,
            noInput : empty,
        }
    }

    return {
        filterRegistration,
        poolNameIn,
        getDBreg,
        deleteRecords,
        values,
    }

}