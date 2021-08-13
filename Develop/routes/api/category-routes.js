const router = require('express').Router();
//const { Category, Product } = require('../../models');
const Category = require('../../models/Category');
const Product = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const categoryData = await Category.findAll();
  const productData = await Product.findAll();
  return res.json({categoryData, productData});
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  const categoryData = await Category.findOne({where: {category_id: '2'}});
  const productData = await Product.findOne({where: {product_id: '2'}});
  return res.json({categoryData, productData});
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  const categoryData = await Category.create({where: {category_id: '6'}});
  return res.json({categoryData}),
  // create a new category
});

router.put('/:id', async (req, res) => {
  const categoryData = await Category.update(
    {
      category_name: req.body.category_name,
  },
  {
    where: {
      category_id: req.params.category_id,
    },
  }
  );
  // update a category by its `id` value
  return res.json(categoryData);
});

router.delete('/:id', async (req, res) => {
  const categoryData = await Category.destroy({
    where: {
      category_id: req.params.category_id,
    },
  });
  return res.json(categoryData);
  // delete a category by its `id` value
});

module.exports = router;
