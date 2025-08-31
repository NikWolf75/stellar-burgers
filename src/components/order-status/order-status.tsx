import { FC } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

const STATUS_LABELS: Record<string, string> = {
  done: 'Выполнен',
  created: 'Создан',
  pending: 'Готовится'
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case 'done':
        return '#00CCCC';
      case 'pending':
        return '#E52B1A';
      default:
        return '#F2F2F3';
    }
  };

  const color = getColor();
  const label = STATUS_LABELS[status] || '';

  return <OrderStatusUI textStyle={color} text={label} />;
};
