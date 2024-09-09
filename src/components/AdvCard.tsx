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
    <Card hoverable cover={<img alt={advertisment.name} src={imageUrl} />}>
      <Card.Meta
        title={advertisment.name}
        description={
          <>
            <p>{advertisment.description}</p>
            <p>Price: {advertisment.price}</p>
            <p>Created At: {advertisment.createdAt}</p>
            <p>Views: {advertisment.views}</p>
            <p>Likes: {advertisment.likes}</p>
          </>
        }
      />
    </Card>
  );
};

export default AdvCard;
