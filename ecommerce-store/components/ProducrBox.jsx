"use client";

import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useContext } from "react";
import { CartContex } from "./CartContext";

export default function ProducrBox({ id, name, description, price, photoUrl }) {
  const { addProduct } = useContext(CartContex)

  const url = '/products/'+id
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={photoUrl[0]} />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{name}</Title>
        <PriceRow>
          <Price>Rs.{price}</Price>
            <Button block={'true'} onClick={()=> addProduct(id,name,price, photoUrl)} type="primary" outline={1}>
               Add to cart
            </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const ProductWrapper = styled.div``;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;

  @media screen and (min-width: 768px) {
    display: flex;
    
  }
`;

const Price = styled.div`
    font-weight: 600;
    font-size: 1rem;
    text-align: right;

    @media screen and (min-width: 768px) {
      font-weight: 600;
    font-size: 1.1rem;
    text-align: left;
    }
`;
