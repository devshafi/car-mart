import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import Grid from "@mui/material/Grid";

export function Nav() {
  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <Grid sx={{ flexGrow: 1 }}>
          <Link href="/">
            <a style={{ color: "white", textDecoration: "none" }}>
              <Typography variant="h6">Car Mart</Typography>
            </a>
          </Link>
        </Grid>

        <Button color="inherit">
          <Link href="/">
            <a style={{ color: "white", textDecoration: "none" }}>
              <Typography color="inherit">Home</Typography>
            </a>
          </Link>
        </Button>

        <Button color="inherit">
          <Link href="/faq">
            <a style={{ color: "white", textDecoration: "none" }}>
              <Typography color="inherit">FAQ</Typography>
            </a>
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
