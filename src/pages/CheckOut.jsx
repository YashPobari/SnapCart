import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import parsePhoneNumber from "libphonenumber-js";

const Checkout = () => {
    const { cartItems } = useCart();
    const [countryCode, setCountryCode] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const totalAmount = cartItems.reduce(
        (acc, item) => {
            console.log("item ->", item)
            return acc + item.productprice * item.quantity
        },
        0
    );

    const onSubmit = (data) => {
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
                name: data.fullName,
                email: "",
                contact: data.phoneNumber,
            },
            notes: {
                address: data.address,
            },
            theme: {
                color: "#F37254",
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <div>
            <Header />
            <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <input
                                {...register("fullName", { required: "Full name is required" })}
                                type="text"
                                placeholder="Full Name"
                                className="w-full border px-4 py-2 rounded"
                            />
                            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                        </div>

                        <div>
                            <input
                                {...register("phoneNumber", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message: "Enter a valid 10-digit Indian phone number",
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "Phone number should be 10 digits",
                                    },
                                    onChange: (e) => {
                                        const number = e.target.value;
                                        setValue("phoneNumber", number);
                                        if (number.length === 10) {
                                            const fullNumber = `+91${number}`;
                                            try {
                                                const phoneNumber = parsePhoneNumber(fullNumber);
                                                setCountryCode(phoneNumber?.country || "");
                                            } catch {
                                                setCountryCode("");
                                            }
                                        } else {
                                            setCountryCode("");
                                        }
                                    },
                                })}
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full border px-4 py-2 rounded"
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                            {countryCode && <p className="text-sm text-gray-500 mt-1">Country: {countryCode}</p>}
                        </div>

                        <div>
                            <textarea
                                {...register("address", { required: "Address is required" })}
                                placeholder="Address"
                                className="w-full border px-4 py-2 rounded"
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <input
                                    {...register("city", { required: "City is required" })}
                                    type="text"
                                    placeholder="City"
                                    className="w-full border px-4 py-2 rounded"
                                />
                                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                            </div>
                            <div>
                                <input
                                    {...register("state", { required: "State is required" })}
                                    type="text"
                                    placeholder="State"
                                    className="w-full border px-4 py-2 rounded"
                                />
                                {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                            </div>
                        </div>

                        <div>
                            <input
                                {...register("pincode", { required: "Pincode is required" })}
                                type="text"
                                placeholder="Pincode"
                                className="w-full border px-4 py-2 rounded"
                            />
                            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                        >
                            Proceed to Payment
                        </button>
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
                                        {item.quantity} x ₹{item.productprice}
                                    </p>
                                </div>
                                <p className="font-semibold">₹{item.quantity * item.productprice}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;