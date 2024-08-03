import React from "react";
import { Table, Button } from "antd";
import type { TableProps } from "antd";
import StockData from "../interfaces/stockData";

interface StockTableProps {
  data: StockData[];
  onAddToPortfolio: (symbol: string) => void;
  action: string;
}

const StockTable: React.FC<StockTableProps> = ({
  data,
  onAddToPortfolio,
  action,
}) => {
  const positiveChangeStyle = { color: "green" };
  const negativeChangeStyle = { color: "red" };

  const renderAction = (symbolName: string) => (
    <Button onClick={() => onAddToPortfolio(symbolName)}>
      {action === "add" ? "Add" : "Remove"}
    </Button>
  );

  const getUniqueFilterOptions = (field: keyof StockData) => {
    return Array.from(new Set(data.map((item) => item[field]))).map(
      (value) => ({
        text: value,
        value,
      })
    );
  };

  const columns: TableProps<StockData>["columns"] = React.useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        filters: getUniqueFilterOptions("name"),
        onFilter: (value, record) => record.name.includes(value as string),
        responsive: ["sm"],
      },
      {
        title: "Symbol",
        dataIndex: "symbolName",
        key: "symbol",
        sorter: (a, b) => a.symbolName.localeCompare(b.symbolName),
        filters: getUniqueFilterOptions("symbolName"),
        onFilter: (value, record) =>
          record.symbolName.includes(value as string),
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        // sorter: (a, b) => a.price - b.price,
        render: (text: number) => (
          <p style={{ fontSize: "clamp(12px,2vw,15px)" }}>{text} $</p>
        ),
      },
      {
        title: "Change",
        dataIndex: "change",
        key: "change",
        sorter: (a, b) => Number(a.change) - Number(b.change),
        render: (text: number) => (
          <p style={text >= 0 ? positiveChangeStyle : negativeChangeStyle}>
            {text} $
          </p>
        ),
        responsive: ["md"],
      },
      {
        title: "Percent Change",
        dataIndex: "percent_change",
        key: "percent_change",
        sorter: (a, b) => Number(a.percent_change) - Number(b.percent_change),
        render: (text: number) => (
          <p style={text >= 0 ? positiveChangeStyle : negativeChangeStyle}>
            {text} %
          </p>
        ),
        responsive: ["md"],
      },
      {
        title: action === "add" ? "Add to Portfolio" : "Remove from Portfolio",
        key: "action",
        render: (_, record) => renderAction(record.symbolName),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [action, data]
  );

  return data.length > 0 ? (
    <Table
      columns={columns}
      dataSource={data}
      showSorterTooltip={true}
      pagination={{ pageSize: 5 }}
    />
  ) : (
    <p>No stocks available</p>
  );
};

export default StockTable;
