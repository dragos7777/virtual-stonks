import { createSlice } from "@reduxjs/toolkit";
import { sendStonks } from "../helpers/firebase";
const stonksSlice = createSlice({
  name: "stonks",
  initialState: {
    token: "",
    userName: "",
    tranzactions: [],
    cashMoney: 100000,
  },
  reducers: {
    addTranzaction(state, action) {
      state.tranzactions.push(action.payload);

      state.cashMoney =
        parseFloat(state.cashMoney).toFixed(6) -
        parseFloat(action.payload.total).toFixed(6);

      sendStonks(state, state.token);
    },
    addSellTranzaction(state, action) {
      state.tranzactions.push(action.payload);

      state.cashMoney =
        +parseFloat(state.cashMoney).toFixed(6) +
        +parseFloat(action.payload.total);

      sendStonks(state, state.token);
    },
    setStonks(state, action) {
      state.userName = action.payload.userName;
      state.tranzactions = action.payload.tranzactions
        ? action.payload.tranzactions
        : [];
      state.cashMoney = action.payload.cashMoney;
      state.token = action.payload.token;
    },
  },
});

export const stonksAction = stonksSlice.actions;

export default stonksSlice;
