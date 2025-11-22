import { useEffect, useState } from "react";

export default function DonateBlood() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user")); // donor object
    const donorBlood = user?.bloodGroup;
    const donationType = user?.bloodGroup;

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/patient/blood/${donorBlood}`
                );
                const data = await res.json();

                if (!res.ok) {
                    console.error(data.message);
                    setPatients([]);
                } else {
                    setPatients(data.patients || []);

                    console.log("patients", patients);
                }
            } catch (err) {
                console.error("Error fetching patients:", err);
            }

            setLoading(false);
        };

        if (donorBlood) {
            fetchPatients();
        }
    }, [donorBlood]);


    const handleDonate = async (patientId, units) => {
        if (!user) return alert("User not logged in!");

        try {
            const res = await fetch("http://localhost:5000/api/donate/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    donor: user.id,
                    phone: user.phone,
                    type: "Blood",
                    patient: patientId,
                    quantity: units,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Failed to submit donation request");
                return;
            }

            alert("Donation request submitted successfully!");
        } catch (err) {
            console.error(err);
            alert("Error sending donation request.");
        }
    };


    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">
                Donate Blood – Matching Patients
            </h1>

            <div className="text-center mb-4">
                <p className="text-lg">
                    <strong>Your Blood Group:</strong> {donorBlood}
                </p>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Loading patients...</p>
            ) : patients.length === 0 ? (
                <p className="text-center text-gray-600">
                    No patients currently need <strong>{donorBlood}</strong> blood.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2">Patient Name</th>
                                <th className="border p-2">Age</th>
                                <th className="border p-2">Gender</th>
                                <th className="border p-2">Disease</th>
                                <th className="border p-2">Required Blood Units</th>
                                <th className="border p-2">Urgency</th>
                                <th className="border p-2">Hospital</th>
                                <th className="border p-2">Help</th>
                            </tr>
                        </thead>

                        <tbody>
                            {patients.map((p) => (
                                <tr key={p._id} className="text-center">
                                    <td className="border p-2">{p.patientName}</td>
                                    <td className="border p-2">{p.age}</td>
                                    <td className="border p-2 capitalize">{p.gender}</td>
                                    <td className="border p-2">{p.disease}</td>
                                    <td className="border p-2">{p.requiredBloodUnits}</td>
                                    <td className="border p-2 capitalize">{p.urgencyLevel}</td>
                                    <td className="border p-2">{p.hospitalName || "—"}</td>

                                    {/* ➤ DONATE BUTTON */}
                                    <td className="border p-2">
                                        <button
                                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleDonate(p._id, p.requiredBloodUnits)}
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
