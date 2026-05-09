let chart;

async function loadCustomers() {
  const res = await fetch('/customers');
  const data = await res.json();

  document.getElementById('customerList').innerHTML =
    data.map(c =>
      `<p>${c.customer_first_name} ${c.customer_last_name} - ${c.customer_state}</p>`
    ).join('');

  createChart(data);
}

async function addCustomer() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const state = document.getElementById('state').value;

  await fetch('/customer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, state })
  });

  loadCustomers();
}

async function getFact() {
  const res = await fetch('/random-fact');
  const data = await res.json();

  document.getElementById('fact').innerText = data.text;
}

/* ---------------- CHART.JS ---------------- */

function createChart(data) {
  const counts = {};

  data.forEach(c => {
    counts[c.customer_state] = (counts[c.customer_state] || 0) + 1;
  });

  const labels = Object.keys(counts);
  const values = Object.values(counts);

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById('chart'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Customers per State',
        data: values
      }]
    }
  });
}