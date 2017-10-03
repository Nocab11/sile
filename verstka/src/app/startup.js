import 'jquery';
import 'bootstrap';
import ko from 'knockout';
import 'knockout-sortable';
import 'knockout-projections';
import * as router from './router';


// Components can be packaged as AMD modules, such as the following:
ko.components.register('home-page', { require: 'components/home-page/home' });

// ... or for template-only components, you can just point to a .html file directly:
// ko.components.register('about-page', {
//     template: { require: 'text!components/about-page/about.html' }
// });

ko.components.register('list', { require: 'components/list/list' });

ko.components.register('card', { require: 'components/card/card' });

ko.components.register('members', { require: 'components/members/members' });

ko.components.register('labels', { require: 'components/labels/labels' });

// [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

// Start the application

ko.bindingHandlers.log = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        console.log("element/////////////", element);
        console.log("allBindings/////////////", allBindings());
        console.log("bindingContext/////////////", bindingContext);
    }
};


        //control visibility, give element focus, and select the contents (in order)
ko.bindingHandlers.visibleAndSelect = {
    update: function(element, valueAccessor) {
        ko.bindingHandlers.visible.update(element, valueAccessor);
        if (valueAccessor()) {
            setTimeout(function() {
                $(element).find("input").focus().select();
            }, 0); //new tasks are not in DOM yet
        }
    }
};


ko.applyBindings({ route: router.currentRoute });
