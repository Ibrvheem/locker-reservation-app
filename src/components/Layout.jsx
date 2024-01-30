import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AdminLogin from "../pages/AdminLogin";
import EditProfile from "../pages/EditProfile";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import PendingReservations from "../pages/PendingReservations";
import ReservedLockers from "../pages/ReservedLockers";

const Layout = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/pending" element={<PendingReservations />} />
        <Route path="/reserved" element={<ReservedLockers />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </Box>
  );
};

export default Layout;
