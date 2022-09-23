import { Box, Typography, Avatar, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Profile() {
  return (
    <>
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ width: 64, height: 64 }} alt="太田志幸" src="/avatar.jpeg" />
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Typography sx={{ fontSize: "0.98rem", fontWeight: "bold" ,color:"#222", pl: "5px"}}>
                太田志幸
                </Typography>
                <Box>
                <IconButton size='small' href="https://github.com/OotaShikou">
                    <GitHubIcon />
                </IconButton>
                <IconButton size='small'  href="https://twitter.com/Icjtx472UVjO195">
                    <TwitterIcon />
                </IconButton>
                <IconButton size='small'  href="https://www.facebook.com/Ootashikou/">
                    <FacebookIcon />
                </IconButton>
                </Box>
            </Box>
        </Box>
        <Typography sx={{ fontSize: "0.98rem" ,color:"#222", mt: 1}}>
            現在、SEとして働いています。<br />
            ご連絡を取りたい方はTwitterのDMからお願いします。
        </Typography>
    </>
  )
}