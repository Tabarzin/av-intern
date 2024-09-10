import React, { useState, useEffect } from 'react';
import getAdvs from '../services/api';
import { Advertisment } from '../types/types';
import AdvCard from '../components/AdvCard';
import { Col, Row } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchBar from '../components/SearchBar';

const AllAdvPage: React.FC = () => {
  const [allAds, setAllAds] = useState<Advertisment[]>([]);
  const [shownAds, setShownAds] = useState<Advertisment[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    loadAllAdvs();
  }, []);

  useEffect(() => {
    loadShownAds();
  }, [allAds, itemsPerPage]);

  const loadAllAdvs = async () => {
    try {
      setLoading(true);
      const fetchedAds = await getAdvs();
      setAllAds(fetchedAds);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadShownAds = () => {
    setShownAds(allAds.slice(0, itemsPerPage));
    setHasMore(itemsPerPage < allAds.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newItemsPerPage = value === '' ? 0 : Math.max(1, parseInt(value, 10));
    setItemsPerPage(newItemsPerPage);
    setShownAds(allAds.slice(0, newItemsPerPage)); // reset search
  };

  const loadMoreAdvs = () => {
    const currentLength = shownAds.length;
    const newAds = allAds.slice(currentLength, currentLength + itemsPerPage);
    setShownAds((prevAds) => [...prevAds, ...newAds]);
    setHasMore(currentLength + newAds.length < allAds.length);
  };

  return (
    <section>
      <label htmlFor="adsNumber">Показывать объявлений:</label>

      <input
        type="number"
        id="adsNumber"
        name="ads"
        min="1"
        max="100"
        value={itemsPerPage}
        onChange={handleInputChange}
      />
      <SearchBar allAds={allAds} setShownAds={setShownAds} />

      <InfiniteScroll
        dataLength={shownAds.length}
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
          {shownAds.map((ad) => (
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
