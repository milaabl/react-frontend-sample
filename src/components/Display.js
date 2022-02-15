import React from "react";

import { StyledDisplay } from './styles/StyledDisplay'

export default ({ gameOver, text }) => <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>;
