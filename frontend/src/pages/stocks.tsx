import React, { useCallback } from "react";
import StockTable from "../components/stockTable";
import { userStore } from "../stores/userStore";
import { message } from "antd";
import { addStockToPortfolio } from "../services/apiService";
import useStockData from "../hooks/useStockData";

const Stocks: React.FC = () => {
  const { stockData, loading, error } = useStockData([
    "AAPL",
    "MSFT",
    "AMZN",
    "GOOGL",
    // "META",
    // "TSLA",
    // "NVDA",
    // "NFLX",
    // "BABA",
  ]);

  const handleAddToPortfolio = useCallback(async (symbol: string) => {
    if (userStore.user && userStore.userId && userStore.stocks) {
      try {
        await addStockToPortfolio(userStore.userId, symbol);
        message.success(`${symbol} added to portfolio.`);
        const updatedPortfolio = [...userStore.stocks, symbol];
        userStore.setUser({
          ...userStore.user,
          favoriteStocks: updatedPortfolio,
        });
      } catch (error) {
        message.error("Failed to add stock to portfolio.");
      }
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!stockData) return null;

  return (
    <div>
      <h1>Stocks</h1>
      <StockTable
        data={stockData}
        onAddToPortfolio={handleAddToPortfolio}
        action={"add"}
      />
    </div>
  );
};

export default Stocks;
