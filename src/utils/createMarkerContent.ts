const createMarkerContent = (backgroundColor: string): HTMLDivElement => {

    // Create the container for the custom marker content
    const content = document.createElement('div');
    content.style.position = 'relative';
    content.style.backgroundColor = backgroundColor;
    content.style.borderRadius = '50%';
    content.style.width = '15px';
    content.style.height = '15px';
    content.style.display = 'flex';
    content.style.alignItems = 'center';
    content.style.justifyContent = 'center';
    content.style.cursor = 'pointer';
    content.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.15)';
    content.style.transition = 'transform 0.2s ease-in-out';

    // Create a subtle pulse effect using an additional div
    const pulse = document.createElement('div');
    pulse.style.position = 'absolute';
    pulse.style.top = '50%';
    pulse.style.left = '50%';
    pulse.style.width = '15px';
    pulse.style.height = '15px';
    pulse.style.borderRadius = '50%';
    pulse.style.backgroundColor = backgroundColor;
    pulse.style.opacity = '0.2';
    pulse.style.animation = 'pulse 3s infinite';
    pulse.style.transform = 'translate(-50%, -50%) scale(1.5)';
    content.appendChild(pulse);

    // Create the inner white dot
    const innerDot = document.createElement('div');
    innerDot.style.backgroundColor = 'white';
    innerDot.style.borderRadius = '50%';
    innerDot.style.width = '6px'; // Increased size for better visibility
    innerDot.style.height = '6px';
    innerDot.style.position = 'absolute';
    innerDot.style.top = '50%';
    innerDot.style.left = '50%';
    innerDot.style.transform = 'translate(-50%, -50%)';

    content.appendChild(innerDot);

    // Handle hover effect
    content.addEventListener('mouseenter', () => {
        content.style.transform = 'scale(1.1)';
    });
    content.addEventListener('mouseleave', () => {
        content.style.transform = 'scale(1)';
    });

    // Create keyframes for the pulse effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
            50% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
        }
    `;
    document.head.appendChild(style);

    return content;
};

export default createMarkerContent;
