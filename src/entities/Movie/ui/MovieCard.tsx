import { Link } from "react-router";
import type { MovieMockData } from "@/shared/api";
import styles from "./MovieCard.module.scss";

interface MovieCardProps {
    movies: MovieMockData[]
}

export function MovieCard( { movies }: MovieCardProps) {
    if (!movies || movies.length === 0) {
        return <div>Загрузка фильмов...</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <div className={styles.cardContainer}>
                    <div key={movie.id}>
                        <div className={styles.movieCardContent}>
                            <Link to={`/movie/${movie.id}`}>
                                <img src={movie.poster} alt={movie.title} />
                            </Link>

                            <div className={styles.movieCardInfo}>
                                <h3>{movie.title}</h3>
                                <span className={styles.rating}>⭐ {movie.rating.toFixed(1)}
                                    <div className={styles.description}>{movie.description}</div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
        </div>
    )
}