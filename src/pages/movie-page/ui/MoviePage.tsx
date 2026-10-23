import { useMovieStore } from "@/entities/Movie";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Navbar } from "@/widgets/Navbar";
import { useNavigate } from "react-router";
import styles from "./MoviePage.module.scss";

export function  MoviePage() {

    const navigate = useNavigate();

    const { id } = useParams();
    const movieId = Number(id);

    const { movies, isLoading, fetchMovies } = useMovieStore();
    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    const movie = movies.find(movie => movie.id === movieId);

    if (!movie) {
        return <div>Фильмы не найдены</div>
    }

    return (
        <div>
            {isLoading ? <div>Загрузка...</div> : (
                <div>
                    <Navbar />
                    <div className={styles.movieContainer}>
                        <div className={styles.movieCard}>
                            <h1 className={styles.movieTitle}>{movie.title}</h1>
                            <img className={styles.moviePoster} src={movie.poster} alt={movie.title}/>
                            <span >
                                <div className={styles.rating}>{movie.rating.toFixed(1)}⭐</div>
                                <div className={styles.description}>{movie.description}</div>
                            </span>
                            <button
                                className={styles.seanceButton}
                                onClick={() => {navigate(`/`)}}
                            >
                                посмотреть сеансы</button>
                        </div>
                    </div>
                </div>
                )
            }

        </div>
    )
}