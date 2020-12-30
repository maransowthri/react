import React from "react";
import Styled from "styled-components";

const StyledDiv = Styled.div`
  color: #333;
  background: yellow;
  
  button{
    background: lightgreen;
  }

  ul{
      background: #ccc;

      li{
          color: green;
      }
  }
`;

export default function Item(props) {
  return (
    <StyledDiv>
      <p>{props.data}</p>
      <button>dummy</button>
      <ul>
        <li>Karan</li>
        <li>Kalees</li>
        <li>Mahesh</li>
      </ul>
    </StyledDiv>
  );
}
