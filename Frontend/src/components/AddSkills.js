import { useEffect, useState } from "react";

function AddSkills({ id, onAdd, wInfo }) {
  const [title, setTitle] = useState("");
  const [votes, setVotes] = useState(0);

  const handleTitleChanges = (e) => {
    setTitle(e.target.value);
  };

  const handleVotesChanges = (e) => {
    setVotes(e.target.value);
  };

  useEffect(() => {
    onAdd({ id: id, title: title, votes: votes });
  }, [title, votes]);

  return (
    <div>
      <label htmlFor="skill-title">Skill Title</label>
      <input
        type="text"
        id="skill-title"
        onChange={(e) => {
          handleTitleChanges(e);
        }}
        value={title}
        placeholder={wInfo ? wInfo.title : ""}
      ></input>
      <label htmlFor="skill-votes">Skill Votes</label>
      <input
        type="number"
        id="skill-votes"
        onChange={(e) => {
          handleVotesChanges(e);
        }}
        value={votes}
      ></input>
    </div>
  );
}

export default AddSkills;
