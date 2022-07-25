import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";

export const NavBar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
          {isAuthenticated && (
            <div>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {user.name}
              </Typography>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
