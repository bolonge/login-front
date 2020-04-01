import React from "react";
import GlobalStyles from "./GlobalStyles";
import { gql } from "apollo-boost";
import { HashRouter as Router } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import Routes from "./Components/Routes";

const CHECK = gql`
  {
    check @client
  }
`;

export default () => {
  const {
    data: { check }
  } = useQuery(CHECK);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes check={check}></Routes>
      </Router>
    </>
  );
};
