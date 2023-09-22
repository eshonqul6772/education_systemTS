import React, {ReactNode, useEffect, useState} from 'react';
import {Tabs} from 'antd';

import ResourcesService from 'services/resources.service';

import './Resoursec.scss'

interface IFile {
  name: ReactNode;
  id: string;
  disabled: number;
  children: ReactNode;
  hashId: string
}

const App: React.FC = () => {

  const [items, setItems] = useState<IFile[]>([])
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);


  const getList = (name?: string) => {
    ResourcesService
      .getFile(name, {
        per_page: 5,
        page: currentPage,
        sort: {
          name: 'id',
          direction: 'desc',
        },
      })
      .then((res) => {
        setTotalCount(res.data.totalCount);
        setItems(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  console.log(items)

  useEffect(() => {
    getList()
  }, [currentPage]);

  return (
    <div className='video'>
      <Tabs
        defaultActiveKey="1"
        tabPosition='left'
        style={{height: 320}}
        items={
          items.map((element, index) => {
            return {
              label: <>
                <span className='video-btn'> <input type="checkbox"/> {element.name}</span>
              </>,
              key: element.id,
              disabled: index === 28,
              children: <>
                <div className='video-wrapper'>
                  <video controls>
                    <source src={`http://localhost:8080/api/v1/files/file-preview/${element.hashId}`} type="video/mp4"/>
                    <source src="movie.ogg" type="video/ogg"/>
                    Your browser does not support the video tag.
                  </video>
                </div>
              </>,
            }
          })
        }
      />
    </div>
  );
};

export default App;