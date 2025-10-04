import axios from "axios";

export const getData = async () => {
  const res = await axios.get("/api/data");
  return res.data;
};
