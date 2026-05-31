const fileInput = document.getElementById("csvFile");

const loadSampleButton = document.getElementById("loadSample");

fileInput.addEventListener("change", handleFileUpload);

loadSampleButton.addEventListener("click", loadSampleData);

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

Papa.parse(file, {
  header: true,

  skipEmptyLines: true,

  complete: function(results) {
    const enrichedData = enrichData(results.data);
    renderDashboard(enrichedData);
    }
  });
}

function loadSampleData() {
  Papa.parse("data/sample_campaign_data.csv", {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      const enrichedData = enrichData(results.data);
      renderDashboard(enrichedData);
    }
  });
}

function renderDashboard(data) {
  document.getElementById("totalContacts").textContent = data.length;
  const highIntentCount = data.filter(row =>
    row.segment === "High Intent" || row.segment === "Converted / Priority"
  ).length;

  const convertedCount = data.filter(row =>
    row.segment === "Converted / Priority"
  ).length 

  document.getElementById("highIntent").textContent = highIntentCount;
  document.getElementById("converted").textContent = convertedCount;

  renderTable(data);
  renderSegmentChart(data);
}

function renderTable(data) {
  const tableBody = document.getElementById("audienceTable");

  tableBody.innerHTML = "";

  data.forEach(row => {
    const tr = document.createElement("tr");

    tr.innerHTML = 
      <td>${row.handle || "Unknown"}</td>
      <td>${row.campaign || "Unknown"}</td>
      <td>${row.audience_score}</td>
      <td>${row.segment}</td>
      <td>${row.recommendation}</td>
    ;
    tableBody.appendChild(tr);
  });
}
