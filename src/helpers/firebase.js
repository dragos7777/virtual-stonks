export function sendStonks(payload, token) {
  // Simple POST request with a JSON body using fetch
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
  fetch(
    `https://virtual-stonks-default-rtdb.europe-west1.firebasedatabase.app/user/${token}.json`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

export async function getUser(token) {
  const response = await fetch(
    `https://virtual-stonks-default-rtdb.europe-west1.firebasedatabase.app/user/${token}.json`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quote.");
  }

  const ans = {
    ...data,
  };

  return ans;
}

export async function getStock(symbol) {
  let stonk = JSON.parse(sessionStorage.getItem(symbol));
  if (!stonk) {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=HYFHFW8XGPG02UOR`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not fetch quote.");
    }

    const ans = {
      ...data,
    };
    const currentInfo = {
      price: ans["Global Quote"]["05. price"],
      changeDollars: ans["Global Quote"]["09. change"],
      changePercent: ans["Global Quote"]["10. change percent"],
    };
    sessionStorage.setItem(symbol, JSON.stringify(currentInfo));
  }
  stonk = JSON.parse(sessionStorage.getItem(symbol));
  return stonk;
}

export async function getStockHistory(symbol) {
  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=HYFHFW8XGPG02UOR&outputsize=compact`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quote.");
  }

  const ans = {
    ...data["Time Series (Daily)"],
  };

  const currentInfo = [];
  for (let prop in ans) {
    currentInfo.push({
      date: prop,
      price: +ans[prop]["4. close"],
    });
  }

  return currentInfo;
}
