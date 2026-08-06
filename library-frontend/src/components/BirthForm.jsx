import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_BORN } from "../queries";

const BirthForm = ({ show }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const result = useQuery(ALL_AUTHORS);

  const [editBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!show) {
    return null;
  }

  if (result.loading) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    editBorn({ variables: { name, setBornTo: parseInt(born, 10) } });
    setName("");
    setBorn("");
  };

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            name
            <select value={name} onChange={(e) => setName(e.target.value)}>
              {result.data.allAuthors.map((author) => (
                <option key={author.id} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            born
            <input
              type="text"
              value={born}
              onChange={(e) => setBorn(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  );
};

export default BirthForm;
