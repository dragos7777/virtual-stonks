import { useRef } from "react";
import Card from "../UI/Card";
import styles from "./SearchBar.module.css";

const SearchBar = (props) => {
  const textInputRef = useRef();
  const onSearchHandler = () => {
    props.onSearch(textInputRef.current.value);
  };

  return (
    <section className={styles["search-bar"]}>
      <Card>
        <div className={styles["search"]}>
          <label htmlFor="search-bar">Search Stonk: </label>
          <input
            type="text"
            id="search-bar"
            ref={textInputRef}
            defaultValue={props.searchInput}
          ></input>
          <button className={styles.button} onClick={onSearchHandler}>
            SEARCH
          </button>
        </div>
      </Card>
    </section>
  );
};

export default SearchBar;
