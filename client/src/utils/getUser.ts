const getUser = () => {
  let user = null;

  try {
    const userString = localStorage.getItem("user");
    if (userString) {
      user = JSON.parse(userString);
    }

    return user;
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    user = null;
  }
};

export default getUser;
