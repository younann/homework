import React, { useEffect, useState } from "react";
import { userStore } from "../stores/userStore";
import StockTable from "../components/stockTable";
import { message } from "antd";
import { removeStockFromPortfolio } from "../services/apiService";
import useStockData from "../hooks/useStockData";

const Portfolio = () => {
  const [portfolioSymbols, setPortfolioSymbols] = useState<string[]>(
    userStore.stocks || []
  );

  const { stockData, loading, error } = useStockData(portfolioSymbols);

  const handleRemoveFromPortfolio = async (symbol: string) => {
    if (userStore.user && userStore.userId) {
      try {
        await removeStockFromPortfolio(userStore.userId, symbol);
        message.success(`${symbol} removed from your portfolio.`);

        const updatedPortfolio = portfolioSymbols.filter(
          (item) => item !== symbol
        );
        setPortfolioSymbols(updatedPortfolio);
        userStore.setUser({
          ...userStore.user,
          favoriteStocks: updatedPortfolio,
        });
      } catch (error) {
        message.error("Failed to remove stock from portfolio.");
      }
    }
  };

  useEffect(() => {
    if (userStore.stocks) {
      setPortfolioSymbols(userStore.stocks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore.stocks]);

  const filteredStockData = stockData?.filter((stock) =>
    portfolioSymbols.includes(stock.symbolName)
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!filteredStockData || filteredStockData.length === 0)
    return <p>No stocks in your portfolio</p>;

  return (
    <div>
      <h2>My Portfolio</h2>
      {userStore.isLoggedIn ? (
        <StockTable
          data={filteredStockData}
          onAddToPortfolio={handleRemoveFromPortfolio}
          action={"Remove"}
        />
      ) : (
        <p>Log in to view your portfolio</p>
      )}
    </div>
  );
};

export default Portfolio;
