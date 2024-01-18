import "./App.css";
import userService from "./services/userService";
import useUsers from "./hooks/useUsers";

function App() {
  const { comments, loading, error, setError, setComments } = useUsers();

  const deleteUser = (id: number) => {
    const deteleUser = userService.detele(id);

    const backupComment = comments;
    setComments((prev) => prev.filter((comment) => comment.id !== id));

    deteleUser.catch((err) => {
      setComments(backupComment);
      setError(err.message);
    });
  };

  const updateUser = (id: number) => {
    const backupComment = comments;

    const comment = comments.find((item) => item.id == id);

    if (!comment) {
      console.error(`Comment with id ${id} not found.`);
      return;
    }

    const updatedUser = { ...comment, name: comment.name + " !!!" };

    setComments((prevComments) =>
      prevComments.map((item) => (item.id === id ? updatedUser : item))
    );

    userService.update(id, comment).catch((err) => {
      setComments(backupComment);
      setError(err.message);
    });
  };

  const addUser = () => {
    const backupComment = comments;
    const newComment = { id: 0, name: "Sutuni MJ" };

    setComments([...comments, newComment]);

    userService.add(newComment).catch((err) => {
      setComments(backupComment);
      setError(err.message);
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-xl-12">
          <ul className="list-group">
            <button className="btn btn-primary" onClick={addUser}>
              Add
            </button>
            {error && <p className="text-danger">{error}</p>}
            {loading ? (
              <div>
                <div className="spinner-border"></div>
                Loading...
              </div>
            ) : (
              comments.map((comment, idx) => (
                <li
                  key={idx}
                  className="list-group-item d-inline-flex justify-content-between w-100 "
                >
                  {comment.name}
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      updateUser(comment.id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteUser(comment.id);
                    }}
                  >
                    X
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
