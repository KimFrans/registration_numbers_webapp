const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const registrationWeb = require('./registration-factory');
const pg = require('pg')
const Pool = pg.Pool;
const regRoute = require('./routes/registration-routes')

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}

// // db connection
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/my_registrations';

const pool = new Pool({
    connectionString,
    
    ssl: { rejectUnauthorized: false }
});


const app = express();
const registrationName = registrationWeb(pool)
const registrationRoute = regRoute(registrationName)


app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', 'handlebars');


app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', registrationRoute.home);
// app.post('/reg_number', registrationRoute.getReg);


    


const PORT = process.env.PORT || 3031

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});