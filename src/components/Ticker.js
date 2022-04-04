import styles from "./Ticker.module.css";
import green from "../assests/green.png";
import red from "../assests/red-arrow.png";
import { useEffect, useState } from "react";
import { getStock } from "../helpers/firebase";
const symb = ["GOOGL", "IBM", "AMD", "BA", "AMZN"];

const Ticker = (props) => {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    for (let s of symb) {
      getStock(s).then((data) =>
        setSymbols((prev) => [...prev, { ...data, symbol: s }])
      );
    }
  }, []);

  return (
    <div className={styles["ticker-wrap"]}>
      <div className={styles["ticker"]}>
        {symbols &&
          symbols.map((el) => (
            <div
              className={`${styles["ticker__item"]} ${
                parseFloat(el.changePercent) >= 0 ? styles.green : styles.red
              }`}
            >
              {"                            "}
              {`${el.symbol} (${el.changePercent})`}
              {parseFloat(el.changePercent) >= 0 ? (
                <img src={green} alt="stonk up" className={styles.arrow} />
              ) : (
                <img src={red} alt="stonk down" className={styles.arrow} />
              )}
              {"                            "}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Ticker;
