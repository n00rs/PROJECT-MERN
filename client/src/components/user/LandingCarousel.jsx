import { Carousel, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// import slideImg1 from "../../assets/slide-1.jpg";
// import slideImg2 from "../../assets/slide-2.jpg";

const LandingCarousel = (props) => {
  console.log(props)
  const carsouselItem = props?.contents?.map((ele, ind) => (
    <Carousel.Item interval={3000} key={Math.random()}>
      <img className=" img-responsive img-thumbnail w-100" src={ele.img} alt="First slide" />
      <Container>
        <Carousel.Caption className={ind % 2 === 0 ? "text-end" : "text-start"}>
          <h1>{ele.header}</h1>
          <p>{ele.ptag}</p>
          <Link className="btn btn-lg ">{ele.btnText}</Link>
        </Carousel.Caption>
      </Container>
    </Carousel.Item>
  ));

  return (
    <section className="container-fluid rounded overflow-hidden ">
      <Carousel>{carsouselItem}</Carousel>
    </section>
  );
};

export default LandingCarousel;
