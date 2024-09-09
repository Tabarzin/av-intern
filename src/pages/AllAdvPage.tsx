import React, { useState, useEffect } from 'react';
import getAdvs from '../services/api';
import { Advertisment } from '../types/types';

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

  return <section>Advs</section>;
};

export default AllAdvPage;
