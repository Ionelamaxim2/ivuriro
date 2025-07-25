import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import { body, validationResult } from "express-validator";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layout");
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Ioanakey",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/pricing", (req, res) => {
  const filePath = path.join(__dirname, "data", "prices.json");
  const prices = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.render("pricing", { title: "Pricing", prices });
});

app.get("/results", (req, res) => {
  res.render("gallery", { title: "Results" });
});

app.get("/team", (req, res) => {
  res.render("team", { title: "Our Team" });
});

app.get("/contact", (req, res) => {
  const error = req.session.formError;
  const success = req.session.formSuccess;
  req.session.formError = null;
  req.session.formSuccess = null;

  res.render("contact", {
    title: "Contact",
    error,
    success,
  });
});

app.post(
  "/send-message",
  [
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters."),
    body("email").trim().isEmail().withMessage("Invalid email."),
    body("phone")
      .optional({ checkFalsy: true })
      .matches(/^[0-9+\s()-]{7,15}$/)
      .withMessage("Invalid phone number."),
    body("message")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Message must be at least 10 characters."),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.formError = errors
        .array()
        .map((e) => e.msg)
        .join(" ");
      return res.redirect("/contact");
    }

    const { name, email, phone, message } = req.body;

    console.log("Form primit:", { name, email, phone, message });

    req.session.formSuccess = "Your message has been sent successfully!";
    res.redirect("/contact");
  }
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
