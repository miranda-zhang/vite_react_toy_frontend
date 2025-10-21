import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import DashboardPage from "./pages/DashboardPage";

// // A small mock of authentication state (replace later with real auth)
// const isAuthenticated = !!localStorage.getItem("token");

// In AppRoutes.jsx
export default function AppRoutes() {
  return <div>AppRoutes is working!</div>;
};

// export default function AppRoutes() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Home page shows Register/Login options */}
//         <Route path="/" element={<HomePage />} />

//         {/* Auth routes */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />

//         {/* Protected route example */}
//         <Route
//           path="/dashboard"
//           element={
//             isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />
//           }
//         />

//         {/* Catch-all for 404 */}
//         <Route path="*" element={<h2>404 – Page not found</h2>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
