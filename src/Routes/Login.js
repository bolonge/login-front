import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Title from "../Components/Title";
import AuthButton from "../Components/AuthButton";
import AuthInput from "../Components/AuthInput";
import useInput from "../hooks/useInput";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  form {
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  flex-direction: column;
`;

const Text = styled.span`
  font-size: 13px;
  color: #8e8e8e;
  text-decoration: none;
`;

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const TOKENLOGIN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;

export default () => {
  const idInput = useInput("");
  const passInput = useInput("");
  const [loginMutation] = useMutation(LOGIN, {
    variables: { email: idInput.value, password: passInput.value }
  });
  const [tokenLoginMutation] = useMutation(TOKENLOGIN);
  const onSubmit = async e => {
    e.preventDefault();
    if (idInput.value !== "" && passInput.value !== "") {
      try {
        const {
          data: { login: token }
        } = await loginMutation();
        if (token !== "" || token !== undefined) {
          tokenLoginMutation({ variables: { token } });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Wrapper>
      <Container>
        <Title title="never"></Title>
        <form onSubmit={onSubmit}>
          <AuthInput placeholder={"  아이디"} {...idInput}></AuthInput>
          <AuthInput
            placeholder={"  비밀번호"}
            {...passInput}
            type={"password"}
          ></AuthInput>
          <AuthButton text="로그인"></AuthButton>
        </form>
        <Link style={{ textDecoration: "none" }} to="SignUp">
          <Text>회원가입</Text>
        </Link>
      </Container>
    </Wrapper>
  );
};
