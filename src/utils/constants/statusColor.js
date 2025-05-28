export const statusColors = {
  error: "var(--error)",
  inactive: "var(--inactive)",
  success: "var(--success)",
};

export function determineColor(statusCode) {
  if (statusCode === 0) return statusColors.error;
  if (!statusCode) return statusColors.inactive;
  if (statusCode >= 200 && statusCode < 300) {
    return statusColors.success;
  } else {
    return statusColors.error;
  }
}
