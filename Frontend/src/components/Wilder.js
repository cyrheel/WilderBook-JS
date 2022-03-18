// Imports
import "./../CSS/Wilder.css";
import blank_profile from "./../YmVdl3m.png";
import Proptypes from "prop-types";
import Skill from "./Skill";
import styled from "styled-components";
import AddWilder from "./AddWilder";
import { useState } from "react";

// Styled Components
const DeleteBtn = styled.a`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5%;
  padding: 0.5%;
  color: black;
  background: rgba(0, 0, 0, 0.2);
  text-decoration: none;
  border-radius: 10px;

  :hover {
    cursor: pointer;
    font-weight: bold;
    background: #f76c6c;
  }
`;

const PopUpBG = styled.div`
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const PopUp = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-radius: 10px;
  background: black;
  color: white;

  #popup-header {
    display: flex;
    width: 100%;
    padding: 2%;
    justify-content: space-between;
  }

  #close {
    margin: 0 2.5%;
    background: #f76c6c;
  }

  > div > h4 {
    color: #f76c6c;
    margin: 0 10%;
  }
`;

function Wilder({ _id, name, city, skills, onRefresh }) {
  const [showPopUp, setShowPopUp] = useState(false);

  const handleShowPopUpChanges = () => {
    setShowPopUp(!showPopUp);
  };

  const tooglePopUP = () => {
    return (
      <PopUpBG>
        <PopUp>
          <div id="popup-header">
            <button onClick={handleShowPopUpChanges} id="close">
              X
            </button>
            <h4>{`${name}'s Options`}</h4>
          </div>
          <AddWilder
            _id={_id}
            onUpdate={true}
            onRefresh={onRefresh}
            handleShowPopUpChanges={handleShowPopUpChanges}
            wInfo={[name, city, skills]}
          />
        </PopUp>
      </PopUpBG>
    );
  };

  const deleteBtnClicked = async (_id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Accepte: "application/json",
        "Content-Type": "application/json",
        //"X-CSRFToken": csrftoken,
      },
    };
    await fetch(`http://127.0.0.1:4000/wilders/${_id}`, requestOptions);
    onRefresh();
  };

  return (
    <article className="card">
      <DeleteBtn
        onClick={() => {
          deleteBtnClicked(_id);
        }}
      >
        X
      </DeleteBtn>
      <img src={blank_profile} alt={`${name} PP`} />
      <h3>
        {name} from {city}
      </h3>
      <h4>Wild Skills</h4>
      <ul className="skills">
        {skills.map((skill) => (
          <Skill key={skill._id} {...skill} />
        ))}
      </ul>
      <button
        onClick={() => {
          setShowPopUp(!showPopUp);
        }}
      >
        Options
      </button>
      {showPopUp && tooglePopUP()}
    </article>
  );
}

Wilder.propTypes = {
  name: Proptypes.string.isRequired,
  city: Proptypes.string.isRequired,
  skills: Proptypes.array.isRequired,
};

export default Wilder;
