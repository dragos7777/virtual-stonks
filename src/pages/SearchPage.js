import SearchBar from "../components/SearchBar";
import StonkList from "../components/StonkList";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageContainer from "../UI/PageContainer";
import NavBar from "../components/NavBar";
import styles from "./SearchPage.module.css";

const setSearchList = (searchTerm) => {
  if (searchTerm === null) return [];
  let data = JSON.parse(localStorage.getItem("stonks"));

  let serachedStonks = data.filter((item) =>
    item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return serachedStonks;
};

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  const stonks = setSearchList(queryParams.get("symbol"));

  const handleSearchBar = (searchTerm) => {
    setSearchList(searchTerm);
    navigate("/virtual-stonks/search?symbol=" + searchTerm);
  };

  function fetchMoviesHandler() {
    fetch(
      "https://virtual-stonks-default-rtdb.europe-west1.firebasedatabase.app/all-stonks/-Mwl-HZqxGiQbQEX_ktu.json"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("bad request");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("stonks", JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <PageContainer>
      {<NavBar />}
      <h2 className={styles.title}>{`SEARCH FOR A STOCK`}</h2>
      <SearchBar
        onSearch={handleSearchBar}
        searchInput={queryParams.get("symbol") ? queryParams.get("symbol") : ""}
      />
      {stonks.length > 0 ? (
        <StonkList stonks={stonks} />
      ) : (
        <p className={styles.title}>StonkNotFound</p>
      )}
    </PageContainer>
  );
};

export default SearchPage;
