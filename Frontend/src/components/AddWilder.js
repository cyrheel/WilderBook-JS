import { useState } from "react";
import styled from "styled-components";
import AddSkills from "./AddSkills";

const Form = styled.div`
  display: flex;
  flex-flow: column;

  #form-body {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  #left,
  #right {
    display: flex;
    flex-flow: column;
    text-align: center;
  }

  #left > input {
    border-radius: 10px;
    text-align: center;
    margin: 1%;
  }
`;

function AddWilder(props) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [skills, setSkills] = useState([]);
  const [numberOfSkills, setNbOfSkills] = useState(1);

  const handleNameChanges = (e) => {
    setName(e.target.value);
  };

  const handleCityChanges = (e) => {
    setCity(e.target.value);
  };

  const handleSkillChanges = (skill) => {
    const tempoSkills = skills;
    try {
      tempoSkills[skill.id] = skill;
    } catch {
      tempoSkills.push(skill);
    }
    setSkills(tempoSkills);
  };

  const displaySkills = (numberOfSkills) => {
    const listOfSkills = [];
    for (let i = 0; i < numberOfSkills; i++) {
      listOfSkills.push(
        <AddSkills
          key={i}
          id={i}
          onAdd={handleSkillChanges}
          wInfo={props.onUpdate && props.wInfo[2][i]}
        />
      );
    }
    return listOfSkills;
  };

  const displayCreateBtn = () => {
    return (
      <button
        type="submit"
        onClick={() => {
          btnAddWilderClicked();
        }}
      >
        Create Wilder
      </button>
    );
  };

  const displayUpdateBtn = () => {
    return (
      <button
        type="submit"
        onClick={() => {
          btnUpdateWilderClicked(props._id);
        }}
      >
        Update Wilder
      </button>
    );
  };

  const btnAddWilderClicked = async () => {
    let wilderToCreate = {
      name: name,
      city: city,
      skills: skills,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wilderToCreate),
    };

    let response = await fetch("http://127.0.0.1:4000/wilders", requestOptions);
    if (response.ok) {
      props.onCreate();
      props.onCloseForm();
    }
  };

  const btnUpdateWilderClicked = async (_id) => {
    let wilderToUpdate = {
      name: name,
      city: city,
      skills: skills,
    };
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wilderToUpdate),
    };

    let response = await fetch(
      `http://127.0.0.1:4000/wilders/${_id}`,
      requestOptions
    );
    if (response.ok) {
      props.onRefresh();
      props.handleShowPopUpChanges();
    }
  };

  return (
    <Form>
      <div id="form-body">
        <div id="left">
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            id="name"
            onChange={(e) => {
              handleNameChanges(e);
            }}
            value={name}
            placeholder={props.onUpdate ? props.wInfo[0] : ""}
          ></input>
          <label htmlFor="city">City :</label>
          <input
            type="text"
            id="city"
            onChange={(e) => {
              handleCityChanges(e);
            }}
            value={city}
            placeholder={props.onUpdate ? props.wInfo[1] : ""}
          ></input>
          {props.onUpdate ? displayUpdateBtn() : displayCreateBtn()}
        </div>
        <div id="right">
          <button
            type="button"
            onClick={() => {
              setNbOfSkills(numberOfSkills + 1);
            }}
          >
            Add Skill
          </button>
          {displaySkills(numberOfSkills)}
        </div>
      </div>
    </Form>
  );
}

export default AddWilder;
