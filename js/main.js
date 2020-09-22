
$(document).ready( () => {

  var path = window.location.pathname;
  var page = path.split("/").pop();
console.log(page);

  // sessionStorage.clear();

  $("#search-form").on('submit', (event) => {
    event.preventDefault();

    let searchText= $("#search-text").val();


    $('.search-title').html(`Most Relevant Movie Results: "<span>${searchText}</span>" `);
    getMovies(searchText);

    // store searach value in session when you're in movie.html page if not it will destroy the session
    if(page === "movie.html") {
      window.location = "/";
      sessionStorage.setItem("search", searchText);
    } else {
      sessionStorage.clear();
    }

  }); 


  function getMovies(searchText) {
    axios.get(`https://www.omdbapi.com/?s=${searchText}&apikey=2beaef32`)
      .then(result => {
        let movies = result.data.Search;
        let totalResult = result.data.totalResults;
        let output = '';
        let errorMsg = '';

        errorMsg += `
           <div class="error">
            <div class="error-title"><i class="fas fa-exclamation-triangle"></i> Error</div>
            <div class="error-msg">
              <p>${result.data.Error}</p>
              <button class="error-btn">OK</button>
            </div>
          </div>
        `;
       

        $.each(movies, (index, movie) => {
        let movieYear = movie.Year; //remove extra hypen from Year;

        output += `
        <div class="col-lg-3 col-md-4 col-6">
        <div class="card text-center">
        <a onclick="movieSelected('${movie.imdbID}')" href="#">
        <div class="img-box"><img src='${movie.Poster === 'N/A' || movie.Poster === ''? './images/no-image.jpg' : movie.Poster}' class="card-img-top" alt='${movie.Title}'></div>
        <div class="card-body">
        <h5 class="card-title">${movie.Title}</h5>
        <p class="card-text">${ movieYear.length > 5 ? movieYear : movieYear.replace(/–/g, "")}</p>
        </div>
        </a>
        </div>
        </div>
        `;
      });
      
      if(result.data.Response === "False") {
        $('.total-result').html('Result  0');
        $('#movies').html(errorMsg);
        $(".error-btn").click(function(){
          $(".error").fadeOut();
        });
      } 
      else {
          $('.total-result').html(`Showing 1-${movies.length} of ${totalResult}`); // Total Search Result;
          $('#movies').html(output);
      }


      }).catch(err => {
        console.log(err);
      });
  }

let movieSearch = sessionStorage.getItem("search");
let searchInputField = $('#search-text');
searchInputField.val(movieSearch);
$('.search-title').html(movieSearch === null ? '' : `Most Relevant Movie Results: "<span>${movieSearch}</span>" `);
getMovies(searchInputField.val() === "" || searchInputField.val() === null ? "2020" : movieSearch );


// x----------------------------- #MOVIE.html ----------------------------------------------------------------------x


  window.movieSelected = function (movieID) {
    // store data and pass data to other page
    sessionStorage.setItem("id", movieID);
    window.location = "movie.html";
    return false;
  }


});