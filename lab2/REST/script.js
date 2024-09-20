fetch("https://swapi.dev/api/people?page=1")
.then(function(response) {
    console.log(response.json())
})
.then(function(jsonData) {
    console.log("REST API Response - Paginated")
    console.log(jsonData)
})