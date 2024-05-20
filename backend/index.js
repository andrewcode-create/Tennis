require("dotenv").config();
const Database = require("./models/tennis");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT;

//print mongodb
Database.find({}).then((result) => {
  jsonData = result.map((item) => item.toJSON());
  console.log("full database:", JSON.stringify(jsonData, null, 2));
});

const names = [
  { name: "Amy", id: "0" },
  { name: "Ben", id: "1" },
  { name: "Claire", id: "2" },
  { name: "Nancy", id: "3" },
  { name: "Sofie", id: "4" },
  { name: "Travis", id: "5" },
];
const times = [["Monday 7:30"], ["Tuesday 7:30"], ["Friday 7:30"]];
const options = ["no answer", "yes", "no"];

var database = {};
names.forEach((name) => {
  database[name.id] = {};
  times.forEach((date) => {
    database[name.id][date] = options[0];
  });
});

/*
const tmp = new Database({
  name: "Travis",
  responses: [
    { time: "Monday 7:30", response: "yes" },
    { time: "Tuesday 7:30", response: "no" },
    { time: "Wednesday 7:30" },
  ],
});
tmp
  .save()
  .then(() => {
    console.log("saved");
  })
  .catch(() => {
    console.log("error saving");
  });
*/

// Middleware
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);

//paging
app.get(["/", "/info", "/survey"], (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

//old
app.get("/api", (request, response) => {
  response.json({ times: times, names: names, responses: database });
});

//new
app.get("/api/new", (request, response) => {
  Database.find({}).then((result) => {
    response.json(result);
  });
});

//old
app.get("/api/names", (request, response) => {
  response.json(names);
});

//new
app.get("/api/new/names", (request, response) => {
  Database.find({}, "name").then((result) => {
    response.json(result);
  });
});

//old
app.get("/api/times", (request, response) => {
  response.json(times);
});

//new
//app.get("/api/new/times", (request, response) => {
Database.find({}, { "responses.time": 1, _id: 0 })
  .then((result) => {
    //response.json(result);
    console.log("!!!!!!!!!!!", JSON.stringify(result, null, 1));
  })
  .catch("error!!!!!!!!!!!!");
//});

app.get("/api/name/:id", (request, response) => {
  response.json(database[request.params.id]);
});

app.put("/api/:id", (request, response) => {
  database[request.params.id] = request.body;
  response.json(database[request.params.id]);
});

app.put("/api/:id/:date", (request, response) => {
  console.log(
    "putting to database id:",
    request.params.id,
    ", date:",
    request.params.date,
    ", body:",
    request.body
  );
  database[request.params.id][request.params.date] =
    request.body[request.params.date];
  response.json(database[request.params.id][request.params.date]);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}/`);
});

// bad url
const unknownEndpoint = (request, response) => {
  console.log(`bad endpoint ${request.url}`);
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// other error
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);
