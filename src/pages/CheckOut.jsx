import React from "react";
import { useCart } from "../context/CartContext";

const Checkout = () => {
    const { cartItems } = useCart();

    const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handlePayment = () => {
        const options = {
            key: "YOUR_RAZORPAY_KEY", 
            amount: totalAmount * 100, 
            currency: "INR",
            name: "SnapCart",
            description: "Payment for your order",
            image: "https://example.com/logo.png",
            handler: function (response) {
                alert("Payment Successful!");
                console.log(response);
                
            },
            prefill: {
                name: "",
                email: "",
                contact: "",
            },
            notes: {
                address: "",
            },
            theme: {
                color: "#F37254", 
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shipping Details */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full border px-4 py-2 rounded"
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full border px-4 py-2 rounded"
                    />
                    <textarea
                        placeholder="Address"
                        className="w-full border px-4 py-2 rounded"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="City"
                            className="w-full border px-4 py-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="State"
                            className="w-full border px-4 py-2 rounded"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Pincode"
                        className="w-full border px-4 py-2 rounded"
                    />
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                    {cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <div>
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-gray-600">
                                    {item.quantity} x ₹{item.price}
                                </p>
                            </div>
                            <p className="font-semibold">₹{item.quantity * item.price}</p>
                        </div>
                    ))}
                </div>

                <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                </div>

                <button
                    onClick={handlePayment}
                    className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default Checkout;
