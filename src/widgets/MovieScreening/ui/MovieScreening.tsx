import type {MovieScreeningProps} from "@/widgets/MovieScreening/ui/MovieScreeningProps";
import { useSeanceStore } from "@/entities/Seance";
import { useHallStore } from "@/entities/Hall";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styles from './MovieScreening.module.scss';
import type {SeanceMockData} from "@/shared/api/mock/types.ts";



export function MovieScreening( { movies } : MovieScreeningProps ) {


    const navigate = useNavigate();

    const {
        seances,
        isLoading: isSeancesLoading,
        fetchSeances,
        selectedDateOffset,
        setSelectedDateOffset,
        setSelectedSeance
    } = useSeanceStore();

    const { fetchHalls } = useHallStore();

    useEffect(() => {
        fetchSeances();
        fetchHalls();
    }, []);

    if (!movies || movies.length === 0) {
        return <div>Загрузка сеансов...</div>
    }

    const dates = [];

    for (let i = 3; i < 7; i++){
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + i);
        dates.push(nextDate.toLocaleDateString("ru-RU"));
    }

    if (isSeancesLoading) {
        return <div>Загрузка...</div>
    }

    const activeMovies = movies.filter((movie) =>
        seances.some((seance) => seance.movieId === movie.id &&
            seance.daysOffset === selectedDateOffset)
    )

    return (
        <div className={styles.ScreeningWrapper}>
            <div className={styles.dateButtonContainer}>
                <select className={styles.selectDate} name="Сегодня" value={selectedDateOffset}
                        onChange={(e) =>
                            setSelectedDateOffset(Number(e.target.value))}>Сегодня
                    <option value="0">Сегодня</option>
                    <option value="1">Завтра</option>
                    <option value="2">Послезавтра</option>
                    {dates.map((date, index) => (
                        <option key={date} value={index + 3}>
                            {date}
                        </option>
                    ))}
                </select>
            </div>

            {activeMovies.map((movie) => {
                const filteredSeances = seances.filter((seance) =>
                    seance.movieId === movie.id && seance.daysOffset === selectedDateOffset
                );

                return (
                    <div key={movie.id} className={styles.screeningContainer}>
                        <div className={styles.screenCard}>
                            <img src={movie.poster} alt={movie.title}/>
                            <div className={styles.cardContent}>
                                <div className={styles.cardTitle}> {movie.title}</div>
                                <div className={styles.cardDescription}>{movie.description}</div>
                                <div>
                                    <div className={styles.buttonContainer}>
                                        {filteredSeances.map((seance: SeanceMockData) => (
                                            <button
                                                key={seance.id}
                                                className={styles.seanceButton}
                                                onClick={() => {
                                                    setSelectedSeance(seance);
                                                    navigate(`seances/${seance.id}`);
                                                }}
                                            >
                                                {seance.time}
                                                <br />
                                                {seance.price}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
