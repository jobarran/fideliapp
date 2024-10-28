
export function truncateText(text: string | null | undefined, maxLength: number): string {
    if (!text) {
        return "";
    }
    return text.length <= maxLength ? text : text.slice(0, maxLength) + "..";
}