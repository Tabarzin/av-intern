import React from 'react';
import { Card } from 'antd';
import { Advertisment } from '../types/types';

interface AdvCardProps {
  advertisment: Advertisment;
}

const AdvCard: React.FC<AdvCardProps> = ({ advertisment }) => {
  return (
    <div>
      <Card hoverable cover={<img alt={advertisment.name} src={advertisment.imageUrl} />} />
      <p> {advertisment.name}</p>
      <p>{advertisment.description}</p>
      <p> {advertisment.price}</p>
      <p>{advertisment.createdAt}</p>
      <p>{advertisment.views}</p>
      <p>{advertisment.likes}</p>
      <p>{advertisment.imageUrl}</p>
    </div>
  );
};

export default AdvCard;
