import "./CSS/App.css";
import Wilder from "./components/Wilder";
import AddWilder from "./components/AddWilder";
import styled from "styled-components";
import { useEffect, useState } from "react";

// Styled
const Container = styled.div`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 24px;
`;

const CardRow = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 32%);
  justify-content: space-between;
`;

function App() {
  const [wilders, setWilders] = useState([]);
  const [form, setForm] = useState(false);

  function getWilder() {
    fetch("http://127.0.0.1:4000/wilders")
      .then((response) => {
        if (response.status === 404) {
          setWilders([]);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setWilders(data.result);
      });
  }

  useEffect(() => {
    getWilder();
  }, []);

  function displayWilders(isEmpty, wilders) {
    if (isEmpty) {
      return <p>There is no Wilders :/</p>;
    } else {
      return wilders.map((wilder) => (
        <Wilder key={wilder._id} {...wilder} onRefresh={getWilder} />
      ));
    }
  }

  function callbackForm() {
    setForm(!form);
  }

  return (
    <div>
      <header>
        <Container>
          <h1>Wilders Book</h1>
        </Container>
      </header>
      <Container>
        <button
          onClick={() => {
            setForm(!form);
          }}
        >
          Add a new wilder
        </button>
        {
          // <button>Delete all wilders</button>
        }
        {form ? (
          <AddWilder
            onCloseForm={callbackForm}
            onCreate={getWilder}
            onUpdate={false}
          />
        ) : (
          <></>
        )}
        <h2>Wilders</h2>
        <CardRow>
          {wilders.length === 0
            ? displayWilders(true, wilders)
            : displayWilders(false, wilders)}
        </CardRow>
      </Container>
      <footer>
        <Container>
          <p>&copy; 2022 Wild Code School</p>
        </Container>
      </footer>
    </div>
  );
}

export default App;
