---
title: "Movie recommendation system"
description: "Building a simple command-line movie recommendation system with Python, the themoviedb API, and tree data structures."
pubDate: 2022-01-09
heroImage: /images/movie-rec-sys.jpg
heroImageAlt: "empty cinema"
heroImageCredit: "Felix Mooneeram"
heroImageCreditUrl: "https://unsplash.com/photos/evlkOfkQ5rE"
tags: ["python", "data structures", "projects"]
---

I want to improve my algorithm and data structure knowledge, so I created a simple movie recommendation system using the command line and if/else logic.

In this post, I'll walk you through a sample project you can build for your portfolio — and as an idea of how to use data structures like trees and hashmaps. The key intention is to create simple projects that highlight your skills.

The main focus of this post:

1. Using an API for data
2. Data structures like tree nodes
3. The command prompt

## Fetching the data

The project uses [themoviedb](https://developers.themoviedb.org/3/movies/get-movie-details) API to fetch data for 20 movies per genre. You can generate an API key after creating an account on [themoviedb](https://www.themoviedb.org/).

With the `json` and `requests` libraries:

```python
genres = requests.get(
    f"https://api.themoviedb.org/3/genre/movie/list?api_key={api_key}&language=en-US"
)
genre_data = genres.json()
```

The API data looks like the following:

```json
{"genres": [{"id": 28, "name": "Action"},
            {"id": 12, "name": "Adventure"},
            {"id": 16, "name": "Animation"},
            {"id": 35, "name": "Comedy"},
            {"id": 80, "name": "Crime"},
            {"id": 99, "name": "Documentary"},
            {"id": 18, "name": "Drama"},
            {"id": 10751, "name": "Family"},
            {"id": 14, "name": "Fantasy"},
            {"id": 36, "name": "History"},
            {"id": 27, "name": "Horror"},
            {"id": 10402, "name": "Music"},
            {"id": 9648, "name": "Mystery"},
            {"id": 10749, "name": "Romance"},
            {"id": 878, "name": "Science Fiction"},
            {"id": 10770, "name": "TV Movie"},
            {"id": 53, "name": "Thriller"},
            {"id": 10752, "name": "War"},
            {"id": 37, "name": "Western"}]}
```

Through the API we get all available genres. Next, we use the genres to collect 20 movies from each genre.

```python
data = []
for genre in genre_name:
    r = requests.get(
        f"https://api.themoviedb.org/3/discover/movie?api_key={api_key}"
        f"&language=en-US&sort_by=popularity.desc&include_adult=false"
        f"&include_video=false&page=1&with_genres={genre}"
        f"&with_watch_monetization_types=flatrate"
    )
    movie_data = r.json()

    for i in movie_data["results"]:
        movie_temp = []
        movie = [i["title"], i["vote_average"], i["release_date"],
                 i["popularity"], i["overview"], genre]
        movie_temp.append(movie)
        data += movie_temp
```

`genre_name` is a list containing all genres. We iterate over each genre and query the API for it, then iterate over the results and append each movie to `data`. The resulting list of lists looks like:

```python
[["Spider-Man: No Way Home", 8.6, "2021-12-15", 20686.826,
  "Peter Parker is unmasked and no longer able to separate…", "Action"],
 ["Venom: Let There Be Carnage", 7.2, "2021-09-30", 7992.617,
  "After finding a host body in investigative reporter Eddie Brock,…", "Action"]]
```

## Building the tree

After getting the data and saving it in `video_data.py`, we create a simple `TreeNode` class as the data structure for the project. The tree is simple: a start node and one node per genre. Each genre node holds 20 movies, which adds up to 380 nodes across the 19 genres.

## The user interaction

The last step is the user input. There are several ways to select a movie: a number from 1–19, or typing the genre name into the command line.

The user is then asked whether they want to see movies from the selected genre, and prompted for the number of recommendations. In the end, the user can get another recommendation or quit the system.

---

Thanks for your time — have fun exploring the [GitHub repository](https://github.com/Lukas-Forst/Movie_rec_sys), feedback of any sort is welcome.

Cover image by [Felix Mooneeram](https://unsplash.com/photos/evlkOfkQ5rE) on [Unsplash](https://unsplash.com).