// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const CampaignAnalysis = () => {
//     const { id } = useParams();
//     const [campaign, setCampaign] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchCampaign = async () => {
//             try {
//                 const res = await fetch(`http://localhost:5000/api/campaign/${id}`);
//                 const data = await res.json();
//                 if (res.ok) setCampaign(data.campaign);
//             } catch (err) {
//                 console.error(err);
//             }
//             setLoading(false);
//         };
//         fetchCampaign();
//     }, [id]);

//     console.log(campaign)

//     if (loading) return <p className="text-center mt-6">Loading campaign details...</p>;
//     if (!campaign) return <p className="text-center mt-6">Campaign not found.</p>;

//     return (
//         <div className="min-h-screen p-6 bg-gray-100">
//             <h1 className="text-3xl font-bold mb-6 text-center">{campaign.title}</h1>
//             <p className="text-gray-700 mb-4">{campaign.description}</p>

//             <h2 className="text-2xl font-semibold mb-4">Goods Assigned</h2>
//             <table className="w-full border border-gray-300">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="border p-2">Item</th>
//                         <th className="border p-2">Quantity</th>
//                         <th className="border p-2">Assigned To (Patient)</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {campaign.items.map((item, index) => (
//                         <tr key={index} className="text-center">
//                             <td className="border p-2">{item?.name}</td>
//                             <td className="border p-2">{item?.quantity}</td>
//                             <td className="border p-2">{item?.patient?.patientName || "—"}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default CampaignAnalysis;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CampaignAnalysis = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/campaign/${id}`);
                const data = await res.json();
                if (res.ok) setCampaign(data.campaign);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchCampaign();
    }, [id]);

    if (loading)
        return <p className="text-center mt-6 text-gray-600">Loading campaign details...</p>;
    if (!campaign)
        return <p className="text-center mt-6 text-red-500">Campaign not found.</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Campaign Header */}
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 mb-6">
                <h1 className="text-3xl font-bold mb-2">{campaign.title}</h1>
                <p className="text-gray-700 mb-2">{campaign.description}</p>
                <p className="text-gray-500 text-sm">
                    Beneficiary: {campaign.beneficiary?.hospitalName || campaign.beneficiary?.name} |
                    Start Date: {new Date(campaign.startDate).toLocaleDateString()}
                </p>
            </div>

            {/* Items Table */}
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow overflow-x-auto">
                <h2 className="text-2xl font-semibold mb-4 p-4 border-b">Items Provided</h2>
                {campaign.items.length === 0 ? (
                    <p className="p-4 text-gray-600">No items added yet.</p>
                ) : (
                    <table className="w-full text-center border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2">Item</th>
                                <th className="border p-2">Quantity</th>
                                <th className="border p-2">Assigned Patient</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaign.items.map((item, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border p-2">{item.name}</td>
                                    <td className="border p-2">{item.quantity}</td>
                                    <td className="border p-2">{item.patient?.name || "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default CampaignAnalysis;
