async function main() {
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    const result = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=e087739579484b10b235fd385e32b2ef');
    const data = await result.json();
    //console.log(data)

    //let GME = data.GME
    //let MSFT = data.MSFT
    //let DIS = data.DIS
    //let BNTX = data.BTNX
    
    const {GME, MSFT, DIS, BNTX} = mockData;
    
    const stocks = [GME, MSFT, DIS, BNTX];
    

    // Bonus Note: 
    // Another way to write the above lines would to refactor it as:
   // const {GME, MSFT, DIS, BTNX} = result 
    // This is an example of "destructuring" an object
    // "Destructuring" creates new variables from an object or an array

    stocks.forEach(stock => stock.values.reverse())
    // Time Chart
    new Chart(timeChartCanvas.getContext('2d'), {
    type: 'line',
    data: {
        labels: stocks[0].values.reverse().map(value => value.datetime),
        datasets: stocks.map(stock => ({
            label: stock.meta.symbol,
            data: stock.values.map(value => parseFloat(value.high)),
            backgroundColor: getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(value => value.meta.symbol),
            datasets: [{
                label: 'highest',
                data: stocks.map(value => Highest(value)),
                backgroundColor: stocks.map(value=>getColor(value.meta.symbol)),
                borderColor: stocks.map(value=>getColor(value.meta.symbol)),
            }]
        
        }
    });
    
    function Highest(stock) {
        let highest = 0
        let days = stock.values.map(value => parseFloat(value.high))
        days.forEach(dayValue => {
            if (dayValue >= highest) {
                highest = dayValue
            } else {
                highest = highest
            }

        })
        return highest
    }
    
    function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
    }
    console.log(Chart)
}
main()