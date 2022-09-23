import Product from "../models/Product.js";
import User from "../models/User.js";
import { uploadImage } from "../utils/cloudinary.js";
export const createProduct = async (req, res) => {
  try {
    console.log(req.body)
    const newProduct = new Product(req.body);
    console.log(req.files, "el files")
    if (req.files?.images) {
      const result = await uploadImage(req.files.images.tempFilePath)
      console.log(result, "result?")
      newProduct.images = [...newProduct.images, result.url]
    }
    // const user = await User.findById(req.body.user).populate({path:"products"})
    // user.products.push(newProduct._id); 
    // await user.save();
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
  return conditionSearch;
}

/* async function valuesAllProps(){
  const props={colors:[], brand:[],price:[]};
  const currentProducts=await Product.find();
  let min,max;
  for(const current in props){
    currentProducts.forEach(p =>{
      if(current=="price"){
        if(!min&&!max){
          min=p[current];
          max=p[current];
        }else{
          if(min>p[current]) min=p[current];
          if(max<p[current]) max=p[current];
        }
        props[current]=[min,max]
      }else {
        props[current]=Array.isArray(p[current])?[...props[current], ...p[current]]:[...props[current],p[current]]
      }
    }
  );
    props[current]=props[current].filter((item,index)=>{
      return props[current].indexOf(item) === index;
    })
  }  
  return {...props,status:["New","Used"]};
} */

export const getProducts = async (req, res) => {
  const { start, order, ...conditionByQuery } = req.query;
  var field, by;
  if(order) [field, by] = order.split('/');
  const condition = await combinedFilters(conditionByQuery);
  const index = parseInt(req.query.start) * 9
  var count = await Product.countDocuments(condition)
  var products;
  if (order) products = await Product.find(condition).sort({ [field]: by}).skip(index).limit(9);
  else products = await Product.find(condition).skip(index).limit(9);
  const brand = await Product.find(condition, { select: "brand" }).distinct("brand");
  const categories = await Product.find(condition, { select: "category"}).distinct("category")
  const colors = await Product.find(condition, { select: "colors" }).distinct("colors");
  const result = await Product.find(condition, { select: "price" }).distinct("price")

  const prices = result.sort((a, b) => a - b);
  const price = [prices[0], prices[prices.length - 1]];
  return res.json({ products, count, brand, colors, price, categories });
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