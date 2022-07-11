import RenderValidator from "./render_validator";
import moment from "moment";
import View from "./views/view";

export default class Roadmap {

    constructor() {
        this.projects = false;
        this.sprints = false;
        this.elementToRender = false;
        this.startOnDay = false;
        this.daysToShow = false;
        this.daysOfSprint = false;
        this.scroll = false;
        this.initialGridSizePx = false;
        this.roadmapId = false;
        this.roadmapClasses = false;
        this.renderValidator = new RenderValidator();
        this.view = new View();
    }

    /**
     * @param {JSON} configs 
     * @param {JSON} data 
     */
    render(configs, data) {

        this.renderValidator.validation(configs);

        this.projects = data.projects;
        this.sprints = data.sprints;
        this.elementToRender = $("#" + configs.elementId);
        this.startOnDay = configs.hasOwnProperty('startOnDay') ? moment(configs.startOnDay) : moment();
        this.daysToShow = configs.hasOwnProperty('daysToShow') ? configs.daysToShow : 360;
        this.daysOfSprint = configs.hasOwnProperty('daysOfSprint') ? configs.daysOfSprint : 15;
        this.dateOfFirstSprint = configs.hasOwnProperty('dateOfFirstSprint') ? configs.dateOfFirstSprint : moment();
        this.scroll = this.scroll ? true : false;
        this.roadmapId = configs.hasOwnProperty('roadmapId') ? configs.roadmapId : 'roadmap_table';
        this.roadmapClasses = configs.hasOwnProperty('roadmapClasses') ? configs.roadmapClasses : '';
        this.initialGridSizePx = configs.hasOwnProperty('initialGridSizePx') ? configs.initialGridSizePx : 18;
        this.renderOnElement();

        return this;
    }

    /**
     * Render the table on the element that was chosen
     */
    renderOnElement() {
        //render table on element
        $(this.elementToRender).html(this.view.createTable(this.roadmapClasses, this.roadmapId));

        var roamapTable = $("#" + this.roadmapId);

        //render days line
        roamapTable.find('thead').append(
            this.view.createDaysLine(
                this.startOnDay,
                this.daysToShow,
                this.initialGridSizePx
            ));

        //render sprint line
        roamapTable.find('thead').append(
            this.view.createSprintLine(
                this.sprints,
                this.startOnDay,
                this.daysToShow,
                this.daysOfSprint
            ));

        // render project lines
        $.each(this.projects, (index, project) => {
            roamapTable.find('tbody').append(
                this.view.createProjectsLines(
                    [project],
                    this.startOnDay,
                    this.daysToShow,
                ));

        })

        return this;
    }







}