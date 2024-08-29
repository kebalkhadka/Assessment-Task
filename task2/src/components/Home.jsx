import React, { useState, useEffect } from 'react';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchCalledRef = React.useRef(false); // Ref to track if fetchData has been called

  const fetchData = async () => {
    try {
      setLoading(true); // Start loading
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=882a8de2ab02bad8c607b4a64e51f81a&page=${page}`
      );
      const result = await response.json();

      const newMovies = result.results.filter(
        (newMovie) => !movies.some((movie) => movie.id === newMovie.id)
      );

      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setLoading(false); // Stop loading
    } catch (error) {
      setError('Error occurred while fetching movies.');
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (fetchCalledRef.current) return; // Prevent second fetch
    fetchCalledRef.current = true; // Mark fetch as called
    fetchData();
  }, [page]);

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
    fetchCalledRef.current = false; // Reset fetch flag for next page
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <h1 className="text-4xl font-bold text-center text-white my-8">Movie List</h1>
      {loading && <p className="text-center text-gray-400">Loading movies...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="flex flex-wrap justify-center gap-6">
        {movies.length === 0 && !loading && !error && (
          <p className="text-center text-gray-400">No movies found.</p>
        )}
        {movies.map((movie, index) => (
          <div
            key={`${movie.id}-${index}`}
            className="relative bg-gray-800 shadow-lg rounded-lg overflow-hidden w-60 transition-transform duration-300 transform hover:scale-105"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-80 object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity duration-300 p-4 text-center">
              <div>
                <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
                <p className="text-sm">Release Date: {movie.release_date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center my-8">
        <button
          onClick={loadMoreMovies}
          className="px-4 py-2 bg-[#9C00FF] text-white rounded hover:bg-[#8c3ebd] transition-colors duration-300"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Home;
