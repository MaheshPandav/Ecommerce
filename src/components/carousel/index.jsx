import React, { useState } from "react";
import styles from "./carousel.module.scss";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles["carousel-container"]}>
      <div className={styles["carousel"]}>
        <div
          className={styles["carousel-slide"]}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((data, index) => (
            <img
              key={data.id}
              src={data.imageUrl}
              alt={styles[`Slide ${index + 1}`]}
              className={styles["carousel-image"]}
            />
          ))}
        </div>
      </div>
      <button
        className={styles["carousel-button prev"]}
        onClick={handlePrevious}
      >
        Previous
      </button>
      <button className={styles["carousel-button next"]} onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Carousel;
