import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAdvById } from '../services/api';
import { Advertisment } from '../types/types';
import { Card } from 'antd';

const SingleAdvPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [ad, setAd] = useState<Advertisment | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  return <div>{ad.name}</div>;
};

export default SingleAdvPage;
