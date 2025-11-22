import { Link } from "react-router-dom";

export default function DonorDashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-6 pt-24">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-red-600">
                    Donor Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Volunteer Apply */}
                    {/* <div className="bg-white shadow-md p-5 rounded-lg border">
                        <h2 className="text-xl font-semibold mb-2">Apply as Volunteer</h2>
                        <p className="text-gray-600 mb-4">
                            Upload your degree/license and apply for volunteer work in hospital campaigns.
                        </p>
                        <Link
                            to="/donor/volunteer-apply"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Apply Now
                        </Link>
                    </div> */}

                    {/* Upload Degree or License */}
                    <div className="bg-white shadow-md p-5 rounded-lg border">
                        <h2 className="text-xl font-semibold mb-2">View your donations</h2>
                        <p className="text-gray-600 mb-4">
                            View your donations
                        </p>
                        <Link
                            to='/donor/my-donations'
                            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                        >
                            My Donations
                        </Link>
                    </div>

                    {/* Donate Blood */}
                    <div className="bg-white shadow-md p-5 rounded-lg border">
                        <h2 className="text-xl font-semibold mb-2">Donate Blood</h2>
                        <p className="text-gray-600 mb-4">
                            Register your blood donation details and help patients in need.
                        </p>
                        <Link
                            to='/donor/donateblood'
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Donate Blood
                        </Link>
                    </div>

                    {/* Donate Organ */}
                    <div className="bg-white shadow-md p-5 rounded-lg border">
                        <h2 className="text-xl font-semibold mb-2">Donate Organ</h2>
                        <p className="text-gray-600 mb-4">
                            Register as an organ donor and help save lives.
                        </p>
                        <Link
                            to="/donor/donate-organ"
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Donate Organ
                        </Link>
                    </div>

                    {/* Certificates */}
                    <div className="bg-white shadow-md p-5 rounded-lg border">
                        <h2 className="text-xl font-semibold mb-2">Donate Goods</h2>
                        <p className="text-gray-600 mb-4">
                            Help patients by donating goods in campaigns
                        </p>
                        <Link
                            to="/donor/donate-in-campaigns"
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                        >
                            Donate In Campaigns
                        </Link>
                    </div>

                    {/* Requests from Patients */}
                    <div className="bg-white shadow-md p-5 rounded-lg border">
                        <h2 className="text-xl font-semibold mb-2">Patient Requests</h2>
                        <p className="text-gray-600 mb-4">
                            View blood/organ requests posted by hospitals and raise your hand to donate.
                        </p>
                        <Link
                            to="/donor/requests"
                            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                        >
                            View Requests
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
