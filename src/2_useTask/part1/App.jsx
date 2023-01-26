import { useState } from "react";
import { fetchUser } from "../shared/util";
import { useTask } from "../shared/useTask";

// ...

const baseStyle = {
  textAlign: "center",
};

const inputStyle = {
  ...baseStyle,
  marginBottom: 20,
};

// ...

export function App() {
  const [userId, setUserId] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO:
    //
    // Run task fetchUser. Support both (separately)
    //
    // - Running new task while a current task is in progress (default).
    // - Prohibit running new task while a current task is in progress.
  };

  const handleCancel = () => {
    // TODO:
    //
    // Cancel running task.
  };

  const handleChange = (e) => {
    setUserId(+e.target.value);
  };

  return (
    <>
      <div style={inputStyle}>
        <input type="number" value={userId} onChange={handleChange} />

        <button onClick={handleSubmit}>Fetch User</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>

      <div style={baseStyle}>
        {status === "pending" && "Loading..."}
        {status === "rejected" && `${error}`}
        {status === "resolved" && <p>Name: {user.name}</p>}
      </div>
    </>
  );
}
