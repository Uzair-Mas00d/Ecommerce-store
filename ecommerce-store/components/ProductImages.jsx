"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState("");
  useEffect(() => {
    setActiveImage(images?.[0]);
  },[images])

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} alt="" />
      </BigImageWrapper>
      <ImageButtons>
        {images?.map((image, index) => (
          <ImageButton onClick={() => setActiveImage(image)} active={image===activeImage ? 'true': ''} key={index}>
            <Image src={image} />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-grow: 0;
  margin-top: 10px;
`;

const ImageButton = styled.div`
  border: 2px solid #ccc;
  border-color: ${props => props.active ? '#ccc': 'transparent'};
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;
