import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [username, setUsername] = useState("");

  const [user_name, setUser_name] = useState(() => {
    return localStorage.getItem("cur_user") || null;
  });

  const email = localStorage.getItem("email");
  const ADMIN = import.meta.env.VITE_ADMIN;

  const handleLogout = () => {
    localStorage.clear();
  };

  async function fetchData() {
    const res = await fetch("http://localhost:8080/home");
    const data = await res.json();
    setUsers(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async (user) => {
    setUsername(user.user_name);
    setUpdateId(updateId == null ? user._id : null);
  };

  const handleSubmit = async (user) => {
    const id = user._id;

    const res = await fetch("http://localhost:8080/home", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, id }),
    });
    const data = await res.json();
    console.log(data);
    setUpdateId(null);
    fetchData();
  };

  const handleDelete = async (user) => {
    const isConfirm = window.confirm("Are sure to delete the user?");

    if (isConfirm) {
      const id = user._id;

      const res = await fetch("http://localhost:8080/home", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
    }
    fetchData();
  };

  return (
    <div className="p-30">
      <div>
        <h1 className="text-3xl font-black mb-4">
          Welcome <span>{user_name}</span>!
        </h1>
        <button
          className="bg-slate-950 text-white py-2.5 px-6 rounded cursor-pointer shadow-md font-semibold"
          onClick={handleLogout}
        >
          <Link to="/login">Log Out</Link>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8">
        {email == ADMIN
          ? users.map((user) => {
              return (
                <div className="bg-slate-300 p-4 rounded-md" key={user._id}>
                  {updateId == user._id ? (
                    <input
                      className="bg-white text-xl rounded px-2 outline-none"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                  ) : (
                    <h1 className="text-xl font-bold">{user.user_name}</h1>
                  )}
                  <p>{user.email}</p>
                  <div className="mt-4 flex justify-around">
                    <button
                      className="bg-yellow-500 text-white py-2.5 px-8 rounded cursor-pointer shadow-md font-semibold"
                      onClick={() => handleUpdate(user)}
                    >
                      {updateId == user._id ? "Cancel" : "Update"}
                    </button>
                    {updateId == user._id ? (
                      <button
                        className="bg-green-500 text-white py-2.5 px-8 rounded cursor-pointer shadow-md font-semibold"
                        onClick={() => handleSubmit(user)}
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 text-white py-2.5 px-8 rounded cursor-pointer shadow-md font-semibold"
                        onClick={() => handleDelete(user)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Home;
