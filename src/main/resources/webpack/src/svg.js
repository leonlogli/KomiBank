
function createSVG(defaultClass, classes, id) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    if(id)  svg.id = id;
    svg.setAttribute ('class', defaultClass + (classes ? classes : ''));
    svg.setAttribute ('viewBox', "0 0 24 24");
    svg.setAttribute("aria-hidden","true");
    return svg;
}

export function AccountEditIcon(color, classes, id) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
    path.setAttribute('fill', color);
    path.setAttribute("d", `M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,
        11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,
        18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,
        15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,
        4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z`); //Set path's data
    const svg = createSVG('svg-icon account-edit-icon ', classes, id);
    svg.appendChild(path);
    return svg;
}

export function GooglePlusIcon(color, classes, id) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    path.setAttribute('fill', color ? color : '#ef1a1a');
    path.setAttribute("d", `M23,11H21V9H19V11H17V13H19V15H21V13H23M8,11V13.4H12C11.8,
        14.4 10.8,16.4 8,16.4C5.6,16.4 3.7,14.4 3.7,12C3.7,9.6 5.6,7.6 8,7.6C9.4,7.6 10.3,
        8.2 10.8,8.7L12.7,6.9C11.5,5.7 9.9,5 8,5C4.1,5 1,8.1 1,12C1,15.9 4.1,19 8,19C12,19 14.7,
        16.2 14.7,12.2C14.7,11.7 14.7,11.4 14.6,11H8Z`); 
    const svg = createSVG('svg-icon google-plus-icon ', classes, id);
    svg.appendChild(path);
    return svg;
}

export function TwitterIcon(color, classes, id) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    path.setAttribute('fill', color ? color : '#00aced');
    path.setAttribute("d", `M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,
        4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,
        8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,
        9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,
        14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,
        17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,
        21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z`);
    const svg = createSVG('svg-icon twitter-icon ', classes, id);
    svg.appendChild(path);
    return svg;
}

export function FacebookIcon(color, classes, id) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    path.setAttribute('fill', color ? color : '#0077e2');
    path.setAttribute("d", `M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,
        4 0 0,1 14,2H17Z`);
    const svg = createSVG('svg-icon facebook-icon ', classes, id);
    svg.appendChild(path);
    return svg;
}