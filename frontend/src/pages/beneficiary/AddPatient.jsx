import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AddPatient() {
    const [hospital, setHospital] = useState(null);

    const [form, setForm] = useState({
        patientName: "",
        age: "",
        gender: "",
        bloodGroup: "",
        disease: "",
        requiredOrgan: "",
        requiredBloodUnits: "",
        urgencyLevel: "",
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.role === "beneficiary") {
            setHospital(user);
        }
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!hospital) {
            alert("Only Hospital Beneficiaries can add patients.");
            return;
        }

        const payload = {
            ...form,
            hospitalId: hospital.id, // linking patient to hospital
        };

        console.log()

        try {
            const res = await fetch("http://localhost:5000/api/patient/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Failed to add patient");
                toast.error('Something went wrong');
                return;
            }

            // alert("Patient added successfully!");
            toast.success('Patient addess successfully');
            setForm({
                patientName: "",
                age: "",
                gender: "",
                bloodGroup: "",
                disease: "",
                requiredOrgan: "",
                requiredBloodUnits: "",
                urgencyLevel: "",
            });
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Add Patient Details
                </h1>

                {!hospital ? (
                    <p className="text-red-600 text-center">
                        You must be logged in as a Beneficiary (Hospital)
                    </p>
                ) : (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Patient Name */}
                        <div className="col-span-2">
                            <label className="block font-semibold mb-1">Patient Name</label>
                            <input
                                type="text"
                                name="patientName"
                                value={form.patientName}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                                placeholder="Enter patient name"
                            />
                        </div>

                        {/* Age */}
                        <div>
                            <label className="block font-semibold mb-1">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={form.age}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                                placeholder="Age"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block font-semibold mb-1">Gender</label>
                            <select
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Blood Group */}
                        <div>
                            <label className="block font-semibold mb-1">Blood Group</label>
                            <select
                                name="bloodGroup"
                                value={form.bloodGroup}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select</option>
                                <option>A+</option>
                                <option>A-</option>
                                <option>B+</option>
                                <option>B-</option>
                                <option>O+</option>
                                <option>O-</option>
                                <option>AB+</option>
                                <option>AB-</option>
                            </select>
                        </div>

                        {/* Disease */}
                        <div className="col-span-2">
                            <label className="block font-semibold mb-1">Disease / Condition</label>
                            <input
                                type="text"
                                name="disease"
                                value={form.disease}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                                placeholder="Example: Kidney failure, Accident trauma, etc."
                            />
                        </div>

                        {/* Required Organ */}
                        <div>
                            <label className="block font-semibold mb-1">Required Organ (if any)</label>
                            <select
                                name="requiredOrgan"
                                value={form.requiredOrgan}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">None</option>
                                <option value="kidney">Kidney</option>
                                <option value="liver">Liver</option>
                                <option value="heart">Heart</option>
                                <option value="lungs">Lungs</option>
                                <option value="cornea">Cornea</option>
                            </select>
                        </div>

                        {/* Required Blood Units */}
                        <div>
                            <label className="block font-semibold mb-1">Required Blood Units</label>
                            <input
                                type="number"
                                name="requiredBloodUnits"
                                value={form.requiredBloodUnits}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                placeholder="Example: 2"
                            />
                        </div>

                        {/* Urgency Level */}
                        <div className="col-span-2">
                            <label className="block font-semibold mb-1">Urgency Level</label>
                            <select
                                name="urgencyLevel"
                                value={form.urgencyLevel}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High (Emergency)</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                        >
                            Add Patient
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
