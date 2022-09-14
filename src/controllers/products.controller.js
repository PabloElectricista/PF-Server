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

export const getProducts = async (req, res) => {
  const {start, ...conditionByQuery}=req.query;
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
  const index = parseInt(req.query.start) * 9
  var count = await Product.estimatedDocumentCount()
  const products = await Product.find(condition).skip(index).limit(9);
  return res.json({ products, count });
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