import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";
import Theme from "../styles/Theme";

export default () => (
  <ThemeProvider theme={Theme}>
    <GlobalStyles />
  </ThemeProvider>
);

export default App;
