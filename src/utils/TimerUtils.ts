const debounce = (delay: number) => {
  let timerId = -1;
  return () => {
    if (timerId > -1) clearTimeout(timerId);
    return new Promise((resolve) => {
      timerId = setTimeout(resolve, delay);
    });
  };
};

export { debounce };
