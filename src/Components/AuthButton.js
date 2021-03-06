import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Button = styled.button`
  width: 460px;
  height: 60px;
  background-color: #03c75a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;

const AuthButton = ({ text }) => {
  return <Button>{text}</Button>;
};

AuthButton.propTypes = {
  text: PropTypes.string.isRequired
};

export default AuthButton;
