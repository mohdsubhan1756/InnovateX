// import { useState } from "react";

// export default function Login() {
//     const [form, setForm] = useState({
//         email: "",
//         password: "",
//         role: "donor",
//     });

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const payload = {
//             email: form.email,
//             password: form.password,
//             role: form.role
//         };

//         try {
//             const res = await fetch("http://localhost:5000/api/auth/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(payload)
//             });

//             const data = await res.json();

//             if (!res.ok) {
//                 alert(data.message || "Login failed");
//                 return;
//             }

//             alert("Login successful!");

//             // ⭐ Store token + user object
//             localStorage.setItem("token", data.token);
//             localStorage.setItem("user", JSON.stringify(data.user));
//             localStorage.setItem("role", data.user.role);

//             // Redirect based on role
//             if (data.user.role === "donor") {
//                 window.location.href = "/donor/dashboard";
//             } else {
//                 window.location.href = "/beneficiary/dashboard";
//             }

//         } catch (error) {
//             console.error(error);
//             alert("Something went wrong. Try again.");
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//             <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//                 <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

//                 <form onSubmit={handleSubmit} className="space-y-4">

//                     {/* Role Selector */}
//                     <div>
//                         <label className="block font-semibold mb-1">Select Role</label>
//                         <select
//                             name="role"
//                             value={form.role}
//                             onChange={handleChange}
//                             className="w-full p-2 border rounded"
//                         >
//                             <option value="donor">Donor</option>
//                             <option value="beneficiary">Beneficiary (Hospital)</option>
//                         </select>
//                     </div>

//                     {/* Email */}
//                     <div>
//                         <label className="block font-semibold mb-1">Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={form.email}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-2 border rounded"
//                             placeholder="example@gmail.com"
//                         />
//                     </div>

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
//                             placeholder="Enter your password"
//                         />
//                     </div>

//                     {/* Submit */}
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//                     >
//                         Login
//                     </button>

//                 </form>
//             </div>
//         </div>
//     );
// }


import { useState } from "react";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        role: "donor",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            email: form.email,
            password: form.password,
            role: form.role
        };

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Login failed");
                return;
            }

            alert("Login successful!");

            // ⭐ Save entire user object + token + id + role
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("role", data.user.role);
            localStorage.setItem("userId", data.user._id);   // ⭐ Same as register

            console.log("Stored User on Login:", data.user);

            // ⭐ Redirect
            if (data.user.role === "donor") {
                window.location.href = "/donor/dashboard";
            } else {
                window.location.href = "/beneficiary/dashboard";
            }

        } catch (error) {
            console.error(error);
            alert("Something went wrong. Try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Role Selector */}
                    <div>
                        <label className="block font-semibold mb-1">Select Role</label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="donor">Donor</option>
                            <option value="beneficiary">Beneficiary (Hospital)</option>
                        </select>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                            placeholder="example@gmail.com"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block font-semibold mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
}