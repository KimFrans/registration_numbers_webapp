module.exports = function registrationRoutes(registrationName) {

    async function home(req, res) {
        try {
            res.render('index',{
                registration : await registrationName.getDBreg()
            })
        }
        catch (err) {
            console.log(err)

        }
    }

    async function getReg(req, res) {
        const  databaseReg = req.body.reg;
        try {

            if (req.body.reg != "") {
                await registrationName.poolNameIn(databaseReg);
                // await registrationName.getTag(databaseReg)

                // console.log(databaseReg)

                res.render('index', {
                    errorMess: await registrationName.values().addMessage,
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

    async function deleteReg(req, res){
        try{
            var clearRows = await registrationName.deleteRecords();
            res.render('index', {
                clearRows,
                errorMess: await registrationName.values().cleared
            })
        }
        catch(err){
            console.log(err)
        }
    }

    async function displayAll(req, res){
        try{
            res.render('index', {
                registration: await registrationName.getDBreg()
            })
        }
        catch(err){
            console.log(err)
        }
    }

    return{
        home,
        getReg,
        deleteReg,
        displayAll,
    }


}