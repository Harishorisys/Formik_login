import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const validaton = (values) => {
    let errors = {};

    if (!values.email_phone) {
      errors.email_phone = "*required";
      //   console.log("email_phone required");
    } else if (!/^[a-zA-Z0-9._%+-]+@yopmail\.com$/i.test(values.email_phone)) {
      errors.email_phone = "the email format is invalid";
      //   console.log("the email format is invalid");
    }

    if (!values.password) {
      errors.password = "*required";
      //   console.log("password is required");
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      //   console.log("password must be long as 8 characters");
    }
  };

  //   department11@yopmail.com
  //   password

  return (
    <Formik
      initialValues={{ email_phone: "", password: "" }}
      validate={validaton}
      onSubmit={(values, actions) => {
        axios
          .post("https://ratecontractbackend.oricoms.com/api/login", values)
          .then((response) => {
            // const token = response.data.message.token;
            // localStorage.setItem("auth", token);
            // const x = localStorage.getItem("auth");
            // console.log("x", x);

            console.log("login Successfull");
            navigate("/home");
          })
          .catch((error) => {
            console.log("login unsuccessfull", error.response.data);
            Swal.fire({
              icon: "error",
              title: "Login Failed",
              text: "Invalid username or password",
            });
            actions.setFieldError("email_phone", "Invalid credentials");
          })
          .finally(() => {
            // Reset form submission state
            actions.setSubmitting(false);
          });
      }}
    >
      {({ errors, values, isSubmitting, handleChange, touched }) => (
        <>
          <br />
          <Form>
            <div>
              <h1>LoGIN</h1>
            </div>
            <br />
            <FormGroup>
              <Label>Email or Phone :</Label>
              <Input
                name="email_phone"
                id="email_phone"
                placeholder="Enter Your Email or Phone"
                value={values.email_phone}
                onChange={handleChange}
              />
            </FormGroup>
            <br />
            <FormGroup>
              <Label>Password :</Label>
              <Input
                name="password"
                id="password"
                placeholder="Enter Your Password"
                value={values.password}
                onChange={handleChange}
              />
            </FormGroup>
            <br />
            <FormGroup>
              <Button type="submit">Login</Button>
            </FormGroup>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default LoginForm;
