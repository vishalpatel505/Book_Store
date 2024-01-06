import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';

import  ProductController  from './src/controllers/product.controller.js';
import UserController from './src/controllers/user.controller.js';

import validateNewProductForm from './src/middleware/validateNewProductForm.js'
import { uploadFile } from './src/middleware/file-upload.middleware.js';
import session from 'express-session';
import {auth} from './src/middleware/auth.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middleware/lastVisit.middleware.js';

const server = express();

server.use(express.urlencoded({extended:true}));
server.use(session({
    secret:'SecretKey',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))
server.use(cookieParser());
// server.use(setLastVisit);

server.set('view engine','ejs');
server.set('views',path.join(path.resolve(),'src','views'));

server.use(ejsLayouts)

server.use(express.static('public'));


const productController = new ProductController();

const userController = new UserController();

server.get('/register',userController.getRegister)
server.post('/register',userController.postRegister)

server.get('/login',userController.getLogin)
server.post('/login',userController.postLogin)

server.get('/logout',userController.logout)

server.get('/',setLastVisit,auth,productController.getProduct)
server.get('/new',auth,productController.getAddForm)

server.get('/update-product/:id',auth,productController.getUpdateProductView)
server.post('/delete-product/:id',auth,productController.deleteProduct);
server.post('/',auth,
    uploadFile.single('imageUrl'),
    validateNewProductForm,
    productController.addNewProduct)
    server.post('/update-product',productController.postUpdateProduct)

server.use(express.static('src/views'));

server.listen(3400,()=>{
    console.log('Sever is listening on port 3400')
})