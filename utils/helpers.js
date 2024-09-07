module.exports = {
  // Format date as MM/DD/YYYY
  format_date: (date) => {
    if (!(date instanceof Date)) return date; // Check if valid Date
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  },

  // Format time in a readable format
  format_time: (date) => {
    if (!(date instanceof Date)) return date; // Check if valid Date
    return date.toLocaleTimeString();
  },

  // Pluralize words if necessary (e.g., "comment" -> "comments")
  pluralize: (word, count) => {
    if (count !== 1) {
      return `${word}s`;
    }
    return word;
  },

  // Shorten a string if it's too long
  shorten: (text, length) => {
    if (text.length > length) {
      return `${text.substring(0, length)}...`;
    }
    return text;
  }
};
