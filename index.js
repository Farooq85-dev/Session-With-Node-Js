import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    cookie: {
      maxAge: 30000,
    },
    resave: true,
    saveUninitialized: false,
  })
);

const user = {
  name: "Farooq",
  age: 18,
};

app.post("/login", (req, res) => {
  if (req.body.name === "Farooq" && req.body.password === "123") {
    req.session.user = { id: 1, name: "Farooq" };
    res.send({ msg: "Good Job!" });
    console.log(req.sessionID);
  } else {
    res.send({ msg: "Wrong Credentials!" });
  }
});

app.get(
  "/user",
  (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.send({ msg: "Please login!" });
    }
  },
  (req, res) => {
    res.send({ user: req.session.user });
  }
);

app.listen(PORT, () => {
  console.log(`**** Server is running on ${PORT} ****`);
});
