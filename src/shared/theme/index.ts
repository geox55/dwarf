import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const theme = responsiveFontSizes(createTheme({
  typography: {
    htmlFontSize: 16,
  },
}));
