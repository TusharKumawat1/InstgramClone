import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ContextApi from "./context/ContextApi";
const client = new ApolloClient({
  uri: "http://localhost:3002/graphql",
  cache: new InMemoryCache(),
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(

    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
