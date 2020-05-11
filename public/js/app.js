
document.getElementById('inputForm').addEventListener('submit', performWeatherRequest);
function performWeatherRequest(e) {
    let resultElement = document.getElementById('postResult');
    resultElement.innerHTML = '';
    let location = document.getElementById('Location').value;
    axios.post('http://localhost:3000/get_weather', {
        Location: location,
    })
        .then(function (response) {
            resultElement.innerHTML = generateSuccessHTMLOutput(response);
        })
        .catch(function (error) {
            resultElement.innerHTML = generateErrorHTMLOutput(error);
        });

    e.preventDefault();

}

function generateSuccessHTMLOutput(response) {
    return '<h4>Result:</h4>' +
        '<h5></h5>' +
        '<pre>' + JSON.stringify(response.data, null, '\t') + '</pre>';
}
function generateErrorHTMLOutput(error) {
    return '<h4>Result</h4>' +
        '<h5>Message:</h5> ' +
        '<pre>' + error.message + '</pre>' +
        '<h5>Status:</h5> ' +
        '<pre>' + error.response.status + ' ' + error.response.statusText + '</pre>' +
        '<h5>Headers:</h5>' +
        '<pre>' + JSON.stringify(error.response.headers, null, '\t') + '</pre>' +
        '<h5>Data:</h5>' +
        '<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>';
}