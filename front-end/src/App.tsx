import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/global";
import { defaultTheme } from "./styles/default";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/app.routes";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <GlobalStyles />
    </ThemeProvider>
  )
}