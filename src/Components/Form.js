import React from "react";
import { useFormik} from "formik";

const initialValues = {
  name: "",
  place: "",
  gender: "",
};

const onSubmit = (values) => {
  console.log("values:", values);
};

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.place) {
    errors.place = 'Required';
  }
  if (!values.gender) {
    errors.gender = 'Required';
  }

  return errors;
};

function Form(){
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

    console.log('Visited fields' , formik.touched);

  return (
    <div className="form-fields">
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <h1>Sign Up Form</h1>
        <div>
          <div>
            <label htmlFor="">NAME:</label>
          </div>
          <input
            type="text"
            placeholder="ENTER YOUR NAME"
            id="name"
            name="name"
            onBlur={formik.handleBlur}
            values={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
        </div>
        <br />

        <div>
          <div>
            <label htmlFor="">PLACE:</label>
          </div>
          <input
            type="text"
            placeholder="ENTER YOUR PLACE"
            id="place"
            name="place"
            onBlur={formik.handleBlur}
            values={formik.values.place}
            onChange={formik.handleChange}
          />
          {formik.touched.place && formik.errors.place ? <div>{formik.errors.place}</div> : null}
        </div>
        <br />

        <div>
          <div>
            <label htmlFor="">GENDER:</label>
          </div>
          <input
            type="text"
            placeholder="ENTER YOUR GENDER"
            id="gender"
            name="gender"
            onBlur={formik.handleBlur}
            values={formik.values.gender}
            onChange={formik.handleChange}
          />
          {formik.touched.gender && formik.errors.gender ? <div>{formik.errors.gender}</div> : null}
        </div>
        <br />

        <div>
          <button>Submit</button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default Form;
