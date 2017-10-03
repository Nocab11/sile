import ko from 'knockout';
import templateMarkup from 'text!./card.html';

class Card {
    constructor(params) {
      console.log(params)
      this.message = ko.observable('Hello from the card component!');
      this.card_opened = params.card_opened;
      this.card = params.card;
      this.list = params.list;
      this.temp_description = ko.observable();
      this.description_edit = ko.observable(false)

      this.visible_members_popup_1 = ko.observable(false)
      this.visible_members_popup_2 = ko.observable(false)

      this.visible_labels_popup_1 = ko.observable(false)
      this.visible_labels_popup_2 = ko.observable(false)

      console.log(params.list())

      this.show_members_popup_1 = (() => {
        this.closeAllPopups()
        this.visible_members_popup_1(true)
      })

      this.show_members_popup_2 = (() => {
        this.closeAllPopups()
        this.visible_members_popup_2(true)
      })

      this.show_labels_popup_1 = (() => {
        this.closeAllPopups()
        this.visible_labels_popup_1(true)
      })

      this.show_labels_popup_2 = (() => {
        this.closeAllPopups()
        this.visible_labels_popup_2(true)
      })

      this.close_modal = function(){
        this.card_opened(false)
      }

      this.saveDescription = (() => {
        this.card.description(this.temp_description())
        this.closeDescritionEdit();
      })

      this.editDescription = (() => {
        this.description_edit(true)
      })

      this.closeDescritionEdit = (() => {
          this.description_edit(false)
      })

      this.closeAllPopups = (()=>{
        this.visible_members_popup_1(false)
        this.visible_members_popup_2(false)
        this.visible_labels_popup_1(false)
        this.visible_labels_popup_2(false)
      })
    }

    dispose() {
        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    }
}

export default { viewModel: Card, template: templateMarkup };
