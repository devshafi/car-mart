import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export function Nav() {

  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <Typography variant="h6" sx={{ flexGrow: 1 }} >
          Car Mart
        </Typography>

        <Button color="inherit">
          <Link href="/">
            <a style={{ color: 'white', textDecoration:'none' }}>
              <Typography  color="inherit">
                Home
              </Typography>
            </a>
          </Link>
        </Button>

        <Button color="inherit">
          <Link href="/faq">
            <a style={{ color: 'white',textDecoration:'none' }}>
              <Typography  color="inherit">
                FAQ
              </Typography>
            </a>
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}