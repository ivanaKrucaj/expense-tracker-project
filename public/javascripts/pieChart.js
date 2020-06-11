Chart.defaults.global.legend.labels.usePointStyle = true;

window.onload = () => {
  let api_url = "http://localhost:3000/diagramsJson";
  // ("https://show-me-the-money-tracker.herokuapp.com/diagramsJson");
  reloadChart(api_url);
};

function reloadChart(api_url) {
  axios
    .get(api_url)
    .then((res) => res.data)
    .then((values) => drawChart(values));
}
const drawChart = (data) => {
  console.log(data);
  let finalData = {};
  data.transaction.forEach((d) => {
    if (!(d.category in finalData)) {
      //if the key food does not exist in the object finaldata
      finalData[d.category] = d.amount;
    }
  });
  console.log(finalData);
  let stockLabels = Object.keys(finalData); // ['food', 'travel']
  let stockPrice = Object.values(finalData); //[200, 400, 500]
  let ctx = document.getElementById("pieChart").getContext("2d");
  let chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: stockLabels,
      datasets: [
        {
          label: "Stock Chart",
          borderColor: [
            "#6aa2b2",
            "#c3d1a2",
            "#dec0c1",
            "#f2ece0",
            "#c49084",
            "#e79084",
            "#d8d8da",
            "#506a77",
            "#9fc8c0",
            "#d6b28e",
            "#c4c4c6",
          ],
          backgroundColor: [
            "#6aa2b2",
            "#c3d1a2",
            "#dec0c1",
            "#f2ece0",
            "#c49084",
            "#e79084",
            "#d8d8da",
            "#506a77",
            "#9fc8c0",
            "#d6b28e",
            "#c4c4c6",
          ],
          data: stockPrice,
          borderWidth: 3,
        },
      ],
    },
    options: {
      legend: {
        display: true,
        position: "top",
        fontSize: 16,
        labels: {
          padding: 15,
        },
      },
      layout: {
        padding: {
          top: 0,
          bottom: 0,
        },
      },
      fill: false,
    },
  });
};