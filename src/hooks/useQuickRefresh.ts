import { useEffect, useCallback, useState } from 'react';

export interface UseQuickRefreshOptions {
  onRefresh?: () => void | Promise<void>;
  autoRefresh?: boolean;
}

export const useQuickRefresh = (options: UseQuickRefreshOptions = {}) => {
  const { onRefresh, autoRefresh = true } = options;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  const handleRefresh = useCallback(async () => {
    if (onRefresh && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
        setLastRefresh(Date.now());
      } catch (error) {
        console.error('Error during refresh:', error);
      } finally {
        setIsRefreshing(false);
      }
    }
  }, [onRefresh, isRefreshing]);

  useEffect(() => {
    if (!autoRefresh || typeof window === 'undefined') return;

    const handleQuickRefresh = () => {
      handleRefresh();
    };

    window.addEventListener('quickRefresh', handleQuickRefresh);

    return () => {
      window.removeEventListener('quickRefresh', handleQuickRefresh);
    };
  }, [handleRefresh, autoRefresh]);

  return {
    isRefreshing,
    lastRefresh,
    refresh: handleRefresh
  };
};

export default useQuickRefresh;