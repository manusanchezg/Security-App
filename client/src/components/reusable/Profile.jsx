import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { getUsersById } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { Primary } from "../styles/Buttons";
import see from "../../assets/see.png";

export default function UserProfile() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const user = useSelector((state) => state.userDetails);
  const { id } = useParams();

  const toggle = () => {
    setActive(!active);
  };

  useEffect(() => {
    dispatch(getUsersById(id));
  }, []);

  return (
    <>
      <div className="h-4/5 flex justify-center items-center">
        <div className="flex flex-col items-center m-4">
          <img 
            src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
            alt="foto de perfil"
            width="300rem"
            className={Image()}
          />
          <button onClick={toggle} className={Primary()}>
            See pic
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="bg-[#EEEDFF] w-2/5 h-64 p-5 m-4 h-60 rounded-3xl">
          <div className="flex justify-end">
            <button className={Primary()}>Edit</button>
          </div>
          <div className="h-40 flex flex-col justify-end">
            <p className="text-4xl font-semibold">Lionel Messi</p>
            <p className="text-2xl italic font-light">liomessielmasgrande@gmail.com</p>
            <p>123132342543513124</p>
            <p>+54 9 351-935-935</p>
          </div>
        </div>
      </div>
      <Modal active={active} toggle={toggle}>
        <img
          className="w-80 h-80 rounded-full m-5"
          src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
          alt="Foto de perfil"
        />
      </Modal>
    </>
  );
};

const Image = () => `
  rounded-full 
  border-4 border-white
  ring-4 ring-[#0243EC]
  m-5
`;
