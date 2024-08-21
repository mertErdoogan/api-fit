const Product = require('../models/product');


exports.getProduct = async (req, res) => {
  try {
    console.log('reqssssss: ', req?.query?.id)
    const { id } = req.query;
    const product = await Product.findByPk(id);
    console.log(product?.dataValues);
    res.json({ product: product?.dataValues });
  } catch (error) {
    res.status(500).json({ error: error.message + ": mertmert" });
  }
};