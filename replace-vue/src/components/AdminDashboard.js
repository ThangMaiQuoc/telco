import React, { useEffect, useState } from "react";
import axios from "axios";
import TableData from "./TableData";
import { Button, Image } from "antd";

const AdminDashboard = () => {
   const [uploads, setUploads] = useState([]);

   useEffect(() => {
      const fetchUploads = async () => {
         try {
            const token = localStorage.getItem("adminToken");
            const response = await axios.get("http://47.236.52.161:8099/api/v1/admin/upload/information?size=1000", {
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

   const getStatusClass = (status) => {
      switch (status) {
         case "WAITING_FOR_APPROVED":
            // return "text-warning bg-warning-subtle";
            return (
               <div
                  className={`text-warning bg-warning-subtle d-inline px-2 py-1 rounded fw-semibold `}
                  style={{ fontSize: "12px" }}
               >
                  {/* WAITING FOR APPROVED */} PENDING
               </div>
            );
         case "APPROVED":
            return (
               <div
                  className={`text-success bg-success-subtle d-inline px-2 py-1 rounded fw-semibold `}
                  style={{ fontSize: "12px" }}
               >
                  APPROVED
               </div>
            );
         default:
            return (
               <div
                  className={`text-success bg-success-subtle d-inline px-2 py-1 rounded fw-semibold `}
                  style={{ fontSize: "12px" }}
               >
                  APPROVED
               </div>
            );
      }
   };

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

   const handleUnApprove = async (id) => {
      try {
         const token = localStorage.getItem("adminToken");
         // Gửi yêu cầu PUT để thay đổi trạng thái
         await axios.put(
            `http://47.236.52.161:8099/api/v1/admin/upload/${id}/WAITING_FOR_APPROVED`,
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
         align: "center",
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
         // align: "center",
         // fixed: "left",
         filterSearch: true,
      },
      {
         title: "Total Money",
         width: 120,
         dataIndex: "totalMoney",
         key: "totalMoney",
         align: "center",
         // fixed: "left",
         filterSearch: true,
      },
      {
         title: "Image",
         width: 100,
         dataIndex: "imageTitle",
         key: "imageTitle",
         align: "center",
         render: (_text, record, _index) => {
            const imageArray = record.image.split(",");
            return (
               // <Image
               //    width={100}
               //    height={100}
               //    src={`http://47.236.52.161:8099/api/v1/consumer/public/logo/${record.image}`}
               //    alt="Hình ảnh"
               //    className="w-20 h-20 object-cover rounded-lg"
               // />
               <Image.PreviewGroup>
                  {/* Hình ảnh đầu tiên đại diện */}
                  <Image
                     width={80}
                     height={80}
                     src={`http://47.236.52.161:8099/api/v1/consumer/public/logo/${imageArray[0]}`}
                     alt="Hình ảnh đại diện"
                     className="w-20 h-20 object-cover rounded-lg"
                  />
                  {/* Các hình ảnh khác trong preview group (ẩn, chỉ sử dụng khi preview) */}
                  {imageArray.slice(1).map((img, index) => (
                     <Image
                        key={index}
                        src={`http://47.236.52.161:8099/api/v1/consumer/public/logo/${img}`}
                        alt={`Image ${index + 2}`}
                        style={{ display: "none" }} // Ẩn các hình ảnh này khỏi hiển thị ban đầu
                     />
                  ))}
               </Image.PreviewGroup>
            );
         },
         // fixed: "left",
         // sorter: true,
         // filterSearch: true,
      },

      {
         title: "Username",
         width: 100,
         dataIndex: "userName",
         key: "userName",
         align: "center",
         // fixed: "left",
         filterSearch: true,
         render: (text, _record, _index) => {
            return <>{text ? text : "N/A"}</>;
         },
      },
      {
         title: "Status",
         width: 200,
         dataIndex: "status",
         key: "status",
         // fixed: "left",
         align: "center",
         filterSearch: true,
         render: (text, _record, _index) => {
            return getStatusClass(text);
         },
      },

      {
         title: "Action",
         key: "operation",
         // fixed: "right",
         width: 100,
         render: (_text, record, _index) => (
            <>
               {record.status === "WAITING_FOR_APPROVED" ? (
                  <div className="flex space-x-2">
                     <Button
                        type="text"
                        onClick={() => handleApprove(record.id)}
                        style={{ color: "#22c55e", fontWeight: 600 }}
                     >
                        Approve
                     </Button>
                  </div>
               ) : (
                  <div className="flex space-x-2 bg-green-500">
                     <Button
                        // className="text-warning"
                        type="text"
                        danger
                        onClick={() => handleUnApprove(record.id)}
                        style={{ fontWeight: 600 }}
                     >
                        Disapprove
                     </Button>
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
         </div>
      </div>
   );
};

export default AdminDashboard;
