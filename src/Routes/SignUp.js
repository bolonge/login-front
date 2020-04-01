import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Title from "../Components/Title";
import AuthInput from "../Components/AuthInput";
import AuthButton from "../Components/AuthButton";
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
  width: 460px;
  height: 80vh;
  flex-direction: column;
`;

const SIGNUP = gql`
  mutation create($email: String!, $password: String!, $name: String!) {
    create(email: $email, password: $password, name: $name)
  }
`;

export default () => {
  const history = useHistory();
  const idInput = useInput("");
  const passInput = useInput("");
  const passConfirmInput = useInput("");
  const nameInput = useInput("");
  const [signUpMutation] = useMutation(SIGNUP, {
    variables: {
      email: idInput.value,
      password: passInput.value,
      name: nameInput.value
    }
  });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      if (
        idInput.value !== "" &&
        passInput.value !== "" &&
        passConfirmInput.value !== "" &&
        nameInput.value !== ""
      ) {
        if (passInput.value !== passConfirmInput.value) {
          alert("비밀번호가 일치하지 않습니다");
        } else {
          const { data: create } = await signUpMutation();
          if (create) {
            alert("정상적으로 가입되었습니다");
            history.push("/");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper>
      <Container>
        <Title title="never"></Title>
        <form onSubmit={onSubmit}>
          <AuthInput placeholder="  아이디" {...idInput}></AuthInput>
          <AuthInput
            placeholder="  비밀번호"
            {...passInput}
            type={"password"}
          ></AuthInput>
          <AuthInput
            placeholder="  비밀번호 확인"
            type={"password"}
            {...passConfirmInput}
          ></AuthInput>
          <AuthInput placeholder="  이름" {...nameInput}></AuthInput>
          <AuthButton text="가입하기"></AuthButton>
        </form>
      </Container>
    </Wrapper>
  );
};
