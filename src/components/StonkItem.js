import { useNavigate } from "react-router-dom";
import classes from "./StonkItem.module.css";

const StonkItem = (props) => {
  const navigate = useNavigate();
  const onInspectHandler = () => {
    navigate(`/virtual-stonks/search/${props.symbol}`);
  };

  return (
    <li>
      <div className={classes.stonk}>
        <h2>SYMBOL:{props.symbol}</h2>
        <h2>COMPANY NAME:{props.company}</h2>
        <button onClick={onInspectHandler}> INVEST </button>
      </div>
    </li>
  );
};

export default StonkItem;
