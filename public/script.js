document.getElementById('carbonForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const usage = document.getElementById('usages').value;

    if (!date || !usage) {
        alert('Please fill in all fields.');
        return;
    }

    const response = await fetch('/addUsage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, usage })
    });

    const result = await response.json();
    alert(result.message);
    fetchTotalUsage();
    fetchUsageData();
});

async function fetchTotalUsage() {
    const response = await fetch('/getTotalUsage');
    const data = await response.json();
    document.getElementById('totalUsage').textContent = data.totalUsage || 0;
}

async function fetchUsageData() {
    const response = await fetch('/getUsageData');
    const data = await response.json();
    const tableBody = document.getElementById('usageTable');
    tableBody.innerHTML = '';

    data.forEach(entry => {
        const row = `<tr><td>${entry.date}</td><td>${entry.usages}</td></tr>`;
        tableBody.innerHTML += row;
    });
}

// Fetch data on load
fetchTotalUsage();
fetchUsageData();
