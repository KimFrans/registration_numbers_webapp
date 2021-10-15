const { Pool } = require("pg");

module.exports = function registrations(pool) {

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
                    // addedMessage = "Your registration number has been added"
                   
                }
                // else if (dbAccess.rows[0] = regEntered) {
                //     addedMessage = 'This registration already exists'
                // }

            }
            // else {
            //     addedMessage = "not enough characters more or less!"
                
            // }

        }
        else if (!/[A-Z]{2}\s[0-9]{3}\-[0-9]{3}/g.test(regEntered) || !/[A-Z]{2}\s[0-9]{5}/g.test(regEntered) || !/[A-Z]{2}\-[0-9]{3}\-[0-9]{3}/g.test(regEntered)) {
            // addedMessage = "does not match check the format!"

        }

        // return addedMessage;

    }

    async function getDBreg() {
        const gettingReg = await pool.query('SELECT reg FROM regPlates')

        return gettingReg.rows;
    }

    // async function getSingleDBreg(inputReg) {
    //     const singleReg = await pool.query('SELECT reg FROM regPlates WHERE reg = $1', [inputReg])
    //     console.log(singleReg)
    //     return singleReg.rows[0];
        
    // }

    async function deleteRecords() {
        const deleteAll = await pool.query('DELETE FROM regPlates')

    }

    async function getTag(reg){
        const townTag = reg.substring(0,2)

        const regTag = await pool.query('SELECT id FROM regTown WHERE townSymbol = $1', [townTag])
        // console.log(regTag.rows[0].id);
        const insertID = await pool.query('INSERT INTO regPlates (reg, regTown_id) values ($1, $2)', [reg,regTag.rows[0].id])

        // return regTag && insertID;
    }

    async function filterRegistration(radioCheck) {
        const checkTownID = await getTag(radioCheck)
        const getID = await pool.query('SELECT reg FROM regPlates WHERE regTown_id = $1', [checkTownID])
        // console.log(getID);
        // console.log(checkTownID);
        return getID.rows;
        // const checkTownID = await pool.query('SELECT if FROM regTown')
        // const checkRegID = await pool.query('SELECT regTown_id from regPlates')
        // const registrationTag = await pool.query('SELECT townSymbol from regTown')

        // if(checkTownID == checkRegID){
        //     const regFilter = await pool.query('SELECT reg FROM regPlates')
        //     if(registrationTag == radioCheck){
        //         console.log('reg');
        //         return regFilter.rows
                
        //     }
        // }

    }



    return {
        // getSingleDBreg,
        getTag,
        filterRegistration,
        poolNameIn,
        getDBreg,
        deleteRecords,
    }

}