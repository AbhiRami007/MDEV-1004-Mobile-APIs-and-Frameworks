fetch("https://swapi.dev/api/people?page=1")
.then(function(response) {
    console.log(response.json())
})