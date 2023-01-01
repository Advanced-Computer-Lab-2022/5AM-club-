require("dotenv").config();
const proxy = require("../utils/Proxy.json");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const jwt = require("jsonwebtoken");
const Trainee = require("../models/Trainee");
const Course = require("../models/Course");

const pay = async (req, res) => {
  try {
    const trainee = await Trainee.findById(req.user.id);

    const tokenData = {
      traineeId: req.user.id,
      courseId: req.body.courseId,
      paidFromWallet: Math.min(req.body.coursePrice, trainee.walletMoney),
    };
    const addedCourse = jwt.sign(tokenData, process.env.BUY_COURSE_SECRET, {
      expiresIn: "15d",
    });
    if (req.body.coursePrice - tokenData.paidFromWallet <= 0) {
      return res.json({
        url: `http://localhost:3000/individual-trainee/my-courses?added=${addedCourse}`,
      });
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd", ///change it
            product_data: {
              name: req.body.courseName,
            },
            unit_amount:
              (req.body.coursePrice - tokenData.paidFromWallet) * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/individual-trainee/my-courses?added=${addedCourse}`, //to mycourses with param courseId?
      cancel_url: `http://localhost:3000/individual-trainee/all-courses`, //to allCoursesn
      customer: req.user.stripeId,
      payment_intent_data: { setup_future_usage: "on_session" },
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = pay;
