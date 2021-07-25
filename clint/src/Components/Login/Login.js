import React, { useState } from "react";
import "./Login.css";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import login_image from "../../img/undraw_Logic_re_nyb4.svg";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const history = useHistory();
  const postlogin = () => {
    console.log("enter");
    fetch("/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("jwt", data);
        console.log(data);
        history.push("/Profile");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="Login_container container ">
        <div className="login_row row bg-light">
          <div className="Login_ContainerA col-md-6 order-2 col-sm-12 d-flex justify-content-center align-items-center flex-column ">
            <div className="d-flex justify-content-md-start justify-content-sm-center w-75">
              <h2 className="login-heading">
                <b>Login</b>
              </h2>
            </div>
            <Form className="w-75 d-flex flex-column justify-content-around">
              <Form.Group className="mb-3 " controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="p-3 w-100 editinput"
                  type="email"
                  placeholder="Kishan@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Form.Text className="text-muted">
                  I will never share your Email with anyone else
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3 editinput" controlId="formBasicEmail">
                <Form.Label> password</Form.Label>
                <Form.Control
                  className="p-3 editinput"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center">
                <Form.Check
                  className="formcheck mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Check
                    // className="p-3 "
                    type="checkbox"
                    placeholder="Enter password"
                    label="check"
                  />
                </Form.Check>

                <Link className="login_link mb-3" to="#">
                  Forget password
                </Link>
              </div>
              <Button
                className="w-100 buttonlogin p-3"
                onClick={() => postlogin()}
              >
                Login
              </Button>
            </Form>
          </div>
          <div className="Login_ContainerB col-md-6">
            <img
              src={login_image}
              alt="img is here"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
