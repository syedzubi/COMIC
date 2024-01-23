import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Comic } from "./types"; // adjust the path as necessary
import { ComicDisplay } from "./components/ComicDisplay/ComicDisplay";

const App = () => {
  const [latestComic, setLatestComic] = useState<Comic | null>(null);

  useEffect(() => {
    fetch("/xkcd/latest")
      .then((response) => response.json())
      .then((data) => setLatestComic(data));
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              latestComic ? (
                <ComicDisplay comic={latestComic} />
              ) : (
                <p>Loading...</p>
              )
            }
          />
          <Route path="/comic/:comicNumber" element={<ComicDisplay />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
