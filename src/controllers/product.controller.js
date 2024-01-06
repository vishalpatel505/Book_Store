import path from 'path';
import productModel from '../models/product.model.js';

export default class ProductController{
    getProduct(req,res){
        let products = productModel.get();
        // console.log(products);
        res.render('product',{key:products,userEmail:req.session.userEmail});
        // return res.sendFile(path.join(path.resolve(),'src','views','product.html'));
    }

    getAddForm(req,res){
        return res.render('new-product',{errorMessage:null,userEmail:req.session.userEmail})
    }

    addNewProduct(req,res,next){
        const {name,desc,price}=req.body;
        const imageUrl ='images/'+ req.file.filename;
        let products = productModel.addNewProduct(name,desc,price,imageUrl);
        res.render('product',{key:products,userEmail:req.session.userEmail});
    }

    deleteProduct(req,res){
        let id = req.params.id ;

        const productFound = productModel.getById(id);

        if(!productFound){ 
            return res.status(401).send('Product not found')
        }

        let products = productModel.delete(id);
        res.render('product',{key:products,errorMessage:null,userEmail:req.session.userEmail});

    }

    getUpdateProductView(req,res,next){
        const id = req.params.id;

        console.log(id)
    
        const productFound = productModel.getById(id);

        if(productFound){
            return res.render('update-product',{product:productFound,errorMessage:null,userEmail:req.session.userEmail});
        }else{
            res.status(401).send('Product not found')
        }
    }

    postUpdateProduct(req,res){
        let products = productModel.updateProduct(req.body);

        return res.render('product',{key:products,userEmail:req.session.userEmail})
    }

}
