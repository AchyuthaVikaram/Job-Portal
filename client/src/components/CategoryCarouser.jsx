import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import './CategoryCarouser.css'; // Make sure to include the updated CSS

const CategoryCarouser = () => {
  return (
    <Carousel
      className="text-center custom-carousel"
      prevIcon={<span className="carousel-control-prev-icon custom-arrow" />}
      nextIcon={<span className="carousel-control-next-icon custom-arrow" />}
    >
      <Carousel.Item>
        <Button variant="dark" className="custom-button mt-3">
          Frontend Developer
        </Button>
      </Carousel.Item>

      <Carousel.Item>
        <Button variant="dark" className="custom-button mt-3">
          Backend Developer
        </Button>
      </Carousel.Item>

      <Carousel.Item>
        <Button variant="dark" className="custom-button mt-3">
          Data Science
        </Button>
      </Carousel.Item>

      <Carousel.Item>
        <Button variant="dark" className="custom-button mt-3">
          Full Stack Developer
        </Button>
      </Carousel.Item>
    </Carousel>
  );
};

export default CategoryCarouser;
