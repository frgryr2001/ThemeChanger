import { AppBar, IconButton, Toolbar, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { MenuOutlined } from "@mui/icons-material";

export const Navbar = () => {
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <IconButton size="large" edge="start">
          <MenuOutlined />
        </IconButton>
        <NextLink href="/" passHref legacyBehavior>
          <Link underline="none">
            <Typography variant="h6" color={"white"}>
              CookieMaster
            </Typography>
          </Link>
        </NextLink>

        <div style={{ flex: 1 }} />

        <NextLink href="/theme-changer" passHref legacyBehavior>
          <Link underline="none">
            <Typography variant="h6" color={"white"}>
              Change Color
            </Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
};
