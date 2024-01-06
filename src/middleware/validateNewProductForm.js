
// const validateNewProductForm = (req,res,next)=>{
//     const {name,price,imageUrl}=req.body ;

//     let errors = [];
    
//     if(!name || name.trim()==''){
//         errors.push('Name is Required');
//     }
//     if(!price || parseFloat(price)<1){
//         errors.push('Price must be a Positive value');
//     }
    
//     try{
//         const validUrl = new URL(imageUrl);
//     }
//     catch(err){
//         errors.push('URL is Invalid') ;
//     }
    
//     if(errors.length > 0){
//         res.render('new-product',{errorMessage:errors[0]});
//     }

//     next();
// }

import {body,validationResult} from 'express-validator';

const validateNewProductForm = async (req,res,next)=>{
    const rules = [
        body('name').notEmpty().withMessage('Name is requied'),
        body('price').isFloat({gt:0}).withMessage('Price should be positive value'),
        // body('imageUrl').isURL().withMessage('Invalid Url')
        body('imageUrl').custom((value,{req})=>{
             if(!req.file){
                throw new Error('Image is required')
             }
             return true;
        })
    ]
 
    await Promise.all(rules.map((rule)=>{
       return rule.run(req);
    }))

    const errors = validationResult(req);

    console.log(errors)

    if(!errors.isEmpty()){
        console.log(errors)
        res.render('new-product',{errorMessage:errors.array()[0].msg});
    }else{
        next();
    }

    
}

export default validateNewProductForm;

