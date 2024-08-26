import React, { useEffect, useState } from "react";
import axios from "axios";
import TableData from "./TableData";
import { Button, Image, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
   const [uploads, setUploads] = useState([]);
   const [spin, setSpin] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
         setTimeout(() => {
            message.error("You must log in first!");
            navigate("/admin");
         }, 1500);
      }
   });

   useEffect(() => {
      const fetchUploads = async () => {
         setSpin(true);
         try {
            const token = localStorage.getItem("adminToken");
            const response = await axios.get("http://47.236.52.161:8099/api/v1/admin/upload/information?size=1000", {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });
            // const sortedData = response.data.sort((a, b) => {
            //    if (a.status === "WAITING_FOR_APPROVED" && b.status !== "WAITING_FOR_APPROVED") {
            //       return -1;
            //    } else if (a.status !== "WAITING_FOR_APPROVED" && b.status === "WAITING_FOR_APPROVED") {
            //       return 1;
            //    }
            //    return 0;
            // });
            setUploads(response.data);
            setSpin(false);
         } catch (error) {
            setSpin(false);
            message.error("An error occurred. Please try again later!");
            // console.error("Error fetching upload information:", error);
         }
      };

      fetchUploads();
   }, []);

   // const getStatusClass = (status) => {
   //    switch (status) {
   //       case "REJECTED":
   //          // return "text-warning bg-warning-subtle";
   //          return (
   //             <div
   //                className={`text-danger bg-danger-subtle d-inline px-2 py-1 rounded fw-semibold `}
   //                style={{ fontSize: "12px" }}
   //             >
   //                {/* WAITING FOR APPROVED */} REJECTED
   //             </div>
   //          );
   //       case "APPROVED":
   //          return (
   //             <div
   //                className={`text-success bg-success-subtle d-inline px-2 py-1 rounded fw-semibold `}
   //                style={{ fontSize: "12px" }}
   //             >
   //                APPROVED
   //             </div>
   //          );
   //       case "WAITING_FOR_REVIEWER_APPROVED":
   //       case "WAITING_FOR_REVIEWER_REJECT":
   //          return (
   //             <div
   //                className={`text-warning bg-warning-subtle d-inline px-2 py-1 rounded fw-semibold `}
   //                style={{ fontSize: "12px" }}
   //             >
   //                PENDING REVIEWER
   //             </div>
   //          );
   //       case "REVIEWER_APPROVED_ADMIN_REJECTED":
   //          return (
   //             <>
   //                <div
   //                   className={`text-secondary bg-secondary-subtle d-inline px-2 py-1 rounded fw-semibold mb-1`}
   //                   style={{ fontSize: "12px" }}
   //                >
   //                   ADMIN REJECTED
   //                </div>
   //                <br />
   //                <div
   //                   className={`text-secondary bg-secondary-subtle d-inline px-2 py-1 rounded fw-semibold `}
   //                   style={{ fontSize: "12px" }}
   //                >
   //                   REVIEWER APPROVED
   //                </div>
   //             </>
   //          );
   //       case "REVIEWER_REJECTED_ADMIN_APPROVED":
   //          return (
   //             <>
   //                <div
   //                   className={`text-secondary bg-secondary-subtle d-inline px-2 py-1 rounded fw-semibold mb-1`}
   //                   style={{ fontSize: "12px" }}
   //                >
   //                   ADMIN APPROVED
   //                </div>
   //                <br />
   //                <div
   //                   className={`text-secondary bg-secondary-subtle d-inline px-2 py-1 rounded fw-semibold `}
   //                   style={{ fontSize: "12px" }}
   //                >
   //                   REVIEWER REJECTED
   //                </div>
   //             </>
   //          );
   //       default:
   //          return (
   //             <div
   //                className={`text-success bg-success-subtle d-inline px-2 py-1 rounded fw-semibold `}
   //                style={{ fontSize: "12px" }}
   //             >
   //                APPROVED
   //             </div>
   //          );
   //    }
   // };

   const getStatusClass = (status) => {
      switch (status) {
         case "REJECTED":
            // return "text-warning bg-warning-subtle";
            return (
               <div
                  className={`text-danger bg-danger-subtle d-inline px-2 py-1 rounded fw-semibold `}
                  style={{ fontSize: "12px" }}
               >
                  {/* WAITING FOR APPROVED */} REJECTED
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
         case "WAITING_FOR_APPROVED":
         case "WAITING_FOR_REVIEWER_REJECT":
            return (
               <div
                  className={`text-warning bg-warning-subtle d-inline px-2 py-1 rounded fw-semibold `}
                  style={{ fontSize: "12px" }}
               >
                  PENDING
               </div>
            );
         case "REVIEWER_APPROVED_ADMIN_REJECTED":
            return (
               <>
                  <div
                     className={`text-secondary bg-secondary-subtle d-inline px-2 py-1 rounded fw-semibold mb-1`}
                     style={{ fontSize: "12px" }}
                  >
                     ADMIN REJECTED
                  </div>
                  <br />
                  <div
                     className={`text-secondary bg-secondary-subtle d-inline px-2 py-1 rounded fw-semibold `}
                     style={{ fontSize: "12px" }}
                  >
                     REVIEWER APPROVED
                  </div>
               </>
            );
         case "REVIEWER_REJECTED_ADMIN_APPROVED":
            return (
               <>
                  <div
                     className={`text-secondary bg-secondary-subtle d-inline px-2 py-1 rounded fw-semibold mb-1`}
                     style={{ fontSize: "12px" }}
                  >
                     ADMIN APPROVED
                  </div>
                  <br />
                  <div
                     className={`text-secondary bg-secondary-subtle d-inline px-2 py-1 rounded fw-semibold `}
                     style={{ fontSize: "12px" }}
                  >
                     REVIEWER REJECTED
                  </div>
               </>
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

   const handleUnApprove = async (id) => {
      try {
         const token = localStorage.getItem("adminToken");
         // Gửi yêu cầu PUT để thay đổi trạng thái
         await axios.put(
            `http://47.236.52.161:8099/api/v1/admin/upload/${id}/REJECTED`,
            {},
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         // Làm mới dữ liệu sau khi cập nhật
         const response = await axios.get("http://47.236.52.161:8099/api/v1/admin/upload/information?size=1000", {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         setUploads(response.data);
      } catch (error) {
         console.error("Error approving upload:", error);
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
         const response = await axios.get("http://47.236.52.161:8099/api/v1/admin/upload/information?size=1000", {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         setUploads(response.data);
      } catch (error) {
         console.error("Error approving upload:", error);
      }
   };

   const handleLogout = () => {
      localStorage.removeItem("adminToken");
      setTimeout(() => {
         message.success("Logout successfully!");
         navigate("/admin");
      }, 2000);
   };

   // const handleChangeStatusAdmin = async (id, status) => {
   //    try {
   //       const token = localStorage.getItem("adminToken");
   //       // Gửi yêu cầu PUT để thay đổi trạng thái
   //       await axios.put(
   //          `http://47.236.52.161:8099/api/v1/admin/upload/${id}/${status}`,
   //          {},
   //          {
   //             headers: {
   //                Authorization: `Bearer ${token}`,
   //             },
   //          }
   //       );
   //       // Làm mới dữ liệu sau khi cập nhật
   //       const response = await axios.get("http://47.236.52.161:8099/api/v1/admin/upload/information?size=1000", {
   //          headers: {
   //             Authorization: `Bearer ${token}`,
   //          },
   //       });
   //       setUploads(response.data);
   //       message.success("Successfully!");
   //       setSpin(false);
   //    } catch (error) {
   //       // console.error("Error approving upload:", error);
   //       message.error("An error occurred. Please try again later!", 3);
   //       setSpin(false);
   //    }
   // };

   // const handleChangeStatusReviewer = async (id, status) => {
   //    try {
   //       const token = localStorage.getItem("adminToken");
   //       // Gửi yêu cầu PUT để thay đổi trạng thái
   //       await axios.put(
   //          `http://47.236.52.161:8099/api/v1/admin/upload/review/${id}/${status}`,
   //          {},
   //          {
   //             headers: {
   //                Authorization: `Bearer ${token}`,
   //             },
   //          }
   //       );
   //       // Làm mới dữ liệu sau khi cập nhật
   //       const response = await axios.get("http://47.236.52.161:8099/api/v1/admin/upload/information?size=1000", {
   //          headers: {
   //             Authorization: `Bearer ${token}`,
   //          },
   //       });
   //       setUploads(response.data);
   //       message.success("Successfully!", 3);
   //       setSpin(false);
   //    } catch (error) {
   //       // console.error("Error approving upload:", error);
   //       message.error("An error occurred. Please try again later!", 3);
   //       setSpin(false);
   //    }
   // };

   // const handleChange = (id, status, adminAStatus) => {
   //    if (adminAStatus !== null) {
   //       handleChangeStatusReviewer(id, status);
   //    } else {
   //       handleChangeStatusAdmin(id, status);
   //    }
   // };

   const columns = [
      {
         title: "ID",
         width: 50,
         dataIndex: "id",
         align: "center",
         key: "index",
         render: (text, _record, _index) => {
            return text;
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
               <Image.PreviewGroup>
                  {/* Hình ảnh đầu tiên đại diện */}
                  <Image
                     width={80}
                     height={80}
                     src={`http://47.236.52.161:8099/api/v1/consumer/public/logo/${imageArray[0]}`}
                     alt="Image title"
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
         render: (_text, record, _index) => {
            return (
               <>
                  {record.status === "WAITING_FOR_APPROVED" && (
                     <>
                        <div className="flex space-x-2">
                           <Button
                              type="text"
                              onClick={() => handleApprove(record.id)}
                              style={{ color: "#22c55e", fontWeight: 600 }}
                           >
                              Approve
                           </Button>
                        </div>

                        <div className="flex space-x-2 bg-green-500">
                           <Button
                              // className="text-warning"
                              type="text"
                              danger
                              onClick={() => handleUnApprove(record.id)}
                              style={{ fontWeight: 600 }}
                           >
                              Reject
                           </Button>
                        </div>
                     </>
                  )}
               </>
               // <>
               //    {record.status === "APPROVED" ||
               //    record.status === "REJECTED" ||
               //    (record.status === "WAITING_FOR_REVIEWER_APPROVED" && record.adminAStatus !== "ADMIN_APPROVED") ||
               //    (record.status === "WAITING_FOR_REVIEWER_REJECT" && record.adminAStatus !== "ADMIN_REJECT") ? (
               //       ""
               //    ) : (
               //       <>
               //          <div className="flex space-x-2">
               //             <Button
               //                type="text"
               //                onClick={() => {
               //                   setSpin(true);
               //                   handleChange(record.id, "APPROVED", record.adminAStatus);
               //                }}
               //                style={{ color: "#22c55e", fontWeight: 600 }}
               //             >
               //                Approve
               //             </Button>
               //          </div>

               //          <div className="flex space-x-2 bg-green-500">
               //             <Button
               //                // className="text-warning"
               //                type="text"
               //                danger
               //                onClick={() => {
               //                   setSpin(true);
               //                   handleChange(record.id, "REJECTED", record.adminAStatus);
               //                }}
               //                style={{ fontWeight: 600 }}
               //             >
               //                Reject
               //             </Button>
               //          </div>
               //       </>
               //    )}
               // </>
            );
         },
      },
   ];

   return (
      <div className="container mx-auto p-6">
         <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
            <Button
               // className="text-warning"
               type="text"
               onClick={handleLogout}
               style={{ fontWeight: 600 }}
            >
               Logout
            </Button>
         </div>
         <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Spin spinning={spin}>
               <TableData data={uploads} columns={columns} scrollX={700} />
            </Spin>
         </div>
      </div>
   );
};

export default AdminDashboard;
