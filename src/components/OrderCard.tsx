import { Button, Card, List, Modal } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../types/types';

interface OrderProps {
  order: Order;
}

const OrderCard: React.FC<OrderProps> = ({ order }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOrderItems = () => {
    setIsModalOpen(true);
  };

  return (
    <section>
      <Card hoverable>
        <Card.Meta
          title={'Заказ'}
          description={
            <>
              <p>Номер заказа: {order.id}</p>
              <p>Количество товаров: {order.items.length}</p>

              <p>Стоимость заказа: {order.total}</p>
              <p>Дата создания заказа: {order.createdAt}</p>
              <p>Статус: {order.status}</p>
              <Button onClick={handleOrderItems}>Показать все товары</Button>
            </>
          }
        />
      </Card>

      <Modal title="Товары" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <List
          itemLayout="horizontal"
          dataSource={order.items}
          renderItem={(item) => (
            <Link to={`/ad/${item.id}`}>
              <List.Item>
                <List.Item.Meta title={item.name} description={`Количество: ${item.count}, Цена: ${item.price}`} />
              </List.Item>
            </Link>
          )}
        />
      </Modal>
    </section>
  );
};

export default OrderCard;
