const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)

  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const ResponseSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    enum: ["no answer", "yes", "no"],
    default: "no answer",
  },
});

const DatabaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  responses: [ResponseSchema],
});

DatabaseSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    if (returnedObject._id) {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
    }
    if (returnedObject.__v) delete returnedObject.__v;
    if (returnedObject.responses) {
      returnedObject.responses = returnedObject.responses.map((res) => {
        delete res._id;
        return res;
      });
    }
  },
});

module.exports = mongoose.model("Database", DatabaseSchema);
