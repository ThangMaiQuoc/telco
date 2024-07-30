import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import 'tailwindcss/tailwind.css';
import { PulseLoader } from 'react-spinners'; // Import spinner từ react-spinners

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Bắt đầu quá trình tải dữ liệu
    try {
      const response = await axios.post('https://uploadimage-1002.onrender.com/api/v1/consumer/authenticate', {
        username: email,
        password: password,
      });

      if (response.data) {
        const { token } = response.data;
        localStorage.setItem('token', token); // Lưu token vào localStorage
        console.log('Login successful:', response.data);
        navigate('/upload'); // Chuyển hướng đến màn hình upload
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Hiển thị thông báo lỗi nếu cần thiết
    } finally {
      setLoading(false); // Kết thúc quá trình tải dữ liệu
    }
  };

  const handleAdminLogin = () => {
    navigate('/admin'); // Chuyển hướng đến trang admin
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="mt-5 text-3xl font-bold text-gray-900">Login</h2>
          <p className="mt-2 text-sm text-gray-400">Please enter your credentials to login</p>
        </div>
        <form className="mt-8 space-y-6 d-flex flex-column align-items-center" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-base p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 w-full"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-base p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 w-full"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              disabled={loading} // Vô hiệu hóa nút khi đang tải dữ liệu
            >
              {loading ? (
                <PulseLoader size={10} color="#fff" /> // Hiển thị spinner khi đang tải dữ liệu
              ) : (
                'Login'
              )}
            </button>
          </div>
          <div>
            <button
              onClick={handleAdminLogin}
              className="my-5 w-full flex justify-center bg-red-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-red-600 shadow-lg cursor-pointer transition ease-in duration-300 d-flex flex-column align-items-center"
            >
              Login as Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
