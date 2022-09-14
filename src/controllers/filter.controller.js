import Products from '../models/Product.js'

export const filterProduct= async (req,res)=>{
    try{
        const condition={}; //condicion de busquerda
        for(const prop in req.query){
            if(prop=="name"){

                condition[prop]=new RegExp(req.query[prop],"i")
            }
            else if(prop=="price"){
                let [min,max]=req.query[prop].split('/') //price?min/max desde el front
                condition[prop]={
                    $lte:parseInt(max),
                    $gte:parseInt(min)
                }
            }else
                condition[prop]=req.query[prop]
        }
        const foundProducts=await Products.find(condition)
        res.status(201).send(foundProducts)
    }catch(e){
        res.status(500).send(e)
    }
}

