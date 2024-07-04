/**
 * Convert file size to human readable format
 * @param fileSize takes bits (in a numerical format) as input
 * @returns human readable file size
 */
export const ConvertFileSize = (bits: number) => {
  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;
  const TB = GB * 1024;

  if (bits < KB) {
    return `${bits} B`;
  } else if (bits < MB) {
    return `${(bits / KB).toFixed(2)} KB`;
  } else if (bits < GB) {
    return `${(bits / MB).toFixed(2)} MB`;
  } else if (bits < TB) {
    return `${(bits / GB).toFixed(2)} GB`;
  } else {
    return `${(bits / TB).toFixed(2)} TB`;
  }
};

/**
 * Convert date to relative time
 * @param date takes a date object as input
 * @returns relative time
 */
export const RelativeTime = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
};
