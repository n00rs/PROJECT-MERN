import { Button, Carousel, Row } from "react-bootstrap";

import slideImg1 from "../../assets/slide-1.jpg";
import slideImg2 from "../../assets/slide-2.jpg";
const LandingCarousel = (Props) => {
  return (
    <Row>
      <Carousel>
        <Carousel.Item interval={3000}>
          <img className="d-block w-100 " src={slideImg2} alt="First slide" />
          <Carousel.Caption>
            <Button>SHOP NOW</Button>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <Carousel.Caption>
            <Button>SHOP NOW</Button>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
          <img className="d-block w-100" src={slideImg1} alt="Second slide" />
        </Carousel.Item>
      </Carousel>
    </Row>
  );
};

export default LandingCarousel;
