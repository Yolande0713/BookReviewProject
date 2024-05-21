import { useImperativeHandle, useRef, forwardRef, useState } from "react";

const ReviewModal = forwardRef(function ReviewModal({ book }, ref) {
  const dialog = useRef();
  const commentTextArea = useRef();
  const [currentBookComments, setCurrentBookComments] = useState([]);

  const comments = JSON.parse(localStorage.getItem("comments"));

  if (
    book.title &&
    JSON.stringify(comments[book.title]) !== JSON.stringify(currentBookComments)
  ) {
    setCurrentBookComments(comments[book.title]);
  }

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  function handleSubmitComment() {
    const text = commentTextArea.current.value.trim();
    if (text) {
      const timeStamp = (new Date).toUTCString();
      const newComment = { timeStamp: timeStamp, text: text };

      comments[book.title].push(newComment);
      localStorage.setItem("comments", JSON.stringify(comments));
      commentTextArea.current.value = "";
      setCurrentBookComments(comments[book.title]);
    }
  }

  return (
    <dialog className="review-modal" ref={dialog}>
      <form method="dialog">
        <button>Close</button>
      </form>
      <div id="book-details">
        <img src={book.image} alt={book.title + " cover"} />
        <div>
          <h2>{book.title}</h2>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <h3>Rating: {book.rating}</h3>
        </div>
      </div>

      <h3>Summary:</h3>
      <p>{book.summary}</p>

      <h3>Review:</h3>
      <p>{book.review}</p>

      <h3>My Comments</h3>
      {currentBookComments.map((comment, index) => (
        <p key={index}>
          <strong>{new Date(comment.timeStamp).toLocaleString()}</strong>: {comment.text}
        </p>
      ))}
      <div id="user-comment">
        <textarea name="comment-input" ref={commentTextArea} rows="5" cols="40"></textarea>
        <button onClick={handleSubmitComment}>Add Comment</button>
      </div>
    </dialog>
  );
});

export default ReviewModal;
