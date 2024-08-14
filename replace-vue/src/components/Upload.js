import React, { useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import UploadBasic from "./UploadFile";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { PhoneFilled } from "@ant-design/icons";

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
            const uploadedImagePath = fileList[0].response.path.split("/").pop();
            // console.log("Image uploaded:", uploadedImagePath);

            const imageBonusResponse = await axios.post(
               "http://47.236.52.161:8099/api/v1/consumer/upload/image-bonus",
               {
                  phone: values.phoneNumber,
                  image: uploadedImagePath,
               },
               {
                  headers: {
                     Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
               }
            );

            if (imageBonusResponse.data) {
               // alert("Bonus image uploaded successfully!");
               message.success("Bonus image uploaded successfully!");

               window.location.reload(); // Refresh lại trang
            } else {
               // alert("Bonus image upload failed.");
               message.error("Bonus image upload failed.");
            }
         } else {
            // alert("Image upload failed.");
            message.error("Image upload failed.");
         }
      } catch (error) {
         console.error("Upload failed:", error);
         // alert("Upload failed.");
         message.error("Upload failed.");
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
               {/* <div className="">
                  <label className="text-sm font-bold text-gray-500 tracking-wide">Phone Number: </label>
                  <input
                     value={phoneNumber}
                     onChange={(e) => setPhoneNumber(e.target.value)}
                     className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                     type="tel"
                     placeholder="Enter your phone number"
                     required
                  />
               </div> */}
               <Form.Item
                  name="phoneNumber"
                  // label="Phone Number"
                  rules={[
                     {
                        required: true,
                        message: "Please enter your phone number!",
                     },
                     // {
                     //    pattern: /^09\d{9}$|^0\d{2}\d{7}$|^0\d{1}\d{7}$/,
                     //    message: "Please enter a valid phone number!",
                     // },
                  ]}
               >
                  {/* <label className="text-sm font-bold text-gray-500 tracking-wide">Phone Number: </label> <br /> */}
                  <Input
                     prefix={<PhoneFilled />}
                     style={{ width: "300px" }}
                     size="large"
                     placeholder="Enter your phone number"
                  />
               </Form.Item>

               {/* <div className=" space-y-2">
                  <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Picture</label>
                  <div className="flex items-center justify-center w-full">
                     <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center relative">
                        <div className="h-full w-full text-center flex flex-col items-center justify-center">
                           {previewImage ? (
                              <img
                                 src={previewImage}
                                 className="absolute inset-0 w-full h-full object-contain"
                                 alt=""
                              />
                           ) : (
                              <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                 <img
                                    className="has-mask h-36 object-center"
                                    src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                                    alt=""
                                 />
                              </div>
                           )}
                           {!previewImage && (
                              <p className="pointer-none text-gray-500">
                                 <span className="text-sm">Drag and drop</span> files here <br /> or{" "}
                                 <a
                                    href="/"
                                    className="text-blue-600 hover:underline"
                                    onClick={(e) => {
                                       e.preventDefault();
                                       selectFile();
                                    }}
                                 >
                                    select a file
                                 </a>{" "}
                                 from your computer
                              </p>
                           )}
                        </div>
                        <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} />
                     </label>
                  </div>
               </div>

               <p className="text-sm text-gray-300">
                  <span>File type: doc, pdf, types of images</span>
               </p> */}

               <div className="upload-basic">
                  <UploadBasic setFileList={setFileList} fileList={fileList} />
               </div>
               {isUpload && <p style={{ colo: "red" }}>Please choose picture</p>}
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
