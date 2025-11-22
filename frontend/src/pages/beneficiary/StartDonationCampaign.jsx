import { useState } from "react";

export default function StartDonationCampaign() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [goods, setGoods] = useState([{ name: "", quantity: 0 }]);
    const user = JSON.parse(localStorage.getItem("user")); // beneficiary

    const handleAddGoods = () => setGoods([...goods, { name: "", quantity: 0 }]);
    const handleChangeGoods = (index, key, value) => {
        const updated = [...goods];
        updated[index][key] = key === "quantity" ? Number(value) : value;
        setGoods(updated);
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/campaign/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    beneficiary: user.id,
                    title,
                    description,
                    goodsRequired: goods,
                }),
            });
            const data = await res.json();
            if (!res.ok) return alert(data.message);
            alert("Campaign created successfully!");
            setTitle(""); setDescription(""); setGoods([{ name: "", quantity: 0 }]);
        } catch (err) { console.error(err); }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Start Donation Campaign</h1>
            <input type="text" placeholder="Campaign Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full mb-2" />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 w-full mb-2" />
            <h2 className="font-semibold mb-2">Goods Required</h2>
            {goods.map((g, i) => (
                <div key={i} className="flex gap-2 mb-2">
                    <input placeholder="Good Name" value={g.name} onChange={(e) => handleChangeGoods(i, "name", e.target.value)} className="border p-2 w-1/2" />
                    <input type="number" placeholder="Quantity" value={g.quantity} onChange={(e) => handleChangeGoods(i, "quantity", e.target.value)} className="border p-2 w-1/2" />
                </div>
            ))}
            <button onClick={handleAddGoods} className="bg-blue-500 text-white px-3 py-1 rounded mb-2">Add More Goods</button>
            <br />
            <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">Create Campaign</button>
        </div>
    );
}
