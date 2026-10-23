import { Link } from "react-router";
import { Carousel } from "antd";
import type { MovieCarouselProps } from "./MovieCarouselProps";
import styles from "./MovieCarousel.module.scss";

export function MovieCarousel({ movies }: MovieCarouselProps) {
    if (!movies || movies.length === 0) {
        return <div>Загрузка постеров...</div>;
    }

    return (
        <div className={styles.carouselWrapper}>
            <Carousel
                autoplay
                autoplaySpeed={2000}
                infinite={true}
                speed={500}
                centerMode={true}
                centerPadding="60px"
                slidesToShow={5}
                waitForAnimate={true}
                dots={false}
                arrows={true}
                touchMove={true}
                responsive={[
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                        },

                    },
                    {
                        breakpoint: 800,
                        settings: {
                            slidesToShow: 2,
                        }
                    }
                ]}
            >
                {movies.map((movie) => (
                    <div className={styles.carouselContainer}>
                    <div key={movie.id} className={styles.slideItem}>
                        <div className={styles.cardContent}>
                            <Link to={`/movie/${movie.id}`}>
                                <img src={movie.poster} alt={movie.title} />
                            </Link>

                            <div className={styles.movieInfo}>
                                <h3>{movie.title}</h3>
                                <span className={styles.rating}>⭐ {movie.rating.toFixed(1)}
                                    <div className={styles.description}>{movie.description}</div>
                                </span>
                            </div>
                        </div>
                    </div>
                    </div>

                ))}
            </Carousel>
        </div>
    );
}
