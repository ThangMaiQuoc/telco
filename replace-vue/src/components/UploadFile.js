import React from "react";
import { Button, Upload, message } from "antd";
// import { CloudUploadOutlined } from "@ant-design/icons";
import "tailwindcss/tailwind.css";

const UploadBasic = ({ fileList, setFileList, maxCount = 1 }) => {
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
            headers: {
               // "Content-Type": "multipart/form-data", // Commented out since fetch handles this automatically
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
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
      <Upload
         customRequest={customUpload}
         listType="picture-card"
         fileList={fileList}
         onChange={onChange}
         onPreview={onPreview}
         maxCount={maxCount}
         accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" // Accept multiple file types
         showUploadList={{ showRemoveIcon: true }} // Show remove icon
         style={{ width: "300px" }}
      >
         {fileList.length < maxCount && (
            <div className="d-flex justify-center items-center flex-column">
               <p>
                  {/* <CloudUploadOutlined style={{ fontSize: "50px" }} /> */}
                  <img
                     className="has-mask h-10 object-center"
                     src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                     alt=""
                  />
               </p>
               <p className="text-xl font-semibold mb-0">Choose a file or drag & drop it here</p>
               <p className="text-gray-500">File type: doc, pdf, images</p>
               <Button className="mt-2 mx-5">Browse file</Button>
            </div>
         )}
      </Upload>
   );
};

export default UploadBasic;
