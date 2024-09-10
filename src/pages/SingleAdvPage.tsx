import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAdvById } from '../services/api';
import { Advertisment } from '../types/types';
import { Button, Card } from 'antd';

const SingleAdvPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [ad, setAd] = useState<Advertisment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const placeholderImage = 'https://placehold.co/600x400';
  const imageUrl = placeholderImage;

  console.log(ad, 'ASDD');

  useEffect(() => {
    if (!id) {
      setError('Такого объявления нет');

      return;
    }
    const fetchAd = async () => {
      const fetchedAd = await getAdvById(id);
      console.log(typeof fetchedAd);
      setAd(fetchedAd);
    };
    fetchAd();
  }, [id]);

  if (!ad) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <Card hoverable cover={<img alt={ad.name} src={imageUrl} />}>
        <Card.Meta
          title={ad.name}
          description={
            <>
              <p>{ad.description}</p>
              <p>Price: {ad.price}</p>
              <p>Created At: {ad.createdAt}</p>
              <p>Views: {ad.views}</p>
              <p>Likes: {ad.likes}</p>
            </>
          }
        />
      </Card>
      <nav>
        <Button onClick={() => navigate('/')}>Вернуться на страницу объявлений </Button>
      </nav>
    </section>
  );
};

export default SingleAdvPage;
