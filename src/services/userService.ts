import createHTTP from "./httpService";

export type CommentType = {
  id: number;
  name: string;
};

export default createHTTP("/users");
