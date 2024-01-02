import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { useFormik } from "formik";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email_phone: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("values:", values)  ;
    },
    validate: (values) => {
      let errors = {};

      if (!values.email_phone) {
        errors.email_phone = "required";
      }
      else if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(values.email_phone)){
        errors.email_phone = "invalid email format";
      }

      if (!values.password) {
        errors.password = "password is incorrect";
      }
    },
  });

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("https://ratecontractbackend.oricoms.com/api/login", {
        email_phone: formik.values.email_phone,
        password: formik.values.password,
      })
      .then((response) => {
        const token = response.data.message.token;
        localStorage.setItem("auth", token);
        const x = localStorage.getItem("auth");
        // console.log("x", x);
        // console.log("Login Successful");
        navigate("/home");
      })
      .catch((error) => {
        // console.error("Login Unsuccessful", error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid username or password",
        });
      });
  };

  // console.log("formik ", formik.);
  console.log('Visited fields' , formik.touched);
  return (
    <div className="login">
      <div>
        <br />
        <h1 className="h1">LOGIN PAGE</h1>
        <br />
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className="content">
              Email or Phone Number:
              <input
                type="email"
                className="input"
                onBlur={formik.handleBlur}
                value={formik.values.email_phone}
                onChange={formik.handleChange}
                placeholder="Enter Username / Usermail"
                name="email_phone"
                id="email_phone"
                required
              />
            </label>
            {formik.errors.email_phone ? (
              <div>{formik.errors.email_phone}</div>
            ) : null}
          </div>
          <br />
          <div>
            <label className="content">
              Password:
              <input
                type="password"
                className="input"
                onBlur={formik.handleBlur}
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Enter UsrPswd"
                name="password"
                id="password"
                required
              />
            </label>
            {formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <br />
          <div>
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </form>
        <br />
      </div>
    </div>
  );
};

export default Login;
