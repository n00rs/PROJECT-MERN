import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EMAIL_VERIFY_URL } from "../api";
import { toast } from "react-toastify";
import { Spinner } from "../components/UI/Spinner";

const EmailRedirect = () => {
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const emailRef = useRef();
  const navigate = useNavigate();
  // console.log(token);

  const verifyToken = useCallback(async () => {
    try {
      const response = await fetch(EMAIL_VERIFY_URL + token);
      const data = await response.json();
      console.log(data);
      if (!response.ok) throw data;
      if (data.email_verified) {
        setEmailVerified(true);
        toast.success("Email verified");
      }
      console.log(data);

      toast(data);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }, [token]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const sendEmail = async () => {
    setIsLoading(true);
    try {
      const email = emailRef.current.value;
      if (!email.includes("@"))
        throw new Error("please provide an valid email");
      else {
        console.log({ email });
        const response = await fetch(EMAIL_VERIFY_URL, {
          method: "PATCH",
          body: JSON.stringify({ email }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        console.log(data);
        if (data.success) {
          toast.dark("please check and verify your email");
          navigate("/", { replace: true });
          setIsLoading(false);
        }
      }
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const verifiedContent = (
    <>
      <h2>Email Verified successfully please Login to contine</h2>
      <Link to="/" replace>
        {" "}
        Home
      </Link>
    </>
  );
  const notVerified = (
    <>
      <h2>Email verification failed or Expired</h2>
      <p>Please enter your email id to verify </p>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Email"
          aria-label="Email"
          aria-describedby="basic-addon2"
          ref={emailRef}
        />
        <Button variant="outline-warning" size="M" onClick={sendEmail} I>
          Send verification Mail
        </Button>
      </InputGroup>
    </>
  );

  if (isLoading) return <Spinner />;

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>{emailVerified ? verifiedContent : notVerified}</Col>
      </Row>
    </Container>
  );
};

export default EmailRedirect;
