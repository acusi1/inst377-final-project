const express = require('express');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

// Supabase setup (MOVE KEY TO .env in final submission)
const supabaseUrl = 'https://ekrqvjzsegifqcsupijl.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

/* -------------------- SUPABASE ENDPOINTS -------------------- */

// GET customers
app.get('/customers', async (req, res) => {
  const { data, error } = await supabase.from('customer').select();

  if (error) return res.status(500).json(error);
  res.json(data);
});

// POST customer
app.post('/customer', async (req, res) => {
  const { firstName, lastName, state } = req.body;

  const { data, error } = await supabase
    .from('customer')
    .insert([
      {
        customer_first_name: firstName,
        customer_last_name: lastName,
        customer_state: state
      }
    ])
    .select();

  if (error) return res.status(500).json(error);
  res.json(data);
});

/* -------------------- EXTERNAL API (REQUIRED) -------------------- */

app.get('/random-fact', async (req, res) => {
  try {
    const response = await fetch(
      'https://uselessfacts.jsph.pl/random.json?language=en'
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'External API failed' });
  }
});

/* -------------------- START SERVER -------------------- */

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});