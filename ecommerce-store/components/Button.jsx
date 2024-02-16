"use client";

import { styled } from "styled-components";

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

const StyledButton = styled.button`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  svg {
    height: 16px;
    margin-right: 5px;

    height: ${(props) => props.size === "l" && "20px"};
  }

  font-size: ${(props) => props.size === "l" && "1.2rem"};

  display: ${(props) => props.block && "block"};
  width: ${(props) => props.block && "100%"};

  background-color: ${(props) =>
    props.type === "primary" && !props.outline && "#5542f6"};
  color: ${(props) => props.type === "primary" && !props.outline && "#fff"};
  border: ${(props) =>
    props.type === "primary" && !props.outline && "1px solid #5542f6"};

  background-color: ${(props) =>
    props.type === "primary" && props.outline && "transparent"};
  color: ${(props) => props.type === "primary" && props.outline && "#5542f6"};
  border: ${(props) =>
    props.type === "primary" && props.outline && "1px solid #5542f6"};

  background-color: ${(props) =>
    props.type === "white" && !props.outline && "#fff"};
  color: ${(props) => props.type === "white" && !props.outline && "#000"};

  background-color: ${(props) =>
    props.type === "white" && props.outline && "transparent"};
  color: ${(props) => props.type === "white" && props.outline && "#fff"};
  border: ${(props) =>
    props.type === "white" && props.outline && "1px solid #fff"};
`;
