const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tagData = await Tag.findAll();
  const productData = await Product.findAll();
  return res.json({tagData, productData});

  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  const tagData = await Tag.findOne({where: {
    tag_id: '4'}});
  const productData = await Product.findOne({where: {
    product_id: '3'}});
  return res.json({tagData, productData});
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  const tagData = await Tag.create ({ where : {
    tag_id: '9'
  }
  })
  return res.json({tagData}),
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tagData = await Tag.update({
    tag_name: req.body.tag_id,
  },
  {
    where: {
      tag_id: req.params.tag_id,
    },
  }
  );
  return res.json(tagData);
});

router.delete('/:id', async (req, res) => {
  const tagData = await Tag.destroy({
    where: {
      tag_id: req.params.tag_id,
    },
  });
  return res.json(tagData);
  // delete on tag by its `id` value
});

module.exports = router;
