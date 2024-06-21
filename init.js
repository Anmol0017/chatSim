const mongoose = require("mongoose");
const chat = require("./models/chat.js");
// -----------------------------------------------
main()
  .then((res) => {
    console.log("Connection INIT database successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "anmol",
    to: "tony",
    msg: "send science notes",
    Created_at: new Date(),
  },
  {
    from: "akki",
    to: "adi",
    msg: "send notes",
    Created_at: new Date(),
  },
  {
    from: "akash",
    to: "padam",
    msg: "send  DVD notes",
    Created_at: new Date(),
  },
  {
    from: "pankaj",
    to: "harsh",
    msg: "send DSA notes",
    Created_at: new Date(),
  },
  {
    from: "harsh",
    to: "yadav",
    msg: "send details of your bank acc",
    Created_at: new Date(),
  },
  {
    from: "Jash",
    to: "Dhyey",
    msg: "send pic not the normal One",
    Created_at: new Date(),
  },
];
chat
  .insertMany(allChats)
  .then((res) => {
    console.log("new chat enter");
  })
  .catch((err) => {
    console.log(err.errors);
  });
