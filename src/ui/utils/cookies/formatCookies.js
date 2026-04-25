export const formatDateForInput = (strDate) => {
    const date = new Date(strDate)
    if (!date || date === "Infinity") return "";

    const pad = (n) => String(n).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

