import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/campaign/");
                const data = await res.json();
                if (res.ok) setCampaigns(data.campaigns || []);
                else setCampaigns([]);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchCampaigns();
    }, []);

    if (loading) return <p className="text-center mt-6">Loading campaigns...</p>;
    if (campaigns.length === 0) return <p className="text-center mt-6">No campaigns found.</p>;

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Campaigns</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {campaigns.map((c) => (
                    <div key={c._id} className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold mb-2">{c.title}</h2>
                        <p className="text-gray-600 mb-2">{c.description}</p>
                        <p className="text-gray-500 mb-4">Start Date: {new Date(c.startDate).toLocaleDateString()}</p>
                        <Link
                            to={`/beneficiary/campaign/${c._id}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            View Analysis
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewCampaigns;
