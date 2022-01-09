import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import { purple, blue, red, green } from "@mui/material/colors";

import AnimeType from "../types/Anime";

const Anime = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [loading, isLoading] = React.useState(false);
  const [anime, setAnime] = React.useState<AnimeType>();

  React.useEffect(() => {
    isLoading(true);
    (async () => {
      const response = await axios.get<AnimeType>(
        `https://api.jikan.moe/v4/anime/${params.animeId}`
      );
      isLoading(false);
      setAnime(response.data);
      console.log("response.data :>> ", response.data);
    })();
  }, []);

  if (loading) {
    return <CircularProgress size={20} />;
  }

  return (
    <Container disableGutters>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            mb: 2,
          }}
        >
          <Box sx={{ mr: 2 }}>
            <img src={anime?.data.images.jpg.image_url} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h6" gutterBottom component="h6">
                Synopsis
              </Typography>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                {anime?.data.synopsis}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  backgroundColor: blue[50],
                  border: 1,
                  borderColor: blue[100],
                  p: 2,
                  width: "150px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: blue[900], fontWeight: "bold" }}
                >
                  {anime?.data.score}
                </Typography>
                <Typography variant="overline" sx={{ color: blue[700] }}>
                  {anime?.data.scored_by.toLocaleString()} users
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: purple[50],
                  border: 1,
                  borderColor: purple[100],
                  p: 2,
                  width: "150px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  ml: 1,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: purple[900], fontWeight: "bold" }}
                >
                  #{anime?.data.rank}
                </Typography>
                <Typography variant="overline" sx={{ color: purple[700] }}>
                  Ranked
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: red[50],
                  border: 1,
                  borderColor: red[100],
                  p: 2,
                  width: "150px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  ml: 1,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: red[900], fontWeight: "bold" }}
                >
                  #{anime?.data.rank}
                </Typography>
                <Typography variant="overline" sx={{ color: red[700] }}>
                  Popularity
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: green[50],
                  border: 1,
                  borderColor: green[100],
                  p: 2,
                  width: "150px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  ml: 1,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: green[900], fontWeight: "bold" }}
                >
                  {anime?.data.members.toLocaleString()}
                </Typography>
                <Typography variant="overline" sx={{ color: green[700] }}>
                  Members
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{}}>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            startIcon={<ArrowBackIos />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Anime;
