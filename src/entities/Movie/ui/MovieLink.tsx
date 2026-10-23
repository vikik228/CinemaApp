import { Link } from "react-router";
import type { MovieMockData } from "@/shared/api";
import styles from "./MovieLink.module.scss";

interface MovieLinkProps {
    movie: MovieMockData;
}

export function MovieLink({ movie }: MovieLinkProps) {
    return (
        <Link to={`/movie/${movie.id}`} className={styles.link}>
            <img src={movie.poster} alt={movie.title} />
            <h2>{movie.title}</h2>
            <span>{movie.rating.toFixed(1)}⭐</span>
            <div>{movie.description}</div>
        </Link>
    );
}