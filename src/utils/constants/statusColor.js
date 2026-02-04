export const statusColors = {
  error: { color: "var(--destructive-foreground)", bg: "var(--destructive)" },
  inactive: { color: "var(--muted-foreground)", bg: "var(--muted)" },
  success: { color: "var(--success-foreground)", bg: "var(--success)" },
};

export function determineColor(statusCode) {
  if (statusCode == undefined) return statusColors.error;
  if (statusCode === 0) return statusColors.error;
  if (!statusCode) return statusColors.inactive;
  if (statusCode >= 200 && statusCode < 300) {
    return statusColors.success;
  } else {
    return statusColors.error;
  }
}
