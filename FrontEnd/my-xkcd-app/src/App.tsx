import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";

const CustomPaper = styled(Paper)({
  padding: "20px",
  margin: "20px 0",
  textAlign: "center",
});

const StyledContainer = styled(Container)({
  padding: "20px",
  minHeight: "100vh",
});

const App = () => {
  const [xkcdData, setXkcdData] = useState<any>(null);
  const [latestComicNumber, setLatestComicNumber] = useState<any>(0);

  useEffect(() => {
    fetchLatestComic();
  }, []);

  const fetchComic = (comicNumber: any) => {
    fetch(`http://localhost:5000/xkcd/${comicNumber}`)
      .then((response) => response.json())
      .then((data) => setXkcdData(data))
      .catch((error) => console.error("Error fetching XKCD data:", error));
  };

  const fetchLatestComic = () => {
    fetch("http://localhost:5000/xkcd/latest")
      .then((response) => response.json())
      .then((data) => {
        setXkcdData(data);
        setLatestComicNumber(data.num);
      })
      .catch((error) => console.error("Error fetching XKCD data:", error));
  };

  const handlePrev = () => {
    if (xkcdData && xkcdData?.num > 1) {
      fetchComic(xkcdData?.num - 1);
    }
  };

  const handleNext = () => {
    if (xkcdData && xkcdData?.num < latestComicNumber) {
      fetchComic(xkcdData?.num + 1);
    }
  };

  const handleRandom = () => {
    if (xkcdData && xkcdData?.num) {
      const randomNumber =
        Math.floor(Math.random() * (latestComicNumber - 0 + 1)) + 0;
      fetchComic(randomNumber);
    }
  };

  return (
    <div>
      <StyledContainer maxWidth="md">
        <Typography variant="h2" gutterBottom>
          Comic Viewer
        </Typography>
        {xkcdData && (
          <CustomPaper elevation={3}>
            <Typography variant="h4">{xkcdData.title}</Typography>
            <img
              src={xkcdData.img}
              alt={xkcdData.alt}
              style={{ width: "100%", height: "auto" }}
            />
            <Typography variant="body1">
              <strong>Comic Number:</strong> {xkcdData.num}
            </Typography>
            <Typography variant="body1">
              <strong>Date:</strong>{" "}
              {/* {`${xkcdData.month}/${xkcdData.day}/${xkcdData.year}`} */}
            </Typography>
            <Typography variant="body2" fontStyle="italic">
              {xkcdData.alt}
            </Typography>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              marginTop={"8px"}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePrev}
                >
                  Prev
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={handleRandom}>
                  Random
                </Button>
              </Grid>
            </Grid>
          </CustomPaper>
        )}
      </StyledContainer>
    </div>
  );
};

export default App;
