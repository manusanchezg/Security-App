import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postUser, getEmployees } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import LoginController from "./LoginController";
import { Primary, Secondary, Tertiary, Input, File } from "../styles/Buttons";
import swal from "sweetalert";

export default function AddNewUser() {
  const dispatch = useDispatch();
  const header = LoginController();
  const user = useSelector((state) => state.userDetails);
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    dni: 0,
    password: "",
    email: "",
    telephone: 0,
    profilePic: "",
    workingHours: "",
    address: "",
    environment: "",
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const typeEnv = [
    "neighbourhood one",
    "neighbourhood two",
    "neighbourhood three",
    "neighbourhood four",
    "neighbourhood five",
  ];

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
    setImage(await file.secure_url);
    setLoading(false);
    setInput({
      ...input,
      profilePic: file.secure_url,
    });
  };

  function validateInput(input) {
    let error = {};
    const regex = /^[a-zA-Z ]+$/;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //Working Hours
    if (input.workingHours < 0 || input.workingHours > 24)
      error.workingHours = "Working hours must be between 0 and 24";

    //Name and LastName
    if (!input.name || !regex.test(input.name))
      error.name = "Enter a valid name, no special characters allowed";
    if (!input.lastName || !regex.test(input.lastName))
      error.lastName = "Enter a valid lastName, no special characters allowed";

    //DNI
    if (!input.dni)
      error.dni = "This field is mandatory, it has to be a number";
    if (isNaN(input.dni)) error.dni = "The dni must be a number";

    //Password
    if (
      input.password.lentgh < 8 ||
      input.password.lentgh > 24 ||
      !input.password
    )
      error.password = "Password must be between 8 and 24 characters";
    if (!input.password.match(/[a-z]/g))
      error.password =
        "The password must contain at least one lowercase letter";
    if (!input.password.match(/[A-Z]/g))
      error.password =
        "The password must contain at least one uppercase letter";
    if (!input.password.match(/\d/g))
      error.password = "The password must contain at least one number";

    //Telephone
    if (isNaN(input.telephone))
      error.telephone = "The phone number must be a number";

    //Email
    if (!input.email || !regexEmail.test(input.email))
      error.email = "Enter a valid email";

    //Address
    if (!input.address) error.address = "This field is mandatory";

    //Environment
    if (!input.environment) error.environment = "This field is mandatory";

    return error;
  }

  const viewPassword = () => {
    var x = document.getElementById("password");
    x.type === "password" ? (x.type = "text") : (x.type = "password");
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validateInput({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleClassName(error) {
    if (!error) return Input();
    else return Input();
  }
  //Function for submit button recipe//
  function handleSubmit(e) {
    e.preventDefault();
    if (
      error.name ||
      error.lastName ||
      error.dni ||
      error.password ||
      error.email ||
      error.telephone ||
      error.environment
    )
      return swal( "Wait!", "Some fields are wrong", "error" );
    if (
      !input.name &&
      !input.lastName &&
      !input.dni &&
      !input.email &&
      !input.password &&
      !input.telephone &&
      !input.environment
    )
      return swal( "Wait!", "You have to fill the mandatory fields first", "error" );
    dispatch(postUser(input, header, user[0]._id));
    alert("User created successfully");
    setInput({});
    if(user[1] === "supervisor"){
      navigate(`/supervisor/${user[0]._id}`)
    } else {
      navigate(`/boss/${user[0]._id}`);
    }
  }

  return (
    <div className="flex flex-col items-center relative">
      <Link to={`/boss/${user[0]._id}`} className="absolute top-0 left-4">
        <button className={Tertiary}>Dashboard</button>
      </Link>
      {/* <h2>Add new Employee:</h2> */}
      <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data" className="flex flex-col items-center mt-6">
        <div>
          <div className="flex justify-between gap-5">
            <div>
              <label>Name: {error.name && <small className="text-red-600 italic">{error.name}</small>}</label>
              <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} placeholder="Your Name..." className={handleClassName(error.name)} required/>
            </div>
            <div>
              <label>LastName: {error.lastName && <small className="text-red-600 italic">{error.lastName}</small>}</label>
              <input type="text" value={input.lastName} name="lastName" onChange={(e) => handleChange(e)} placeholder="Your LastName..." className={handleClassName(error.lastName)} required/>
            </div>
          </div>
          <div className="flex justify-between gap-5">
            <div>
              <label>DNI: {error.dni && <small className="text-red-600 italic">{error.dni}</small>}</label>
              <input type="number" name="dni" value={input.dni} onChange={(e) => handleChange(e)} placeholder="Your identification number" className={handleClassName(error.dni)} required/>
            </div>
            <div>
              <label className="">E-mail: {error.email && <small className="text-red-600 italic">{error.email}</small>}</label>
              <input type="email" name="email" value={input.email} onChange={(e) => handleChange(e)} placeholder="Your email..." className={handleClassName(error.email)} required/>
            </div>
          </div>
          <div className="flex justify-between gap-5">
            <div>
              <label className="">Phone Number: {error.telephone && <small className="text-red-600 italic">{error.telephone}</small>}</label>
              <input type="tel" name="telephone" value={input.telephone} onChange={(e) => handleChange(e)} placeholder="Your phone number..." className={handleClassName(error.telephone)} required/>
            </div>
            <div className="relative">
              <label className="">Password: {error.password && <small className="text-red-600 italic">{error.password}</small>}</label>
              <input type="password" name="password" id="password" value={input.password} onChange={(e) => handleChange(e)} placeholder="Your password..." className={handleClassName(error.password)} required/>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-11 right-5 cursor-pointer" viewBox="0 0 20 20" fill="#0243EC" onClick={viewPassword}>
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
          <div className="flex justify-between gap-5">
            <div>
              <label className="">Address:</label>
              <input type="text" name="address" value={input.address} onChange={(e) => handleChange(e)} placeholder="Your address..." className={handleClassName(error.name)}/>
            </div>
            <div>
              <label className="">Working Hours:</label>
              <input type="text" name="workingHours" value={input.workingHours} onChange={(e) => handleChange(e)} placeholder="Example: 8:00-17:00" className={handleClassName(error.name)}/>
            </div>
          </div>
          <div className="flex justify-between gap-5">
            <div>
              {/* Chequear el environment */}
              <label className="">Environment:</label>
              <select name="environment" className={handleClassName(error.name)} onChange={(e) => handleChange(e)}>
                <option value="none">Select...</option>
                {
                  typeEnv.map((env) => {
                    return (
                      <option value={(input.environment = env)} key={env}>
                        {env}
                      </option>
                    );
                  })
                }
              </select>
            </div>
            <div className="w-full">
              <label className="">Profile Picture:</label>
              <div className="flex items-center">
                <input type="file" name="profilePic" onChange={(e) => uploadImage(e)} className={File()}/>
                {
                  loading ? 
                  <img src={input.profilePic} className="w-12 h-12 mr-1.5" /> :
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="#0243EC" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>  
                }
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className={`${Primary()} mt-2`}>Add User</button>
      </form>
    </div>
  );
}
