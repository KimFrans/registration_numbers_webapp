const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const registrationWeb = require('./registration-factory');
const pg = require('pg')
const Pool = pg.Pool;
const regRoute = require('./routes/registration-routes')

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

// // db connection

const pool = new Pool({
    connectionString: connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/my_registrations',
    ssl: {
        useSSL,
        rejectUnauthorized: false
    }
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

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "registrations",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.get('/', registrationRoute.home);
app.post('/reg_number', registrationRoute.getReg);
app.post('/clear', registrationRoute.deleteReg)
app.post('/show', registrationRoute.displayAll)
app.post('/reg_town', registrationRoute.filtering)



const PORT = process.env.PORT || 3031

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});