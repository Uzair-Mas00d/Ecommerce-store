"use client";

import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { db } from "@/app/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/icons/CartIcon";
import { CartContex } from "@/components/CartContext";

export default function ProductPage({ params }) {
  const {addProduct} = useContext(CartContex)
  const [product, setProducts] = useState({});
  useEffect(() => {
    async function fetchData() {
      const res = await getDoc(doc(db, "products", params.id));
      setProducts({ id: res.id, ...res.data() });
    }
    fetchData();
  }, []);

  function addToCart() {
    addProduct(product.id, product.name, product.price, product.photoUrl);
  }

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.photoUrl} />
          </WhiteBox>
          <div>
            <Title>{product.name}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>Rs.{product.price}</Price>
              </div>
              <div>
                <Button type="primary" onClick={addToCart}>
                  <CartIcon />
                  Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin: 40px 0;

  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
`;
