import PageContainer from "../UI/PageContainer";
import { useCookies } from "react-cookie";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { stonksAction } from "../store/my-stonks-slice";
import { sendStonks, getUser } from "../helpers/firebase";
import styles from "./WelcomePage.module.css";
import NavBar from "../components/NavBar";

const WelcomePage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.stonks.userName);

  const [cookies, setCookie] = useCookies(["virtula-stonks"]);

  if (cookies.tokenVirtualStonk) {
    getUser(cookies.tokenVirtualStonk).then((data) => {
      const { userName, tranzactions, cashMoney, token } = data;
      const payload = {
        token: token,
        userName: userName,
        tranzactions: tranzactions,
        cashMoney: cashMoney,
      };

      dispatch(stonksAction.setStonks(payload));
    });
  }

  const textInputRef = useRef();
  const onSetName = () => {
    const newToken = textInputRef.current.value + Date.now();
    const payload = {
      token: newToken,
      tranzactions: [],
      cashMoney: 1_000_000,
      userName: textInputRef.current.value,
    };

    setCookie("tokenVirtualStonk", newToken, { path: "/", maxAge: 36000000 });
    dispatch(stonksAction.setStonks(payload));
    sendStonks(payload, newToken);
    navigate("/virtual-stonks/search");
  };
  return (
    <PageContainer>
      {<NavBar />}
      <div className={styles.container}>
        <h1 className={styles.title}>WELCOME TO VIRTUAL STONKS</h1>
        {cookies.tokenVirtualStonk && (
          <p className={styles.user}>Hello {user}!</p>
        )}
        {cookies.tokenVirtualStonk && (
          <button
            className={styles.button}
            onClick={() => {
              navigate("/virtual-stonks/search");
            }}
          >
            {"GO BUY"}
          </button>
        )}
      </div>
      {!cookies.tokenVirtualStonk && (
        <div className={styles.container}>
          <label className={styles.user} htmlFor="name">
            Choose your name:{" "}
          </label>
          <input
            className={styles.input}
            type="text"
            id="search-bar"
            ref={textInputRef}
          ></input>
          <button className={styles.button} onClick={onSetName}>
            SET NAME TO START BUYING
          </button>
        </div>
      )}
    </PageContainer>
  );
};

export default WelcomePage;
