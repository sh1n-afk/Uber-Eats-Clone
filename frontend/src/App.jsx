import React from "react";
// import logo from "./logo.svg";
// import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Router } from "react-router-dom";
import history from "./utils/history";
import CustomLayout from "./screens/shared/CustomLayout";
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      console.log(message);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:3001/graphql" }),
]);

const client = new ApolloClient({ cache: new InMemoryCache(), link });

function App() {
  return (
    <ApolloProvider client={client}>
      <Router history={history}>
        <div className="App">
          <CustomLayout />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
