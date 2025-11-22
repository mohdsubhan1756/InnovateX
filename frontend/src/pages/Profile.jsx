import { useEffect, useState } from "react";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [updatedData, setUpdatedData] = useState({});

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem("user"));
        if (localUser) {
            setUser(localUser);
            setUpdatedData(localUser);
        }
    }, []);

    const handleChange = (e) => {
        setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    };

    const updateProfile = () => {
        // simply update localStorage for now
        localStorage.setItem("user", JSON.stringify(updatedData));
        alert("Profile updated!");
        setUser(updatedData);
    };

    if (!user) return <p>No user found...</p>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg my-6">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>

            {/* COMMON FIELDS */}
            <div className="space-y-3">
                <div>
                    <label className="block font-semibold">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={updatedData.name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Email</label>
                    <input
                        type="email"
                        disabled
                        value={user.email}
                        className="w-full border px-3 py-2 rounded bg-gray-200"
                    />
                </div>

                {/* DONOR FIELDS */}
                {user.role === "donor" && (
                    <>
                        <div>
                            <label className="block font-semibold">Gender</label>
                            <select
                                name="gender"
                                value={updatedData.gender || ""}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-semibold">Address</label>
                            <textarea
                                name="address"
                                value={updatedData.address || ""}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block font-semibold">Blood Group</label>
                            <input
                                type="text"
                                name="bloodGroup"
                                value={updatedData.bloodGroup || ""}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>
                    </>
                )}

                {/* BENEFICIARY FIELDS */}
                {user.role === "beneficiary" && (
                    <>
                        <div>
                            <label className="block font-semibold">Hospital Name</label>
                            <input
                                type="text"
                                name="hospitalName"
                                value={updatedData.hospitalName || ""}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold">Address</label>
                            <textarea
                                name="address"
                                value={updatedData.address || ""}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            ></textarea>
                        </div>
                    </>
                )}

                {/* SAVE BUTTON */}
                <button
                    onClick={updateProfile}
                    className="w-full bg-blue-600 text-white py-2 rounded mt-4"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Profile;
