import React, { useState } from 'react';
import axios from 'axios';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import '../styles/CloudinaryUploader.css';

const cld = new Cloudinary({ cloud: { cloudName: 'djejwcfdc' } });

const CloudinaryUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImagePublicId, setUploadedImagePublicId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'unsigned_preset'); // debes crear un preset sin firma en Cloudinary
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/djejwcfdc/image/upload',
        formData
      );
      setUploadedImagePublicId(response.data.public_id);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    } finally {
      setLoading(false);
    }
  };

  const transformedImage = uploadedImagePublicId
    ? cld
        .image(uploadedImagePublicId)
        .format('auto')
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(400).height(400))
    : null;

  return (
    <div className="cloudinary-uploader">
      <h2>Subí una imagen</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Subiendo...' : 'Subir Imagen'}
      </button>

      {transformedImage && (
        <div className="image-preview">
          <AdvancedImage cldImg={transformedImage} />
        </div>
      )}
    </div>
  );
};

export default CloudinaryUploader;
