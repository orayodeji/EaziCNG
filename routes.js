var express = require('express');
var passport = require('passport');

var router = express.Router();

const Phone = require("./models/phones")
const Compare = require("./models/compare")

const Cart = require('./models/carts')


var User = require('./models/user');
var Order = require('./models/order');


var router = express.Router();

router.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated()
    res.locals.session = req.session;
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash('error');
    res.locals.info = req.flash('info');
    next();
});

router.get('/', (req, res, next)=>{
    function hell(){
        console.log('how are you')
    }
   hell()
    User.find()
        .sort({
            createdAt: 'descending'
        })
        .exec(function (err, users) {
            if (err) {
                return next(err);
            }
            res.render('index', {
                users: users
            });
        });
});



router.get('/signup', function (req, res) {
    res.render('registeruser');
})

router.post('/signup', function (req, res, next) {
    var username = req.body.user;
    var password = req.body.password;

    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            return next(err);
        }
        if (user) {
            req.flash('error', 'User already exists');
            return res.redirect('/login');
        }

        var newUser = new User({
            username: username,
            password: password
        });
        newUser.save((err, result)=>{
            res.redirect('/')
        });

    });
}, passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
}));


router.get('/phones', (req, res)=>{
    Phone.find()
    .then((result)=>{
        res.render('phones',{phones: result})
    })
    .catch((err)=>{
        console.log(err)
    })
    
})

router.get('/phones/:id',(req,res)=>{
    const id = req.params.id;
   // console.log(id)
    Phone.findById(id)
    .then((result)=>{
      // console.log(result)
       res.render("details", {phone: result})
    })
    .catch((err)=>{
        console.log(err)
    })
    
})


router.get('/add-to-cart/:id',ensureAuthenticated, (req, res, next)=>{
    Order.findOneAndDelete({user:req.user})
    .then((result)=>{
        console.log('order deleted')
        
        let productId = req.params.id;
        let cart = new Cart(req.session.cart ? req.session.cart : {})
        Phone.findById(productId, (err, phone)=>{
           
            if(err){
                return res.redirect('/')
            }
            cart.add(phone, phone.id);
            req.session.cart = cart;
            //let order = new Order
           console.log(req.session.cart)

          // res.redirect('/')
          console.log(req.session.cart.items.length)

            //console.log(req.session.cart.generateArray().length)
          // console.log(req.session.cart.generateArray()[0].item.name) 
         // console.log(req.session.cart.generateArray())
          //console.log(req.session.cart.totalQty)
          //  console.log(cart.totalQty)
        const order = new Order({
             user: req.user,
             order : cart
         })
          order.save((err, result)=>{
              console.log('new one saved')
             res.redirect('/carts')
            
          })
    
        })
        //res.json({redirect:'/blogs' })


    })
    .catch((err)=>{
        console.log(err)
    })

   
})

router.get('/carts', (req, res, next)=>{
    if(!req.session.cart){
        return res.render('shoppingcart', {phoneCarts: null, total: null})
    } 
    var cart = new Cart(req.session.cart)
    console.log(cart)
    let fff = cart.generateArray()
    console.log(fff.length)
    //console.log(cart.totalQty)
    res.render('shoppingcart', {phoneCarts: cart.generateArray(), total: fff.length})
})

router.get('/shoppings', ensureAuthenticated, (req, res, next)=>{
    Order.find({user: req.user}, (err, orders)=>{
        if(err){
            return res.write('error')
        }
        //console.log(orders)
        
        var cart;
        orders.forEach(function(order){
            cart = new Cart(order.order);
            order.items = cart.generateArray();
          //  console.log(order.items)
        })
        let storedDatas =  cart.generateArray()
        console.log(storedDatas.length)
       //console.log(cart.generateArray())
       res.render('shoppingcart',{phoneCarts: cart.generateArray(), total: cart.totalQty})
        
    })
})


router.get('/add-to-compare/:id',ensureAuthenticated, (req, res,next)=>{
    let phoneId = req.params.id;
    Phone.findById(phoneId)
    .then((result)=>{
        let user = req.user
        let name = result.name;
        let price = result.price;
        let url = result.url;
        let logo = result.logo;
        let features = result.features;
        let img = result.img;
        let brand = result.brand;

        let  newResult = {name, url, brand, price, img, logo, features, user} 
      //  console.log(newResult)
        const compare = new Compare(newResult)
        compare.save()
        .then((result)=>{
            console.log("saved")
            res.redirect('/compare')
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.get('/compare', (req, res, next)=>{
    Compare.find({user: req.user}).sort({createdAt: -1}).limit(2)
    .then((result)=>{
      //  console.log(result[1].brand)
        
        let filter = result[0].brand
        Phone.find({brand:filter}).limit(10)
        .then((phones)=>{
            console.log(phones)
             res.render('compare',{compares: result, suggestions: phones})

        })
        .catch((err)=>{
            console.log(err) 
        })
        //res.render('compare',{compares: result})
    })
    .catch((err)=>{
        console.log(err)
    })

})



router.get("/users/:username", function (req, res, next) {
    User.findOne({
        username: req.params.username
    }, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(404).send('404: File not found!');
        }
        res.render("profile", {
            user: user
        });
    });
});


router.get('/login', function (req, res) {
    res.render('loginuser')
});


router.post('/login', passport.authenticate('login', {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
}));


router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});


router.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated()
    res.locals.session = req.session;
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});


router.get("/edit", ensureAuthenticated, function (req, res) {
    res.render("edit");
});


router.post("/edit", ensureAuthenticated, function (req, res, next) {
    req.user.displayName = req.body.displayname;
    req.user.bio = req.body.bio;
    req.user.save(function (err) {
        if (err) {
            next(err);
            return;
        }
        req.flash("info", "Profile updated!");
        res.redirect("/edit");
    });
});



function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in to see this page.");
        res.redirect("/login");
    }
}


module.exports = router;