import { Navbar } from '@/widgets/Navbar';
import {useMovieStore} from "@/entities/Movie";
import styles from './MainPage.module.scss';
import {MovieCarousel} from "@/widgets/MovieCarousel/ui/MovieCarousel.tsx";
import {useEffect} from "react";
import {MovieScreening} from "@/widgets/MovieScreening/ui/MovieScreening.tsx";


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

                <div style={{padding: "10px"}}>
                    <h2 style={{padding: "10px", justifyContent: "center", display: "flex"}}
                        className={styles.additional}>Популярно сейчас</h2>
                <MovieCarousel movies={movies} />
                </div>
            )}
            <h2 style={{padding: "10px", marginLeft: "310px"}}>Ближайшие сеансы</h2>
            <MovieScreening movies={movies} />
        </div>
    )

}