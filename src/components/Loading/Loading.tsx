import React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import styles from "./Loading.module.scss";

const Loading: React.FC = () => {
  return (
    <Backdrop className={styles.backdrop} open={true} data-testid="backdrop">
      <CircularProgress color="inherit" data-testid="circular-progress" />
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Loading...
      </Typography>
    </Backdrop>
  );
};

export default Loading;
