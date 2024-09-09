import React, { useState, useEffect } from 'react';
import getAdvs from '../services/api';
import { Advertisment } from '../types/types';
import AdvCard from '../components/AdvCard';
import { Col, Row } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const AllAdvPage: React.FC = () => {
  const [ads, setAds] = useState<Advertisment[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  console.log(ads.length);

  const ITEMS_PER_PAGE = 10;

  // useEffect(() => {
  //   loadAllAdvs();
  // }, []);

  // const loadAllAdvs = async () => {
  //   try {
  //     setLoading(true);
  //     const fetchedAds = await getAdvs(1, ITEMS_PER_PAGE);

  //     if (fetchedAds.length === 0) {
  //       setHasMore(false);
  //     } else {
  //       setAds((prevAds) => [...prevAds, ...fetchedAds]);
  //       setPage(page + 1);
  //     }
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       console.error(err.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    loadInitialAdvs();
  }, []);

  const loadInitialAdvs = async () => {
    try {
      setLoading(true);
      const fetchedAds = await getAdvs(1, ITEMS_PER_PAGE);
      setAds(fetchedAds);
      setHasMore(fetchedAds.length === ITEMS_PER_PAGE);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadMoreAdvs = async () => {
    try {
      setLoading(true);
      const fetchedAds = await getAdvs(page + 1, ITEMS_PER_PAGE);
      setAds((prevAds) => [...prevAds, ...fetchedAds]);
      setPage(page + 1);
      setHasMore(fetchedAds.length === ITEMS_PER_PAGE);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <InfiniteScroll
        dataLength={ads.length}
        next={loadMoreAdvs}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Больше объявлений нет.</b>
          </p>
        }
      >
        <Row gutter={16}>
          {ads.map((ad) => (
            <Col span={8} key={ad.id}>
              <AdvCard advertisment={ad} />
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </section>
  );
};

export default AllAdvPage;
