export const getTransactionTypeColor = (type: 'BUY' | 'REWARD' | 'MANUAL'): string => {
    switch (type) {
        case 'BUY':
            return 'text-green-500'; // Green for 'BUY'
        case 'REWARD':
            return 'text-amber-500'; // Blue for 'REWARD'
        case 'MANUAL':
            return 'text-gray-500'; // Gray for 'MANUAL'
        default:
            return 'text-gray-500'; // Default color
    }
};