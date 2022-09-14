import Product from '../models/Product.js'
import data from './data.json' assert {type: 'json'}

const fillDatabase = async () => {
    try {
        var count = await Product.estimatedDocumentCount()
        if (count > 0) return
        await Product.insertMany(data)
    } catch (error) {
        return
    }
}
export default fillDatabase;