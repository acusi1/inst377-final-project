const API = "http://localhost:3000";

// ADD CUSTOMER
async function addCustomer() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const state = document.getElementById("state").value.toUpperCase();

  const res = await fetch(`${API}/customer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, state })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Error adding customer");
    return;
  }

  loadCustomers();
}

// LOAD CUSTOMERS
async function loadCustomers() {
  const res = await fetch(`${API}/customers`);
  const data = await res.json();

  const list = document.getElementById("customerList");
  list.innerHTML = "";

  data.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.customer_first_name} ${c.customer_last_name} - ${c.customer_state}`;
    list.appendChild(li);
  });
}

// RANDOM FACT
async function getFact() {
  const res = await fetch(`${API}/fact`);
  const data = await res.json();

  document.getElementById("fact").innerText = data.text;
}

// IMPORTANT FIX (THIS WAS BREAKING YOUR BUTTONS)
window.addCustomer = addCustomer;
window.loadCustomers = loadCustomers;
window.getFact = getFact;