import React, { useState } from "react";
import "./App.css";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
function App() {
  const [data, setData] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);

  const createMuation = gql`
    mutation Mutation($createUserData2: [UserInput]!) {
      createUser(data: $createUserData2) {
        data
      }
    }
  `;

  // const createMuation = gql`
  //   mutation Mutation {
  //     test {
  //       _id
  //     }
  //   }
  // `;
  const [create] = useMutation(createMuation);
  const handleSubmit = async () => {
    setTimeout(() => {
      window.location.reload();
    }, timer * 1000);

    const records = Array.from({ length: data }, (_, index) => ({
      one: `user ${index + 1}`
    }));
    let i = 0;
    while (i < data) {
      // await fetch("http://192.168.100.4:5000/api/v1/user", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(records)
      // });

      await create({
        variables: {
          createUserData2: records
        }
      });
      i++;
    }
  };

  return (
    <>
      <h1>Hello world</h1>
      <div className="form-container">
        <input
          type="number"
          placeholder="Quantity"
          className="form-input"
          value={data}
          onChange={(e) => setData(e.target?.value)}
        />
        <input
          type="number"
          placeholder="Timeout"
          className="form-input"
          value={timer}
          onChange={(e) => setTimer(e.target?.value)}
        />
        <button type="submit" onClick={handleSubmit} className="form-button">
          Submit
        </button>
      </div>
    </>
  );
}

export default App;
