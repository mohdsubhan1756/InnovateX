import { useEffect, useState } from "react";

export default function Records() {
    const [users, setUsers] = useState([]);
    const [patients, setPatients] = useState([]);
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [passwordInput, setPasswordInput] = useState("");
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, patientsRes, donationsRes] = await Promise.all([
                    fetch("http://localhost:5000/api/record/users"),
                    fetch("http://localhost:5000/api/record/patients"),
                    fetch("http://localhost:5000/api/record/donations"),
                ]);

                const usersData = await usersRes.json();
                const patientsData = await patientsRes.json();
                const donationsData = await donationsRes.json();

                setUsers(usersData.users || []);
                setPatients(patientsData.patients || []);
                setDonations(donationsData.donations || []);
            } catch (err) {
                console.error("Error fetching records:", err);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleVerifyPassword = () => {
        if (passwordInput === "show") {
            setShowDetails(true);
        } else {
            alert("Incorrect password");
        }
    };

    if (loading) return <p className="text-center mt-6">Loading data...</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Complete Records</h1>

            {!showDetails && (
                <div className="mb-4 text-center">
                    <p className="text-gray-600">
                        Enter the secret password to view all sensitive records.
                    </p>
                    <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Enter password..."
                        className="border px-3 py-1 mt-2 rounded"
                    />
                    <button
                        onClick={handleVerifyPassword}
                        className="bg-blue-500 text-white px-4 py-1 ml-2 rounded"
                    >
                        Verify
                    </button>
                </div>
            )}

            <h2 className="text-2xl font-semibold mt-6">Users</h2>
            <table className="w-full border border-gray-300 mb-6">
                <thead className="bg-gray-100">
                    <tr className="text-center">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Phone</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Blood Group</th>
                        <th className="border p-2">Hospital</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u._id} className="text-center">
                            <td className="border p-2">{showDetails ? u.name : "****"}</td>
                            <td className="border p-2">{showDetails ? u.email : "****"}</td>
                            <td className="border p-2">{showDetails ? u.phone : "****"}</td>
                            <td className="border p-2">{u.role}</td>
                            <td className="border p-2">{showDetails ? u.bloodGroup || "—" : "**"}</td>
                            <td className="border p-2">{showDetails ? u.hospitalName || "—" : "****"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="text-2xl font-semibold mt-6">Patients</h2>
            <table className="w-full border border-gray-300 mb-6">
                <thead className="bg-gray-100">
                    <tr className="text-center">
                        <th className="border p-2">Patient Name</th>
                        <th className="border p-2">Age</th>
                        <th className="border p-2">Gender</th>
                        <th className="border p-2">Blood Group</th>
                        <th className="border p-2">Disease</th>
                        <th className="border p-2">Required Organ</th>
                        <th className="border p-2">Hospital</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((p) => (
                        <tr key={p._id} className="text-center">
                            <td className="border p-2">{showDetails ? p.patientName : "****"}</td>
                            <td className="border p-2">{p.age}</td>
                            <td className="border p-2">{p.gender}</td>
                            <td className="border p-2">{p.bloodGroup}</td>
                            <td className="border p-2">{showDetails ? p.disease : "****"}</td>
                            <td className="border p-2">{p.requiredOrgan || "—"}</td>
                            <td className="border p-2">{showDetails ? p.hospitalName || "—" : "****"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="text-2xl font-semibold mt-6">Donations</h2>
            <table className="w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr className="text-center">
                        <th className="border p-2">Donor</th>
                        <th className="border p-2">Phone</th>
                        <th className="border p-2">Type</th>
                        <th className="border p-2">Patient</th>
                        <th className="border p-2">Quantity</th>
                        <th className="border p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {donations.map((d) => (
                        <tr key={d._id} className="text-center">
                            <td className="border p-2">{showDetails ? d.donor?.name : "****"}</td>
                            <td className="border p-2">{showDetails ? d.donor?.phone : "****"}</td>
                            <td className="border p-2">{d.type}</td>
                            <td className="border p-2">{d.patient?.patientName || "—"}</td>
                            <td className="border p-2">{d.quantity}</td>
                            <td className="border p-2">{d.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
