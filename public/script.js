// Function to add carbon usage
async function addUsage() {
    const date = document.getElementById("usageDate").value;
    const usage = document.getElementById("usageValue").value;

    if (!date || usage <= 0) {
        alert("🚨 Enter a valid date and usage value.");
        return;
    }

    const response = await fetch('/addUsage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, usage })
    });

    const result = await response.json();
    alert(result.message);
    getUsageData();
    getTotalUsage();
}

// Function to get total carbon usage
async function getTotalUsage() {
    const response = await fetch('/getTotalUsage');
    const data = await response.json();
    document.getElementById("totalUsage").innerText = data.totalUsage || 0;
}

// Function to get usage data history
async function getUsageData() {
    const response = await fetch('/getUsageData');
    const data = await response.json();
    const tableBody = document.getElementById("usageTable");
    tableBody.innerHTML = "";

    data.forEach(entry => {
        const row = `<tr><td>${entry.date}</td><td>${entry.usages} kg</td></tr>`;
        tableBody.innerHTML += row;
    });
}

// Function to fetch data from Raspberry Pi
async function fetchPiData() {
    const response = await fetch('/fetchPiData');
    const result = await response.json();
    alert(result.message || "❌ Failed to fetch data");
    getUsageData();
    getTotalUsage();
}

// Initial Load
getUsageData();
getTotalUsage();
