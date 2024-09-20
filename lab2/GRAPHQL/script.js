fetch("https://swapi-graphql.netlify.app/.netlify/functions/index?query={allPeople{people{id, name, birthYear, gender}}}")
.then(function(response) {
    console.log(response.json())
})

