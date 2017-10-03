import ko from 'knockout';
import homeTemplate from 'text!./home.html';

class HomeViewModel {
    constructor(route) {
        window.home_model = this
        this.message = ko.observable('Welcome to trello!');
        //Labels
        this.labels = ko.observableArray([])
        $.getJSON("data/labels.json").done((data) => {
          this.labels.push(...data.labels)
        });
        //Members
        this.members = ko.observableArray([])
        $.getJSON("data/members.json").done((data) => {
          this.members.push(...data.members)
        });
    }

    doSomething() {
        this.message('You invoked doSomething() on the viewmodel.');
    }
}

export default { viewModel: HomeViewModel, template: homeTemplate };
