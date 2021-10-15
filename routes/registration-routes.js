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

            // if(await registrationName.getSingleDBreg(databaseReg) == 1){
            //     req.flash('errorMess', 'This registration already exists');


            //     res.render('index', {
            //         registration: await registrationName.getDBreg()
                    
            //     })
            // }

            if (req.body.reg != "") {
                await registrationName.poolNameIn(databaseReg);
                // await registrationName.getTag(databaseReg)

                // console.log(databaseReg)
                req.flash('errorMess', 'Your registration number has been added ');
                res.render('index', {
                    // errorMess: await registrationName.values().addMessage,
                    registration: await registrationName.getDBreg()

                });
            }
            else if(req.body.reg == ""){
                req.flash('errorMess', 'Please enter a registration number');


                res.render('index', {
                    registration: await registrationName.getDBreg()
                    // errorMess: await registrationName.values().noInput
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
            req.flash('errorMess', 'All registrations have been cleared!');
            res.render('index', {
                clearRows
            })
        }
        catch(err){
            console.log(err)
        }
        
    }

    async function filtering(req,res){
        try{
            const radioBtn = req.body.town;
            console.log(radioBtn);

            const regies = await registrationName.filterRegistration(radioBtn)
            res.render('index', {
                regies,
                // registration: await registrationName.getDBreg()
                
            })
        }
        catch(err){
            console.log(err);
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
        filtering,
    }


}