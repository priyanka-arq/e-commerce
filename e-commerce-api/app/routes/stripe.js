const router = require("express").Router();
//const stripe = require("stripe")(process.env.STRIPE_KEY);
const stripe = require("stripe")(
  "sk_test_51JrXmCCM5VihZsn8WdkRGXc3J6iVCf7xdUyIGXiwbh7Yz21SI1Ak4aPijxgzL7ghBna1TTTFfX1TYZ1tby3sYwLA00USSzqWa4"
);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
