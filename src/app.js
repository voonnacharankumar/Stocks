$("#myBtn").click(function(){
    var s = $("#myInput").val();
    help(s);
});


function help(key){
    var URL="https://live-stock-market.p.rapidapi.com/yahoo-finance/v1/chart?symbol=" + key + "&interval=1d&range=1mo";

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": URL,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "live-stock-market.p.rapidapi.com",
            "x-rapidapi-key": "e0c9f0c8dbmsh56d6c97d4306a28p1a16b8jsn05c16a6c84b2"
        }
    };
    
    $.ajax(settings).done(function (response) {
        const r=JSON.parse(response);
        var data1=r.data.chart.result[0].indicators.quote[0].close;
        var data2=r.data.chart.result[0].indicators.quote[0].open;
        var data3=r.data.chart.result[0].indicators.quote[0].low;
        var data4=r.data.chart.result[0].indicators.quote[0].high;
        var title=r.data.chart.result[0].meta.symbol;
        var time=r.data.chart.result[0].timestamp;
        Mychart(data1,data2,data3,data4,title,time);
    });
}
function Mychart(data1,data2,data3,data4,title,time){
    let today = new Date();
   var xValues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];let j=0;
   for(let i=18;i>=0;i--){
    let priorDate = new Date(new Date().setDate(today.getDate() - j)).toISOString();
       xValues[i]=priorDate.substring(0,10);
       xValues[i]=xValues[i][8]+xValues[i][9]+"-"+xValues[i][5]+xValues[i][6]+"-"+xValues[i].substring(0,4);
       j++;
   }
    
    new Chart("myChart", {
    type: "line",
    data: {
        labels: xValues,
        datasets: [{
        label:'high',
        fill: false,
        lineTension: 0.2,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "red",
        data: data4
        }, {    
         label:'open',
        fill: false,
        lineTension: 0.2,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "green",
        data: data2
        }, {
        label:'low',
        fill: false,
        lineTension: 0.2,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "blue",
        data: data3
        },{
        label:'close',
        fill: false,
        lineTension: 0.2,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "yellow",
        data: data1
        }]
    },
    
    options: {
        legend: {display:true},
        scales: {
         yAxes: [{ticks: {min: Math.min(...data1)-20, max: Math.max(...data1)+100}}],
        },
        title: {
            fontSize:30,
            display: true,
            fontColor: "green",
            text: title
        }
    }
    });
}
