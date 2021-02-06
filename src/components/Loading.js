import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 1em auto;
`;

function Loading() {
  return (
    <div>
      <PacmanLoader color="#ffffff" size={72} css={override} />
    </div>
  );
}

export default Loading;
