const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { isValidStateAbbreviation } = require('usa-state-validator');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// ---------------- GET ALL CUSTOMERS ----------------
app.get('/customers', async (req, res) => {
  const { data, error } = await supabase.from('customer').select();

  if (error) return res.status(500).json(error);

  res.json(data);
});

// ---------------- ADD CUSTOMER ----------------
app.post('/customer', async (req, res) => {
  const { firstName, lastName, state } = req.body;

  if (!firstName || !lastName || !state) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  if (!isValidStateAbbreviation(state)) {
    return res.status(400).json({ message: 'Invalid state' });
  }

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

// ---------------- RANDOM FACT (External API requirement) ----------------
app.get('/fact', async (req, res) => {
  const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
  const data = await response.json();

  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});