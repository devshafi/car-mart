import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

import { SWRConfig } from "swr";
import axios from "axios";
import { Nav } from "../src/components/Nav";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
// axios.defaults.baseURL = "http://localhost:4001";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Car Mart</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Nav />
        <SWRConfig
          value={{ fetcher: (url: string) => axios(url).then((r) => r.data) }}
        >
          <Container maxWidth={false}>
            <Box sx={{ mt: 2 }}>
              <Component {...pageProps} />
            </Box>
          </Container>
        </SWRConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}
