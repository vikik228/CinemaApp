import { http, HttpResponse } from "msw";
import { STORAGE_KEYS } from '../../config/storage';
import {mockHall, mockMovie, mockSeance} from "./data";
import type { MockUser } from "./types";

export const handlers = [

    http.get('/api/halls', () => {
        return HttpResponse.json(mockHall);
    }),

    http.get('/api/seances', () => {
        return HttpResponse.json(mockSeance);
    }),

    http.get('/api/movies', () => {
       return HttpResponse.json(mockMovie);
    }),

    http.get('/movie/:id', ({ params }) => {
        const { id } = params;

        const movie = mockMovie.find((item) => item.id === Number(id));

        if (!movie) {
            return new HttpResponse(
                JSON.stringify({ message: "Фильм не найден" }),
                {status: 404},
            );
        }
        return HttpResponse.json(movie);
    }),
    http.post('/register', async ({ request }) => {
        const newUser = await request.json() as Omit<MockUser, 'id'>;
        const rawData = localStorage.getItem(STORAGE_KEYS.USERS_DB);
        const users: MockUser[] = rawData ? JSON.parse(rawData) : [];

        const isEmailTaken = users.some((user) =>
            user.email?.toLowerCase() === newUser.email?.toLowerCase());
        const isLoginTaken = users.some((user) =>
            user.login?.toLowerCase() === newUser.login?.toLowerCase());

        if (isEmailTaken) {
            return new HttpResponse(
                JSON.stringify({ message: "Пользователь с такой почтой уже существует!" }),
                { status: 400 },
            );
        }
        if (isLoginTaken) {
            return new HttpResponse(
                JSON.stringify({ message: "Пользователь с таким логином уже сущесвтует"}),
                { status: 400 },
            );
        }
        const userToSave: MockUser = {
            id: Date.now(),
            ...newUser,
        };

        users.push(userToSave);
        localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));

        return HttpResponse.json({
            success: true,
            message: "Успешная регистрация",
            user: {
                id: userToSave.id,
                login: userToSave.login,
                email: userToSave.email,
            }
        }, { status: 201});

}),
    http.post('/cart', async ({ request }) => {
        const { movieId } = await request.json() as { movieId: number };
        const rawCart = localStorage.getItem(STORAGE_KEYS.TEMPORARY_CART);
        const cart = rawCart ? JSON.parse(rawCart) : [];
        cart.push(movieId);
        localStorage.setItem(STORAGE_KEYS.TEMPORARY_CART, JSON.stringify(cart));
        return HttpResponse.json({success: true, message: "Успешное добавление в корзину"});
    }),
    http.post('/login', async ({ request }) => {
        const { email, password } = await request.json() as Pick<MockUser, 'email' | 'password'>;
        const rawData = localStorage.getItem(STORAGE_KEYS.USERS_DB);
        const users: MockUser[] = rawData ? JSON.parse(rawData) : [];
        const foundUser = users.find((user) => user.email === email && user.password === password);
        if (!foundUser) {
            return new HttpResponse(
                JSON.stringify({ message: "Неверный логин или пароль!" }),
                { status: 400 },
            );
        }
        const Token = `Token ${foundUser.email}`;
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, Token);

        return HttpResponse.json({
            success: true,
            token: Token,
            user: {
                id: foundUser.id,
                login: foundUser.login,
                email: foundUser.email,
            }
        })

    })
];
