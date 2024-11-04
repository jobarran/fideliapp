const createMarkerContent = (backgroundColor: string, label?: string, showLabel: boolean = false): HTMLDivElement => {
    // Create the main container for the marker content
    const content = document.createElement('div');
    content.style.position = 'relative';
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.alignItems = 'center';
    content.style.cursor = 'pointer';

    // Create the marker circle (only once)
    const markerCircle = document.createElement('div');
    markerCircle.style.backgroundColor = backgroundColor;
    markerCircle.style.borderRadius = '50%';
    markerCircle.style.width = '15px';
    markerCircle.style.height = '15px';
    markerCircle.style.display = 'flex';
    markerCircle.style.alignItems = 'center';
    markerCircle.style.justifyContent = 'center';
    markerCircle.style.boxShadow = '0px 2px 4px rgba(0, 0, 0, 0.15)';
    content.appendChild(markerCircle);

    // Create the inner white dot
    const innerDot = document.createElement('div');
    innerDot.style.backgroundColor = 'white';
    innerDot.style.borderRadius = '50%';
    innerDot.style.width = '6px';
    innerDot.style.height = '6px';
    innerDot.style.position = 'absolute'; // This allows it to be centered within the circle
    innerDot.style.top = '50%';
    innerDot.style.left = '50%';
    innerDot.style.transform = 'translate(-50%, -50%)';
    markerCircle.appendChild(innerDot);

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
    markerCircle.appendChild(pulse);

    // Conditionally add the label below the marker if showLabel is true
    if (label && showLabel) {
        const markerLabel = document.createElement('div');
        markerLabel.textContent = label;
        markerLabel.style.fontSize = '12px';
        markerLabel.style.textAlign = 'center';
        markerLabel.style.marginTop = '2px'; // Margin for spacing
        markerLabel.style.color = '#1E293B';
        markerLabel.style.whiteSpace = 'nowrap';
        content.appendChild(markerLabel);
    }

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
