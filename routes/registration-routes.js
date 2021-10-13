module.exports = function registrationRoutes(registrationName) {

    async function home(req, res) {
        try {
            res.render('index',{
                registrationPlate : await registrationName.getDBreg()
            })
        }
        catch (err) {
            console.log(err)

        }
    }

    async function getReg(req, res) {
        const  databaseReg = req.body.regNum;
        try {
            
            // await registrationName.getRegNumber(req.body.reg)
            // await registrationName.addRegNumber()

            if (req.body.regNum != "") {
                await registrationName.addRegNumber(req.body.regNum)
                await registrationName.poolNameIn(databaseReg);

                console.log(databaseReg)

                res.render('index', {
                    outputMessage: await registrationName.values().addMessage,
                    registration: await registrationName.getDBreg()

                });
            }
            else {
                res.render('index', {

                    errorMess: await registrationName.values().noInput
                })

            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return{
        home,
        getReg,
    }


}