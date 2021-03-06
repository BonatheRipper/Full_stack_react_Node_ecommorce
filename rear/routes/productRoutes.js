import express from "express";
import Products from "../models/products.js";
import expressAsyncHandler from "express-async-handler";
const productRouter = express.Router();

productRouter.get("/", async (req, res, next) => {
  const products = await Products.find();
  res.send(products);
});
const PAGE_SIZE = 3;
productRouter.get(
  "/search",
  expressAsyncHandler(async (req, res, next) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const price = query.price || "";
    const rating = query.rating || "";
    const order = query.order || "";
    const searchQuery = query.query || "";

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            name: {
              $regex: searchQuery,
              $options: "i",
            },
          }
        : {};
    const categoryFilter = category && category !== "all" ? { category } : {};
    const ratingFilter =
      rating && rating !== "all"
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== "all"
        ? {
            // 1-50
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};
    const sortOrder =
      order === "featured"
        ? { featured: -1 }
        : order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Products.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Products.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);
productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res, next) => {
    const categories = await Products.find().distinct("category");
    if (categories) {
      res.send(categories);
    } else {
      console.log("there was an error finding categories");
      return res.status(404).send({ message: "Categories not found" });
    }
  })
);
productRouter.get("/slug/:slug", async (req, res) => {
  const product = await Products.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    console.log("there was an error");
    return res.status(404).send({ message: "Products not found" });
  }
});

productRouter.get("/:id", async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    return res.status(404).send({ message: "Products not found" });
  }
});
export default productRouter;
