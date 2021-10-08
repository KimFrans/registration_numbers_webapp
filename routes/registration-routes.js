module.exports = function registrationRoutes(registrationName){

    async function home(req, res){
        try{
            res.render('index')
        }
        catch(err){
            console.log(err)
        }
    }


}