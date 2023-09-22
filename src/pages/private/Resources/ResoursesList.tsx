import React from 'react'
import {useNavigate} from 'react-router-dom';


import {Row, Col} from 'antd'

import Card from 'components/Card'

const style: React.CSSProperties = {margin: '32px'};

const ResourcesList: React.FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <Row style={style} gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
        <Col onClick={() => navigate('/resourcesList/fizz')} className='gutter-row' span={6}>
          <Card/>
        </Col>
      </Row>
    </>
  );
}

export default ResourcesList;