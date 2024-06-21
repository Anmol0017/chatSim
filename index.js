const express = require("express");
const app = express();

const methodOverride = require("method-override");

const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

///////
const mongoose = require("mongoose");
const chat = require("./models/chat.js");
// -----------------------------------------------
main()
  .then((res) => {
    console.log("Connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://anmol979821:RT41WO7PwNiC8cty@cluster0.tjp4bwg.mongodb.net/whatsapp");
}

// ------------------------------------------------

// let chat1 = new chat({
//   from: "akki",
//   to: "adi",
//   msg: "send notes",
//   Created_at: new Date(),
// });

// chat1.save().then((res) => {
//   console.log(res);
// });

app.listen(8080, () => {
  console.log("Server is Listening on Port 8080");
});

app.get("/", (req, res) => {
  res.render("home.ejs");
});
// ---------CHAT SCREEN///////////
app.get("/chats", async (req, res) => {
  let chats = await chat.find();
  // console.log(chats);
  res.render("index.ejs", { chats });
});
/////////NEW CHAT CREATE PAGE//////
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});
// ////SAVE TO DATA BASE////
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newchat = new chat({
    from: from,
    to: to,
    msg: msg,
    Created_at: new Date(),
  });
  newchat.save().then((res) => {
    console.log("Chat saved to the chatDatabase");
  });
  res.redirect("/chats");
});
//////////////EDIT///////////

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let mychat = await chat.findById(id);
  res.render("edit.ejs", { mychat });
});
//////////UPDATE//////////////
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newmsg } = req.body;
  let updatedChat = await chat.findByIdAndUpdate(
    id,
    { msg: newmsg },
    { runValidators: true, new: true }
  );
  res.redirect("/chats");
});
//////////////////////////////// DELETE////////////
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedchat = await chat.findByIdAndDelete(id);
  res.redirect("/chats");
});
