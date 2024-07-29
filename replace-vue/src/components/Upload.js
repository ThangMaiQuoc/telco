import React, { useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const UploadForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const selectFile = () => {
    document.getElementById('file-upload').click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Phone Number:', phoneNumber);
    console.log('Selected File:', selectedFile);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const uploadResponse = await axios.post('http://localhost:8099/api/v1/consumer/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (uploadResponse.data && uploadResponse.data.path) {
        const uploadedImagePath = uploadResponse.data.path;
        console.log('Image uploaded:', uploadedImagePath);

        const imageBonusResponse = await axios.post('http://localhost:8099/api/v1/consumer/upload/image-bonus', {
          phone: phoneNumber,
          image: uploadedImagePath,
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (imageBonusResponse.data) {
          alert('Bonus image uploaded successfully!');
          window.location.reload(); // Refresh lại trang
        } else {
          alert('Bonus image upload failed.');
        }
      } else {
        alert('Image upload failed.');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold text-gray-900">Get Your Bonus</h2>
          <p className="mt-2 text-sm text-gray-400">Charge 50P Get 50 Fee.</p>
        </div>
        <form className="mt-8 space-y-3 d-flex flex-column align-items-center" onSubmit={handleSubmit}>
          <div className=" space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Phone Number</label>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="tel"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className=" space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Picture</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center relative">
                <div className="h-full w-full text-center flex flex-col items-center justify-center">
                  {previewImage ? (
                    <img src={previewImage} className="absolute inset-0 w-full h-full object-contain" alt="" />
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
                      <span className="text-sm">Drag and drop</span> files here <br /> or{' '}
                      <a href="/" className="text-blue-600 hover:underline" onClick={(e) => {e.preventDefault(); selectFile();}}>select a file</a> from your computer
                    </p>
                  )}
                </div>
                <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
          </div>

          <p className="text-sm text-gray-300">
            <span>File type: doc, pdf, types of images</span>
          </p>
          <div>
            <button
              type="submit"
              className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
            >
              Get Started
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
