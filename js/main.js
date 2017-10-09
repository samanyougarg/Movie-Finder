$(document).ready(() => {
    $('#searchBtn').on('click', (e) => {
        var searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        var searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText){
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=fa155f635119344d33fcb84fb807649b&query=' + searchText).then((response) => {
        console.log(response);
        let movies = response.data.results;
        let output = '';
        $.each(movies, (i, movie) => {
            output += `
            <div class="col-md-3 mb-2">
                <div class="card text-center">
                    <div class="card-body">
                        <img class="card-img-top" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                        <h4 class="card-title">${movie.original_title}</h4>
                        <a onclick="movieSelected('${movie.id}')" href="#" class="btn btn-primary">RadhaKrishna</a>
                    </div>
                </div>
            </div>
            `;
        });
        $('#movies').html(output);
    }).catch((err) => {
        console.log(err);
    });
}

function movieSelected(id) {
    sessionStorage.setItem('id', id);
    window.location = 'hanuman.html';
    return false;
}

function getMovie() {
    let id = sessionStorage.getItem('id');
    axios.get('https://api.themoviedb.org/3/movie/' + id + '?api_key=fa155f635119344d33fcb84fb807649b').then((response) => {
        console.log(response);
        let movie = response.data;
        let output = `
            <div class="row mb-5">
                <div class="col-md-4">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.original_title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0]['name']}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
                        <li class="list-group-item"><strong>Rating:</strong> ${movie.vote_average}</li>
                        <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime}</li>
                </div>
            </div>
            <div class="row">
                <div class="card text-center">
                    <div class="card-body">
                        <h4>Plot</h4>
                        ${movie.overview}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-warning">View on IMDB</a>
                        <a href="radhakrishna.html" class="btn btn-outline-primary">Go Back to Search</a>
                    </div>
                </div>
            </div>
        `;
        $('#movie').html(output);
    }).catch((err) => {
        console.log(err);
    });
}
