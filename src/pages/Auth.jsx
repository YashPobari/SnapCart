import React, { useState } from "react";
import { account } from "../appwrite/config";
import { ID } from "appwrite";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const session = await account.createEmailPasswordSession(email, password);
                alert("Login successful!");
            } else {
                await account.create(ID.unique(), email, password, name);
                alert("Signup successful! Now log in.");
                setIsLogin(true);
            }
        } catch (error) {
            console.error("Auth error:", error);
            alert(error.message || "Something went wrong");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <form
                onSubmit={handleAuth}
                className="bg-white p-6 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-semibold mb-4">
                    {isLogin ? "Login" : "Signup"}
                </h2>

                {!isLogin && (
                    <input
                        type="text"
                        placeholder="Name"
                        autoComplete="name"
                        className="mb-3 w-full p-2 border rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                )}

                <input
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    className="mb-3 w-full p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    className="mb-3 w-full p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                    {isLogin ? "Login" : "Signup"}
                </button>

                <p className="mt-4 text-sm text-center">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500 underline"
                    >
                        {isLogin ? "Sign up" : "Log in"}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Auth;
