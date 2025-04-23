const _supabase = require("../config/supabaseConfig");

const get_links = async (req, res) => {
  try {
    const { data, error } = await _supabase.from("links").select("*");
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json(data);
      console.log(data);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const post_links = async (req, res) => {
  const { title, url } = req.body;
  try {
    const { data, error } = await _supabase.from("links").insert([
      {
        title: title,
        url: url,
      },
    ]).select()
    if (error) {
        console.error("Supabase error:", error);
      res.status(500).json({ error: error.message });
    }

    if(!data || data.length === 0)  {
      res.status(500).json({error: "Row was inserted but was not returned"})
    }

    console.log("Inserted", data[0]);
    res.status(201).json(data[0]);


  } catch (error) {
    console.error("Catch error:", err);
    res.status(500).json({ error: err.message || "Unexpected error occurred." });
  }
};

module.exports = {
  get_links,
  post_links,
};
