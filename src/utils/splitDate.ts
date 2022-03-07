export default function (dataStr: string) {
  const dateObj = (
    typeof dataStr === 'object'
      ? dataStr
      : new Date(dataStr)
  );
  return {
    date: dateObj.getDate(),
    month: dateObj.getMonth() + 1,
    year: dateObj.getFullYear()
  };
}
