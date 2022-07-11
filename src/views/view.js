import moment from "moment";
import Helper from "../helper";

export default class View {

    constructor() {
        this.helper = new Helper();
    }

    /**
     * Create the table structure to render
     * @param {String} tableClasses - Classes for table(not required)
     * @param {String} tableId - Id for table(not required)
     */
    createTable(tableClasses = false, tableId = false) {
        var renderClass = "";
        var renderTableId = "";
        if (tableClasses) {
            renderClass = `class="${tableClasses}"`;
        }

        if (tableId) {
            renderTableId = `id="${tableId}"`;
        }
        return `
        <table ${renderClass} ${renderTableId}>
        <thead></thead>
        <tbody></tbody>
        <tfoot></tfoot>
        </table>
        `;
    }

    /**
     * Create the days of month to be rendered on the thead
     * @param {Date} startOnDay 
     * @param {Integer} daysToShow 
     * @param {Integer} initialGridSizePx 
     */
    createDaysLine(startOnDay, daysToShow, initialGridSizePx) {
        let returnLine = `<tr>`;
        let dates = this.parseDaysBasedOnStartDate(startOnDay, daysToShow);

        $.each(dates, (dateIndex, date) => {
            let monthColor = this.helper.COLORSBYMONTH[moment(date).format("MM")];
            returnLine += `
                <th title="${date.format("DD/MM/YYYY")}" style="height:1px; min-width:${initialGridSizePx + 'px'}; background-color: ${monthColor}">

                </th>
                `;
        })

        returnLine += `</tr>`;

        return returnLine;
    }

    /**
     * Parse the days of month to be rendered on the thead
     * @param {Date} startOnDay 
     * @param {Integer} daysToShow 
     */
    parseDaysBasedOnStartDate(startOnDay, daysToShow) {
        let datesToShow = [];
        let interactDate = startOnDay;

        for (let i = 0; i <= daysToShow - 1; i++) {
            datesToShow.push(interactDate);
            interactDate = moment(interactDate).add(1, 'days')
        }

        return datesToShow;
    }

    createSprintLine(sprints, startOnDay, daysToShow, daysOfSprint) {
        let returnSprint = `<tr id="sprints_row">`;
        let sprintsLine = this.parseSprintsDates(sprints, startOnDay, daysToShow, daysOfSprint);
        $.each(sprintsLine, (index, value) => {
            let sprint = value[Object.keys(value)[0]];
            returnSprint += `<th colspan="${Object.keys(value).length}" style="background-color:#f4f4f7">
               ${sprint.name}
            </th>
            `
        });

        returnSprint += `</tr>`;

        return returnSprint;
    }

    parseSprintsDates(sprints, startOnDay, daysToShow, daysOfSprint) {
        let daysofTable = this.parseDaysBasedOnStartDate(startOnDay, daysToShow);
        let sprintToRender = {};
        $.each(daysofTable, (index, day) => {
            let sprintFound = this.getSprintsFilteredByDate(sprints, day, daysOfSprint);
            if (sprintFound) {
                if (!sprintToRender.hasOwnProperty(sprintFound.name)) {
                    sprintToRender[sprintFound.name] = {};

                }
                sprintToRender[sprintFound.name][day.format("YYYY_MM_DD")] = sprintFound;
            }
        })

        return sprintToRender;
    }

    getSprintsFilteredByDate(sprints, date, daysOfSprint) {
        let sprintfound = false;
        $.each(sprints, (index, sprint) => {
            let sprintStart = moment(sprint.start);
            if (date.format("YYYY-MM-DD") >= sprintStart.format("YYYY-MM-DD") &&
                date.format("YYYY-MM-DD") < sprintStart.add(daysOfSprint, 'days').format("YYYY-MM-DD")) {
                sprintfound = sprint;
            }
        })

        return sprintfound;
    }


    createProjectsLines(projects, startOnDay, daysToShow) {
        let returnProject = `<tr>`;
        let projectLines = this.parseProjectDates(projects, startOnDay, daysToShow);
        $.each(projectLines, (index, value) => {
            let project = value[Object.keys(value)[0]];

            if (project.hasOwnProperty('name')) {
                returnProject += `<td class="project_line" colspan="${Object.keys(value).length}" 
                style="background-color:${project.color};">
                   ${project.name}
                </td>
                `
            } else {
                returnProject += `<td class="project_grid" data-date="${project}"> </td>`;
            }

        });

        returnProject += `</tr>`;

        return returnProject;
    }


    parseProjectDates(projects, startOnDay, daysToShow) {
        let daysofTable = this.parseDaysBasedOnStartDate(startOnDay, daysToShow);
        let projectToRender = {};
        $.each(daysofTable, (index, day) => {
            let projectFound = this.getProjectFilteredByDate(projects, day);
            if (projectFound) {
                if (!projectToRender.hasOwnProperty(projectFound.name)) {
                    projectToRender[projectFound.name] = {};
                }
                projectToRender[projectFound.name][day.format("YYYY_MM_DD")] = projectFound;
            } else {
                projectToRender[day.format("YYYY-MM-DD")] = { date: day.format("YYYY-MM-DD") };
            }
        })

        return projectToRender;
    }


    getProjectFilteredByDate(projects, date) {
        let projectfound = false;
        $.each(projects, (index, project) => {
            let projectStart = moment(project.start);
            let projectEnd = moment(project.end);
            if (date.format("YYYY-MM-DD") >= projectStart.format("YYYY-MM-DD") &&
                date.format("YYYY-MM-DD") <= projectEnd.format("YYYY-MM-DD")) {
                projectfound = project;
            }
        })

        return projectfound;
    }

}