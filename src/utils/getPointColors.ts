export const getPointsColor = (points: number): string => {
    return points < 0 ? 'text-red-500' : 'text-green-500';
};