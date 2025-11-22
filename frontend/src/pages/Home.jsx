import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="font-sans text-gray-800">

            {/* Hero Section */}
            <section className="bg-red-600 text-white py-24 px-6 text-center">
                <h1 className="text-5xl font-bold mb-4">Give Life, Donate an Organ</h1>
                <p className="text-xl mb-8">Your one act of kindness can save multiple lives.</p>
                <Link
                    to="/donor/dashboard"
                    className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                    Become a Donor
                </Link>
            </section>

            {/* Features Section */}
            <section className="py-16 px-6 bg-gray-50 text-center">
                <h2 className="text-3xl font-bold mb-8">Why Donate?</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition">
                        <h3 className="font-semibold text-xl mb-2 text-red-600">Save Lives</h3>
                        <p>One organ donor can save up to 8 lives and improve the quality of life for many others.</p>
                    </div>
                    <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition">
                        <h3 className="font-semibold text-xl mb-2 text-red-600">Support Families</h3>
                        <p>Your donation brings hope and happiness to families awaiting a second chance at life.</p>
                    </div>
                    <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition">
                        <h3 className="font-semibold text-xl mb-2 text-red-600">Quick & Safe</h3>
                        <p>Signing up as a donor is easy, and medical experts guide you safely throughout the process.</p>
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section className="py-16 px-6 text-center">
                <h2 className="text-3xl font-bold mb-8">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    <div>
                        <div className="text-red-600 text-4xl font-bold mb-3">1</div>
                        <h3 className="font-semibold mb-2">Register</h3>
                        <p>Sign up as a donor. Your data is encrypted and secure.</p>
                    </div>
                    <div>
                        <div className="text-red-600 text-4xl font-bold mb-3">2</div>
                        <h3 className="font-semibold mb-2">Match with Patients</h3>
                        <p>Our system matches you with patients needing the organ you can donate.</p>
                    </div>
                    <div>
                        <div className="text-red-600 text-4xl font-bold mb-3">3</div>
                        <h3 className="font-semibold mb-2">Donate & Save</h3>
                        <p>Coordinate with hospitals and medical teams to complete the donation safely.</p>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 px-6 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
                        <p>Lives Saved</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="text-4xl font-bold text-red-600 mb-2">200+</div>
                        <p>Registered Donors</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="text-4xl font-bold text-red-600 mb-2">100+</div>
                        <p>Hospitals Participating</p>
                    </div>
                </div>
            </section>

            {/* Call To Action */}
            <section className="py-16 px-6 bg-red-600 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
                <p className="mb-6">Register today and become a life-saving hero.</p>
                <Link
                    to="/donor/dashboard"
                    className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                    Register as Donor
                </Link>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 text-center">
                <p>&copy; {new Date().getFullYear()} Organ Donation Platform. All rights reserved.</p>
                <p>Email: support@organdonation.com | Phone: +91 90000 00000</p>
            </footer>
        </div>
    );
}
