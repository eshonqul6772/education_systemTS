import React from 'react';

import UploadFile from 'services/resources.service';

import './Resoursec.scss';

const Upload: React.FC = (event: any) => {
  const handleFileUpload = (event: any) => {
    event.preventDefault()
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    UploadFile.uploadFile(formData)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='table__box'>
      <div className="box">
        <h3>Upload Files</h3>
        <label htmlFor='fileID'>
          <div className="drop_box">
            <h4>Select File here</h4>
            <p>Files Supported: PDF, TEXT, DOC , DOCX</p>
            <input onChange={handleFileUpload} type="file" id='fileID' style={{display: 'none'}}/>
          </div>
        </label>

      </div>

    </div>
  );
};

export default Upload;