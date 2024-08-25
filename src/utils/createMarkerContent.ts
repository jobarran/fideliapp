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

    // Create the inner white dot
    const innerDot = document.createElement('div');
    innerDot.style.backgroundColor = 'white';
    innerDot.style.borderRadius = '50%';
    innerDot.style.width = '3px';
    innerDot.style.height = '3px';
    innerDot.style.position = 'absolute';
    innerDot.style.top = '50%';
    innerDot.style.left = '50%';
    innerDot.style.transform = 'translate(-50%, -50%)';

    // Append the inner dot to the marker content
    content.appendChild(innerDot);

    return content;
};

export default createMarkerContent;
