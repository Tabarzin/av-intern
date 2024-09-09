import React, { useState, useEffect } from 'react';
import getAdvs from '../services/api';
import { Advertisment } from '../types/types';
import AdvCard from '../components/AdvCard';

const AllAdvPage: React.FC = () => {
  const [ads, setAds] = useState<Advertisment[]>([]);
  const [loading, setLoading] = useState(true);

  console.log(ads);

  useEffect(() => {
    const loadAllAdvs = async () => {
      try {
        const data = await getAdvs();
        setAds(data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
      }
    };
    loadAllAdvs();
  }, []);

  return <section>{!loading && ads.map((ad) => <AdvCard key={ad.id} advertisment={ad} />)}</section>;
};

export default AllAdvPage;
