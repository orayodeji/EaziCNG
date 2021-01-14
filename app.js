const app = require('express')();
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const passport = require('passport');
const setUpPassport = require('./setuppassport');
const routes = require('./routes');
const  express = require('express');
const MongoStore = require('connect-mongo')(session);


//listen for request
const PORT = process.env.PORT || 5050;

//connect to mongodb
const dbUrl = 'mongodb+srv://tunji:Bolaji93,@nodetuts.2wjqz.mongodb.net/nodetuts?retryWrites=true&w=majority'

mongoose.connect(dbUrl,{useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=>{
    app.listen(PORT, ()=>console.log(`server started on port: ${PORT}`))
    console.log('connected to DB')
})
.catch((err)=>{
    console.log(err)
})


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(session({
    //secret: 'TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX',
    secret: 'mysupersecret',
    //remember it's true
    resave: false,
    //remember it's true
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie:{ maxAge: 365 * 24 * 60 * 60 * 1000} //1year
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

setUpPassport();

app.use(routes);


app.listen(app.get('port'), function() {
    console.log('Server started on port ' + app.get('port'));
});


