const useCache = (duration: number) => {
  const cache: { [key: string]: { data: any; timestamp: number } } = {};

  const getCachedData = (key: string) => {
    const now = Date.now();
    const cached = cache[key];
    return cached && now - cached.timestamp < duration ? cached.data : null;
  };

  const setCacheData = (key: string, data: any) => {
    cache[key] = { data, timestamp: Date.now() };
  };

  return { getCachedData, setCacheData };
};

export default useCache;
