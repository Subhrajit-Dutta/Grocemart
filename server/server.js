const path = require('path');
const http = require('http');
const express = require('express');
const dotenv= require('dotenv')
const connectDb= require('./config/Database')
const colors= require('colors')
const userRoutes= require('./routes/userRoutes')
const parse= require('body-parser')
const { notfound, errorhandler } = require('./middlewares/errorHandler');
const {authUser} = require('./controllers/Con_Controller')
const seller= require('./routes/sellerRoute')
dotenv.config()
connectDb()
const app = express();
app.use(parse.json())
app.use(express.json());
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'../client'));

// Set static folder
app.use(express.static(path.join(__dirname, '../client')));

// Route for the pages
app.get('/', (req, res) => {
    res.render(path.join(__dirname, '../client', 'index.ejs'));
});
app.get('/cart', (req, res) => {
    res.render(path.join(__dirname, '../client', 'cart.ejs'));
});
app.get('/profile', (req, res) => {
    res.render(path.join(__dirname, '../client', 'profile.ejs'));
});
app.get('/profile-seller', (req, res) => {
    res.render(path.join(__dirname, '../client', 'profile-seller.ejs'));
});
app.get('/order-confirmation', (req, res) => {
    res.render(path.join(__dirname, '../client', 'order-confirmation.ejs'));
});
app.get('/checkout', (req, res) => {
    res.render(path.join(__dirname, '../client', 'checkout.ejs'));
});
app.get('/product-file', (req, res) => {
    res.render(path.join(__dirname, '../client', 'product-file.ejs'));
});
//Register user
app.use('/api/consumer',userRoutes)
//add to cart
app.use('/api',seller)
//middlewares for error Handling
app.use(notfound)
app.use(errorhandler)
// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.green.bold);
});
