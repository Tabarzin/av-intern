import { Button, Card, Form, Input, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editAd, getAdvById } from '../services/api';
import { Advertisment } from '../types/types';

interface AdFormValues {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const SingleAdvPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [ad, setAd] = useState<Advertisment | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  const placeholderImage = 'https://fakeimg.pl/400x300/cccccc/cc6464?font=lobster';

  useEffect(() => {
    if (!id) {
      console.error('Такого объявления нет');

      return;
    }
    const fetchAd = async () => {
      const fetchedAd = await getAdvById(id);
      setAd(fetchedAd);
    };
    fetchAd();
  }, [id]);

  if (!ad) {
    return <div>Loading...</div>;
  }

  const imageUrl = ad.imageUrl !== '' ? ad.imageUrl : placeholderImage;

  const handleEditToggle = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleEdit = async (values: AdFormValues) => {
    if (id) {
      try {
        const updatedAd = {
          ...ad,
          name: values.name,
          description: values.description,
          price: values.price,
          imageUrl: values.imageUrl,
        };
        await editAd(id, updatedAd);
        console.log('Объявление успешно обновлено');
        setAd(updatedAd);
        setIsEditMode(false);
      } catch (error) {
        console.error(error, 'Ошибка обновления объявления');
      }
    }
  };

  return (
    <section>
      {!isEditMode ? (
        <Card hoverable cover={<img alt={ad.name} src={imageUrl} style={{ width: '400px', height: '300px' }} />}>
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
      ) : (
        <Form
          layout="vertical"
          initialValues={{
            name: ad.name,
            description: ad.description,
            price: ad.price,
            imageUrl: ad.imageUrl,
          }}
          onFinish={handleEdit}
        >
          <Form.Item label="Название" name="name" rules={[{ required: true, message: 'Введите название' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Описание" name="description" rules={[{ required: true, message: 'Введите описание' }]}>
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Стоимость" name="price" rules={[{ required: true, message: 'Введите стоимость' }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Ссылка на изображение"
            name="imageUrl"
            rules={[{ message: 'Введите ссылку на изображение' }]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" style={{ marginBottom: '15px' }}>
            Сохранить изменения
          </Button>
        </Form>
      )}

      <nav style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={() => navigate('/')}>Вернуться на страницу объявлений</Button>
        <Button onClick={handleEditToggle}>{isEditMode ? 'Отменить редактирование' : 'Редактировать'}</Button>
      </nav>
    </section>
  );
};

export default SingleAdvPage;
