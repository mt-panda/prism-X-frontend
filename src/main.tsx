import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import theme from "./styles/theme.ts"
import { CssBaseline, ThemeProvider } from '@mui/material';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* <-- removes default body margins */}
      <App />
    </ThemeProvider>
  </StrictMode>
);
