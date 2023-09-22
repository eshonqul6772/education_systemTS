import React from 'react';
import { Avatar, Card } from 'antd';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

import ImgCard from 'assets/imgs/feature-typescript-react.jpg'

const Cards = () => {
  return (
    <Card
      style={{ width: 300, marginBottom: 20 }}
      cover={
        <img
          alt='example'
          src={ImgCard}
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
        title="Card title"
        description="This is the description"
      />
    </Card>
  );
};

export default Cards;