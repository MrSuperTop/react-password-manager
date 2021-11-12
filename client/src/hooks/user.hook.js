const useUser = () => {
  const user = JSON.parse(localStorage.getItem('userData'));

  return { user, token: user?.token };
};

export default useUser;
