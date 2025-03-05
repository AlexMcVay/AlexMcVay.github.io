const projectsSection = document.getElementById('projects');
const projects = projectsSection.getElementsByClassName('project');

for (const project of projects) {
    const techs = project.getAttribute('data-tech').split(', ');
    const techList = document.createElement('ul');
    for (const tech of techs) {
        const techListItem = document.createElement('li');
        techListItem.textContent = tech;
        techList.appendChild(techListItem);
    }
    project.insertBefore(techList, project.firstChild);
}
