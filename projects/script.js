//Variables
const projectElements = document.querySelectorAll('.project');
const techLogos = {
    "JavaScript": "logos/javascript.png",
    "HTML5": "logos/html5.png",
    "CSS3": "logos/css3.png",
    "React": "logos/react.png",
    "Python": "logos/python.png"
};//TODO: #23 Add tech logos
/*
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
});*/

document.addEventListener("DOMContentLoaded", function() {
    const filterButtons = document.querySelectorAll(".skill-filter");
    const timelineBars = document.querySelectorAll(".gantt-bar");
    
    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            const skill = this.getAttribute("data-skill");
            
            timelineBars.forEach(bar => {
                if (skill === "all" || bar.getAttribute("data-skills").includes(skill)) {
                    bar.style.display = "block";
                } else {
                    bar.style.display = "none";
                }
            });
        });
    });

    /*
    function calculateGanttTimeline() {
        const timelineContainer = document.querySelector(".gantt-container");
        const bars = document.querySelectorAll(".gantt-bar");
        const startDate = new Date("2017-01-01"); // Adjust to earliest date
        const endDate = new Date("2025-12-31"); // Adjust to latest date
        const totalDuration = endDate - startDate;

        bars.forEach(bar => {
            const barStart = new Date(bar.getAttribute("data-start"));
            const barEnd = new Date(bar.getAttribute("data-end"));
            const startOffset = ((barStart - startDate) / totalDuration) * 100;
            const width = ((barEnd - barStart) / totalDuration) * 100;
            
            bar.style.left = `${startOffset}%`;
            bar.style.width = `${width}%`;
        });
    }
    
    calculateGanttTimeline();
});*/})