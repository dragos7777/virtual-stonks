import PageContainer from "../UI/PageContainer";
import { useCookies } from "react-cookie";
import Card from "../UI/Card";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { stonksAction } from "../store/my-stonks-slice";
import { sendStonks, getUser } from "../helpers/firebase";
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
      console.log(payload);
      dispatch(stonksAction.setStonks(payload));
    });
  }
  console.log(cookies);
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
      <h1>HELLO</h1>
      {cookies.tokenVirtualStonk && <p>HELLO {user}</p>}
      {cookies.tokenVirtualStonk && (
        <button
          onClick={() => {
            navigate("/virtual-stonks/search");
          }}
        >
          {"GO BUY"}
        </button>
      )}
      {!cookies.tokenVirtualStonk && (
        <Card>
          <div>
            <label htmlFor="name">Choose your name: </label>
            <input type="text" id="search-bar" ref={textInputRef}></input>
            <button onClick={onSetName}>SET NAME</button>
          </div>
        </Card>
      )}
    </PageContainer>
  );
};

export default WelcomePage;
