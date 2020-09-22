$(document).ready( () => {  
  function getMovie() {
    let movieID = sessionStorage.getItem("id");

    axios.get(`https://www.omdbapi.com/?i=${movieID}&apikey=2beaef32`)
      .then(result => {
        let movie = result.data;
        let movieYear = movie.Year; //remove extra hypen on Year;
        let output = `
        <div class="col-md-4 text-center">
          <img class="box-shadow" src="${movie.Poster == 'N/A' ? './images/no-image.jpg' : movie.Poster}" alt="${movie.Title}">
        </div>
        <div class="col-md-8">
          <h1 class="mb-4">${movie.Title}</h1>
          <h5 class="mb-1">${movieYear.length > 5 ? movieYear : movieYear.replace(/–/g, "")}</h5>
          <h5 class="mb-4">${movie.Genre}</h5>
          <p><i class="fas fa-star"></i> ${movie.Ratings[0].Value}</p>
          <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank"><img src="./images/logo-imdb.svg" alt="imdb"></a>
          <h5 class="mt-5">Plot:</h5>
          <p class="mb-5"><em>${movie.Plot}</em></p>

          <p class="mb-0"><strong>Cast: </strong>${movie.Actors}</p>
          <p><strong>Director:</strong> ${movie.Director}</p>
        </div>
        `;

        $('#movie').html(output);
        document.title = `Movie - ${movie.Title}`; 

        })
      .catch(err => {
        console.log(err);
      })
  }

  // $('.logo').on('click', ()=> {
  //   sessionStorage.clear();
  // })

  getMovie();

});