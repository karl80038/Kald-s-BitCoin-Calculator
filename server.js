const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const axios = require('axios');
const userRoute = require('./routes/conversion');
const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(userRoute.Router);

app.use(function(req, res, next){
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    //console.log(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', 
    {pageTitle: "Page not Found.", 
    pageNotFound: "Our apologies, but we were unable to find the requested page.",
    message: "The page maybe have been moved or removed.",
    path: ""});

})
// app.listen(port, ()=> {
//     console.log(`Server is running on port ${port}."`);
// })
app.listen(process.env.PORT || port, function(){
    console.log("Server has started");
})