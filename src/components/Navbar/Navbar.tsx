import { Container, Grid, IconButton } from "@mui/material";
import SearchInput from "../SearchInput/SearchInput";
import { MyLocation as MyLocationIcon } from "@mui/icons-material";
import { useState } from "react";

type Props = {
  onSearchChange: (value: string) => void;
  onLocationClick: () => void;
};

export default function Navbar({ onSearchChange, onLocationClick }: Props) {
  const [search, setSearch] = useState<string>("");

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value ?? "");
  };

  const handleSearchInputBlur = () => onSearchChange(search);

  const handleLocationClick = () => onLocationClick();

  return (
    <Container component="nav">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={10}>
          <SearchInput
            placeholder="City"
            onChange={handleSearchInputChange}
            value={search}
            onBlur={handleSearchInputBlur}
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton color="primary" onClick={handleLocationClick}>
            <MyLocationIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
}
