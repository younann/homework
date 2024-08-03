import axios from "axios";

const fetchStockData = async (
  symbols: string[],
  cache: any,
  setStockData: any,
  setLoading: any,
  setError: any
) => {
  const transformedData = [];

  for (const symbol of symbols) {
    const cachedData = cache.getCachedData(symbol);

    if (cachedData) {
      transformedData.push(cachedData);
    } else {
      try {
        const response = await axios.get(
          `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${process.env.API_KEY}`
        );
        const item = response.data;

        const stockData = {
          key: item.symbol,
          symbolName: item.symbol,
          name: item.name,
          price: item.price,
          change: item.change,
          percent_change: item.changesPercentage,
        };

        transformedData.push(stockData);

        cache.setCacheData(symbol, stockData);
        setLoading(false);
      } catch (error) {
        setError(`Error fetching data for ${symbol}: ${error}`);
        console.error(`Error fetching data for ${symbol}:`, error);
      }
    }
  }

  setStockData(transformedData);
  setLoading(false);
};

export default fetchStockData;
