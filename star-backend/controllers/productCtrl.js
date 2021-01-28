const Products = require("../models/productModel");

// Filter, Sorting and Paginating

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString }; // queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    //gte = greater than equal to
    //gt = greater than
    //lt = less than
    //lt = less than equal to
    //regex = patten matcted

    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      console.log(this.queryString.sort);
      const sortBy = this.queryString.sort.split(",").join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1; //client will send the page number
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating();
      const products = await features.query;
      res.status(200).json({
        result: products.length,
        status: "success",
        products: products,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images)
        return res.status(400).json({
          msg: "No Image upload",
        });
      const product = await Products.findOne({ product_id });

      if (product)
        return res.status(400).json({ msg: "This product already exist" });

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });

      await newProduct.save();

      res.status(200).json({ msg: "Created a product" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "Deleted a product" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images)
        return res.status(400).json({
          msg: "No Image upload",
        });

      await Products.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      );
      res.status(200).json({ msg: "Updated a Product" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productCtrl;
