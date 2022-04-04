import classes from "./StonkList.module.css";
import StonkItem from "./StonkItem";
import Card from "../UI/Card";

const StonkList = (props) => {
  const stonks = (
    <ul className={classes["stonk-items"]}>
      {props.stonks.map((item) => (
        <StonkItem
          key={item.symbol}
          symbol={item.symbol}
          company={item.company}
        />
      ))}
    </ul>
  );
  return (
    <section className={classes.stonks}>
      <Card>{stonks}</Card>
    </section>
  );
};

export default StonkList;
