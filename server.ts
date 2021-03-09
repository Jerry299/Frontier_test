import app from "./index";

// hard coded port
const PORT: number = 3000;
app.listen(PORT, () => {
  `server is running on port ${PORT}`;
});
