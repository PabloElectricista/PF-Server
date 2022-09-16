import Product from '../models/Product.js'
import Category from '../models/Category.js'
import {products,categories} from './data.js';

const fillDatabase = async () => {
    try {
        var countProducts = await Product.estimatedDocumentCount()
        if (countProducts == 0) await Product.insertMany(products)

        var countCategories = await Category.estimatedDocumentCount();
        if (countCategories == 0) await Category.insertMany(categories)
    } catch (error) {
        return
    }
}
export default fillDatabase;