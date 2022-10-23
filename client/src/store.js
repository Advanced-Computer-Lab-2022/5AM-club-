import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
import { thunk } from "redux-thunk";
import rootReducer from "./reducer";

const initialState = {};

const middleware = [thunk];

const store = configureStore({ reducer: {} });
export default store;
