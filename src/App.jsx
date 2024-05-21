import listOfBooks from "./assets/listOfBooks";
import Book from "./components/Book";
import ReviewModal from "./components/ReviewModal";
import { useRef, useState } from "react";

if (!localStorage.getItem("comments")) {
  const comments = {};
  for (const book of listOfBooks) {
    comments[book.title] = [];
  }
  localStorage.setItem("comments", JSON.stringify(comments));
}

function App() {
  const [selectedBook, setSelectedBook] = useState({});
  const modal = useRef();

  function handleSelectBook(book) {
    setSelectedBook(book);
    modal.current.open();
  }

  return (
    <>
      <h1>My Books Reviews</h1>
      <main>
        <p>
          This is a showcase of some of my skills with React. Feel free to read
          a review by clicking on any of the book covers below. You can also
          leave your own comments that will be saved locally in your browser's
          local storage. I hope you enjoy exploring my reviews of some books
          I've read recently. Thank you for taking an interest :)
        </p>
        <p>
          Find the source code here
          <a href="https://github.com/Yolande0713/BookReviewProject" target="_blank" class="link">Source Code</a>
        </p>
        <p>
          Check out my other projects and find out more about me
          <a href="https://yolande0713.github.io/" target="_blank" class="link">Portfolio Site</a>
        </p>

        <section id="reviews">
          {listOfBooks.map((book) => (
            <Book key={book.title} book={book} selectBook={handleSelectBook} />
          ))}
        </section>

        <ReviewModal ref={modal} book={selectedBook} />
      </main>
    </>
  );
}

export default App;
