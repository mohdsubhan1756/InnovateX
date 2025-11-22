import { useEffect, useState } from "react";

export default function DonateInCampaign() {
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState("");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchCampaigns = async () => {
            const res = await fetch("http://localhost:5000/api/campaign");
            const data = await res.json();
            setCampaigns(data.campaigns || []);
        };
        fetchCampaigns();
    }, []);

    const handleDonate = async () => {
        if (!selectedCampaign || !type) return alert("Select campaign and type!");
        try {
            const res = await fetch("http://localhost:5000/api/campaign/donate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    donor: user.id,
                    campaign: selectedCampaign,
                    type,
                    quantity,
                    notes
                }),
            });
            const data = await res.json();
            if (!res.ok) return alert(data.message);
            alert("Donation submitted successfully!");
        } catch (err) {
            console.error(err);
            alert("Error submitting donation.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Donate to Campaign</h1>

            <div className="mb-4">
                <label>Choose Campaign</label>
                <select
                    value={selectedCampaign}
                    onChange={(e) => setSelectedCampaign(e.target.value)}
                    className="border p-2 rounded w-full"
                >
                    <option value="">-- Select Campaign --</option>
                    {campaigns.map(c => (
                        <option key={c._id} value={c._id}>{c.title}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label>Donation Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded w-full">
                    <option value="">-- Select Type --</option>
                    <option value="Food">Food</option>
                    <option value="Bedsheet">Bedsheet</option>
                    <option value="Money">Money</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="mb-4">
                <label>Quantity / Amount</label>
                <input type="number" value={quantity} min="1" onChange={(e) => setQuantity(e.target.value)} className="border p-2 rounded w-full" />
            </div>

            <div className="mb-4">
                <label>Notes (optional)</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="border p-2 rounded w-full" />
            </div>

            <button onClick={handleDonate} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Donate
            </button>
        </div>
    );
}
