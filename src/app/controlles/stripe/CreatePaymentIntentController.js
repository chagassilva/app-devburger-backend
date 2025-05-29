import Stripe from "stripe";
import * as Yup from "yup";
const stripe = require("stripe")('sk_test_51RHbMhQRFA5bTw4XQeuFsn3M70AbuRrkUEbBg9upBgUNPijaVBxxDXXgkydzkDs74k7xp2sf2omKBu23xluOHPPc00wHyqmuDa');



const calculateOrderAmount = (items) => {
    const total = items.reduce((acc, current) => {
        return acc + current.price * current.quantity;
    }, 0);

    return total; // Stripe usa centavos
};


class CreatePaymentIntentController {

    async store(req, res) {

        const schema = Yup.object({

            products: Yup.array().required().of(

                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                    price: Yup.number().required(),
                })
            )
        });

        try {
            await schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            return res.status(400).json({ error: 'Validation fails', messages: err.errors });
        }

        const {products} = (req.body);

        // Create a PaymentIntent with the order amount and currency

        const paymentIntent = await stripe.paymentIntents.create({

            amount: calculateOrderAmount(products),
            currency: "brl",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });



    }
}

export default new CreatePaymentIntentController();