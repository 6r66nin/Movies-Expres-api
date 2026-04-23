import Express from "express";

const app = Express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server Working");
});
