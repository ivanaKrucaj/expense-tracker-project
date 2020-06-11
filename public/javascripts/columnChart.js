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
      finalData[d.category] = d.amount;
    }
  });
  console.log(finalData);
  let stockLabels = Object.keys(finalData);
  let stockPrice = Object.values(finalData);
  let ctx = document.getElementById("myChart").getContext("2d");
  let myColumnChart = new ColumnChart(ctx, {
  type: "Column",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  datasets: [
  {
    label: 'my second data set',
    fill: true,
    backgroundColor = 'rgba(0, 0, 0, 0.1)',
    borderCapStyle='butt',
    borderColor	='rgba(75, 72, 192, 1)',
    borderDash=	[],
    borderDashOffset=	0.0,
    borderJoinStyle='miter',
    pointBorderColor="rgba(75, 72, 192, 1)",
    pointBackgroundColor="#fff",
    pointBorderWidth=1,
    pointHoverBackgroundColor="rgba(75, 72, 192, 1)",
    pointHoverBorderColor= "rgba(220, 220, 220, 1)",
    pointHoverBorderWidth	=2,
    pointHoverRadius=5,
    pointRadius=1,
    pointHitRadius=10,
    data: [65, 59, 80, 81, 56, 55, 40],
  }
  ]},
  options: {
    legend: {
      display: true,
      position: "bottom",
      fontSize: 16,
      labels: {
        padding: 15,
      },
    },
    layout: {
      padding: {
        top: 0,
        bottom: 30,
      },
    },
    fill: false,
  }})
  }
