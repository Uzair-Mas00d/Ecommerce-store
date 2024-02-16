'use client'

import styled from "styled-components";
import ProducrBox from "./ProducrBox";

export default function ProductsGrid({ products }) {
  return (
    <StyledProductsGrid>
        {products?.length > 0 &&
          products.map((product) => (
            <ProducrBox key={product.id} {...product} />
          ))}
    </StyledProductsGrid>
  )
}

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 15px;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
