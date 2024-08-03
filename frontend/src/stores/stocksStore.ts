import { makeAutoObservable } from "mobx";

interface Stock {
  key: string;
  symbolName: string;
  name: string;
  price: string;
  change: number;
  percent_change: string;
}

class StockStore {
  stocks: Stock[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setStocks(stocksData: any) {
    this.stocks = stocksData;
  }
  getStocks() {
    return this.stocks;
  }
}
export const useStocks = new StockStore();
