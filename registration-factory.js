const { Pool } = require("pg");

module.exports = function registrations(pool) {

    // var regNum = ""
    // var regList = []
    // var regOb = {}
    // var regCount = 0
    var alreadyAddedError = ""
    var addedMessage = ""
    var clearMessage = ""
    var typeMessage = ""
    var empty = "Please enter a registration number"
    var tooMany = ""

    // async function getRegNumber(reg) {
    //     regNum = reg.toUpperCase()
    //     console.log(regNum)
    // }


    async function addRegNumber(regNum) {
        addedMessage = ""

        // if (!regList.includes(regNum)) {
            if (/[A-Z]{2}\s[0-9]{3}\-, next[0-9]{3}/g.test(regNum) || /[A-Z]{2}\s[0-9]{5}/g.test(regNum) || /[A-Z]{2}\-[0-9]{3}\-[0-9]{3}/g.test(regNum)) {
                if (regNum.length > 8 && regNum.length <= 10) {
                    // regList.push(regNum)
                    // regCount++
                    addedMessage = "Your registration number has been added"
                    // return true
                }
                else {
                    addedMessage = "not enough characters more or less!"
                    // return false
                }
                regNum = ''
            }
            else if (!/[A-Z]{2}\s[0-9]{3}\-[0-9]{3}/g.test(regNum) || !/[A-Z]{2}\s[0-9]{5}/g.test(regNum) || !/[A-Z]{2}\-[0-9]{3}\-[0-9]{3}/g.test(regNum)) {
                addedMessage = "does not match check the format!"
                // return false
            }

        // }
        // else if (regList.includes(regNum)) {
        //     addedMessage = "This registration has already been added!"
        //     return false
        // }

        // return regNum;
        return addedMessage;


    }

    async function poolNameIn(regEntered){

        const dbAccess = await pool.query('SELECT * FROM regPlates WHERE reg = $1', [regEntered]);

        if(dbAccess.rows.length === 0){
            await pool.query('insert into regPlates (reg) values($1)', [regEntered])
        }
        else{
            await pool.query('UPDATE regPlates WHERE reg = $1 ', [regEntered])
        }

    }

    async function getDBreg(){
        const gettingReg = await pool.query('SELECT * FROM regPlates') 

        return gettingReg.rows;
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

    function clearTheCountButton() {
        // regCount = 0
        // regList = []
        // localStorage.clear()
        clearMessage = "All registrations have been cleared!"
    }

    // function setArray(localStoragevalue) {
    //     regList = localStoragevalue
    // }


    function values() {
        return {
            regItems: regCount,
            addMessage: addedMessage,
            noInput: empty,
            display: regList,
            invalid: typeMessage,
            chars: tooMany,
            added: alreadyAddedError,
            counter: regCount,
            object: regOb,
            cleared: clearMessage,
        }
    }

    return {
        // getRegNumber,
        addRegNumber,
        clearTheCountButton,
        filterRegistration,
        poolNameIn,
        getDBreg,
        values,
    }

}