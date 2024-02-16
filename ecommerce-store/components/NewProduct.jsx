"use client";

import styled from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

export default function NewProduct({ products }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}

const Title = styled.h2`
  font-size: 2rem;
`;
