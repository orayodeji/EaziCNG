const express = require('express');
const passport = require('passport');
const router = express.Router();
const Phone = require("./models/phones");
const Compare = require("./models/compare");
const Cart = require('./models/carts');
const User = require('./models/user');
const Order = require('./models/order');


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  function randomNumber(array){
       return Math.floor(Math.random()*array.length*0.75)
  }


router.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated()
    res.locals.session = req.session;
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash('error');
    res.locals.info = req.flash('info');
    next();
});

router.get('/', (req, res, next)=>{
    User.find()
        .sort({
            createdAt: 'descending'
        })
        .exec(function (err, users) {
            if (err) {
                return next(err);
            }
            
            Compare.find({user:req.user}).sort({createdAt:-1}).limit(5)
            .then((result)=>{
                shuffle(result)
                Phone.find()
                .then((topdeals)=>{
                shuffle(topdeals) 
                
                res.render('index', {users: users, recents: result, deals: topdeals});
 
                })
                .catch((err)=>{
                console.log(err)
                    })
                

            })
            .catch((err)=>{
                console.log(err)
            })

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
           res.redirect('/login')
        });

    });
}, passport.authenticate("login", {
    successRedirect: "/login",
    failureRedirect: "/signup",
    failureFlash: true
}));


router.get('/phones', (req, res)=>{
    Phone.find()
    .then((result)=>{
      shuffle(result)  
        res.render('phones',{phones: result, counts: result.length})
    })
    .catch((err)=>{
        console.log(err)
    })
    
})


router.get('/phones/:id',(req,res)=>{
    const id = req.params.id;
    Phone.findById(id)
    .then((result)=>{
        console.log(result.vendor)
        let filter = result.name.substring(0,10)
        Phone.find({$text : {$search: filter}})
        .then((filterResult)=>{
            shuffle(filterResult)
            res.render("details", {phone: result, other: filterResult[0]})
        })
        
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

            const order = new Order({
             user: req.user,
             order : cart
         })
          order.save((err, result)=>{
              console.log('new one saved')
             res.redirect('/carts')          
          })
        })
    })
    .catch((err)=>{
        console.log(err)
    })
   
})

router.get('/remove-cart/:id', ensureAuthenticated,(req, res, next)=>{
    Order.findOneAndDelete({user:req.user})
    .then((result)=>{
        console.log('order deleted')
        
        let productId = req.params.id;
        let cart = new Cart(req.session.cart ? req.session.cart : {})
        Phone.findById(productId, (err, phone)=>{
           
            if(err){
                return res.redirect('/')
            }
            cart.remove(phone.id);
            req.session.cart = cart;


        const order = new Order({
             user: req.user,
             order : cart
         })
          order.save((err, result)=>{
              console.log('deleted')
             res.redirect('/carts')
            
          })
    
        })

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
    let fff = cart.generateArray()

    res.render('shoppingcart', {phoneCarts: cart.generateArray(), total: fff.length})
})


//to access in the profile if possible
router.get('/shoppings', ensureAuthenticated, (req, res, next)=>{
    Order.find({user: req.user}, (err, orders)=>{
        if(err){
            return res.write('error')
        }
        
        var cart;
        orders.forEach(function(order){
            cart = new Cart(order.order);
            order.items = cart.generateArray();
        })
        let storedDatas =  cart.generateArray()

       res.render('shoppingcart',{phoneCarts: cart.generateArray(), total: storedDatas.length})
        
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
        let vendor = result.vendor;
        let discount = result.discount;
        let features = result.features;
        let img = result.img;
        let brand = result.brand;
        let old_price = result.old_price;

        let  newResult = {name, url, brand, price,discount,old_price, img, vendor, features, user} 

        const compare = new Compare(newResult)
        compare.save()
        .then((result)=>{
            console.log("")
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
        
        let filter = result[0].brand
        Phone.find({brand:filter})
        .then((phones)=>{
            shuffle(phones)
            res.render('compare',{compares: result, suggestions: phones})

        })
        .catch((err)=>{
            console.log(err) 
        })
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