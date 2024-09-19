import React from "react";
import { Button, Upload, message } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";
import "../assets/css/upload.css";

const UploadBasic = ({ fileList, setFileList, setIsUpload, maxCount = 100 }) => {
   const normalizeFileName = (name) => {
      return name
         .normalize("NFD") // Chuyển đổi thành dạng decomposed (phân tách dấu)
         .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu
         .replace(/đ/g, "d") // Thay thế đ thành d
         .replace(/Đ/g, "D") // Thay thế Đ thành D
         .replace(/[^a-zA-Z0-9.]/g, "_"); // Thay thế ký tự đặc biệt thành dấu gạch dưới "_"
   };
   const onChange = ({ fileList: newFileList }) => {
      setFileList(
         newFileList.map((item) => {
            const responsePath = item.response?.path || "";
            const splitPath = responsePath.split("/").pop();
            return {
               uid: item.uid,
               name: item.name,
               status: item.status,
               url: responsePath ? `${process.env.REACT_APP_API_PUBLIC}/api/v1/consumer/public/logo/${splitPath}` : "",
               thumbUrl: responsePath
                  ? `${process.env.REACT_APP_API_PUBLIC}/api/v1/consumer/public/logo/${splitPath}`
                  : "",
               response: item.response,
            };
         })
      );
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

      const newFileName = normalizeFileName(file.name);

      const newFile = new File([file], newFileName, { type: file.type });

      const formData = new FormData();
      formData.append("file", newFile);

      try {
         const response = await fetch(`${process.env.REACT_APP_API_PUBLIC}/api/v1/consumer/upload`, {
            method: "POST",
            body: formData,
         });

         if (response.ok) {
            const responseData = await response.json();
            onSuccess(responseData, file);

            message.success("Upload successful!");
            setIsUpload(false);
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
                        <img className="has-mask h-10 object-center" src="thumbnail.png" alt="" />
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
                        src="thumbnail.png"
                        alt=""
                        style={{ minHeight: "400px", minWidth: "400px", width: "100%" }}
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
