import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import useCart from "../zustand/useCart";
import useAuth from "../zustand/useAuth";
import useCheckout from "../hooks/useCheckout";
import api from "../api/axios";

const Checkout = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const { loading, error, checkout } = useCheckout();

  const [paymentOrderLoading, setPaymentOrderLoading] = useState(false);
  const [paymentOrderError, setPaymentOrderError] = useState(null);

  const [paymentOrderData, setPaymentOrderData] = useState(null);

  const cart = useCart((state) => state.cart);
  const UserData = useAuth((state) => state.UserData);

  const disabled = !selectedAddress || !paymentMethod || loading || paymentOrderLoading;

  const createPaymentOrder = async () => {
    setPaymentOrderError(null);
    setPaymentOrderLoading(true);
    try {
      const response = await api.post(`/razorpay/orderPayment`, {
        amount: totalAmount,
        currency: "INR", 
      });
      setPaymentOrderData(response.data.paymentOrder);
    } catch (error) {
      setPaymentOrderError(
        error?.response?.data?.message || "Internal Server Error",
      );
    } finally {
      setPaymentOrderLoading(false);
    }
  };

  const onCheckout = () => checkout(selectedAddress, paymentMethod);
  const onPayAndCheckout = async () => {
    await createPaymentOrder();

    if (!paymentOrderData) {
      toast.error("Payment Failed");
      return;
    }

    const paymentObject = new window.Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: paymentOrderData.amount,
      order_id: paymentOrderData.order_id,
      handler: async (res) => {
        const paymentId = res.razorpay_payment_id;

        if (!paymentId) {
          toast.error("Payment Failed");
          return;
        }

        checkout(selectedAddress, paymentMethod, paymentId);
      },
      modal: {
      ondismiss: () => {
        toast.error('Payment Cancelled');
      },
    },
    });
    
    paymentObject.open();
  };

  useEffect(() => {
    let amount = 0;
    cart.forEach((item) => {
      amount = amount + item.amount;
    });
    setTotalAmount(amount);
  }, [cart]);

  return (
    <div className="flex flex-col px-1 py-2 gap-2 md:px-10">
      <table className="border border-gray-300">
        <thead className="bg-gray-500">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quanity</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {cart &&
            cart.map((item, index) => (
              <tr key={index}>
                <th>{item.product.name}</th>
                <th>{item.price}</th>
                <th>{item.quantity}</th>
                <th>{item.amount}</th>
              </tr>
            ))}
        </tbody>
        <tfoot className="border border-gray-300">
          <tr>
            <th colSpan={4} className="self-end">
              Total Amount: {totalAmount}
            </th>
          </tr>
        </tfoot>
      </table>
      {error && <div className="mb-1 rounded-2xl bg-red-600 p-2">{error}</div>}
      {paymentOrderError && (
        <div className="mb-1 rounded-2xl bg-red-600 p-2">
          {paymentOrderError} 2
        </div>
      )}
      <fieldset className="flex flex-col gap-2 items-center justify-center bg-gray-300 rounded-2xl w-full py-2 px-4">
        <h1 className="font-semibold text-2xl">Addresses</h1>
        {UserData.addresses &&
          UserData.addresses.map((address) => (
            <div key={address._id} className="flex gap-1">
              <input
                type="radio"
                name="addresses"
                id={address._id}
                value={address._id}
                onChange={(e) => setSelectedAddress(e.target.value)}
              />
              <label
                key={address._id}
                className="flex items-center p-2 bg-gray-500 w-full gap-1 rounded-2xl"
                for={address._id}
              >
                {address.fullName}, {address.address1}, {address.address2},{" "}
                {address.state}, {address.district}, {address.postalCode},{" "}
                {address.contactNumber}
              </label>
            </div>
          ))}
      </fieldset>
      <fieldset className="flex flex-col gap-2 items-center justify-center bg-gray-300 rounded-2xl w-full py-2 px-4">
        <h1 className="font-semibold text-2xl">Payment Method</h1>
        <div className="flex gap-1">
          <input
            type="radio"
            name="payment-method"
            id="COD"
            value="COD"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label
            className="flex items-center p-2 bg-gray-500 w-full gap-1 rounded-2xl"
            for="COD"
          >
            Cash On Delivery
          </label>
        </div>
        <div className="flex gap-1">
          <input
            type="radio"
            name="payment-method"
            id="Online"
            value="Online"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label
            className="flex items-center p-2 bg-gray-500 w-full gap-1 rounded-2xl"
            for="Online"
          >
            Online
          </label>
        </div>
      </fieldset>
      <button
        disabled={disabled}
        className="btn"
        onClick={paymentMethod === "Online" ? onPayAndCheckout : onCheckout}
      >
        {paymentMethod === "Online" ? "Pay and Checkout" : "Checkout"}
      </button>
    </div>
  );
};

export default Checkout;
