import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import userService, { CommentType } from "../services/userService";

const useUsers = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    const { req, cancel } = userService.getAll<CommentType>();

    req
      .then((res) => {
        setComments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { comments, loading, error, setError, setComments };
};

export default useUsers;
