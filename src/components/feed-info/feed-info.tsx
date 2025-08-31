import { FC, useMemo } from 'react';
import { TOrder } from '@utils-types';

import { useSelector } from '../../services/store';
import { FeedInfoUI } from '../ui/feed-info';
import { getOrdersFeed, getOrdersTotal } from '../../services/slices/orderSlice';

// фильтруем по статусу
const selectOrderNumbers = (orders: TOrder[], status: string): number[] => {
  return orders
    .filter((order) => order.status === status)
    .map((order) => order.number)
    .slice(0, 20);
};

export const FeedInfo: FC = () => {
  const orders = useSelector(getOrdersFeed) || [];
  const total = useSelector(getOrdersTotal);

  const pendingList = useMemo(
    () => selectOrderNumbers(orders, 'pending'),
    [orders]
  );

  const completedList = useMemo(
    () => selectOrderNumbers(orders, 'done'),
    [orders]
  );

  return (
    <FeedInfoUI
      readyOrders={completedList}
      pendingOrders={pendingList}
      feed={total}
    />
  );
};
