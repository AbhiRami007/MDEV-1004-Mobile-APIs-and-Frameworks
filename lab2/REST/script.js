fetch("https://swapi.dev/api/people?page=1")
.then(function(response) {
    return response.json()
})
.then(function(jsonData) {
    console.log("REST API Response - Paginated")
    console.log(jsonData)
})