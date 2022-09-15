import Product from "../models/Product.js";

export const createProduct = async (req, res) => {

  try {
    const newProduct = new Product(req.body);
    const productSaved = await newProduct.save();

    res.status(201).json(productSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  res.status(200).json(product);
};

function combinedFilters(conditions){
  const conditionSearch={}
  for(const prop in conditions){
    if(prop=="price"){
        let [min,max]=conditions[prop].split('/') //price?min/max desde el front
        conditionSearch[prop]={
            $lte:parseInt(max),
            $gte:parseInt(min)
        }
    }else
    conditionSearch[prop]=new RegExp(conditions[prop],"i")
  }
  //console.log(conditionSearch)
  return conditionSearch;
}

async function valuesAllProps(){
  const props={colors:[], brand:[], status:[]};
  const currentProducts=await Product.find();
  for(const current in props){
      currentProducts.forEach(p =>props[current]=Array.isArray(p[current])?[...props[current], ...p[current]]:[...props[current],p[current]]
    );
    props[current]=props[current].filter((item,index)=>{
      return props[current].indexOf(item) === index;
    })
  }  
  return props;
}

export const getProducts = async (req, res) => {
  const {start, ...conditionByQuery}=req.query;

  const condition=await combinedFilters(conditionByQuery); 
  await valuesAllProps();
  const index = parseInt(req.query.start) * 9
  var count = await Product.estimatedDocumentCount()
  const products = await Product.find(condition).skip(index).limit(9);
  return res.json({ products, count/*, props */});
};

export const updateProductById = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedProduct);
};

export const deleteProductById = async (req, res) => {
  const { productId } = req.params;

  await Product.findByIdAndDelete(productId);

  // code 200 is ok too
  res.status(204).json();
};