import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import StonkDetail from "../components/StonkDetails";
import { getStock } from "../helpers/firebase";
import PageContainer from "../UI/PageContainer";
import { useSelector } from "react-redux";

const getStockBySymbol = (symbol) => {
  let data = JSON.parse(localStorage.getItem("stonks"));

  let stockBaseInfo = data.find(
    (item) => item.symbol.toLowerCase() === symbol.toLowerCase()
  );

  return stockBaseInfo;
};

const StockPage = () => {
  const [currenStockInfo, setCurrentStockInfo] = useState(null);
  const myTranzactions = useSelector((state) => state.stonks.tranzactions);
  const myStonks = new Map();
  myTranzactions.forEach((element) => {
    if (myStonks.has(element.symbol)) {
      if (element.type === "BUY")
        myStonks.set(element.symbol, {
          amount: myStonks.get(element.symbol).amount + element.amount,
          total: myStonks.get(element.symbol).total + parseFloat(element.total),
        });
      else
        myStonks.set(element.symbol, {
          amount: myStonks.get(element.symbol).amount - element.amount,
          total: myStonks.get(element.symbol).total - parseFloat(element.total),
        });
    } else
      myStonks.set(element.symbol, {
        amount: element.amount,
        total: parseFloat(element.total),
      });
  });

  const params = useParams();
  const baseInfo = getStockBySymbol(params.stockSymbol);

  useEffect(() => {
    getStock(params.stockSymbol).then((data) => {
      setCurrentStockInfo(data);
    });
  }, [params]);
  console.log(currenStockInfo);
  return (
    <PageContainer>
      {<NavBar />}
      {currenStockInfo && (
        <StonkDetail
          baseInfo={baseInfo}
          currentInfo={currenStockInfo}
          tranzactionInfo={myStonks.get(params.stockSymbol)}
        />
      )}
      {!baseInfo && <p>Could not get stonk</p>}
    </PageContainer>
  );
};

export default StockPage;
