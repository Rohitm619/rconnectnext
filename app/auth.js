import axios from "axios";

export const auth = async () => {
  let authData;
  const token = localStorage.getItem("jwtoken");
  if (!token) return false;
  else {
    await axios
      .get(`http://localhost:8080/getuser`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        authData = { error: false, data: response.data };
      })
      .catch((error) => {
        authData = { data: false, error: error };
      });
  }

  return authData;
};

export const updateUser = async (id, updatedData) => {
  let authData;
  const token = localStorage.getItem("jwtoken");
  if (!token) return false;
  else {
    await axios
      .patch(`http://localhost:8080/updateuser/${id}`, updatedData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        authData = { error: false, data: response.data };
      })
      .catch((error) => {
        console.log(error);
        authData = { data: false, error: error };
      });
  }

  return authData;
};
