import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import Redis from "ioredis";
import JSONCache from 'redis-json';

dotenv.config({ path: "../.env" });

const { PORT, DATABASE_URL, REDIS_URL } = process.env;

const dbRedis = new Redis(REDIS_URL);
const jsonCache = new JSONCache(dbRedis);

const client = new pg.Pool({
  connectionString: DATABASE_URL,
});

await client.connect();

const app = express();

app.use(express.json());

app.get("/api/shoedata", async (req, res) => {
  const result = await jsonCache.get("shoes")
  if(result === undefined){
    // console.log(result);
    client.query("SELECT id, thumbnails, expandedimg FROM shoedata;").then(async (result) => {
    await jsonCache.set("shoes", result.rows)
    res.send(result.rows);
  });
  } else {
    // console.log(result);
    res.send(result)
  }
  
});


app.get("/api/shoedata/:id", (req, res) => { 
  const {id} = req.params;
  client.query("SELECT * FROM shoedata WHERE id = $1;", [id]).then((result) => {
    res.send(result.rows[0]);
  });
});

// app.get("/api/shoedata/:id", (req, res) => {
//   let id = req.params.id;

//   client.query("SELECT * FROM shoedata WHERE id = $1;", [id]).then((result) => {
//     res.send(result.rows[0]);
//   });
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});