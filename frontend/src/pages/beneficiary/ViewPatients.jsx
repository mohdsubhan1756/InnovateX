import { useEffect, useState } from "react";

export default function ViewPatients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const hospitalId = user?.id; // ✅ you DO have "id", not "_id"

    useEffect(() => {
        const fetchPatients = async () => {
            if (!hospitalId) {
                setError("Hospital ID missing");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`http://localhost:5000/api/patient/${hospitalId}`);
                const data = await res.json();

                if (!res.ok) {
                    setError(data.message || "Failed to fetch patients");
                } else {
                    setPatients(data.data || []); // ✅ backend returns data.data
                }
            } catch (err) {
                console.error(err);
                setError("Server error");
            }

            setLoading(false);
        };

        fetchPatients();
    }, [hospitalId]);

    if (loading) return <div className="text-center p-6">Loading patients...</div>;
    if (error) return <div className="text-center p-6 text-red-600">{error}</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Patients List ({patients.length})
            </h1>

            {patients.length === 0 ? (
                <p className="text-center text-gray-600">No patients found.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Age</th>
                            <th className="border p-2">Gender</th>
                            <th className="border p-2">Blood Group</th>
                            <th className="border p-2">Disease</th>
                            <th className="border p-2">Required Organ</th>
                            <th className="border p-2">Blood Units</th>
                            <th className="border p-2">Urgency</th>
                            <th className="border p-2">Created At</th>
                        </tr>
                    </thead>

                    <tbody>
                        {patients.map((p) => (
                            <tr key={p._id} className="text-center">
                                <td className="border p-2">{p.patientName}</td>
                                <td className="border p-2">{p.age}</td>
                                <td className="border p-2 capitalize">{p.gender}</td>
                                <td className="border p-2">{p.bloodGroup}</td>
                                <td className="border p-2">{p.disease}</td>
                                <td className="border p-2">{p.requiredOrgan || "-"}</td>
                                <td className="border p-2">{p.requiredBloodUnits}</td>
                                <td className="border p-2 capitalize">{p.urgencyLevel}</td>
                                <td className="border p-2">
                                    {new Date(p.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
