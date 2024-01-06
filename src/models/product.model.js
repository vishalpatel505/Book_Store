export default class ProductModel{
    
    constructor(_id, _name, _desc, _price, _imageUrl){
        this.id = _id
        this.name = _name
        this.desc= _desc
        this.price= _price
        this.imageUrl = _imageUrl
    }

    static get(){
        return products;
    }

    // static addNewProduct(productObj){
    //     const newProduct =  new ProductModel(products.length+1,productObj.name,productObj.desc,productObj.price,productObj.imageUrl);
    //     products.push(newProduct)
    //     return products;
    // }

    
    static addNewProduct(name,desc,price,imageUrl){
        const newProduct =  new ProductModel(products.length+1,name,desc,price,imageUrl);
        products.push(newProduct)
        return products;
    }

    static delete(id){
        let index = products.findIndex((value)=>{
            return value.id == id ;
        })

        products.splice(index,1);
        return products;
    }

    static getById(id){
        const product = products.find((value)=>{
           return value.id == id;
        })

        console.log(product)
    
        return product
    }

    static updateProduct(productObj){
        let productIndex = products.findIndex((value)=>{
            return value.id == productObj.id;
        })

        products[productIndex]=productObj ;
        return products
    }

}


var products = [
    new ProductModel(1,'Atomic Habits','A supremely practical nad useful book',300,'https://m.media-amazon.com/images/I/51-nXsSRfZL.jpg'),
    new ProductModel(2,'Ikegai','A japanese secret for long and happy life',340,'https://images.penguinrandomhouse.com/cover/9780143130727'),
    new ProductModel(3,'Deep Work','Rules for focused success in distracted world',280,'https://m.media-amazon.com/images/I/417yjF+Z5zL.jpg')
]


                    