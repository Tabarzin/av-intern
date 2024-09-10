import React from 'react';
import { Card } from 'antd';
import { Advertisment } from '../types/types';

interface AdvCardProps {
  advertisment: Advertisment;
}

const AdvCard: React.FC<AdvCardProps> = ({ advertisment }) => {
  const placeholderImage = 'https://fakeimg.pl/400x300/cccccc/cc6464?font=lobster';
  const imageUrl = advertisment.imageUrl ? advertisment.imageUrl : placeholderImage;

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };
  return (
    <Card
      hoverable
      cover={<img alt={advertisment.name} src={imageUrl} style={{ maxWidth: '400px', maxHeight: '300px' }} />}
      style={{ maxWidth: '400px', height: '600px' }}
    >
      <Card.Meta
        title={advertisment.name}
        description={
          <>
            <p>{truncateText(advertisment.description || '', 100)}</p>
            <p>Стоимость: {advertisment.price}</p>
            <p>Создано: {advertisment.createdAt}</p>
            <p>Количество просмотров: {advertisment.views}</p>
            <p>Количество лайков: {advertisment.likes}</p>
          </>
        }
      />
    </Card>
  );
};

export default AdvCard;
