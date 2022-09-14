import Product from '../models/Product.js'

export const filterProduct= async (req,res)=>{
    try{
        const {start, ...conditionByQuery}=req.query;
        //start=primer indice de la paginación
        const condition={}; 
        for(const prop in conditionByQuery){
            if(prop=="price"){
                let [min,max]=conditionByQuery[prop].split('/') //price?min/max desde el front
                condition[prop]={
                    $lte:parseInt(max),
                    $gte:parseInt(min)
                }
            }else
                condition[prop]=new RegExp(conditionByQuery[prop],"i")
        }
        const foundProducts=await Product.find(condition).skip(parseInt(start)*9).limit(9)
        res.status(201).send(foundProducts)
    }catch(e){
        res.status(500).send(e)
    }
}

