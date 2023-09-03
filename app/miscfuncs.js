import axios from "axios";

export const capitalizeFirstLetter = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const fetchUserById = async (userId) => {
  let token = localStorage.getItem("jwtoken");
  let reqUrl = `http://localhost:8080/getuserbyid/${userId}`;
  let user = {};
  await axios
    .get(reqUrl, {
      headers: {
        Authorization: token,
      },
    })
    .then((resp) => {
      user = resp.data.user;
    })
    .catch((err) => {});

  return user;
};
