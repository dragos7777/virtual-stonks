import styles from "./StockChart.module.css";
import { getStockHistory } from "../helpers/firebase";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StockChart = (props) => {
  const [stockHistory, setstockHistory] = useState();
  useEffect(() => {
    getStockHistory("GME").then((data) => {
      setstockHistory(data);
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={50}
        height={30}
        data={stockHistory && stockHistory.reverse()}
      >
        <CartesianGrid />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />

        <Line dot={false} type="natural" dataKey="price" stroke="black" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
