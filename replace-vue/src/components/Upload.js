import React, { useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import UploadBasic from "./UploadFile";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { PhoneFilled, UserOutlined } from "@ant-design/icons";

const UploadForm = () => {
   const [fileList, setFileList] = useState([]);
   const [isUpload, setIsUpload] = useState(false);

   const [form] = useForm();

   const handleSubmit = async (values) => {
      if (!fileList || fileList.length < 1) {
         setIsUpload(true);
      } else {
         setIsUpload(false);
      }
      try {
         if (fileList && fileList) {
            const uploadedImagePath = fileList
               .map((item) => {
                  const path = item.response.path;
                  return path.split("/").pop(); // Lấy phần cuối của đường dẫn
               })
               .join(",");

            const imageBonusResponse = await axios.post(
               "http://47.236.52.161:8099/api/v1/consumer/upload/image-bonus",
               {
                  phone: values.phoneNumber,
                  image: uploadedImagePath,
                  userName: values.userName,
               },
               {}
            );

            if (imageBonusResponse.data) {
               // alert("Bonus image uploaded successfully!");
               message.success("Bonus image uploaded successfully!", 3);

               setTimeout(() => {
                  window.location.reload();
               }, 3000);
            } else {
               // alert("Bonus image upload failed.");
               message.error("Bonus image upload failed.", 5);
            }
         } else {
            // alert("Image upload failed.");
            message.error("Image upload failed.", 5);
         }
      } catch (error) {
         // console.error("Upload failed:", error?.response?.data?.title);
         // alert("Upload failed.");
         message.error(
            error?.response?.data?.title === "Unknown_mobile" ? "Unknown phone number" : "Username already exists",
            5
         );
      }
   };

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 min-vh-100">
         {/* <div>
            <span className="text-sm">Drag and drop</span> files here <br /> or
         </div> */}

         <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full min-vh-100">
            <div className="text-center">
               <h2 className="pt-4 text-3xl font-bold text-gray-900">Get Your Bonus</h2>
               <p className="mt-2 text-sm text-gray-400">Charge 50P Get 50 Fee.</p>
            </div>
            <Form form={form} onFinish={handleSubmit} className="mt-3  d-flex flex-column align-items-center">
               <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-4 mb-3">
                  <Form.Item
                     className="mb-0"
                     name="phoneNumber"
                     // label="Phone Number"
                     rules={[
                        {
                           required: true,
                           message: "Please enter your phone number!",
                        },
                     ]}
                  >
                     <Input
                        prefix={<PhoneFilled />}
                        style={{ width: "300px" }}
                        size="large"
                        placeholder="Enter your phone number"
                     />
                  </Form.Item>

                  <Form.Item
                     name="userName"
                     className="mb-0"
                     // label="Phone Number"
                     rules={[
                        {
                           required: true,
                           message: "Please enter your username!",
                        },
                     ]}
                  >
                     <Input
                        prefix={<UserOutlined />}
                        style={{ width: "300px" }}
                        size="large"
                        placeholder="Enter your username"
                     />
                  </Form.Item>
               </div>

               <div className="upload-basic">
                  <UploadBasic setFileList={setFileList} fileList={fileList} />
               </div>
               {isUpload && <p style={{ color: "red" }}>Please choose picture</p>}
               <div>
                  <Button
                     onClick={() => form.submit()}
                     // type="submit"
                     className="my-3 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                  >
                     Get Started
                  </Button>
               </div>
            </Form>
         </div>
      </div>
   );
};

export default UploadForm;
