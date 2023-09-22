import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ResourcesService from 'services/resources.service';

const ViewResources = () => {
  const { hashId } = useParams();

  const [values, setValues] = useState([]);

  useEffect(() => {
    ResourcesService.viewFile(hashId)
      .then(res => {
        setValues(res.data);
      })
      .catch(err => console.log(err));
  }, [hashId]);

  return (
    <>
      <div className="table__box">

        <video controls>
          <source src={`http://localhost:8080/api/v1/files/file-preview/${hashId}`} type="video/mp4" />
          <source src="movie.ogg" type="video/ogg" />
          Your browser does not support the video tag.
        </video>
     
          <img src={`http://localhost:8080/api/v1/files/file-preview/${hashId}`} alt="img" />
      </div>
    </>
  );
};

export default ViewResources;
