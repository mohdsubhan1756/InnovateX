import React from "react";
import { Link } from "react-router-dom";

const BeneficiaryDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Beneficiary Dashboard (Hospital)
                </h1>

                {/* Card Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    {/* Add Patient Details */}
                    <Link to="/beneficiary/addpatient" className="block">
                        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Add Patient Details
                            </h2>
                            <p className="text-gray-600">
                                Add or manage patients who need blood or organ donations.
                            </p>
                        </div>
                    </Link>

                    <Link to="/beneficiary/viewpatients" className="block">
                        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                View Patient Details
                            </h2>
                            <p className="text-gray-600">
                                view patients who need blood or organ donations.
                            </p>
                        </div>
                    </Link>

                    <Link to='/donor/view-blood-donation-requests' className="block">
                        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Blood Donation Requests
                            </h2>
                            <p className="text-gray-600">
                                view donors who want to donate.
                            </p>
                        </div>
                    </Link>

                    <Link to='/donor/view-organ-donation-requests' className="block">
                        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Organ Donation Requests
                            </h2>
                            <p className="text-gray-600">
                                view donors who want to donate.
                            </p>
                        </div>
                    </Link>

                    {/* Donors Interested List */}
                    {/* <Link to="/beneficiary/donors-interested" className="block">
                        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Donors Interested
                            </h2>
                            <p className="text-gray-600">
                                View donors who raised hand for donating blood or organ.
                            </p>
                        </div>
                    </Link> */}

                    {/* Approve Volunteers */}
                    {/* <Link to="/beneficiary/volunteers" className="block">
                        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Approve Volunteers
                            </h2>
                            <p className="text-gray-600">
                                Approve donors who applied to volunteer in hospital campaigns.
                            </p>
                        </div>
                    </Link> */}

                    {/* Verify Certificates */}
                    {/* <Link to="/beneficiary/verify-certificates" className="block">
                        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Verify Donor Certificates
                            </h2>
                            <p className="text-gray-600">
                                Review and verify degree/license uploaded by donors.
                            </p>
                        </div>
                    </Link> */}

                    {/* Approve Gratitude Certificates */}
                    {/* <Link to="/beneficiary/gratitude" className="block">
                        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Approve Gratitude Certificates
                            </h2>
                            <p className="text-gray-600">
                                Approve certificates to thank donors for their contribution.
                            </p>
                        </div>
                    </Link> */}

                    {/* View All Patients & Donors */}
                    <Link to="/beneficiary/start-campaign" className="block">
                        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Start Campaign
                            </h2>
                            <p className="text-gray-600">
                                Start a Campaign to Help Patients
                            </p>
                        </div>
                    </Link>

                    <Link to="/beneficiary/view-campaigns" className="block">
                        <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                View Campaigns
                            </h2>
                            <p className="text-gray-600">
                                View all campaigns and analyze them in detail.
                            </p>
                        </div>
                    </Link>


                </div>
            </div>
        </div>
    );
};

export default BeneficiaryDashboard;
