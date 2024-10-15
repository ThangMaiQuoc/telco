import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
import Upload from "./components/Upload";
import AdminLogin from "./components/Adminlogin";
import AdminDashboard from "./components/AdminDashboard";
import SignUp from "./components/SignUp";
import UseGuide from "./components/useGuide";

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Upload />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/use-guide" element={<UseGuide />} />
            {/* <Route path="/upload" element={<Upload />} /> */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
         </Routes>
      </Router>
   );
}

export default App;
