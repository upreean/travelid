function getCalculatePrice() {
  // Get the destination value
  const destination = document.getElementById("destination").value;

  // Get the price of the ticket for the selected destination
  const prices = {
    Tangerang: 100000,
    Bandung: 200000,
    Jakarta: 300000,
    Surabaya: 700000,
    Solo: 500000,
    Yogyakarta: 600000,
    "Banda Aceh": 1000000,
    Padang: 600000,
    Palembang: 700000,
    Lampung: 500000,
  };

  // Set the price of the ticket
  const price = prices[destination];
  document.getElementById("price").value = price;

  // Get the number of tickets
  const passengers = document.getElementById("passengers").value;

  // Get Value of the Membership
  const member = document.getElementById("member").checked;

  // Calculate the total price
  let totalPrice = price * passengers;

  // Calculate the discount based on the number of passengers
  let discount = 0;
  if (member) {
    if (passengers > 5) discount = 15;
    else discount = 10;
  }

  // Set the discount
  document.getElementById("discount").value = discount + "%";

  // Apply the discount to the total price
  const total = totalPrice - totalPrice * (discount / 100);

  // Check if the element with id "total" exists
  document.getElementById("total").value = total;
}

// Run the function when the destination passengers or member values change
document
  .getElementById("destination")
  .addEventListener("change", getCalculatePrice);
document
  .getElementById("passengers")
  .addEventListener("change", getCalculatePrice);
document.getElementById("member").addEventListener("change", getCalculatePrice);
