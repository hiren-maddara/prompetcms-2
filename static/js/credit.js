import axios from "axios";

export const newCredit = async (data) => {
  const res = await axios({
    method: "GET",
    url: "http://localhost:49310/v1/credits/new",
    data,
  });

  return res;
};
