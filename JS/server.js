import mysql from 'mysql2/promise';
import express from 'express';
import cors from 'cors';
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'slang_table'
});

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/search', async (req, res) => {
  const { shortForm } = req.query;

  try {
    const connection = await pool.getConnection();
    let query = 'SELECT Long_form FROM slang WHERE Short_form = ?';
    const [rows] = await connection.execute(query, [shortForm]);

    connection.release();

    if (rows.length === 0) {
      res.status(404).json({ error: 'Slang term not found' });
    } else {
      res.json({ longForm: rows[0].Long_form });
    }
  } catch (error) {
    console.error('Error searching for slang term:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/submit', async (req, res) => {
  const { shortForm, longForm } = req.body;

  try {
    const connection = await pool.getConnection();
    let query = 'INSERT INTO slang (Short_form, Long_form) VALUES (?, ?)';


    await connection.execute(query, [shortForm, longForm]);

    connection.release();

    res.status(201).json({ message: 'Slang term submitted successfully' });
  } catch (error) {
    console.error('Error submitting slang term:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});