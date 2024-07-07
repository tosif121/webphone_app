const useFormatPhoneNumber = () => {
  const formatPhoneNumber = value => {
    if (!value || value.includes('*') || value.includes('#')) {
      return value;
    }

    const cleanedValue = value.replace(/[^\d]/g, '');
    const length = cleanedValue.length;

    if (length < 4) {
      return cleanedValue;
    }

    if (length < 7) {
      return `${cleanedValue.slice(0, 3)} ${cleanedValue.slice(3)}`;
    }

    return `${cleanedValue.slice(0, 3)} ${cleanedValue.slice(
      3,
      6,
    )} ${cleanedValue.slice(6, 10)}`;
  };

  return formatPhoneNumber;
};

export default useFormatPhoneNumber;
