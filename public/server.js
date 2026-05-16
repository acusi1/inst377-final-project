require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { isValidStateAbbreviation } = require('usa-state-validator');

const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ---------------- SUPABASE ----------------
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ---------------- GET CUSTOMERS ----------------
app.get('/customers', async (req, res) => {
  try {
    const { data, error } = await supabase.from('customer').select('*');

    if (error) return res.status(500).json(error);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

// ---------------- ADD CUSTOMER ----------------
app.post('/customer', async (req, res) => {
  try {
    const { firstName, lastName, state } = req.body;

    if (!firstName || !lastName || !state) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    if (!isValidStateAbbreviation(state.toUpperCase())) {
      return res.status(400).json({ message: 'Invalid state abbreviation' });
    }

    const { data, error } = await supabase
      .from('customer')
      .insert([
        {
          customer_first_name: firstName,
          customer_last_name: lastName,
          customer_state: state.toUpperCase()
        }
      ])
      .select();

    if (error) return res.status(500).json(error);

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

// ---------------- EXTERNAL API (FACT) ----------------
app.get('/fact', async (req, res) => {
  try {
    const response = await fetch(
      'https://uselessfacts.jsph.pl/random.json?language=en'
    );

    if (!response.ok) {
      return res.status(500).json({ message: "External API failed" });
    }

    const data = await response.json();

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: "Fact API error", err });
  }
});

// ---------------- START SERVER ----------------
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});