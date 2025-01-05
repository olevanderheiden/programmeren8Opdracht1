document.getElementById("getJokeButton").addEventListener("click", async () => {
  const jokeRequest = document.getElementById("jokeRequest").value;
  try {
    const response = await fetch(
      `http://localhost:3000/joke?request=${encodeURIComponent(jokeRequest)}`
    );
    const data = await response.json();
    document.getElementById("joke").innerText = data.joke;
  } catch (error) {
    document.getElementById("joke").innerText = "Error fetching joke";
  }
});
