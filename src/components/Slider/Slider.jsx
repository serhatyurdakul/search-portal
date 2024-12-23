import { useState, useEffect } from "react";
import { sliderData } from "../../data/sliderData";
import arrowLeft from "../../assets/icon/arrow-left.svg";
import arrowRight from "../../assets/icon/arrow-right.svg";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const numVisibleItems = 3;

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + 1) % (sliderData.length - (numVisibleItems - 1))
    );
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + (sliderData.length - (numVisibleItems - 1))) %
        (sliderData.length - (numVisibleItems - 1))
    );
  };

  return (
    <section className='slider'>
      <div className='container'>
        <h1 className='title-lg'>Top News</h1>
        <div className='slider-wrapper'>
          <button
            className='slider-button slider-button-left'
            onClick={handlePrev}
          >
            <img src={arrowLeft} alt='Previous' />
          </button>

          {sliderData
            .slice(currentIndex, currentIndex + numVisibleItems)
            .map((item) => (
              <div className='news-card' key={item.id}>
                <a href={item.url} target='_blank' rel='noopener noreferrer'>
                  <img src={item.image} alt='news-image' />
                </a>
                <a href={item.url} target='_blank' rel='noopener noreferrer'>
                  <p className='news-header subheading'>{item.title}</p>
                </a>
                <a href={item.url} target='_blank' rel='noopener noreferrer'>
                  <p className='news-info'>
                    {item.time} · by {item.author}
                  </p>
                </a>
              </div>
            ))}

          <button
            className='slider-button slider-button-right'
            onClick={handleNext}
          >
            <img src={arrowRight} alt='Next' />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Slider;
