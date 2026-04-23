CREATE TABLE movies (
    
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tittle VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255),
    create_at TIMESTAMP NOT NULL DEFAULT NOW(),
    rating NUMERIC(3,2) NOT NULL,
    sinopsis TEXT

);

CREATE TABLE genres (
    
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE

);


CREATE TABLE movie_genres(

    movie_id UUID,
    genre_id INT,

    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE,

    PRIMARY KEY(movie_id, genre_id)

);



INSERT INTO genres (name) Values ('Horror'),('Action'),('Fiction'),('Drama'),('Adventure');


INSERT INTO movies (tittle, year, director, rating, sinopsis) VALUES
    ('The Shawshank Redemption', 1994, 'Frank Darabont', 9.3, 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'),
    ('The Dark Knight', 2008, 'Christopher Nolan', 9.0, 'When the menace known as the Joker wreaks havoc and chaos on Gotham, Batman must accept one of the greatest tests.'),
    ('Inception', 2010, 'Christopher Nolan', 8.8, 'A skilled thief who steals corporate secrets through the use of dream-sharing technology.'),
    ('Pulp Fiction', 1994, 'Quentin Tarantino', 8.9, 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.'),
    ('Fight Club', 1999, 'David Fincher', 8.8, 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club.'),
    ('Forrest Gump', 1994, 'Robert Zemeckis', 8.8, 'The presidencies of Kennedy and Johnson unfold from the perspective of an Alabama man.'),
    ('The Matrix', 1999, 'Lana Wachowski, Lilly Wachowski', 8.7, 'A computer hacker learns from mysterious rebels about the true nature of his reality.'),
    ('Interstellar', 2014, 'Christopher Nolan', 8.6, 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity survival.'),
    ('The Godfather', 1972, 'Francis Ford Coppola', 9.2, 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his youngest son.'),
    ('Parasite', 2019, 'Bong Joon-ho', 8.6, 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.');