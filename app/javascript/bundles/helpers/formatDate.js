function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  // the below get methods will convert the saved UTC time into the local time
  const isToday = date.getFullYear() === now.getFullYear() &&
                  date.getMonth() === now.getMonth() &&
                  date.getDate() === now.getDate();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  if (isToday) {
    return `${hours}:${minutes}`;
  } else {
    const day = date.getDate().toString();
    const month = date.toLocaleString('en-US', { month: 'short' });
    return `${day} ${month} ${hours}:${minutes}`;
  }
}

export default formatDate;