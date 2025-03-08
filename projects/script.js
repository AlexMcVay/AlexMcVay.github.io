//Variables
const projectElements = document.querySelectorAll('.project');
const techLogos = {
    "JavaScript": "logos/javascript.png",
    "HTML5": "logos/html5.png",
    "CSS3": "logos/css3.png",
    "React": "logos/react.png",
    "Python": "logos/python.png"
};//TODO: #23 Add tech logos

projectElements.forEach(project => {
    const techStack = project.getAttribute('data-tech').split(', ').map(tech => tech.trim());
    console.log(techStack); // ["JavaScript", "HTML5", "CSS3"]
});

// Mapping technologies to their respective logo images

document.querySelectorAll(".project").forEach(project => {
    const techContainer = project.querySelector(".tech-logos");
    const techList = project.getAttribute("data-tech").split(",").map(tech => tech.trim());

    techList.forEach(tech => {
        if (techLogos[tech]) {
            const img = document.createElement("img");
            img.src = techLogos[tech];
            img.alt = tech;
            img.classList.add("tech-icon"); // Style with CSS
            techContainer.appendChild(img);
        }
    });
});
