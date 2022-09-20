import { memo } from 'react'
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      Oota Code Blog{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const Footer = memo(() => {

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Copyright />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <div>
            <IconButton href="https://github.com/OotaShikou">
              <GitHubIcon />
            </IconButton>
          </div>
          <div>
            <IconButton href="https://twitter.com/Icjtx472UVjO195">
              <TwitterIcon />
            </IconButton>
          </div>
          <div>
            <IconButton href="https://www.facebook.com/Ootashikou/">
              <FacebookIcon />
            </IconButton>
          </div>
        </Box>

      </Container>
    </Box>
  );
})