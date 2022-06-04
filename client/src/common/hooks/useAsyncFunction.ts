import { useCallback, useEffect, useState } from 'react';

function useAsyncFunction<T, D = Error>(
  asyncFunction: (...data: any) => Promise<any>,
  immediate = false,
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSucceeded, setSucceeded] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<D | null>(null);

  const execute = useCallback(
    async (...data: any) => {
      try {
        setIsLoading(true);
        setSucceeded(false);
        setError(null);
        const res = await asyncFunction(...data);
        setData(res.data);
        setSucceeded(true);
      } catch (error) {
        setError(error as any);
        setSucceeded(false);
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setSucceeded(false);
        }, 1);
      }
    },
    [asyncFunction],
  );

  const clearError: () => void = useCallback(() => {
    setError(null);
  }, []);

  const resetSucceeded = () => {
    setSucceeded(false);
  };

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, isLoading, data, error, isSucceeded, clearError, resetSucceeded };
}

export default useAsyncFunction;
