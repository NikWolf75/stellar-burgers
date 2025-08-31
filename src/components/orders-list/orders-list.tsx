import { FC, memo, useMemo } from 'react';

import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const sortedOrders = useMemo(() => {
    return [...orders].sort(
      (firstOrder, secondOrder) =>
        new Date(secondOrder.createdAt).getTime() - new Date(firstOrder.createdAt).getTime()
    );
  }, [orders]);

  return <OrdersListUI orderByDate={sortedOrders} />;
});
