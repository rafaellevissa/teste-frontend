import { Container, Grid, IconButton } from "@mui/material";
import SearchInput from "../SearchInput/SearchInput";
import { MyLocation as MyLocationIcon } from "@mui/icons-material";

export default function Navbar() {
  return (
    <Container component="nav">
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <SearchInput placeholder="City" onChange={() => {}} value="" />
        </Grid>
        <Grid item>
          <IconButton color="primary">
            <MyLocationIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
}
