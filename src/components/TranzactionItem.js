import { useEffect, useState } from "react";
import styles from "./TranzactionItem.module.css";
import { getStock } from "../helpers/firebase";
import Card from "../UI/Card";
const TranzactionItem = (props) => {
  return (
    <Card>
      <li className={styles.item}>
        <p>{`Type: ${props.type}`} </p>
        <p> {`Stock: ${props.symbol}`} </p>
        <p> {`Date: ${props.date}`} </p>
        <p> {`Price: ${props.price}`} </p>
        <p> {`Amount: ${props.amount}`} </p>
        <p> {`Total: ${props.total}`} </p>
      </li>
    </Card>
  );
};

export default TranzactionItem;
