document.addEventListener('DOMContentLoaded', function () {
    //test data
    var heartRateData = [70, 72, 68, 74, 76, 73, 70, 71];
    var oxygenLevelData = [98, 97, 99, 95, 96, 97, 98, 99];
    var timeLabels = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

    var heartRateChartCtx = document.getElementById('heartRateChart').getContext('2d');
    var oxygenLevelChartCtx = document.getElementById('oxygenLevelChart').getContext('2d');
    var heartRateChart = new Chart(heartRateChartCtx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Heart Rate (bpm)',
                data: heartRateData,
                backgroundColor: 'rgba(255, 100, 130, 0.3)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1 }]},
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
    var oxygenLevelChart = new Chart(oxygenLevelChartCtx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Blood Oxygen Saturation Level (%)',
                data: oxygenLevelData,
                backgroundColor: 'rgba(50, 155, 230, 0.3)',
                borderColor: 'rgba(50, 155, 230, 1)',
                borderWidth: 1
            }]},
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });

    document.getElementById('submit').addEventListener('click', function() {
        var selectedDate = document.getElementById('dateRangePicker').value;
        var startTime = document.getElementById('timeRangeStart').value;
        var endTime = document.getElementById('timeRangeEnd').value;
        var frequency = document.getElementById('frequencySelector').value;

        console.log('Update charts for', selectedDate, startTime, endTime, 'with frequency', frequency);
    });
});
