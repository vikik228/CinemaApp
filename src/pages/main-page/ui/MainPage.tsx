import { Navbar } from '@/widgets/Navbar';
import { useMovieStore } from "@/entities/Movie";
import { MovieCarousel } from "@/widgets/MovieCarousel";
import { useEffect } from "react";
import { MovieScreening } from "@/widgets/MovieScreening";
import styles from './MainPage.module.scss';

export function MainPage() {

    const { movies, isLoading, fetchMovies } = useMovieStore();

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return (
        <div className={styles.pageWrapper}>
            <Navbar />
            {isLoading ? (
                <div>Загрузка постеров...</div>
            ) : (

                <div className={styles.pad}>
                    <h2 className={styles.PopularText}>Популярно сейчас</h2>
                <MovieCarousel movies={movies} />
                </div>
            )}
            <h2 className={styles.closeText}>Ближайшие сеансы</h2>
            <MovieScreening movies={movies} />
        </div>
    )

}