import { PaginationItem } from "@mui/material";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useMedia } from "react-use";

import Pagination from "@mui/material/Pagination";

import css from "./MoviesPagination.module.css";

export default function MoviesPagination({ page, totalPages, handlePageChange }) {
  const isMobile = useMedia("(max-width: 767px)");

  const limitedTotalPages = Math.min(totalPages, 500);

  return (
    <div className={css.paginationWrapper}>
      <Pagination
        count={limitedTotalPages}
        page={page}
        onChange={handlePageChange} // Обробник зміни сторінки
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: MdKeyboardArrowLeft,
              next: MdKeyboardArrowRight,
              first: MdKeyboardDoubleArrowLeft,
              last: MdKeyboardDoubleArrowRight,
            }}
            {...item}
          />
        )}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
        siblingCount={isMobile ? 0 : 1}
        sx={{
          // Стилізація всіх єлементів
          "& .MuiPaginationItem-root": {
            margin: isMobile ? "0 2px" : "0 5px", // Змінює горизонтальний проміжок між елементами
            width: "32px",
            height: "32px",
            fontSize: "14px",
            fontWeight: "600",
            fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
            color: "#fafafa99",
            border: "none",
            borderRadius: "100px",
            "&:hover": {
              color: "#fec90c",
            },
            // Стилізація активного, обраного елемента
            "&.Mui-selected": {
              backgroundColor: "#fec90c",
              color: "#431f05",
              border: "none",
              "&:hover": {
                // Задаємо відсутність зміни стилів на ховер для активного елемента
                backgroundColor: "#fec90c",
                border: "none",
              },
            },
          },
          // Стилізація тексту "..."
          "& .MuiPaginationItem-ellipsis": {
            color: "#fafafa99",
            border: "none",
            padding: "6px 8px",
            margin: "0 5px",
            fontSize: "14px",
            fontWeight: "600",
            "&:hover": {
              color: "#fafafa99",
            },
          },
        }}
      />
    </div>
  );
}
