import { useEffect, useState } from 'react';

// Define the type for the window size
interface WindowSize {
    width: number | undefined; // Use number or undefined
    height: number | undefined; // Use number or undefined
}

// Hook to get the current window size
const useWindowSize = (): WindowSize => {
    const [windowSize, setWindowSize] = useState<WindowSize>({ width: undefined, height: undefined });

    useEffect(() => {
        // Function to update the window size
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        // Set initial window size
        handleResize();

        // Add event listener for resize
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowSize;
};

export default useWindowSize; // Ensure you export the hook
