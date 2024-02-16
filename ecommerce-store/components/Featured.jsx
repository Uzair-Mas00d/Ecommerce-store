"use client";

import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "@/icons/CartIcon";
import { useContext } from "react";
import { CartContex } from "./CartContext";

export default function Featured({ featureProduct }) {
  const { addProduct } = useContext(CartContex);
  function addFeaturedToCart() {
    addProduct(
      featureProduct.id,
      featureProduct.name,
      featureProduct.price,
      featureProduct.photoUrl
    );
  }

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Titles>{featureProduct.name}</Titles>
              <Desc>{featureProduct.description}</Desc>
              <ButtonWrapper>
                <ButtonLink
                  href={"/products/" + featureProduct.id}
                  outline={1}
                  type="white"
                >
                  Read more
                </ButtonLink>
                <Button type="white" onClick={addFeaturedToCart}>
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonWrapper>
            </div>
          </Column>
          <Column>
            <img src="https://firebasestorage.googleapis.com/v0/b/admin-pannel-c564a.appspot.com/o/products%2Facer.jpg?alt=media&token=0e27ffab-4d88-4c85-86b4-cc80655581e9" />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Titles = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;

  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }

`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }

  div:nth-child(1) {
    order: 2;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;

    div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;
