import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Comic } from "../../types"; // Adjust the path as necessary

interface ComicDisplayProps {
  comic?: Comic;
}

export const ComicDisplay: React.FC<ComicDisplayProps> = ({
  comic: initialComic,
}) => {
  const [comic, setComic] = useState<Comic | null>(initialComic ?? null);
  const { comicNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialComic && comicNumber) {
      fetch(`/xkcd/${comicNumber}`)
        .then((response) => response.json())
        .then((data) => setComic(data))
        .catch((error) => console.error("Failed to fetch comic:", error));
    }
  }, [comicNumber, initialComic]);

  const goToPreviousComic = () => {
    if (comic && comic.num > 1) {
      navigate(`/comic/${comic.num - 1}`);
    }
  };

  const goToNextComic = () => {
    // Assuming you don't know the latest comic number.
    // This will fail silently if there is no next comic.
    if (comic) {
      navigate(`/comic/${comic.num + 1}`);
    }
  };

  if (!comic) return <p>Loading...</p>;

  return (
    <div>
      <h2>
        {comic.title} (#{comic.num})
      </h2>
      <img src={comic.img} alt={comic.alt} />
      <p>
        Date: {comic.day}/{comic.month}/{comic.year}
      </p>
      <button onClick={goToPreviousComic}>Previous</button>
      <button onClick={goToNextComic}>Next</button>
    </div>
  );
};
