async function getGif() {
  const gif = document.getElementById("searchInput").value;
  const url = `https://api.giphy.com/v1/gifs/random?api_key=MLLnU7hewcbovOXMhYzooC7neoCLB3qg&tag=${gif}`;

  const response = await fetch(url)
    .then(function (response) {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then(function (jsonData) {
      console.log(jsonData)
    })
    .catch(function (error) {
      console.log("There was a problem", error);
    });
}

