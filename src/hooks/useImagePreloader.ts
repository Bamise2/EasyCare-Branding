import { useState, useEffect } from 'react';

export function useImagePreloader(imageUrls: string[]) {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (imageUrls.length === 0) {
      setIsReady(true);
      return;
    }

    let loadedCount = 0;
    const images = imageUrls.map(url => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        if (loadedCount === imageUrls.length) {
          setIsReady(true);
        }
      };
      img.onerror = () => {
        loadedCount++; // Count as "processed" even if error
        setImagesLoaded(loadedCount);
        if (loadedCount === imageUrls.length) {
          setIsReady(true);
        }
      };
      return img;
    });

    return () => {
      images.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [imageUrls]);

  return { progress: (imagesLoaded / imageUrls.length) * 100, isReady };
}
