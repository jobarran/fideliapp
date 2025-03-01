/**
 * Rounds a given average rating to the nearest 1-5 star value.
 *
 * @param average - The average rating to round.
 * @returns A value between 1 and 5 rounded to the nearest star.
 */

export function roundToStars(average: number): number {
    if (average === 0) return 0;
    if (average < 1) return 1;
    if (average > 5) return 5;

    // Round to the nearest whole number within the range 1-5
    return Math.round(average * 10) / 10;
}
