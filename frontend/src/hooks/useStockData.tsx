import { useState, useEffect } from "react";
import useCache from "./useCache";
import fetchStockData from "./fetchStockData";
import mockStockData from "../utils/mockData";
import StockData from "../interfaces/stockData";

const useStockData = (symbols: string[]) => {
  const [stockData, setStockData] = useState<StockData[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { getCachedData, setCacheData } = useCache(60 * 60 * 1000);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      setStockData(mockStockData);
      setLoading(false);
    } else {
      fetchStockData(
        symbols,
        { getCachedData, setCacheData },
        setStockData,
        setLoading,
        setError
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { stockData, loading, error };
};

export default useStockData;
