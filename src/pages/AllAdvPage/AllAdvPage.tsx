import AdvCard from '../../components/AdvCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchBar from '../../components/SearchBar';
import SelectBar from '../../components/SelectBar';
import { v4 as uuidv4 } from 'uuid';
import { createAd, getAdvs } from '../../services/api';
import { Advertisment } from '../../types/types';

import { Col, Row, Button, Modal, Form, Input, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './AllAdvPage.css';

import { Spin } from 'antd';

const filterOptions = [
  { label: 'Стоимость', value: 'price' },
  { label: 'Лайки', value: 'likes' },
  { label: 'Просмотры', value: 'views' },
];

const AllAdvPage: React.FC = () => {
  const [allAds, setAllAds] = useState<Advertisment[]>([]);
  const [shownAds, setShownAds] = useState<Advertisment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState(true);
  // const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isManualSelection, setIsManualSelection] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);

  const [form] = Form.useForm();

  useEffect(() => {
    loadAllAdvs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [allAds, itemsPerPage, filters]);

  // const loadAllAdvs = async () => {
  //   try {
  //     setLoading(true);
  //     const fetchedAds = await getAdvs();
  //     setAllAds(fetchedAds);
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       console.error(err.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const loadAllAdvs = async () => {
    setLoading(true);
    try {
      const fetchedAds = await getAdvs();
      setAllAds(fetchedAds);
      setShownAds(fetchedAds.slice(0, itemsPerPage));
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
    setHasMore(!isManualSelection && itemsPerPage < allAds.length);
  };

  const applyFilters = () => {
    let filteredAds = [...allAds];

    if (filters.includes('price')) {
      filteredAds.sort((a, b) => a.price - b.price);
    }
    if (filters.includes('likes')) {
      filteredAds.sort((a, b) => b.likes - a.likes);
    }
    if (filters.includes('views')) {
      filteredAds.sort((a, b) => b.views - a.views);
    }

    setShownAds(filteredAds.slice(0, itemsPerPage));
    setHasMore(!isManualSelection && itemsPerPage < filteredAds.length);
  };

  const handleFilterChange = (selectedFilters: string[]) => {
    setFilters(selectedFilters);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newItemsPerPage = value === '' ? 0 : Math.max(1, parseInt(value, 10));
    setItemsPerPage(newItemsPerPage);
    setIsManualSelection(true);
    setShownAds(allAds.slice(0, newItemsPerPage)); // reset search
    applyFilters();
  };

  // const loadMoreAdvs = () => {
  //   if (isManualSelection) return;
  //   const currentLength = shownAds.length;
  //   const newAds = allAds.slice(currentLength, currentLength + itemsPerPage);
  //   setShownAds((prevAds) => [...prevAds, ...newAds]);
  //   setHasMore(currentLength + newAds.length < allAds.length);
  // };

  const loadMoreAdvs = async () => {
    if (isManualSelection) return;

    setLoadingMore(true);
    try {
      const currentLength = shownAds.length;
      const newAds = allAds.slice(currentLength, currentLength + itemsPerPage);
      setShownAds((prevAds) => [...prevAds, ...newAds]);
      setHasMore(currentLength + newAds.length < allAds.length);
    } finally {
      setLoadingMore(false);
    }
  };

  /* MODAL */

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModal = async () => {
    const uniqueId = uuidv4();
    const currentDate = new Date().toISOString();
    try {
      const values = await form.validateFields();
      const newAd: Advertisment = {
        name: values.name,
        description: values.description,
        price: values.price,
        imageUrl: values.imageUrl,
        id: uniqueId,
        createdAt: currentDate,
        views: 0,
        likes: 0,
      };
      await createAd(newAd);
      console.log('Объявление создано успешно');
      form.resetFields();
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      <div className="controls">
        <div className="controls-show-ads">
          <label htmlFor="adsNumber" style={{ fontSize: '23px', paddingRight: '5px' }}>
            Показывать объявлений:
          </label>

          <input
            type="number"
            id="adsNumber"
            name="ads"
            min="1"
            max="100"
            value={itemsPerPage}
            onChange={handleInputChange}
            style={{ fontSize: '23px' }}
          />
        </div>
        <SearchBar allAds={allAds} setShownAds={setShownAds} />
        <SelectBar options={filterOptions} onChange={handleFilterChange} />
        <Button type="primary" onClick={showModal}>
          Создать объявление
        </Button>
      </div>

      <InfiniteScroll
        dataLength={shownAds.length}
        next={loadMoreAdvs}
        hasMore={hasMore}
        loader={<Spin size="large" />}
        endMessage={''}
        style={{ overflow: 'hidden' }}
      >
        <Row gutter={[32, 32]}>
          {shownAds.map((ad) => (
            <Col span={8} key={ad.id}>
              <Link to={`/ad/${ad.id}`}>
                <AdvCard advertisment={ad} />
              </Link>
            </Col>
          ))}
        </Row>
      </InfiniteScroll>

      {loading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Spin size="large" />
        </div>
      )}

      <div>
        <Modal title="Новое объявление" open={isModalOpen} onOk={handleModal} onCancel={handleCancel}>
          <Form form={form} layout="vertical">
            <Form.Item
              label="Ссылка на изображение"
              name="imageUrl"
              rules={[{ message: 'Введите ссылку на изображение' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Название" name="name" rules={[{ required: true, message: 'Введите название' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Описание" name="description" rules={[{ required: true, message: 'Введите описание' }]}>
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Стоимость" name="price" rules={[{ required: true, message: 'Укажите цену' }]}>
              <InputNumber />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </section>
  );
};

export default AllAdvPage;
