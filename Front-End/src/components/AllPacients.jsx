import React, { useEffect } from "react";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useImages } from "../hooks/useImages";
import { useNavigate } from "react-router-dom";

const AllPacients = () => {
  const { createPatient } = useImages();
  const navigate = useNavigate();
  return (
    <div>
      <Formik
        initialValues={{
          DNI: "",
          sintomas: "",
          seguimiento: "",
          file: null,
        }}
        /*validationSchema={Yup.object({
            dni: Yup.number().required("El dni es requerido"),
            sintomas: Yup.string().required("Los sintomas son requeridos"),
            seguimiento: Yup.string().required("El seguimiento es requerido"),
        })}
        */
        onSubmit={(values, actions) => {
            console.log(values);
            createPatient(values);
        }}
      >
        {({ handleChange, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <label>dni</label>
            <Field name="DNI" placeholder="dni"></Field>
            {/* <ErrorMessage name="dni"/> */}

            <input
              type="file"
              name="file"
              onChange={(e) => setFieldValue("file", e.target.files[0])}
            />

            <label>sintomas</label>
            <textarea
              name="sintomas"
              rows="3"
              placeholder="escribe los sintomas"
              onChange={handleChange}
            ></textarea>
            {/* <ErrorMessage name="sintomas"/> */}

            <label>seguimiento</label>
            <textarea
              name="seguimiento"
              rows="3"
              placeholder="escribe el seguimiento"
              onChange={handleChange}
            ></textarea>

            {/* <ErrorMessage name="seguimiento"/> */}

            <button type="submit">Guardar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AllPacients;