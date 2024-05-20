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
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Database", DatabaseSchema);