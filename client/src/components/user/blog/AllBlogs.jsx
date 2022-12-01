import {  useState } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { nextPage, prevPage, setPageNo } from "../../../store/blogSlice";
import { PaginationBar } from "../../UI/PaginationBar";

import { BlogCard } from "./BlogCard";

export const AllBlogs = () => {
  // const [blogs, setBlogs] = useState([]);
  // const [totalPages, setTotalPages] = useState(0);
  // const [pageNo, setPageNo] = useState(0);
  // const fetchAllBlogs = async () => {
  //   try {
  //     const response = await fetch(ALL_BLOG_URL + pageNo);
  //     const { blogs, totalPages } = await response.json();
  //     setBlogs(blogs);
  //     setTotalPages(totalPages);
  //     console.log(totalPages);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  // console.log(pages);
  // useEffect(() => {
  //   fetchAllBlogs();
  // }, [pageNo]);

  const dispatch = useDispatch();
  // const [featuredBlog, setFeaturedBlog] = useState({});
  const { blogs, totalPages, pageNo } = useSelector((state) => state.blog);
  const pages = new Array(totalPages).fill(null).map((val, ind) => ind);

  const prev = () => dispatch(prevPage());

  const next = () => dispatch(nextPage());

  const changePage = (pageNo) => dispatch(setPageNo(pageNo));

  const blogContent = blogs.map((blog) => (
    <BlogCard
      key={blog._id}
      id={blog._id}
      author={blog.author}
      title={blog.title}
      date={new Date(blog.createdAt).toDateString()}
      content={blog.content.slice(0, 150)}
      image={blog.image}
    />
  ));


  // useEffect(()=>{
  //   fetch()
  // },[])
  // const countComments = (data) => {
  //   console.log(data,'data');
  //   data.reduce((res, d) => {
  //     // console.log(d, "d");
  //     return res + d.comments?.length + countComments(d.comments);
  //   });
  // };
  // if (blogs.length > 0) console.log(countComments(blogs));

  //setting featured blog from the blogs

  const countComment = blogs?.slice().sort((a, b) => {
    console.log(a?.comments?.length, "comments");
    if (a?.comments.length < b?.comments.length) return 1;
    if (a?.comments.length > b?.comments.length) return -1;
    return 0;
  });
  //  return  a?.comments.length - b?.comments.length});
  // console.log(countComment);
  return (
    <>
      {/* <!-- Featured blog post--> */}
      <BlogCard
        title={countComment[0]?.title}
        content={countComment[0]?.content.slice(0, 20)}
        date={new Date(countComment[0]?.createdAt).toDateString()}
        image={countComment[0]?.image}
        id={countComment[0]?._id}
      />

      <Row xs={1} md={2} className="g-4 mt-4">
        {blogs.length > 0 && blogContent}
      </Row>
      <PaginationBar
        next={next}
        prev={prev}
        pages={pages}
        pageNo={pageNo}
        changePage={changePage}
      />
    </>
  );
};

//  <div aria-label="Pagination">
//       <hr className="my-0" />

//       <Pagination className="justify-content-center my-4">
//         <Pagination.Prev onClick={prev} />
//         {pages?.map((index) => (
//           <Pagination.Item
//             key={index}
//             onClick={() => dispatch(setPageNo(index))}
//             active={index === pageNo}
//           >
//             {index + 1}
//           </Pagination.Item>
//         ))}

//         <Pagination.Next onClick={next} />
//       </Pagination>
//     </div>

// <Row>
//   <div className="col-lg-6">
//     {/* <!-- Blog post--> */}
//     <div className="card mb-4">
//       <a href="#!">
//         <img
//           className="card-img-top"
//           src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg"
//           alt="..."
//         />
//       </a>
//       <div className="card-body">
//         <div className="small text-muted">January 1, 2022</div>
//         <h2 className="card-title h4">Post Title</h2>
//         <p className="card-text">
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//           Reiciendis aliquid atque, nulla.
//         </p>
//         <a className="btn btn-primary" href="#!">
//           Read more →
//         </a>
//       </div>
//     </div>
//     {/* <!-- Blog post--> */}
//     <div className="card mb-4">
//       <a href="#!">
//         <img
//           className="card-img-top"
//           src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg"
//           alt="..."
//         />
//       </a>
//       <div className="card-body">
//         <div className="small text-muted">January 1, 2022</div>
//         <h2 className="card-title h4">Post Title</h2>
//         <p className="card-text">
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//           Reiciendis aliquid atque, nulla.
//         </p>
//         <a className="btn btn-primary" href="#!">
//           Read more →
//         </a>
//       </div>
//     </div>
//   </div>
//   <div className="col-lg-6">
//     {/* <!-- Blog post--> */}
//     <div className="card mb-4">
//       <a href="#!">
//         <img
//           className="card-img-top"
//           src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg"
//           alt="..."
//         />
//       </a>
//       <div className="card-body">
//         <div className="small text-muted">January 1, 2022</div>
//         <h2 className="card-title h4">Post Title</h2>
//         <p className="card-text">
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//           Reiciendis aliquid atque, nulla.
//         </p>
//         <a className="btn btn-primary" href="#!">
//           Read more →
//         </a>
//       </div>
//     </div>
//     {/* <!-- Blog post--> */}
//     <div className="card mb-4">
//       <a href="#!">
//         <img
//           className="card-img-top"
//           src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg"
//           alt="..."
//         />
//       </a>
//       <div className="card-body">
//         <div className="small text-muted">January 1, 2022</div>
//         <h2 className="card-title h4">Post Title</h2>
//         <p className="card-text">
//           Lorem ipsum dolor sit amet, consectetur adipisicing elit.
//           Reiciendis aliquid atque, nulla? Quos cum ex quis soluta,
//           a laboriosam.
//         </p>
//         <a className="btn btn-primary" href="#!">
//           Read more →
//         </a>
//       </div>
//     </div>
//   </div>
// </Row>
// <Container className="mt-4 " >
//   {/* <Row>
//   <Col md={4}>md=4</Col>
// </Row> */}
//   {/* <Col md={4}>md=4</Col> */}
//   <Row xs={1} md={2} className="g-4 ">
//     {Array.from({ length: 10 }).map(( _ ,index) => (
//       <Col key={index}>
//         <Card bg={'black'} text='white'>
//           <Card.Img src={dummyImg} className="rounded" />
//           <Card.Title className="display-5 p-5">
//             The title of the blog
//           </Card.Title>
//           <Card.Header>
//             <Row>
//               <Col>
//                 BY : <strong>USERNAME</strong>{" "}
//               </Col>
//               <Col>
//                < small>Last Updated At:</small> <strong>12/12/2222</strong>{" "}
//               </Col>
//             </Row>
//           </Card.Header>
//           <Card.Body>
//             <Card.Text>
//               Always strive for better work. Never stop learning. Have fun
//               a clear plan for a new project or just an idea on a napkin?
//               Sky, land, and sea disappear together out of the world..
//             </Card.Text>
//           </Card.Body>
//           <Card.Footer>
//               <Link to={`${index}`} >Click to See more</Link>
//           </Card.Footer>
//         </Card>
//       </Col>
//     ))}
//   </Row>
// </Container>
