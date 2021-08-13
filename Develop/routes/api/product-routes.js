const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  const productData = await Product.findAll();
  const categoryData = await Category.findAll();
  const tagData = await Tag.findAll();
  return res.json({productData, categoryData, tagData});

  // find all products
  // be sure to include its associated Category and Tag data
});

// get one product
router.get('/:id', async (req, res) => {
  const productData = await Product.findOne({where: {product_id: '1'}});
  const categoryData = await Category.findOne({where: {category_id: '1'}});
  const tag6Data = await Tag.findOne({where: { tag_id: '6'}});
  const tag7Data = await Tag.findOne({where: { tag_id: '7'}});
  const tag8Data = await Tag.findOne({where: { tag_id: '8'}});

  return res.json({productData, categoryData, tag6Data, tag7Data, tag8Data});


  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/', async (req, res) => {
  const productData = await Product.ceate ({where: {
    product_name: "beach shorts",
    price: 50.00,
    stock: 10,
    tagIds: [1,2,3,4]
  }});

  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', async (req, res) => { 
  const productData = await Product.update(req.body, {
  // update product data
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  const productData = await Product.destroy({
    where: {
      product_id: req.params.product_id,
    },
  });
  return res.json(productData);
  // delete one product by its `id` value
});

module.exports = router;
