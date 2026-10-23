import {MovieCard} from "@/entities/Movie";
import {useMovieStore} from "@/entities/Movie";
import {useEffect} from "react";
import {Navbar} from "@/widgets/Navbar";
import styles from './CatalogPage.module.scss';

export function CatalogPage() {

    const { movies, isLoading, fetchMovies } = useMovieStore();
    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return(
        <div>
            { isLoading ? <div>Загрузка...</div> :
                <div >
                    <Navbar/>
                    <div className={styles.cardContent}>
                        <div className={styles.catalogCard}>
                            <MovieCard movies={movies}/>
                        </div>
                    </div>
                </div>


            }

        </div>
    );
}