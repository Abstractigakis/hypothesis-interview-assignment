import { useEffect, useState } from "react";
import ALL_USERS from "./data.json";

const UserBadge = ({ user, onClick }) => {
  return (
    <button
      class="bg-gray-100 rounded-lg text-gray-700 m-1 p-1"
      onClick={onClick}
    >
      <span class="mr-1">
        <div>{user.name}</div>
        <div>{user.username}</div>
      </span>

      <img className="rounded-full" src={user.avatar_url} alt={user.name} />
    </button>
  );
};

const App = () => {
  const [formShow, setFormShow] = useState(false);
  const [users, setUsers] = useState(ALL_USERS);
  const [searchString, setSearchString] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (searchString == "") {
      setSearchString(ALL_USERS);
    } else {
    }
  }, [searchString]);

  console.log(ALL_USERS.length);
  return (
    <div className="align-items-center bg-red-300 h-screen w-screen">
      {formShow && (
        <form className="h-40 overflow-scroll text-white bg-gray-700">
          {ALL_USERS.map((u) => (
            <UserBadge user={u} onClick={() => console.log(u.username)} />
          ))}
          <button>Submit</button>
        </form>
      )}
      <div className="grid align-items-center">
        <textarea
          className="w-80 h-12 text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="type comment..."
        />
        <button onClick={() => setFormShow(true)}>Add User Reference</button>
      </div>
    </div>
  );
};

export default App;
