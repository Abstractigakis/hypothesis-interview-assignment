import { useEffect, useRef, useState } from "react";
import ALL_USERS from "./data.json";

const Button = ({ onClick, children }) => {
  return (
    <button
      className="bg-blue-300 hover:bg-blue-300 rounded-lg text-white m-1 p-1"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const UserBadge = ({ user, onClick }) => {
  return (
    <Button onClick={onClick}>
      <span class="mr-1">
        <div>{user.name}</div>
        <div>{user.username}</div>
      </span>

      <img className="rounded-full" src={user.avatar_url} alt={user.name} />
    </Button>
  );
};

const App = () => {
  const [formShow, setFormShow] = useState(false);
  const [comment, setComment] = useState("");
  const [users, setUsers] = useState(ALL_USERS);
  const [searchString, setSearchString] = useState(null);
  const [startLinkStartPosition, setStartLinkStartPosition] = useState(null);

  useEffect(() => {
    console.log(searchString);
    console.log(users);
    if (!searchString) {
      setUsers(ALL_USERS);
    } else {
      setUsers(ALL_USERS.filter((u) => u.username.includes(searchString)));
    }
  }, [searchString]);

  const textAreaRef = useRef(null);

  useEffect(() => {
    if (comment.length >= 2 && comment.slice(-2) == "[[") {
      // activate opening the user reference list
      setStartLinkStartPosition(comment.length - 1);
      setFormShow(true);
    }
    if (comment.length - 1 < startLinkStartPosition) {
      setFormShow(false);
      setStartLinkStartPosition(null);
    }

    if (startLinkStartPosition) {
      let ss = comment.slice(startLinkStartPosition - comment.length + 1);
      console.log(ss);
      setSearchString(ss.length > 0 ? ss : "");
    }
    if (comment.length >= 2 && comment.slice(-2) == "]]") {
      setFormShow(false);
      setStartLinkStartPosition(null);
    }
  }, [comment]);

  return (
    <div className="align-items-center bg-red-300 h-screen w-screen">
      <div className="grid align-items-center">
        <textarea
          className="p-2 m-2 w-80 h-12 bg-gray-100 rounded-lg resize-none"
          placeholder="type comment..."
          ref={textAreaRef}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex">
          <Button
            onClick={() => {
              textAreaRef.current.focus();
              setFormShow(true);
            }}
          >
            Add User Reference
          </Button>
        </div>
        {formShow && (
          <div className="h-40 overflow-scroll text-white bg-gray-700">
            <input
              type="text"
              className="text-black"
              onChange={(e) => setSearchString(e.target.value)}
            />
            {users.map((u) => (
              <UserBadge
                user={u}
                onClick={() => {
                  setComment((p) => comment + "[[" + u.username + "]]");
                  setFormShow(false);
                  setSearchString(null);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
