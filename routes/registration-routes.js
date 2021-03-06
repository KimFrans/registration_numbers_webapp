module.exports = function registrationRoutes(registrationName) {

    async function home(req, res) {
        try {
            res.render('index', {
                registration: await registrationName.getDBreg()
            })
        }
        catch (err) {
            console.log(err)

        }
    }

    async function getReg(req, res) {
        // const databaseReg = req.body.reg;
        try {
            const databaseReg = req.body.reg;
            if (databaseReg != "") {

                if (databaseReg != await registrationName.getDBreg()) {

                    if (/[A-Z]{2}\s[0-9]{3}\-[0-9]{3}/g.test(databaseReg) || /[A-Z]{2}\s[0-9]{5}/g.test(databaseReg) || /[A-Z]{2}\-[0-9]{3}\-[0-9]{3}/g.test(databaseReg)) {
                        if (databaseReg.length > 8 && databaseReg.length <= 10) {

                            await registrationName.poolNameIn(databaseReg);

                            req.flash('Mess', 'Your registration number has been added ');

                            res.render('index', {
                                registration: await registrationName.getDBreg()

                            });

                        }
                        if (!databaseReg.length > 8 && !databaseReg.length <= 10) {
                            req.flash('errorMess', 'not enough characters more or less!');
                            console.log('not enough characters more or less!')
                            res.render('index', {
                                registration: await registrationName.getDBreg()

                            });

                        }

                    }
                    else if (!/[A-Z]{2}\s[0-9]{3}\-[0-9]{3}/g.test(databaseReg) || !/[A-Z]{2}\s[0-9]{5}/g.test(databaseReg) || !/[A-Z]{2}\-[0-9]{3}\-[0-9]{3}/g.test(databaseReg)) {

                        req.flash('errorMess', 'does not match check the format!');
                        console.log('does not match check the format!');
                        res.render('index', {
                            registration: await registrationName.getDBreg()
                        });

                    }

                }
                else  {
                    req.flash('errorMess', 'This registration already exists');
                    console.log('This registration already exists');
                    res.render('index', {
                        registration: await registrationName.getDBreg()
                    });
                }

            }

            else if (databaseReg == "") {
                req.flash('errorMess', 'Please enter a registration number');

                res.render('index', {
                    registration: await registrationName.getDBreg()
                })
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    async function deleteReg(req, res) {
        try {
            var clearRows = await registrationName.deleteRecords();
            req.flash('Mess', 'All registrations have been cleared!');
            res.render('index', {
                clearRows
            })
        }
        catch (err) {
            console.log(err)
        }

    }

    async function filtering(req, res) {
        try {
            const radioBtn = req.body.town;
            // console.log(radioBtn);
            if (radioBtn != null) {
                if (await registrationName.filterRegistration(radioBtn) != "") {

                    const regies = await registrationName.filterRegistration(radioBtn)
                    console.log(regies);
                    res.render('index', {
                        regies
                    })
                }
                else {
                    console.log('There are no registrations for the selected town')
                    req.flash('errorMess', 'There are no registrations for the selected town');
                    res.render("index")
                }

            }
            else {
                console.log('Please select a town')
                req.flash('errorMess', 'Please select a town');
                res.redirect("/")
            }
            
        }
        catch (err) {
            console.log(err);
        }
    }

    async function enteredURL() {
        let enteredReg = req.params.entered;
        res.render('entered-regs', {
            urlRegistration: enteredReg,
        });
    }

    async function displayAll(req, res) {
        try {
            res.render('index', {
                registration: await registrationName.getDBreg()
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    return {
        home,
        getReg,
        deleteReg,
        displayAll,
        filtering,
        enteredURL,
    }


}