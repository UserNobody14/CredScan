import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Home from "./Home"; 
import CandidateEntry from "./CandidateInforEntry";
import Dossier from "./Dossier";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: '#2fe095', // Change this to your secondary color
    },
    secondary: {
      main: '#424242', // Change this to your primary color
    },
    text: {
      primary: '#fbf5f1', // Change this to your default text color
      secondary: '#989898', // Change this to your secondary text color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Change this to your desired font family
    body1: {
      fontSize: '1rem', // Change this to your desired default font size
      fontWeight: 400, // Change this to your desired default font weight
      lineHeight: 1.5, // Change this to your desired default line height
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/candidate-entry",
    element: <CandidateEntry/>,
  },
  {
    path: "/dossier",
    element: <Dossier/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);