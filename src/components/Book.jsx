
export default function Book({ book, selectBook }) {
  return (
    <div className="review">
      <img
        src={book.image}
        alt={book.title + " cover"}
        onClick={() => selectBook(book)}
      />
    </div>
  );
}
