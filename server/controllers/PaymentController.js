require("dotenv").config();
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")(process.env.STRIPE_SECRET);

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
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "storeItem.name",
                        },
                        unit_amount: 523523,
                    },
                    quantity: 1,
                },
            ],
            success_url: `http://localhost:5500/success.html`,
            cancel_url: `http://localhost:5500/cancel.html`,
            customer: req.user.stripeId,
            payment_intent_data: { setup_future_usage: "on_session" },
        });
        console.log(`${session.url}?prefilled_email=mahmouddd.com`);
        res.json({ url: session.url });
    } catch (e) {
        console.log("errrrr", e.message);
        res.status(500).json({ error: e.message });
    }
};

module.exports = pay;
