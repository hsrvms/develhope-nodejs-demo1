const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  const sql = 'SELECT * FROM animals'
	try {
		const client =await pool.connect();
    const result = await client.query(sql);
		const allAnimals = result.rows;
    client.release();

    res.json(allAnimals);
	} catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
  const sql = 'SELECT * FROM animals WHERE id = $1';
  const id = req.params.id;
	try {
		const client =await pool.connect();
    const result = await client.query(sql, [id]);
		const allAnimals = result.rows;
    client.release();

    res.json(allAnimals);
	} catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error");
  }
});

router.post('/', async (req, res) => {
  const { name, breed, birthdate } = req.body;

  if(!name || !breed) {
    return res.status(400).send("Incomplete data");
  }

  const sql = 'INSERT INTO animals(name, breed, birthdate) VALUES($1, $2, $3) RETURNING *'
  try{
    const client = await pool.connect();
    const result = await client.query(sql, [name, breed, birthdate]);
    const newAnimal = result.rows[0];
    console.log(newAnimal);
    client.release();

    res.status(201).json(newAnimal);
  } catch(err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
})

router.put('/:id', async(req, res) => {
  const id = req.params.id;
  const { name, breed, birthdate } = req.body;

  if(!name || !breed) {
    return res.status(400).send("Incomplete data");
  }

  const sql = 'UPDATE animals SET name = $1, breed = $2, birthdate = $3 WHERE id = $4 RETURNING *';
  try{
    const client = await pool.connect();
    const result = await client.query(sql, [name, breed, birthdate, id]);
    const newAnimal = result.rows[0];
    console.log(newAnimal);
    client.release();

    res.status(201).json(newAnimal);
  } catch(err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
})

router.delete("/:id", async (req, res) => {
  const sql = 'DELETE FROM animals WHERE id = $1 RETURNING *';
  const id = req.params.id;
	try {
		const client =await pool.connect();
    const result = await client.query(sql, [id]);
		const allAnimals = result.rows;
    client.release();

    res.json(allAnimals);
	} catch (error) {
    console.error(error)
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
