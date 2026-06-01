const fileInput = document.getElementById("csvFile");

const processCsvButton = document.getElementById("processCsv");

const loadSampleButton = document.getElementById("loadSample");

let selectedCsvFile = null;

fileInput.addEventListener("change", function(event) {
  selectedCsvFile = event.target.files[0];
});

processCsvButton.addEventListener("click", processUploadedCsv);

loadSampleButton.addEventListener("click", loadSampleData);

function processUploadedCsv() {
  if (!selectedCsvFile) {
    alert("Please choose a CSV file first.");
    return;
  }

  Papa.parse(selectedCsvFile, {
    header: true,
    skipEmptyLines: true,

    complete: function(results) {
      const enrichedData = enrichData(results.data);
      renderDashboard(enrichedData);
    },

    error: function(error) {
      alert("There was a problem reading your CSV file.");
      console.error(error);
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
    },

    error: function(error) {
      alert("The sample data could not be loaded. Check that data/sample_campaign_data.csv exists.");
      console.error(error);
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
  ).length;

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

    tr.innerHTML = `
      <td>${row.handle || "Unknown"}</td>
      <td>${row.campaign || "Unknown"}</td>
      <td>${row.audience_score}</td>
      <td>${row.segment}</td>
      <td>${row.recommendation}</td>
    `;

    tableBody.appendChild(tr);
  });
}
