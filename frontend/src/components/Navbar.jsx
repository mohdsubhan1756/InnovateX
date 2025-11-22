import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Load user from localStorage on first render
    useEffect(() => {
        const data = localStorage.getItem("user");
        if (data) {
            setUser(JSON.parse(data));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="bg-red-600 text-white px-6 py-4 shadow">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-wide">
                    Blood & Organ Donation
                </Link>

                {/* Right Side Menu */}
                <div className="flex items-center gap-6">

                    {/* NOT LOGGED IN */}
                    {!user && (
                        <>
                            <Link className="hover:text-gray-300" to="/login">
                                Login
                            </Link>
                            <Link className="hover:text-gray-300" to="/register">
                                Register
                            </Link>
                        </>
                    )}

                    {/* LOGGED IN */}
                    {user && (
                        <>
                            {/* Donor Menu */}
                            {user.role === "donor" && (
                                <>
                                    <Link
                                        to="/donor/dashboard"
                                        className="hover:text-gray-300"
                                    >
                                        Donor Dashboard
                                    </Link>

                                    <Link
                                        to="/donor/requests"
                                        className="hover:text-gray-300"
                                    >
                                        Requests
                                    </Link>

                                    <Link
                                        to="/donor/history"
                                        className="hover:text-gray-300"
                                    >
                                        Donation History
                                    </Link>
                                </>
                            )}

                            {/* Beneficiary Menu */}
                            {user.role === "beneficiary" && (
                                <>
                                    <Link
                                        to="/beneficiary/dashboard"
                                        className="hover:text-gray-300"
                                    >
                                        Hospital Dashboard
                                    </Link>

                                    <Link
                                        to="/beneficiary/request-blood"
                                        className="hover:text-gray-300"
                                    >
                                        Request Blood
                                    </Link>

                                    <Link
                                        to="/beneficiary/requests"
                                        className="hover:text-gray-300"
                                    >
                                        My Requests
                                    </Link>
                                </>
                            )}

                            {/* Common For Both */}
                            <Link to="/profile" className="hover:text-gray-300">
                                Profile
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="bg-white text-red-600 px-3 py-1 rounded hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
