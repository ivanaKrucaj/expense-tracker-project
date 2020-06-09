
window.onload = () => {
    let api_url = 'http://localhost:3000/diagramsJson';
    reloadChart(api_url);
  };

  function reloadChart(api_url) {
    axios
      .get(api_url)
      .then(res => res.data)
      .then(values => drawChart(values));
  }
  const drawChart = data => {
    console.log(data)  
    let finalData = {} 
    data.transaction.forEach((d) => {
        if (!(d.category in finalData)) {
            finalData[d.category] = d.amount
        } 
    })
    console.log(finalData)
    let stockLabels = Object.keys(finalData);
    let stockPrice = Object.values(finalData);
    let ctx = document.getElementById("pieChart").getContext("2d");
    let chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: stockLabels,
        datasets: [
          {
            label: "Stock Chart",
            borderColor: "#FFAE00",
            backgroundColor: ['#5cb85c', '#D74B4B', '#6685a4', '#f0ad4e', '#5bc0de', '#EE82EE'],
            data: stockPrice
          }
        ],
        options: {
          fill: false
        }
      }
    });
  };

