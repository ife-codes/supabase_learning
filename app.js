const express = require("express");
const app = express();

require("dotenv").config()
const morgan = require("morgan")

const _supabase = require("./supabaseConfig");

app.use(express.json());
app.use(morgan("dev"))

app.listen(3000)


app.get("/", (req, res) => {});

app.post("/", async (req, res) => {
  const { title, url } = req.body;
  try {
    const {data, error} = await _supabase.from("links").insert([
      {
        title: title,
        url: url,
      },
    ]);
    if (error) return res.status(500).json({ error: error.message });

    return res.status(201).json(data[0])
  } catch (error) {
    res.status(500).json({ error: error })
  }
});
