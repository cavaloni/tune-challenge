const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const users = require("./assets/users.json");
const logs = require("./assets/logs.json");
const { mapUserData } = require("./helpers/map-user-data");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

// The sorting is used for optimizing the mapping of the data
// This obviously doesn't consider the challenges in keeping a sorted database
// I'm hoping it would be the most optimal solution in the end
// Makes for a O(n*log(n)) complexity instead of On^2
// For now this "mock db" is limited to the instance of the server
logs.sort((a, b) => a.user_id - b.user_id);
users.sort((a, b) => a.id - b.id);

// More work below that would need to consider DB challenges
// For instance:
// would we want to run this kind of logic when storing, or retrieving?
// divide some of the work for the FE?
// Any kind of caching solution?
let mappedUserData = mapUserData(users, logs);

app.get("/api/users", (req, res) => {
  const { page, limit, sort, ascending } = req.query;
  res.setHeader("Content-Type", "application/json");
  let limitedUsers;
  const begCount = Number(page) * Number(limit) - Number(limit);
  const endcount = Number(page) * Number(limit);
  if (!sort) {
    limitedUsers = mappedUserData.slice(begCount, endcount);
  } else {
    // if we wanted to optimize paginated sorts we could use partial sorting:
    // https://en.wikipedia.org/wiki/Partial_sorting
    // Or we could implement a heap solution instead of arrays in the DB setup
    // I'm saving time here (super startup mode!) so just sorting the whole user dataset again
    limitedUsers = mappedUserData
      .sort((a, b) => {
        if (ascending) {
          return a[sort] - b[sort];
        } else if (!ascending) {
          return b[sort] - a[sort];
        }
      })
      .slice(begCount, endcount);
  }
  res.send(JSON.stringify({ users: limitedUsers, userCount: users.length }));
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
