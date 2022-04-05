import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { stonksAction } from "../store/my-stonks-slice";
import Card from "../UI/Card";
import StockChart from "./StockChart";
import styles from "./StonkDetail.module.css";

const StonkDetail = (props) => {
  const cashMoney = useSelector((state) => state.stonks.cashMoney);
  const dispatch = useDispatch();
  const amountInputRef = useRef();
  const amountSellInputRef = useRef();

  const handleBuyStonk = () => {
    let amount = parseFloat(amountInputRef.current.value);
    if (!isNaN(amount) && amount !== 0) {
      let maxAmount =
        parseFloat(cashMoney) / parseFloat(props.currentInfo.price);
      if (parseFloat(amountInputRef.current.value) > maxAmount) {
        amountInputRef.current.value = maxAmount;
      } else {
        let price = props.currentInfo.price;
        let total = parseFloat(price * amount).toPrecision(6);

        if (isNaN(total) || isNaN(parseFloat(total))) {
          alert("INPUT NOT VALID");
          return;
        }
        const transaction = {
          type: "BUY",
          symbol: props.baseInfo.symbol,
          date: new Date().toJSON().slice(0, 16).replace("T", " "),
          amount: amount,
          price: props.currentInfo.price,
          total: total,
        };
        dispatch(stonksAction.addTranzaction(transaction));
        alert("TRANZACTION SUCCESSFUL");
        amountInputRef.current.value = 0;
      }
    } else {
      alert("INPUT NOT VALID");
      amountInputRef.current.value = 0;
    }
  };
  const handleSellStonk = () => {
    let amount = parseFloat(amountSellInputRef.current.value);
    if (!isNaN(amount) && amount !== 0) {
      if (amount > props.tranzactionInfo.amount) {
        amountSellInputRef.current.value = props.tranzactionInfo.amount;
      } else {
        let price = props.currentInfo.price;
        let total = parseFloat(price * amount).toPrecision(6);
        if (isNaN(total) || isNaN(parseFloat(total))) {
          alert("INPUT NOT VALID");
          return;
        }
        const transaction = {
          type: "SELL",
          symbol: props.baseInfo.symbol,
          date: new Date().toJSON().slice(0, 16).replace("T", " "),
          amount: amount,
          price: props.currentInfo.price,
          total: total,
        };
        dispatch(stonksAction.addSellTranzaction(transaction));
        alert("TRANZACTION SUCCESSFUL");
        amountSellInputRef.current.value = 0;
      }
    } else {
      alert("INPUT NOT VALID");
      amountSellInputRef.current.value = 0;
    }
  };

  const percentChange = props.tranzactionInfo
    ? (props.currentInfo.price /
        (props.tranzactionInfo.total / props.tranzactionInfo.amount)) *
        100 -
      100
    : 0;

  const checkAmountHandler = () => {
    let maxAmount = cashMoney / props.currentInfo.price;
    if (Number(amountInputRef.current.value) > maxAmount)
      amountInputRef.current.value = maxAmount;
  };
  const checkSellAmountHandler = () => {
    if (
      Number(amountSellInputRef.current.value) >
      parseFloat(props.tranzactionInfo.amount)
    )
      amountSellInputRef.current.value = props.tranzactionInfo.amount;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{props.baseInfo.symbol}</h1>
      <div className={styles.chart}>
        <Card>
          <StockChart symbol={props.baseInfo.symbol} />
        </Card>
      </div>
      <div className={styles.row}>
        <Card>
          <div>
            <h2>Base Information</h2>
            <h3>{`Company: ${props.baseInfo.company}`}</h3>
            <h3>{`Sector: ${props.baseInfo.sector}`}</h3>
            <h3>{`Industry: ${props.baseInfo.industry}`}</h3>
          </div>
        </Card>
        <Card>
          <div>
            <h2>Real time Information</h2>
            <h3> {`PRICE: ${props.currentInfo.price}$`} </h3>
            <h3> {`${props.currentInfo.changeDollars}$ (last 24 hours)`} </h3>
            <h3> {`${props.currentInfo.changePercent} (last 24 hours)`} </h3>
          </div>
        </Card>
      </div>
      <div className={styles.row}>
        <Card>
          {!props.tranzactionInfo && <h2>Stock not bought yet</h2>}
          {props.tranzactionInfo && props.tranzactionInfo.amount <= 0 && (
            <h2>All Sold</h2>
          )}
          {props.tranzactionInfo && props.tranzactionInfo.amount > 0 && (
            <div>
              <h2>Tranzactions Information</h2>
              <h3> {`Amount bought: ${props.tranzactionInfo.amount}`} </h3>
              <h3>
                {`Average buying price per stock: ${
                  props.tranzactionInfo.total / props.tranzactionInfo.amount
                }`}
              </h3>
              <h3>
                {" "}
                {`Current total value: ${
                  props.tranzactionInfo.amount * props.currentInfo.price
                } `}{" "}
              </h3>

              <h3
                className={`${percentChange > 0 ? styles.green : styles.red}`}
              >
                {" "}
                {`Percent change: ${percentChange.toFixed(4)}% `}{" "}
              </h3>
            </div>
          )}
        </Card>

        <Card>
          <div className="actions">
            <h2>BUY {`&`} SELL</h2>
            <div>
              <label htmlFor="amount-input">Amount to buy: </label>
              <input
                type="text"
                id="amount-input"
                ref={amountInputRef}
                defaultValue={0.0}
                onChange={checkAmountHandler}
              ></input>
              <button className={styles.button} onClick={handleBuyStonk}>
                BUY STONK
              </button>
            </div>
            {props.tranzactionInfo && (
              <div>
                <label htmlFor="amount-sell-input">Amount to sell: </label>
                <input
                  type="text"
                  id="amount-sell-input"
                  ref={amountSellInputRef}
                  defaultValue={0.0}
                  onChange={checkSellAmountHandler}
                ></input>
                <button className={styles.button} onClick={handleSellStonk}>
                  SELL STONK
                </button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StonkDetail;
