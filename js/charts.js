let segmentChart;

function renderSegmentChart(data) {
  const segmentCounts = {
    "Cold" : 0,
    "Warm" : 0,
    "High Intent" : 0,
    "Converted / Priority" : 0
  };

//count audience member's segments
  data.forEach(row => {
    segmentCounts[row.segment]++;
  });

  const ctx = document.getElementById("segmentChart");
//stop duplicate charts
  if (segmentChart) {
    segmentChart.destroy();
  }

  segmentChart = new Chart(ctx, {
    type: "bar",

    data: {
      labels: Object.keys(segmentCounts),
      datasets: [
        {
          label: "Audience Members",
          data: Object.values(segmentCounts)
          backgroundColor: "rgba(71, 85, 105, 0.72)",
          borderColor: "rgba(71, 85, 105, 1)",
          borderWidth: 1,
          borderRadius: 10
        }
      ]
    },

    //visual settings
    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false
        },

        tooltip: {
          backgroundColor: "#111827",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          padding: 12,
          cornerRadius: 10
        }
      },

      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: "#475569",
            font: {
              size: 12
            }
          }
        },

        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(203, 213, 225, 0.5)"
          },
          ticks: {
            color: "#475569",
            precision: 0
          }
        }
      }
    }
  });
}
