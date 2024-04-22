import { useState, MouseEvent } from "react";
import "./pagination.scss";

type Props = {
  setOffset: (offset: number) => void;
  offset: number;
  totalResults: number;
};

function Pagination({ setOffset, offset, totalResults }: Props) {
  const [counter, setCounter] = useState<number>(1);
  const pagesAmount = Math.ceil(totalResults / 6);

  const moveToPage = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const buttonElement = e.target as HTMLButtonElement;
    const buttonValue = buttonElement.innerHTML;

    if (offset === 0 && buttonValue === "Next") {
      setOffset(offset + 6);
      setCounter(counter + 1);
    } else if (offset != 0 && offset != 900) {
      if (buttonValue === "Prev.") {
        setOffset(offset - 6);
        setCounter(counter - 1);
      } else {
        setOffset(offset + 6);
        setCounter(counter + 1);
      }
    } else if (offset === 900 && buttonValue === "Prev.") {
      setOffset(offset - 6);
      setCounter(counter - 1);
    }
  };

  return (
    <section className="recipe-pagination-section">
      <button
        disabled={counter === 1 ? true : false}
        className="pagination-button"
        onClick={moveToPage}
      >
        Prev.
      </button>
      <span className="recipe-pagination-section__pages-span">
        <strong>
          Page: {counter}/{pagesAmount}
        </strong>
      </span>
      <button
        disabled={counter === pagesAmount ? true : false}
        className="pagination-button"
        onClick={moveToPage}
      >
        Next
      </button>
    </section>
  );
}

export default Pagination;
