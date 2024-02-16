'use client'

import styled from "styled-components"

export default function Center({children}) {
  return (
    <StyleDiv>{children}</StyleDiv>
  )
}

const StyleDiv = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
`;