import axios from 'axios';

const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = process.env.REACT_APP_API_KEY

interface Movie {
      backdrop_path: string,
      id: number,
      title: string
}

interface Genre {
  id: number;
  name: string;
}

export interface GetMovieDetail extends Movie {
    adult: boolean,
    runtime: number,
    overview: string,
    poster_path: string,
    release_date: string,
    genres: Genre[]
}

interface TV {
      backdrop_path: string,
      id: number,
      name: string
}

export interface GetTVDetail extends TV {
    adult: boolean,
    number_of_seasons: number,
    overview: string,
    poster_path: string,
    first_air_date: string
    genres: Genre[]
}

export interface GetMovieResults {
  results: Movie[];
}

export interface GetTVResults {
  results: TV[];
}

export const getMovieUpcoming = async (page: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}&language=ko-KR`
    );
    return response.data;
  } catch (error) {
    alert("Error fetching upcoming movies.");
  }
};

export const getMovieTrend = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    alert("Error fetching trend movies.");
  }
};

export const getMoviePopular = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    alert("Error fetching popular movies.");
  }
};

export const getMovieDetail = async (id: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`
    );
    return response.data;
  } catch (error) {
    alert("Error fetching top rated movies.");
  }
};

export const getMovieTopRated = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    alert("Error fetching top rated movies.");
  }
};

export const getMovieSearch = async (query: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}}&language=ko-KR`
    );
    if (Array.isArray(response.data.results)) {
      const filteredData = response.data.results.filter((item: TV) => item.backdrop_path !== null);
      response.data.results = filteredData;
    }    
    return response.data;
  } catch (error) {
    alert("Error fetching search movies.");
  }
};

export const getTVTrend = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    alert("Error fetching trend series.");
  }
};

export const getTVPopular = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tv/popular?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    alert("Error fetching popular series.");
  }
};

export const getTVTopRated = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    alert("Error fetching top rated series.");
  }
};

export const getTVDetail = async (id: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=ko-KR`
    );
    if (Array.isArray(response.data.results)) {
      const filteredData = response.data.results.filter((item: TV) => item.backdrop_path !== null);
      response.data.results = filteredData;
    }
    return response.data;
  } catch (error) {
    alert("Error fetching detail series.");
  }
};

export const getTVSearch = async (query: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}&language=ko-KR`
    );
    if (Array.isArray(response.data.results)) {
      const filteredData = response.data.results.filter((item: TV) => item.backdrop_path !== null);
      response.data.results = filteredData;
    }
    return response.data;
  } catch (error) {
    alert("Error fetching search series.");
  }
};