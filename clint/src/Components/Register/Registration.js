import React, { useState } from "react";
import "./Registration.css";
import { Form } from "react-bootstrap";
import { Button, Toast } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import registration from "../../img/registration.svg";
function Registration() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [mobile_number, setnumber] = useState("");
  const [picture, setpicture] = useState("");
  const [Url, seturl] = useState("");
  const history = useHistory();
  const toastrunner = () => {
    return (
      <Toast>
        <Toast.Header>
          <strong>karan is good</strong>
          <small>karan</small>
        </Toast.Header>
        <Toast.Body>this is body</Toast.Body>
      </Toast>
    );
  };
  const postregistration = () => {
    const data = new FormData();
    data.append("file", picture);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "kikaran");
    fetch("https://api.cloudinary.com/v1_1/kikaran/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        seturl(data.url);
        console.log("ye rha url", Url);
        // console.log(data.url);
      })
      .catch((error) => console.log(error));
    fetch("/Registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        mobile_number: mobile_number,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toastrunner();
        history.push("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="Login_container container d-flex justify-content-center align-items-center">
        <div className="login_row row">
          <div className="Login_ContainerA col-md-6 order-2 py-5 col-sm-12 d-flex justify-content-center align-items-center flex-column ">
            <div className="d-flex justify-content-center justify-content-md-start w-75 py-3 ">
              <h2 className="registraion-heading">
                <b>Sign up</b>
              </h2>
            </div>
            <Form className="w-75 d-flex flex-column justify-content-around">
              <Form.Group className="mb-3 " controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  className="p-3 w-100 editinput"
                  type="email"
                  placeholder="Kishan0109"
                  value={name}
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                />
              </Form.Group>
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
                <Form.Label> Password</Form.Label>
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
              <Form.Group className="mb-3 editinput" controlId="formBasicEmail">
                <Form.Label> Number</Form.Label>
                <Form.Control
                  className="p-3 editinput"
                  type="mobile_number"
                  placeholder="Enter mobile_number"
                  value={mobile_number}
                  onChange={(e) => {
                    setnumber(e.target.value);
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
                onClick={() => postregistration()}
              >
                Sign up
              </Button>
            </Form>
          </div>
          <div className="Login_ContainerB col-md-6 p-5">
            <img
              src={registration}
              alt="img is here"
              width="100%"
              height="100%"
            />
            {/* <Form.Group className="mb-3 editinput" controlId="formBasicEmail">
              <Form.Label> Number</Form.Label>
              <Form.Control
                className="p-3 editinput"
                type="file"
                placeholder="upload image"
                // value={img}
                onChange={(e) => {
                  setpicture(e.target.files[0]);
                  console.log(e.target.files[0].name);
                  console.log("karan", picture);
                }}
              />
            </Form.Group> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
