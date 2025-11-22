import { useEffect, useState } from "react";

export default function ViewOrganDonationRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [passwordInput, setPasswordInput] = useState("");
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/donate/get-organ-donation-request");
                const data = await res.json();
                if (!res.ok) {
                    console.error(data.message);
                    setRequests([]);
                } else {
                    setRequests(data.donations || []);
                }
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchRequests();
    }, []);

    const handleVerifyPassword = () => {
        if (passwordInput === "show") setShowDetails(true);
        else alert("Incorrect password");
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const res = await fetch(`http://localhost:5000/api/donate/update-donation-status/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await res.json();
            if (!res.ok) return alert(data.message);
            alert(`Donation request ${newStatus}`);
            setRequests((prev) => prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item)));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Organ Donation Requests</h1>

            {!showDetails && (
                <div className="mb-4 text-center">
                    <p className="text-gray-600">Donor details are encrypted. Enter password to view.</p>
                    <input
                        type="password"
                        placeholder="Enter password..."
                        className="border px-3 py-1 mt-2 rounded"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-1 ml-2 rounded"
                        onClick={handleVerifyPassword}
                    >
                        Verify
                    </button>
                </div>
            )}

            {loading ? (
                <p className="text-center text-gray-600">Loading requests...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2">Donor Name</th>
                                <th className="border p-2">Phone</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Blood Group</th>
                                <th className="border p-2">Patient</th>
                                <th className="border p-2">Organ</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req._id} className="text-center">
                                    <td className="border p-2">{showDetails ? req.donor?.name : "********"}</td>
                                    <td className="border p-2">{showDetails ? req.donor?.phone : "**********"}</td>
                                    <td className="border p-2">{showDetails ? req.donor?.email : "**********"}</td>
                                    <td className="border p-2">{showDetails ? req.donor?.bloodGroup : "**"}</td>
                                    <td className="border p-2">{req.patient?.patientName}</td>
                                    <td className="border p-2">{req.patient?.requiredOrgan}</td>
                                    <td className="border p-2 font-semibold">{req.status}</td>
                                    <td className="border p-2">
                                        {req.status === "Pending" ? (
                                            <>
                                                <button
                                                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                                    onClick={() => handleStatusUpdate(req._id, "Completed")}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                                    onClick={() => handleStatusUpdate(req._id, "Rejected")}
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        ) : (
                                            <span className="text-gray-500">{req.status}</span>
                                        )}
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
