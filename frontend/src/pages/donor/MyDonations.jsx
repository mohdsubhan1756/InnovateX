import { useEffect, useState } from "react";

export default function MyDonations() {
    const [donations, setDonations] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/campaign/my-donations/${user.id}`);
                const data = await res.json();
                setDonations(data.donations || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDonations();
    }, [user.id]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">My Donations</h1>
            {donations.length === 0 ? (
                <p>No donations yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2">Campaign</th>
                                <th className="border p-2">Goods</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map(d => (
                                <tr key={d._id} className="text-center">
                                    <td className="border p-2">{d.campaign?.title}</td>
                                    <td className="border p-2">
                                        {d.type} {d.quantity} {d.notes ? `(${d.notes})` : ""}
                                    </td>
                                    <td className="border p-2">{d.status}</td>
                                    <td className="border p-2">{new Date(d.donatedAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
