import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./Update.css";
import update_containerB_image from "../../img/undraw_Plain_credit_card_re_c07w.svg";
function Update() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [mobile_number, setnumber] = useState("");

  const history = useHistory();
  const updatedata = (e) => {
    fetch("/updatatedata", {
      method: "PUT",
      headers: {
        Authorization: "Ben " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        mobile_number,
        email,
      }),
    }).then((result) => console.log(result.name));
    history.push("/Profile");
  };
  useEffect(() => {
    fetch("/userdata", {
      headers: {
        Authorization: "Ben " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setname(result.name);
        setemail(result.email);
        setnumber(result.mobile_number);
        console.log(result);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <div className="Login_container container ">
        <div className="login_row row bg-light">
          <div className="Login_ContainerA col-md-6 order-2 col-sm-12 d-flex justify-content-center align-items-center flex-column ">
            <div className="d-flex justify-content-md-start justify-content-sm-center w-75">
              <h2 className="login-heading">
                <b>You want to update</b>
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
                    setemail(e.target.value);
                  }}
                />
                <Form.Text className="text-muted">
                  I will never share your Email with anyone else
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3 editinput" controlId="formBasicEmail">
                <Form.Label> Name</Form.Label>
                <Form.Control
                  className="p-3 editinput"
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3 editinput" controlId="formBasicEmail">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  className="p-3 editinput"
                  type="Number"
                  placeholder="Enter name"
                  value={mobile_number}
                  onChange={(e) => {
                    setnumber(e.target.value);
                  }}
                />
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center">
                <Link className="login_link mb-3" to="#">
                  Forget password
                </Link>
              </div>
              <Button
                className="w-100 buttonlogin p-3"
                onClick={() => updatedata()}
              >
                Update
              </Button>
            </Form>
          </div>
          <div className="Login_ContainerB col-md-6">
            {/* <Button>Change photo</Button> */}
            <img
              src={update_containerB_image}
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

export default Update;
