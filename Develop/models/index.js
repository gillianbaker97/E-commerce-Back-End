// import models
const Product = require('./Product');   /* requiring the correct file paths */
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

Product.BelongsTo(Category, {   /* inputting foreign keys */
  foreignKey: 'category_id',
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});
// Products belongToMany Tags (through ProductTag)
Product.BelongsToMany(Tag, {
  foreignKey: 'tag_id',
});
// Tags belongToMany Products (through ProductTag)
Tag.BelongsToMany(Product, {
  foreignKey: 'tag_id',
});

module.exports = {    /* exporting the different models */
  Product,
  Category,
  Tag,
  ProductTag,
};
