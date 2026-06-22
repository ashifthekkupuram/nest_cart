import razorpayInstance from "../config/razorpay.js";

export const createPaymentOrder = async (req, res, next) => {
  try {
    const { amount, currency } = req.body; 

    const options = {
      amount: Math.trunc(amount) * 100,
      currency: currency || "INR",
    };

    const paymentOrder = await razorpayInstance.orders.create(options)

    return res.status(201).json({
        success: true,
        message: "Payment Order has been made.",
        paymentOrder,
    })

  } catch (error) {
    next(error);
  }
};
