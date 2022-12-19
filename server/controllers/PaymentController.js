require("dotenv").config();
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const proxy = require("../utils/Proxy.json");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const jwt = require("jsonwebtoken");
const TraineeCourse = require("../models/TraineeCourse");
const Trainee = require("../models/Trainee");
const Course = require("../models/Course");

const charge = async (token, amt) => {
    return stripe.charge.create({
        amount: 100 * amt,
        curruncy: "usd",
        source: token,
        description: "Statement Description",
    });
};

const pay = async (req, res) => {
    try {
        const tokenData = {
            traineeId: req.user.id,
            courseId: req.body.courseId,
        };
        const addedCourse = jwt.sign(tokenData, process.env.BUY_COURSE_SECRET, {
            expiresIn: "2h",
        });
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
                        unit_amount: req.body.coursePrice,
                    },
                    quantity: 1,
                },
            ],
            success_url: `http://localhost:3000/individual/my-courses?added=${addedCourse}`, //to mycourses with param courseId?
            cancel_url: `http://localhost:3000/individual/all-courses`, //to allCoursesn
            customer: req.user.stripeId,
            payment_intent_data: { setup_future_usage: "on_session" },
        });

        res.json({ url: session.url });
    } catch (e) {
        console.log("errrrr", e.message);
        res.status(500).json({ error: e.message });
    }
};

module.exports = pay;
