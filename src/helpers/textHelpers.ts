export const cutText = (text: string, limit: number): string => {
    text = text.trim();
    if (text.length <= limit) return text;
    text = text.slice(0, limit);
    return text.trim() + "...";
};
