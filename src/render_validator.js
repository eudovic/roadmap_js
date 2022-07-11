import moment from "moment";
export default class RenderValidator {

    validation(configs) {
        this.elementValidator(configs);
        this.startOnDayValidator(configs);
        this.daysToShowValidator(configs);
        this.daysOfSprintValidator(configs);
        this.initialGridSizePxValidator(configs);
    }

    elementValidator(configs) {
        if (!configs.hasOwnProperty('elementId')) {
            throw 'Need to define an element to render';
        }
    }

    startOnDayValidator(configs) {
        if (configs.hasOwnProperty('startOnDay')) {
            var date = moment(configs.startOnDay, "YYYY-MM-DD", true);
            if (!date.isValid()) {
                throw 'How you are sending the startOnDay so is necessary a right one yyyy-mm-dd';
            }
        }
    }

    dateOfFirstSprintValidator(configs) {
        if (configs.hasOwnProperty('dateOfFirstSprint')) {
            var date = moment(configs.dateOfFirstSprint, "YYYY-MM-DD", true);
            if (!date.isValid()) {
                throw 'How you are sending the dateOfFirstSprint so is necessary a right one yyyy-mm-dd';
            }
        }
    }

    daysToShowValidator(configs) {
        if (configs.hasOwnProperty('daysToShow')) {
            if (!Number.isInteger(configs.daysToShow)) {
                throw 'How you are sending the daysToShow so is necessary a right one integer number';
            }
        }
    }

    daysOfSprintValidator(configs) {
        if (configs.hasOwnProperty('daysOfSprint')) {
            if (!Number.isInteger(configs.daysOfSprint)) {
                throw 'How you are sending the daysOfSprint so is necessary a right one integer number';
            }
        }
    }

    initialGridSizePxValidator(configs) {
        if (configs.hasOwnProperty('initialGridSizePx')) {
            if (!Number.isInteger(configs.initialGridSizePx)) {
                throw 'How you are sending the initialGridSizePx so is necessary a right one integer number';
            }
        }
    }
}