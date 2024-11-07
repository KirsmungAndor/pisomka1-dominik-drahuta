// components/Menu.tsx

"use client";

import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';

const MyMenu = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure this component is client-side rendered
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path: string) => {
    if (isMounted) {
      const router = useRouter();
      router.push(path);
      handleClose();
    }
  };

  if (!isMounted) {
    return null; // Render nothing on the server
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          MyAssignment
        </Typography>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu
            }
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleNavigation('/')}>Homepage</MenuItem>
            {!session && <MenuItem onClick={() => signIn()}>Login</MenuItem>}
            {session && <MenuItem onClick={() => signOut()}>Logout</MenuItem>}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MyMenu;
