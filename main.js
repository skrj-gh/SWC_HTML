const apikey = 'api_key=8ebba4dfc0445b6482baee4fc4aa2090'
const baseurl = 'https://api.themoviedb.org/3';
const apiurl  = baseurl + '/discover/movie?sort_by=popularity.desc&' + apikey;
const imgurl = 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('cards');
const form = document.getElementById('form');
const search = document.getElementById('search');
const searchurl = baseurl + '/search/movie?' + apikey;

//taken from an online repo
const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

//till here


const array = new Map();
for(let i=0;i<genres.length;i++) {
    array.set(genres[i]["id"],genres[i]["name"]);
}

function getgenre(gen){
  const a=array.get(gen[0]);
  return a;
}


Movies(apiurl);

function Movies(url){
    fetch(url).then(res => res.json()).then(data => {

        showMovies(data.results);
    })
}


function showMovies(data) {

    main.innerHTML = '';

    data.forEach(movie => {
        const {title,poster_path, vote_average,genre_ids} = movie;
        const Given_movie = document.createElement('div');
        Given_movie.classList.add('mov');
        
        Given_movie.innerHTML = `
        <div class="mov1" style="background-image: url('${imgurl + poster_path}');">
            <div class="bg" id='bg'>
                <div class="cat">${getgenre(genre_ids)}</div>
                <div class="rat">${vote_average}</div>
                <div class="nameM">${title}</div>
            </div>
        </div>
        `

        main.appendChild(Given_movie);
    })
}


form.addEventListener('submit', (eventO) => {
  eventO.preventDefault();
  const searchedWord= search.value;

  if(searchedWord){
    Movies(searchurl + '&query=' + searchedWord);
  } else {
    Movies(apiurl);
  }
})