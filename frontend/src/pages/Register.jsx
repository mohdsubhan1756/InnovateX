// import { useState } from "react";

// export default function Register() {
//     const [role, setRole] = useState("donor");

//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         address: "",
//         password: "",
//         confirmPassword: "",
//         role: "donor",

//         // Donor fields
//         bloodGroup: "",
//         donationType: "",
//         gender: "",

//         // Beneficiary fields
//         hospitalName: "",
//         registrationNumber: ""
//     });

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleRoleChange = (e) => {
//         setRole(e.target.value);
//         setForm({ ...form, role: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (form.password !== form.confirmPassword) {
//             alert("Passwords do not match!");
//             return;
//         }

//         // build body
//         let body = {
//             name: form.name,
//             email: form.email,
//             phone: form.phone,
//             address: form.address,
//             role: form.role,
//             password: form.password,
//         };

//         if (role === "donor") {
//             body.gender = form.gender;
//             body.bloodGroup = form.bloodGroup;
//             body.donationType = form.donationType;
//         } else {
//             body.hospitalName = form.hospitalName;
//             body.registrationNumber = form.registrationNumber;
//         }

//         try {
//             const res = await fetch("http://localhost:5000/api/auth/register", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(body),
//             });

//             const data = await res.json();

//             if (!res.ok) {
//                 alert(data.message || "Registration failed");
//                 return;
//             }

//             alert("Registration successful!");

//             // ⭐ Save to localStorage
//             localStorage.setItem("token", data.token);
//             localStorage.setItem("user", JSON.stringify(data.user));
//             localStorage.setItem("role", data.user.role);

//             // ⭐ Redirect
//             if (data.user.role === "donor") {
//                 window.location.href = "/donor/dashboard";
//             } else {
//                 window.location.href = "/beneficiary/dashboard";
//             }

//         } catch (err) {
//             console.error(err);
//             alert("Something went wrong!");
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//             <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl">
//                 <h1 className="text-2xl font-bold text-center mb-4">
//                     Create Your Account
//                 </h1>

//                 <form onSubmit={handleSubmit} className="space-y-4">

//                     {/* Role Selector */}
//                     <div>
//                         <label className="block font-semibold mb-1">Select Role</label>
//                         <select
//                             name="role"
//                             value={role}
//                             onChange={handleRoleChange}
//                             className="w-full p-2 border rounded"
//                         >
//                             <option value="donor">Donor</option>
//                             <option value="beneficiary">Beneficiary (Hospital)</option>
//                         </select>
//                     </div>

//                     {/* Common Fields */}
//                     <div>
//                         <label className="block font-semibold mb-1">Full Name</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={form.name}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border rounded"
//                         />
//                     </div>

//                     <div>
//                         <label className="block font-semibold mb-1">Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={form.email}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border rounded"
//                         />
//                     </div>

//                     <div>
//                         <label className="block font-semibold mb-1">Phone</label>
//                         <input
//                             type="text"
//                             name="phone"
//                             value={form.phone}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border rounded"
//                         />
//                     </div>

//                     <div>
//                         <label className="block font-semibold mb-1">Address</label>
//                         <textarea
//                             name="address"
//                             value={form.address}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border rounded"
//                         ></textarea>
//                     </div>

//                     {/* Donor Fields */}
//                     {role === "donor" && (
//                         <>
//                             <div>
//                                 <label className="block font-semibold mb-1">Gender</label>
//                                 <select
//                                     name="gender"
//                                     value={form.gender}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full p-2 border rounded"
//                                 >
//                                     <option value="">Select Gender</option>
//                                     <option value="male">Male</option>
//                                     <option value="female">Female</option>
//                                     <option value="other">Other</option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block font-semibold mb-1">Blood Group</label>
//                                 <select
//                                     name="bloodGroup"
//                                     value={form.bloodGroup}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full p-2 border rounded"
//                                 >
//                                     <option value="">Select</option>
//                                     <option value="A+">A+</option>
//                                     <option value="A-">A-</option>
//                                     <option value="B+">B+</option>
//                                     <option value="B-">B-</option>
//                                     <option value="O+">O+</option>
//                                     <option value="O-">O-</option>
//                                     <option value="AB+">AB+</option>
//                                     <option value="AB-">AB-</option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block font-semibold mb-1">Donation Type</label>
//                                 <select
//                                     name="donationType"
//                                     value={form.donationType}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full p-2 border rounded"
//                                 >
//                                     <option value="">Select</option>
//                                     <option value="blood">Blood</option>
//                                     <option value="organ">Organ</option>
//                                     <option value="both">Both</option>
//                                 </select>
//                             </div>
//                         </>
//                     )}

//                     {/* Beneficiary Fields */}
//                     {role === "beneficiary" && (
//                         <>
//                             <div>
//                                 <label className="block font-semibold mb-1">
//                                     Hospital Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="hospitalName"
//                                     value={form.hospitalName}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full p-2 border rounded"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block font-semibold mb-1">
//                                     Registration Number
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="registrationNumber"
//                                     value={form.registrationNumber}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full p-2 border rounded"
//                                 />
//                             </div>
//                         </>
//                     )}

//                     {/* Password */}
//                     <div>
//                         <label className="block font-semibold mb-1">Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={form.password}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border rounded"
//                         />
//                     </div>

//                     <div>
//                         <label className="block font-semibold mb-1">
//                             Confirm Password
//                         </label>
//                         <input
//                             type="password"
//                             name="confirmPassword"
//                             value={form.confirmPassword}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border rounded"
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//                     >
//                         Register
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }


import { useState } from "react";

export default function Register() {
    const [role, setRole] = useState("donor");

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
        role: "donor",

        // Donor fields
        bloodGroup: "",
        donationType: "",
        gender: "",

        // Beneficiary fields
        hospitalName: "",
        registrationNumber: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
        setForm({ ...form, role: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        let body = {
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            role: form.role,
            password: form.password,
        };

        if (role === "donor") {
            body.gender = form.gender;
            body.bloodGroup = form.bloodGroup;
            body.donationType = form.donationType;
        } else {
            body.hospitalName = form.hospitalName;
            body.registrationNumber = form.registrationNumber;
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Registration failed");
                return;
            }

            alert("Registration successful!");

            // ⭐ Store EVERYTHING as one object
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // ⭐ Redirect
            if (data.user.role === "donor") {
                window.location.href = "/donor/dashboard";
            } else {
                window.location.href = "/beneficiary/dashboard";
            }

        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Create Your Account
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block font-semibold mb-1">Select Role</label>
                        <select
                            name="role"
                            value={role}
                            onChange={handleRoleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="donor">Donor</option>
                            <option value="beneficiary">Beneficiary (Hospital)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Address</label>
                        <textarea
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        ></textarea>
                    </div>

                    {role === "donor" && (
                        <>
                            <div>
                                <label className="block font-semibold mb-1">Gender</label>
                                <select
                                    name="gender"
                                    value={form.gender}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

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
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Donation Type</label>
                                <select
                                    name="donationType"
                                    value={form.donationType}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Select</option>
                                    <option value="blood">Blood</option>
                                    <option value="organ">Organ</option>
                                    <option value="both">Both</option>
                                </select>
                            </div>
                        </>
                    )}

                    {role === "beneficiary" && (
                        <>
                            <div>
                                <label className="block font-semibold mb-1">
                                    Hospital Name
                                </label>
                                <input
                                    type="text"
                                    name="hospitalName"
                                    value={form.hospitalName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">
                                    Registration Number
                                </label>
                                <input
                                    type="text"
                                    name="registrationNumber"
                                    value={form.registrationNumber}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block font-semibold mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
