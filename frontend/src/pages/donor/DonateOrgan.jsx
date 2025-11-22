import { useEffect, useState } from "react";

export default function DonateOrgan() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user")); // donor

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/donate/get-organ-patients");
                const data = await res.json();
                if (!res.ok) {
                    console.error(data.message);
                    setPatients([]);
                } else {
                    setPatients(data.patients || []);
                }
            } catch (err) {
                console.error("Error fetching patients:", err);
            }
            setLoading(false);
        };
        fetchPatients();
    }, []);

    const handleDonate = async (patientId) => {
        if (!user) return alert("User not logged in!");

        try {
            const res = await fetch("http://localhost:5000/api/donate/create-organ-donation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    donor: user.id,
                    phone: user.phone,
                    type: "Organ",
                    patient: patientId,
                    quantity: 1, // for organ, quantity = 1
                }),
            });

            const data = await res.json();
            if (!res.ok) return alert(data.message || "Failed to submit donation request");
            alert("Organ donation request submitted successfully!");
        } catch (err) {
            console.error(err);
            alert("Error sending donation request.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Donate Organ</h1>

            {loading ? (
                <p className="text-center text-gray-600">Loading patients...</p>
            ) : patients.length === 0 ? (
                <p className="text-center text-gray-600">No patients currently need organs.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2">Patient Name</th>
                                <th className="border p-2">Age</th>
                                <th className="border p-2">Gender</th>
                                <th className="border p-2">Required Organ</th>
                                <th className="border p-2">Urgency</th>
                                <th className="border p-2">Hospital</th>
                                <th className="border p-2">Donate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((p) => (
                                <tr key={p._id} className="text-center">
                                    <td className="border p-2">{p.patientName}</td>
                                    <td className="border p-2">{p.age}</td>
                                    <td className="border p-2 capitalize">{p.gender}</td>
                                    <td className="border p-2 capitalize">{p.requiredOrgan}</td>
                                    <td className="border p-2 capitalize">{p.urgencyLevel}</td>
                                    <td className="border p-2">{p.hospitalName || "—"}</td>
                                    <td className="border p-2">
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                            onClick={() => handleDonate(p._id)}
                                        >
                                            Donate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
