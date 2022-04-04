import { useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import StonkController from "../components/StonkController";
import TranzactionItem from "../components/TranzactionItem";
import Card from "../UI/Card";
import PageContainer from "../UI/PageContainer";
import styles from "./MyStonksPage.module.css";

const MyStonks = () => {
  const myTranzactions = useSelector((state) => state.stonks.tranzactions);
  const myStonks = new Map();
  myTranzactions.forEach((element) => {
    if (myStonks.has(element.symbol)) {
      if (element.type === "BUY")
        myStonks.set(
          element.symbol,
          myStonks.get(element.symbol) + element.amount
        );
      else
        myStonks.set(
          element.symbol,
          myStonks.get(element.symbol) - element.amount
        );
    } else myStonks.set(element.symbol, element.amount);
  });

  const availableCash = useSelector((state) => state.stonks.cashMoney);
  const [tabState, setTabState] = useState("STONKS");
  const handleTabChange = () => {
    tabState === "TRANZACTIONS"
      ? setTabState("STONKS")
      : setTabState("TRANZACTIONS");
  };
  return (
    <PageContainer>
      {<NavBar />}

      <h1 className={styles.title}> MY STONK PAGE </h1>
      <h2 className={styles.cash}>{`CASH ON HAND: ${availableCash}$`}</h2>

      <div className={styles.tabs}>
        <button
          onClick={handleTabChange}
          className={`${styles.button} ${
            tabState === "TRANZACTIONS" ? styles["tab-active"] : undefined
          }`}
        >
          TRANZACTIONS
        </button>
        <button
          onClick={handleTabChange}
          className={`${styles.button} ${
            tabState === "STONKS" ? styles["tab-active"] : undefined
          }`}
        >
          OWNED STONKS
        </button>
      </div>

      <div>
        {tabState === "TRANZACTIONS" &&
          (myTranzactions.length > 0 ? (
            <ul className={styles.list}>
              {myTranzactions.map((item) => (
                <TranzactionItem
                  key={item.date + Math.random()}
                  type={item.type}
                  price={item.price}
                  symbol={item.symbol}
                  amount={item.amount}
                  total={item.total}
                  date={item.date}
                />
              ))}
            </ul>
          ) : (
            <p>WOW such empty!</p>
          ))}
        {tabState === "STONKS" &&
          (myStonks.size > 0 ? (
            <ul className={styles.list}>
              {Array.from(myStonks).map(([key, value]) => (
                <Card>
                  <StonkController key={key} symbol={key} amount={value} />
                </Card>
              ))}
            </ul>
          ) : (
            <p>WOW such empty!</p>
          ))}
      </div>
    </PageContainer>
  );
};

export default MyStonks;
