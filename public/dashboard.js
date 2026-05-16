const API = "http://localhost:3000";

// ---------------- ADD CUSTOMER ----------------
async function addCustomer() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const state = document.getElementById('state').value;

   
  if (!firstName || !lastName || !state) {
    alert("Please fill in all fields");
    return;
  }

  try {
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

 
    document.getElementById('firstName').value = "";
    document.getElementById('lastName').value = "";
    document.getElementById('state').value = "";

    await loadCustomers();

  } catch (err) {
    console.error("Add customer error:", err);
    alert("Server error while adding customer");
  }
}

// ---------------- LOAD CUSTOMERS ----------------
async function loadCustomers() {
  try {
    const res = await fetch(`${API}/customers`);
    const data = await res.json();

    const list = document.getElementById("customerList");
    list.innerHTML = "";

    data.forEach(c => {
      const li = document.createElement("li");

      li.innerHTML = `
        <strong>${c.customer_first_name} ${c.customer_last_name}</strong>
        <span> - ${c.customer_state}</span>
      `;

      list.appendChild(li);
    });

  } catch (err) {
    console.error("Load customers error:", err);
    alert("Failed to load customers");
  }
}

// ---------------- RANDOM FACT ----------------
async function getFact() {
  try {
    const res = await fetch(`${API}/fact`);
    const data = await res.json();

    document.getElementById("fact").innerText = data.text;

  } catch (err) {
    console.error("Fact error:", err);
    alert("Failed to fetch fact");
  }
}