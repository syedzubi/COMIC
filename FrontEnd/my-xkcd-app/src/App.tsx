import React, { useEffect, useState } from "react";

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
      <h1>XKCD Comic Viewer</h1>
      {xkcdData && (
        <div>
          <h2>{xkcdData?.title}</h2>
          <img src={xkcdData?.img} alt={xkcdData?.alt} />
          <p>
            <strong>Comic Number:</strong> {xkcdData?.num}
          </p>
          <p>
            <strong>Date:</strong> {xkcdData?.day}
          </p>
          <p>
            <em>{xkcdData?.alt}</em>
          </p>
          <button onClick={handlePrev}>Prev</button>
          <button onClick={handleNext}>Next</button>
          <button onClick={handleRandom}>Random</button>
        </div>
      )}
    </div>
  );
};

export default App;
