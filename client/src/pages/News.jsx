import { useLoaderData } from "react-router-dom";

import { Col, Container, Row } from "react-bootstrap";
import { NewsCard } from "../components/UI/NewsCard";
import { NEWS_API } from "../api";

const News = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <>
      <section>
        <Container className="mt-5">
          <Row>
            {data?.map((newsContent) => (
              <Col md={4} xs={6} key={Math.random()}>
                <a
                  href={newsContent.link}
                  className="text-decoration-none text-black "
                  rel="noopener noreferrer"
                  target={"_blank"}
                >
                  <NewsCard
                    content={newsContent.content}
                    imgSrc={newsContent.image}
                    date={newsContent.publishedAt}
                    title={newsContent.title}
                  />
                </a>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default News;

export const loader = async () => {
  const res = await fetch(NEWS_API);
  const data = await res.json();
  return data;
};
