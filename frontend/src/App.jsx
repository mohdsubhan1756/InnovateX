// import React from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';

// import Home from './pages/Home'
// import Login from './pages/Login';
// import Register from './pages/Register';
// import DonorDashboard from './pages/donor/DonorDashboard';
// import BeneficiaryDashboard from './pages/beneficiary/BeneficiaryDashboard';
// import Navbar from './components/Navbar';
// import Profile from './pages/Profile';
// import AddPatient from './pages/beneficiary/AddPatient';
// import ViewPatients from './pages/beneficiary/ViewPatients';
// import DonateBlood from './pages/donor/DonateBlood';
// import ViewBloodDonationRequests from './pages/beneficiary/ViewBloodDonationRequests';
// import ViewOrganDonationRequests from './pages/beneficiary/ViewOrganDonationRequests';
// import DonateOrgan from './pages/donor/DonateOrgan';

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/donor/dashboard' element={<DonorDashboard />} />
//         <Route path='/beneficiary/dashboard' element={<BeneficiaryDashboard />} />
//         <Route path='/profile' element={<Profile />} />
//         <Route path='/beneficiary/addpatient' element={<AddPatient />} />
//         <Route path='/beneficiary/viewpatients' element={<ViewPatients />} />
//         <Route path='/donor/donateblood' element={<DonateBlood />} />
//         <Route path='/donor/view-blood-donation-requests' element={<ViewBloodDonationRequests />} />
//         <Route path='/donor/view-organ-donation-requests' element={<ViewOrganDonationRequests />} />
//         <Route path='/donor/donate-organ' element={<DonateOrgan />} />
//         {/* <Route path='/donor/view-organ-donation-requests' element={<ViewOrganDonationRequests />} /> */}


//       </Routes>
//       <Toaster />
//     </BrowserRouter>
//   )
// }

// export default App





// import React from 'react'
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';

// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import DonorDashboard from './pages/donor/DonorDashboard';
// import BeneficiaryDashboard from './pages/beneficiary/BeneficiaryDashboard';
// import Navbar from './components/Navbar';
// import Profile from './pages/Profile';
// import AddPatient from './pages/beneficiary/AddPatient';
// import ViewPatients from './pages/beneficiary/ViewPatients';
// import DonateBlood from './pages/donor/DonateBlood';
// import ViewBloodDonationRequests from './pages/beneficiary/ViewBloodDonationRequests';
// import ViewOrganDonationRequests from './pages/beneficiary/ViewOrganDonationRequests';
// import DonateOrgan from './pages/donor/DonateOrgan';
// import Records from './pages/beneficiary/Records';
// import StartCampaign from './pages/beneficiary/StartCampaign';

// // Simple role-based route wrapper
// const ProtectedRoute = ({ children, role }) => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   if (!user) return <Navigate to="/login" />;
//   if (role && user.role !== role) return <Navigate to="/login" />;
//   return children;
// };

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         {/* Public Routes */}
//         <Route path='/' element={<Home />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/register' element={<Register />} />

//         {/* Donor Routes */}
//         <Route
//           path='/donor/dashboard'
//           element={
//             <ProtectedRoute role="donor">
//               <DonorDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/donor/donateblood'
//           element={
//             <ProtectedRoute role="donor">
//               <DonateBlood />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/donor/donate-organ'
//           element={
//             <ProtectedRoute role="donor">
//               <DonateOrgan />
//             </ProtectedRoute>
//           }
//         />

//         {/* Beneficiary Routes */}
//         <Route
//           path='/beneficiary/dashboard'
//           element={
//             <ProtectedRoute role="beneficiary">
//               <BeneficiaryDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/beneficiary/start-campaign'
//           element={
//             <ProtectedRoute role="beneficiary">
//               <StartCampaign />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/admin/records'
//           element={
//             <ProtectedRoute role="beneficiary">
//               <Records />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/beneficiary/addpatient'
//           element={
//             <ProtectedRoute role="beneficiary">
//               <AddPatient />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/beneficiary/viewpatients'
//           element={
//             <ProtectedRoute role="beneficiary">
//               <ViewPatients />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/donor/view-blood-donation-requests'
//           element={
//             <ProtectedRoute role="beneficiary">
//               <ViewBloodDonationRequests />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path='/donor/view-organ-donation-requests'
//           element={
//             <ProtectedRoute role="beneficiary">
//               <ViewOrganDonationRequests />
//             </ProtectedRoute>
//           }
//         />

//         {/* Common */}
//         <Route
//           path='/profile'
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />

//         {/* Catch-all redirect */}
//         <Route path='*' element={<Navigate to="/" />} />
//       </Routes>
//       <Toaster />
//     </BrowserRouter>
//   )
// }

// export default App;

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DonorDashboard from './pages/donor/DonorDashboard';
import BeneficiaryDashboard from './pages/beneficiary/BeneficiaryDashboard';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import AddPatient from './pages/beneficiary/AddPatient';
import ViewPatients from './pages/beneficiary/ViewPatients';
import DonateBlood from './pages/donor/DonateBlood';
import ViewBloodDonationRequests from './pages/beneficiary/ViewBloodDonationRequests';
import ViewOrganDonationRequests from './pages/beneficiary/ViewOrganDonationRequests';
import DonateOrgan from './pages/donor/DonateOrgan';
import Records from './pages/beneficiary/Records';
import StartDonationCampaign from './pages/beneficiary/StartDonationCampaign';
import MyDonations from './pages/donor/MyDonations';
import CampaignAnalysis from './pages/beneficiary/CampaignAnalysis';
import ViewCampaigns from './pages/beneficiary/ViewCampaigns';
import DonateInCampaign from './pages/donor/DonateInCampaign';

// Role-based route wrapper
const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Donor Routes */}
        <Route
          path='/donor/dashboard'
          element={
            <ProtectedRoute role="donor">
              <DonorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/donor/donateblood'
          element={
            <ProtectedRoute role="donor">
              <DonateBlood />
            </ProtectedRoute>
          }
        />
        <Route
          path='/donor/donate-organ'
          element={
            <ProtectedRoute role="donor">
              <DonateOrgan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor/donate-in-campaigns"
          element={
            <ProtectedRoute role="donor">
              <DonateInCampaign />
            </ProtectedRoute>
          }
        />
        <Route
          path='/donor/my-donations'
          element={
            <ProtectedRoute role="donor">
              <MyDonations />
            </ProtectedRoute>
          }
        />

        {/* Beneficiary Routes */}
        <Route
          path='/beneficiary/dashboard'
          element={
            <ProtectedRoute role="beneficiary">
              <BeneficiaryDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/beneficiary/start-campaign'
          element={
            <ProtectedRoute role="beneficiary">
              <StartDonationCampaign />
            </ProtectedRoute>
          }
        />
        <Route
          path='/beneficiary/view-campaigns'
          element={
            <ProtectedRoute role="beneficiary">
              <ViewCampaigns />
            </ProtectedRoute>
          }
        />
        <Route
          path='/beneficiary/campaign/:id'
          element={
            <ProtectedRoute role="beneficiary">
              <CampaignAnalysis />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/records'
          element={
            <ProtectedRoute role="beneficiary">
              <Records />
            </ProtectedRoute>
          }
        />
        <Route
          path='/beneficiary/addpatient'
          element={
            <ProtectedRoute role="beneficiary">
              <AddPatient />
            </ProtectedRoute>
          }
        />
        <Route
          path='/beneficiary/viewpatients'
          element={
            <ProtectedRoute role="beneficiary">
              <ViewPatients />
            </ProtectedRoute>
          }
        />
        <Route
          path='/donor/view-blood-donation-requests'
          element={
            <ProtectedRoute role="beneficiary">
              <ViewBloodDonationRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path='/donor/view-organ-donation-requests'
          element={
            <ProtectedRoute role="beneficiary">
              <ViewOrganDonationRequests />
            </ProtectedRoute>
          }
        />

        {/* Common */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect */}
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
