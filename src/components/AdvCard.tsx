import React from 'react';
import { Card } from 'antd';
import { Advertisment } from '../types/types';

interface AdvCardProps {
  advertisment: Advertisment;
}

const AdvCard: React.FC<AdvCardProps> = ({ advertisment }) => {
  const placeholderImage = 'https://placehold.co/600x400';
  const imageUrl = advertisment.imageUrl ? advertisment.imageUrl : placeholderImage;
  return (
    <div>
      <Card hoverable cover={<img alt={advertisment.name} src={imageUrl} />} />
      <p> {advertisment.name}</p>
      <p>{advertisment.description}</p>
      <p> {advertisment.price}</p>
      <p>{advertisment.createdAt}</p>
      <p>{advertisment.views}</p>
      <p>{advertisment.likes}</p>
    </div>
  );
};

export default AdvCard;
