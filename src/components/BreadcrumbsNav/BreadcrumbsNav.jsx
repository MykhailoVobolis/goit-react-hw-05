import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";

import css from "./BreadcrumbsNav.module.css";

const breadcrumbNameMap = {
  "/": "Головна",
  "/register": "Реєстрація",
  "/login": "Вхід",
  "/watching": "Обрані фільми",
  "/search": "Пошук фільмів",
  "/movies": "Фільми",
  "/movies/best_films_week": "Найкращі фільми тижня",
  "/movies/now_playing_films": "Зараз у кіно",
  "/movies/most_popular_films": "Найбільш популярні",
  "/movies/best_rating_films": "Найкраще за рейтингом",
  "/movies/movies_by_genre": "Фільми за жанрами",
  "/movies/movies_by_company": "Фільми за компаніями",
};

export default function BreadcrumbsNav() {
  const location = useLocation();

  // Обробка шляху URL, замінюємо частину шляху та розбиваємо його на масив компонентів
  const pathnames = location.pathname
    .replace("/collection", "/movies") // Заміна collection на movies
    .split("/") // Розбиваємо рядок на масив підрядків за роздільником "/".
    .filter((x) => x); //  Фільтруємо масив, видаляючи порожні елементи.

  // Умови, за яких хлібні крихти не мають відображатися
  if (
    location.pathname === "/" || // На головній сторінці
    location.pathname === "/confirm-google-auth" || // Сторінка підтвердження Google
    /^\/movies\/\d+$/.test(location.pathname) || // Сторінка деталей фільму
    (pathnames[0] === "movies" && (pathnames[2] === "cast" || pathnames[2] === "reviews")) // Сторінки cast або reviews
  ) {
    return null; // Не рендеримо хлібні крихти
  }

  return (
    <div className={css.container}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2, mb: 2, fontSize: "16px", color: "#fafafa99" }}>
        <Link to="/" className={css.link}>
          Головна
        </Link>
        {/* Маппінг по масиву pathnames, що розбивається з location.pathname для отримання шляху. Це дозволяє динамічно створювати хлібні крихти для різних маршрутів. */}
        {pathnames.map((value, index) => {
          // Створюється поточний шлях до елемента хлібних крихт.
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          // Перевірка, чи є поточний елемент останнім в шляху (це буде активна сторінка).
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Typography key={to} sx={{ fontSize: "16px", fontWeight: "500", color: "#f7f6f1" }}>
              {breadcrumbNameMap[to] || value}
            </Typography>
          ) : (
            <Link key={to} to={to} className={css.link}>
              {breadcrumbNameMap[to] || value}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
