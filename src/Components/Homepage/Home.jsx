import React, { useEffect, useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import Button from "@mui/material/Button";
import "./Home.css";
import Header from "../Header/Header";
import { Box, styled } from "@mui/material";

const Wrapper = styled(Box)`
  position: relative;
  top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Trailerbutton = styled(Button)`
  width: 95%;
  display: flex;
  margin: auto;
  margin-bottom: 5px;
`;

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState("all");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const languages = ["kannada", "telugu", "english", "tamil"];
        const promises = languages.map(async (language) => {
          let requestBody = {
            category: "movies",
            language,
            genre: "all",
            sort: sortOption,
          };

          if (sortOption === "all") {
            delete requestBody.sort;
          }

          const response = await fetch("https://hoblist.com/api/movieList", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          });

          if (response.ok) {
            const data = await response.json();
            return data.result;
          } else {
            throw new Error(`Failed to fetch ${language} movies`);
          }
        });

        const results = await Promise.all(promises);
        const combinedMovies = results.reduce(
          (acc, movies) => [...acc, ...movies],
          []
        );
        setMovies(combinedMovies);
      } catch (error) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [sortOption]);

  return (
    <>
      <Header />
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <Wrapper>
            {movies.map((movie) => (
              <div key={movie._id} className="overall_card">
                <div className="card_component">
                  <div className="card_left_side">
                    <div className="votes">
                      <IoMdArrowDropup
                        style={{ height: "20px", width: "20px" }}
                      />
                      <p>{movie.voting}</p>
                      <IoMdArrowDropdown
                        style={{ height: "20px", width: "20px" }}
                      />
                      <p>Votes</p>
                    </div>
                    <div className="card_image">
                      <img src={movie.poster} alt={movie.title} />
                    </div>
                  </div>
                  <div className="card_details card_right_side">
                    <h3>{movie.title}</h3>
                    <div className="details">
                      <p>Genre: {movie.genre}</p>
                      <p>Director: {movie.director}</p>
                      <p>Starring: {movie.stars}</p>
                      <p>
                        {movie.duration} Mins | {movie.language} |{" "}
                        {movie.release_date}
                      </p>
                      <p>
                        {movie.voting} Votes | voted by {movie.totalVoted}
                      </p>
                    </div>
                  </div>
                </div>
                <Trailerbutton
                  variant="contained"
                  className="watch_trailer_btn"
                >
                  Watch Trailer
                </Trailerbutton>
              </div>
            ))}
          </Wrapper>
        )}
      </div>
    </>
  );
}

export default Home;
