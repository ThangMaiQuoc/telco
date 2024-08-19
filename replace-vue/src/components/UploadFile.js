import React from "react";
import { Button, Upload, message } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";
import "../assets/css/upload.css";

const UploadBasic = ({ fileList, setFileList, maxCount = 100 }) => {
   const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
   };

   const onPreview = async (file) => {
      let src = file.url;
      if (!src) {
         src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
         });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
   };

   const customUpload = async (options) => {
      const { onSuccess, onError, file } = options;

      const formData = new FormData();
      formData.append("file", file);

      try {
         const response = await fetch("http://47.236.52.161:8099/api/v1/consumer/upload", {
            method: "POST",
            body: formData,
            // headers: {
            //    // "Content-Type": "multipart/form-data", // Commented out since fetch handles this automatically
            //    Authorization: `Bearer ${localStorage.getItem("token")}`,
            // },
         });

         if (response.ok) {
            const responseData = await response.json();
            onSuccess(responseData, file);
            message.success("Upload successful!");
         } else {
            onError(new Error("Upload failed"));
            message.error("Upload failed. Please try again.");
         }
      } catch (error) {
         onError(error);
         message.error("Upload failed. Please check your connection.");
      }
   };

   return (
      <>
         <div
            className={`mobile ${
               fileList.length < maxCount && fileList.length !== 0 && "multiple-img"
            } d-block d-lg-none`}
         >
            <Upload
               customRequest={customUpload}
               listType="picture-card"
               fileList={fileList}
               onChange={onChange}
               onPreview={onPreview}
               maxCount={maxCount}
               accept="image/*"
               multiple={true}
            >
               {fileList.length < maxCount && fileList.length !== 0 && (
                  <div className="d-flex justify-center items-center flex-column">
                     <p className="mb-1">
                        <CloudUploadOutlined style={{ fontSize: "30px" }} />
                     </p>
                     <p className="fw-bold mb-1">Choose a file or drag & drop it here</p>
                     <Button className="mx-3 px-1">Browse file</Button>
                  </div>
               )}

               {fileList.length < maxCount && fileList.length === 0 && (
                  <div className="d-flex justify-center items-center flex-column">
                     <p>
                        <img
                           className="has-mask h-10 object-center"
                           src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                           alt=""
                        />
                     </p>
                     <p className="text-xl font-bold mb-0 fw-bold">Choose a file or drag & drop it here</p>
                     <p className="text-gray-500">Supported formats: .jpeg, .jpg, .png</p>
                     <Button className="mt-2 mx-5">Browse file</Button>
                  </div>
               )}
            </Upload>
         </div>
         <div
            className={`tablet-pc_screens ${
               fileList.length < maxCount && fileList.length !== 0 && "multiple-img"
            }  d-none d-lg-block`}
         >
            <Upload
               customRequest={customUpload}
               listType="picture-card"
               fileList={fileList}
               onChange={onChange}
               onPreview={onPreview}
               maxCount={maxCount}
               accept="image/*"
               multiple={true}
            >
               {fileList.length < maxCount && fileList.length !== 0 && (
                  <div className="d-flex justify-center items-center flex-column">
                     <p className="mb-1">
                        <CloudUploadOutlined style={{ fontSize: "30px" }} />
                     </p>
                     <p className="fw-bold mb-1">Choose a file or drag & drop it here</p>
                     <Button className="mx-4 px-1">Browse file</Button>
                  </div>
               )}
               {fileList.length < maxCount && fileList.length === 0 && (
                  <div className="d-flex justify-center items-center">
                     <img
                        className="w-100 has-mask h-100 object-center"
                        src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                        alt=""
                        style={{ minHeight: "400px", minWidth: "400px" }}
                     />
                     <div
                        className="d-flex justify-center justify-content-center items-center flex-column"
                        style={{ minHeight: "400px", minWidth: "400px" }}
                     >
                        <p>
                           <CloudUploadOutlined style={{ fontSize: "50px" }} />
                        </p>
                        <p className="text-xl h5 mb-1 fw-bold">Choose a file or drag & drop it here</p>
                        <p className="text-gray-500 text-body-secondary">Supported formats: .JPEG, .JPG, .PNG</p>
                        <Button className="mt-2 mx-5">Browse file</Button>
                     </div>
                  </div>
               )}
            </Upload>
         </div>
      </>
   );
};

export default UploadBasic;
