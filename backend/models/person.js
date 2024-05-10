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

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "name has to be at least 3 characters"],
  },
  number: {
    type: String,
    minLength: [8, "number has to be at least 8 characters"],
    validate: [
      (val) => {
        const re = /[0-9]{2,3}-[0-9]{2,}/;
        return re.test(val);
      },
      "must be a valid phone number with 1 dash",
    ],
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
