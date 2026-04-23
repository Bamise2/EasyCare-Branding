import { useState } from 'react';

export function useLazyLoadImages(batchSize: number = 12) {
  const [visibleItems, setVisibleItems] = useState(batchSize);

  const loadMore = () => {
    setVisibleItems(prev => prev + batchSize);
  };

  return { visibleItems, loadMore };
}
