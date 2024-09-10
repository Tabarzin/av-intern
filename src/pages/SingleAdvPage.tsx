import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editAd, getAdvById } from '../services/api';
import { Advertisment } from '../types/types';
import { Button, Card, Form, Input, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const SingleAdvPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [ad, setAd] = useState<Advertisment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
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

  const handleEditToggle = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleEdit = async (values: any) => {
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
        console.error('Ошибка обновления объявления');
      }
    }
  };

  return (
    <section>
      {!isEditMode ? (
        <Card hoverable cover={<img alt={ad.name} src={imageUrl} style={{ width: '600px', height: '400px' }} />}>
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
            rules={[{ required: true, message: 'Введите ссылку на изображение' }]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Сохранить изменения
          </Button>
        </Form>
      )}

      <nav>
        <Button onClick={() => navigate('/')}>Вернуться на страницу объявлений</Button>
        <Button onClick={handleEditToggle}>{isEditMode ? 'Отменить редактирование' : 'Редактировать'}</Button>
      </nav>
    </section>
  );
};

export default SingleAdvPage;
