import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Anime search app
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        disableGutters
        sx={{
          marginTop: 2,
        }}
      >
        <Outlet />
      </Container>
    </div>
  );
}

export default Layout;
