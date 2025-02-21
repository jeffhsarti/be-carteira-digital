import logger from "./util/logger";
import "./util/tracing";
import express from "express";
import cors from "cors";
import figlet from "figlet";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Carteira Digital" });
});

app.listen(3000, () => {
  logger.info("API iniciada na porta 3000!");

  figlet("Carteira Digital", (err, data) => {
    if (err) {
      console.log("Carteira Digital");
      return;
    }
    console.log(data);
  });
});
