import React, { useEffect, useState } from "react";
import axios from "axios";
import TableData from "./TableData";
import { Image } from "antd";

const AdminDashboard = () => {
   const [uploads, setUploads] = useState([]);

   useEffect(() => {
      const fetchUploads = async () => {
         try {
            const token = localStorage.getItem("adminToken");
            const response = await axios.get("http://47.236.52.161:8099/api/v1/admin/upload/information", {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });
            setUploads(response.data);
         } catch (error) {
            console.error("Error fetching upload information:", error);
         }
      };

      fetchUploads();
   }, []);

   //  const getStatusClass = (status) => {
   //     switch (status) {
   //        case "WAITING_FOR_APPROVED":
   //           return "bg-yellow-400 text-yellow-800";
   //        case "APPROVED":
   //           return "bg-green-500 text-black";
   //        default:
   //           return "bg-gray-300 text-gray-800";
   //     }
   //  };

   const handleApprove = async (id) => {
      try {
         const token = localStorage.getItem("adminToken");
         // Gửi yêu cầu PUT để thay đổi trạng thái
         await axios.put(
            `http://47.236.52.161:8099/api/v1/admin/upload/${id}/APPROVED`,
            {},
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         // Làm mới dữ liệu sau khi cập nhật
         const response = await axios.get("http://47.236.52.161:8099/api/v1/admin/upload/information", {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         setUploads(response.data);
      } catch (error) {
         console.error("Error approving upload:", error);
      }
   };

   const columns = [
      {
         title: "ID",
         width: 50,
         dataIndex: "index",
         key: "index",
         render: (_text, _record, index) => {
            return index + 1;
         },
      },
      {
         title: "Phone",
         width: 100,
         dataIndex: "phone",
         key: "phone",
         // fixed: "left",
         filterSearch: true,
      },
      {
         title: "Total Money",
         width: 120,
         dataIndex: "totalMoney",
         key: "totalMoney",
         // fixed: "left",
         filterSearch: true,
      },
      {
         title: "Image",
         width: 100,
         dataIndex: "imageTitle",
         key: "imageTitle",
         render: (_text, record, _index) => {
            return (
               <Image
                  width={100}
                  height={100}
                  src={`http://47.236.52.161:8099/api/v1/consumer/public/logo/${record.image}`}
                  alt="Hình ảnh"
                  className="w-20 h-20 object-cover rounded-lg"
               />
               //  <img
               //     src={`http://47.236.52.161:8099/api/v1/consumer/public/logo/${record.image}`}
               //     alt="Upload"
               //     className="w-20 h-20 object-cover rounded-lg"
               //  />
            );
         },
         // fixed: "left",
         // sorter: true,
         // filterSearch: true,
      },

      {
         title: "User ID",
         width: 100,
         dataIndex: "userId",
         key: "userId",
         // fixed: "left",
         filterSearch: true,
      },
      {
         title: "Status",
         width: 200,
         dataIndex: "status",
         key: "status",
         // fixed: "left",
         filterSearch: true,
      },

      {
         title: "Action",
         key: "operation",
         // fixed: "right",
         width: 100,
         render: (_text, record, _index) => (
            <>
               {record.status === "WAITING_FOR_APPROVED" && (
                  <div className="flex space-x-2">
                     <button
                        onClick={() => handleApprove(record.id)}
                        className="bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                     >
                        Approve
                     </button>
                  </div>
               )}
            </>
         ),
      },
   ];

   // const handleReject = async (id) => {
   //   try {
   //     const token = localStorage.getItem('adminToken');
   //     await axios.post(`http://localhost:8099/api/v1/admin/upload/reject/${id}`, {}, {
   //       headers: {
   //         Authorization: `Bearer ${token}`
   //       }
   //     });
   //     const response = await axios.get('http://localhost:8099/api/v1/admin/upload/information', {
   //       headers: {
   //         Authorization: `Bearer ${token}`
   //       }
   //     });
   //     setUploads(response.data);
   //   } catch (error) {
   //     console.error('Error rejecting upload:', error);
   //   }
   // };

   return (
      <div className="container mx-auto p-6">
         <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
         <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <TableData data={uploads} columns={columns} scrollX={700} />
            {/* <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
               <thead className="bg-gray-100">
                  <tr>
                     <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300">ID</th>
                     <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300">Phone</th>
                     <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300">Total Money</th>
                     <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300">Image</th>
                     <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300">User ID</th>
                     <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300">Status</th>
                     <th className="py-3 px-4 text-left text-gray-600 border-b border-gray-300">Action</th>
                  </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                  {uploads.map((upload) => (
                     <tr key={upload.id}>
                        <td className="py-4 px-4 text-gray-700 border-b border-gray-300">{upload.id}</td>
                        <td className="py-4 px-4 text-gray-700 border-b border-gray-300">{upload.phone}</td>
                        <td className="py-4 px-4 text-gray-700 border-b border-gray-300">${upload.totalMoney}</td>
                        <td className="py-4 px-4 border-b border-gray-300">
                           <img
                              src={`http://47.236.52.161:8099/api/v1/consumer/public/logo/${upload.image}`}
                              alt="Upload"
                              className="w-20 h-20 object-cover rounded-lg"
                           />
                        </td>
                        <td className="py-4 px-4 text-gray-700 border-b border-gray-300">{upload.userId}</td>
                        <td
                           className={`py-4 px-4 ${getStatusClass(
                              upload.status
                           )} border-b border-gray-300 rounded-full text-center text-xs font-semibold`}
                        >
                           {upload.status}
                        </td>
                        <td className="py-4 px-4 border-b border-gray-300">
                           {upload.status === "WAITING_FOR_APPROVED" && (
                              <div className="flex space-x-2">
                                 <button
                                    onClick={() => handleApprove(upload.id)}
                                    className="bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                                 >
                                    Approve
                                 </button>
                              </div>
                           )}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table> */}
         </div>
      </div>
   );
};

export default AdminDashboard;
