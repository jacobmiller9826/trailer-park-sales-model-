let profitChart;

function calculateProfit() {
  const purchaseCost = parseFloat(document.getElementById('purchaseCost').value);
  const remodelCost = parseFloat(document.getElementById('remodelCost').value);
  const maintenance = parseFloat(document.getElementById('maintenance').value);
  const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);
  const monthlyRent = parseFloat(document.getElementById('monthlyRent').value);

  // Selling Profit
  const sellingProfit = sellingPrice - (purchaseCost + remodelCost);
  document.getElementById('sellingProfit').innerText = `Profit if Sold: $${sellingProfit.toFixed(2)}`;

  // Renting Profit
  const monthlyNetProfit = monthlyRent - maintenance;
  document.getElementById('rentingProfit').innerText = `Monthly Profit if Rented: $${monthlyNetProfit.toFixed(2)}`;

  // Break-even
  let breakEven = "N/A";
  if (monthlyNetProfit > 0) {
    breakEven = ((purchaseCost + remodelCost) / monthlyNetProfit).toFixed(1) + " months";
  }
  document.getElementById('breakEven').innerText = `Break-even Time (if rented): ${breakEven}`;

  // Chart: Profit over 24 months
  const months = Array.from({length: 24}, (_, i) => i + 1);
  const rentingProfits = months.map(m => monthlyNetProfit * m);

  if (profitChart) profitChart.destroy();

  const ctx = document.getElementById('profitChart').getContext('2d');
  profitChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Renting Profit Over Time ($)',
          data: rentingProfits,
          borderColor: '#0d47a1',
          backgroundColor: 'rgba(13, 71, 161, 0.2)',
          fill: true,
          tension: 0.3,
        },
        {
          label: 'Selling Profit ($)',
          data: Array(24).fill(sellingProfit),
          borderColor: '#ffd700',
          backgroundColor: 'rgba(255, 215, 0, 0.2)',
          borderDash: [5,5],
          fill: false,
          tension: 0.3,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
