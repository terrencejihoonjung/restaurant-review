import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "54.67.56.212",
  database: "yelp",
  password: "",
  port: 5432,
});

export default pool;
