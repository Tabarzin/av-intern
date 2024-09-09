import React, { useState, useEffect } from 'react';
import getAdvs from '../services/api';
import { Advertisment } from '../types/types';
import AdvCard from '../components/AdvCard';
import { Col, Divider, Row } from 'antd';

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

  return (
    <section>
      <Row gutter={[16, 16]}>
        {!loading &&
          ads.map((ad) => (
            <Col key={ad.id} span={8}>
              <AdvCard advertisment={ad} />
            </Col>
          ))}
      </Row>
    </section>
  );
};

export default AllAdvPage;
