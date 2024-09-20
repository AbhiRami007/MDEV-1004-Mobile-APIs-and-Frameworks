fetch("https://swapi-graphql.netlify.app/.netlify/functions/index?query={allPeople{people{id, name, birthYear, gender}}}")
.then(function(response) {
    return response.json();
})
.then(function(jsonData) {
    console.log("GraphQl Response")
    console.log(jsonData)
})
