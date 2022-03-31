import styles from "./StonkController.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStock } from "../helpers/firebase";

const StonkController = (props) => {
  const [curInfo, setTotalPrice] = useState(null);
  console.log(curInfo);
  const navigate = useNavigate();
  const onInvestHandler = () => {
    navigate(`/virtual-stonks/search/${props.symbol}`);
  };
  useEffect(() => {
    getStock(props.symbol).then((data) => setTotalPrice(data));
    return () => {
      setTotalPrice({});
    };
  }, []);

  return (
    <li>
      <p>{`Symbol: ${props.symbol}`}</p>
      <p>{`Amount: ${props.amount}`}</p>
      {curInfo && <p>{`Total value: ${curInfo.price * props.amount}`}</p>}
      <button onClick={onInvestHandler}> {"INVEST"} </button>
    </li>
  );
};

export default StonkController;
