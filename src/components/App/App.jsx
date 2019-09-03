import React, { useState, useEffect } from "react";
import "./app.css";
import CardList from "../CardList/CardList";
import Pagination from "../Pagination/Pagination";
import Controls from "../Controls/Controls";
import { PAGE_COUNT } from "./constants";

function App() {
  const [users, updateUsers] = useState([]);
  const [page, updatePage] = useState(1);
  const [userCount, updateUserCount] = useState(0);
  const [sort, updateSort] = useState("");
  const [ascending, updateAscending] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let urlString = `/api/users?page=${page}&limit=${PAGE_COUNT}`;
      if (sort) urlString = urlString.concat(`&sort=${sort}`);
      if (ascending) urlString = urlString.concat(`&ascending=${ascending}`);

      const res = await fetch(urlString);

      const { users, userCount } = await res.json();
      updateUsers(users);
      updateUserCount(userCount);
    }
    fetchData();
  }, [page, sort, ascending]);

  return (
    <div className="app">
      <Controls
        updateSort={updateSort}
        updateAscending={updateAscending}
        sort={sort}
        ascending={ascending}
      />
      <CardList users={users} />
      <Pagination userCount={userCount} changePage={updatePage} />
    </div>
  );
}

export default App;
