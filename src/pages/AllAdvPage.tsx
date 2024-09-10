import React, { useState, useEffect } from 'react';
import { createAd, getAdvs } from '../services/api';
import { Advertisment } from '../types/types';
import AdvCard from '../components/AdvCard';
import { Col, Row, Button, Modal, Form, Input, InputNumber } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { v4 as uuidv4 } from 'uuid';

const AllAdvPage: React.FC = () => {
  const [allAds, setAllAds] = useState<Advertisment[]>([]);
  const [shownAds, setShownAds] = useState<Advertisment[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [form] = Form.useForm();

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
              <Link to={`/ad/${ad.id}`}>
                <AdvCard advertisment={ad} />
              </Link>
            </Col>
          ))}
        </Row>
      </InfiniteScroll>

      <div>
        <Button type="primary" onClick={showModal}>
          Создать объявление
        </Button>
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
