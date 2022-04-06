const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const router = require("express").Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedorder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedorder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USERS ORDER
router.get("/find/:userid", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  //to get current date, eq: 1st November
  const date = new Date();
  //to get last month  date, eq: 1st October
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  //to get previos month  date, eq: 1st Septeber
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
