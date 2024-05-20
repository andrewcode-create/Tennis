require("dotenv").config();
//const Person = require("./models/person");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT;

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

// Define server-side routes
// DOES NOT WORK
/*
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "views", "index.html"));
});

app.get("/info", (req, res) => {
  res.sendFile(path.resolve(__dirname, "views", "info.html"));
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

app.get(["/", "/info", "/survey"], (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.get("/api", (request, response) => {
  response.json({ times: times, names: names, responses: database });
  /*
  Person.find({}).then((result) => {
    response.json(result);
  });
  */
});

app.get("/api/names", (request, response) => {
  response.json(names);
});

app.get("/api/times", (request, response) => {
  response.json(times);
});

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

/*
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  Person.find({}).then((result) => {
    response.send(
      `Phonebook has info for ${result.length} people. <br/><br/>${Date()}`
    );
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
  })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});
*/

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
