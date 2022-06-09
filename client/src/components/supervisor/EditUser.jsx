import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getEmployeeById, updateUser } from "../../redux/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import demo from "../../assets/demo.png";
import { Primary } from "../styles/Buttons";

export default function EditUser({ user }) {
  const dispatch = useDispatch();
  const typeEnv = ["uno", "dos", "tres", "cuatro", "cinco"];
  const [formSend, setFormSend] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "magqqp6o");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/henrysecurityapp/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
  };

  // const viewPassword = () => {
  //   var x = document.getElementById("password");
  //   x.type === "password" ? (x.type = "text") : (x.type = "password");
  // };

  useEffect(() => {
    dispatch(getEmployeeById(user._id));
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <Formik
      initialValues={{
        name: "",
        lastName: "",
        password: "",
        dni: "",
        profilePic: "",
        email: "",
        address: "",
        environment: "",
        telephone: "",
        workingHours: "",
      }}
      validate={(val) => {
        let errors = {};
        if (!val.name) {
          errors.name = "Por favor ingresa un nombre *";
        } else if (!/^[a-zA-Z ]*$/.test(val.name)) {
          errors.name = "Solo se aceptan letras y espacios *";
        }

        if (!val.lastName) {
          errors.lastName = "Por favor ingresa un apellido *";
        } else if (!/^[a-zA-Z ]*$/.test(val.lastName)) {
          errors.lastName = "Solo se aceptan letras y espacios *";
        }

        if (!val.password) {
          errors.password = "Por favor ingresa una contraseña *";
        }

        if (!val.workingHours) {
          errors.workingHours = "Por favor ingresa las horas de trabajo *";
        }

        if (!val.environment) {
          errors.environment = "Por favor ingresa lugar de trabajo *";
        }

        if (!val.profilePic) {
          errors.profilePic = "Por favor ingresa una imagen *";
        }

        if (!val.dni) {
          errors.dni = "Por favor ingresa un DNI *";
        } else if (
          isNaN(Number(val.dni)) ||
          val.dni.length < 8 ||
          val.dni.length > 8
        ) {
          errors.dni = "El formato debe ser de 8 numeros *";
        }

        if (!val.address) {
          errors.address = "Por favor ingresa una direccion *";
        } else if (!/^[A-Za-z0-9\s]+$/.test(val.address))
          errors.address = "Solo se aceptan números, letras y espacios *";

        if (!val.telephone) {
          errors.telephone = "Por favor ingresa un telefono *";
        } else if (isNaN(Number(val.telephone)))
          errors.telephone = "Alguno de los valores no es un número *";
        return errors;
      }}
      onSubmit={async (values, { resetForm }) => {
         dispatch(updateUser(user.id, values));
         setFormSend(true);
         resetForm();
         setTimeout(() => setFormSend(false), 5000);
      }}
    >
      {({ errors, values, isSubmitting }) => (
        <Form className="flex flex-col items-center">
          <div className="flex flex-row items-center justify-between">
            <div>
              <label htmlFor="name">
                Fisrt Name:{" "}
                <ErrorMessage
                  name="name"
                  component={() => (
                    <small className="text-red-600">{errors.name}</small>
                  )}
                />
              </label>
              <Field
                className={Input()}
                type="text"
                id="name"
                name="name"
                placeholder={user.name}
              />
            </div>
            <div>
              <label htmlFor="lastName">
                Last Name:{" "}
                <ErrorMessage
                  name="lastName"
                  component={() => (
                    <small className="text-red-600">{errors.lastName}</small>
                  )}
                />
              </label>
              <Field
                className={Input()}
                type="text"
                id="lastName"
                name="lastName"
                placeholder={user.lastName}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div>
              <label htmlFor="environment">
                Environment:{" "}
                <ErrorMessage
                  name="environment"
                  component={() => (
                    <small className="text-red-600">{errors.environment}</small>
                  )}
                />
              </label>
              <Field className={Input()} name="environment" as="select">
                {!values.environment.length ? (
                  <option key="select">Environment...</option>
                ) : (
                  <option key="select" disabled>
                    Environment...
                  </option>
                )}
                {typeEnv?.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </Field>
            </div>
            <div>
              <label htmlFor="dni">
                DNI:{" "}
                <ErrorMessage
                  name="dni"
                  component={() => (
                    <small className="text-red-600">{errors.dni}</small>
                  )}
                />
              </label>
              <Field
                className={Input()}
                type="number"
                id="dni"
                name="dni"
                placeholder={user.dni}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div>
              <label htmlFor="address">
                Address:{" "}
                <ErrorMessage
                  name="address"
                  component={() => (
                    <small className="text-red-600">{errors.address}</small>
                  )}
                />
              </label>
              <Field
                className={Input()}
                type="text"
                id="address"
                name="address"
                placeholder={user.address}
              />
            </div>
            <div>
              <label htmlFor="email">
                Email:{" "}
                <ErrorMessage
                  name="email"
                  component={() => (
                    <small className="text-red-600">{errors.email}</small>
                  )}
                />
              </label>
              <Field
                className={Input()}
                type="text"
                id="email"
                name="email"
                placeholder={user.email}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div>
              <label htmlFor="telephone">
                Telephone:{" "}
                <ErrorMessage
                  name="telephone"
                  component={() => (
                    <small className="text-red-600">{errors.telephone}</small>
                  )}
                />
              </label>
              <Field
                className={Input()}
                type="number"
                id="telephone"
                name="telephone"
                placeholder={user.telephone}
              />
            </div>
            <div>
              <label htmlFor="workingHours">
                Working Hours:{" "}
                <ErrorMessage
                  name="workingHours"
                  component={() => (
                    <small className="text-red-600">
                      {errors.workingHours}
                    </small>
                  )}
                />
              </label>
              <Field
                className={Input()}
                type="text"
                id="workingHours"
                name="workingHours"
                placeholder={user.workingHours}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
          </div>
          <div className="m-3 w-96">
            <div className="flex flex-row">
              <Field
                className={File()}
                type="file"
                name="file"
                onChange={(e) => uploadImage(e)}
              />
              {loading ? (
                ((values.profilePic = image),
                (
                  <img
                    className="w-10 h-10"
                    src={image}
                    style={{ widht: "100px" }}
                    alt="Profile."
                  />
                ))
              ) : (
                // if the user does not have a profile pic, show the default one
                <img
                  src={user.profilePic ? user.profilePic : demo}
                  className="w-10 h-10"
                  alt="Profile."
                />
              )}
            </div>
            <ErrorMessage
              name="file"
              component={() => (
                <small className="text-red-600">{errors.profilePic}</small>
              )}
            />
          </div>
          <div className="flex gap-4">
            <button className={Primary()} type="submit" disabled={isSubmitting}>
              Edit
            </button>
            {/* <button className={ButtonDelete()} type="submit" disabled={isSubmitting}>
              Delete
            </button> */}
          </div>
          {formSend && (
            <small className="text-green-600">
              Employee edited successfully
            </small>
          )}
        </Form>
      )}
    </Formik>
  );
}

const Input = (props) => `
    hover:bg-slate-100
    placeholder:italic placeholder:text-slate-400 
    block bg-white w-${props === "Select" ? "48" : "96"} m-2.5
    border border-slate-300 rounded-md 
    py-2 pl-3 pr-3 shadow-sm 
    focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 
    sm:text-sm
`;

const File = (props) => `
    block w-full text-sm text-slate-500
    file:mr-4 file:py-2 file:px-4
    file:rounded-full file:border-0
    file:text-sm file:font-semibold
    file:bg-blue-50 file:text-blue-700
    hover:file:bg-blue-100
`;

// const Button = (props) => `
//     font-bold text-white
//     bg-blue-500
//     w-32 h-10 p-0 m-0
//     border-2 border-blue-500
//     hover:border-blue-600 hover:bg-blue-600
//     active:border-blue-700 active:bg-blue-700
//     rounded-3xl
// `;

// const ButtonDelete = (props) => `
//     flex flex-row justify-evenly items-center
//     h-10 w-28
//     text-white font-semibold
//     rounded-md
//     bg-red-600
//     hover:bg-red-700
//     active:bg-red-800 active:ring-4 active:ring-red-200
// `;
