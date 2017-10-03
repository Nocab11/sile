import ko from 'knockout';
import templateMarkup from 'text!./labels.html';

class Labels { 
    constructor(params) {
      let self = this;
       this.active_labels = params.current_labels
       this.labels = window.home_model.labels
       this.visible = params.visible
       this.inactive_labels = findLabelsByIds(difference(getIds(this.labels()), getIds(this.active_labels())))

       //Callbacks
       this.close = (() => {
         this.visible(false);
       })
       this.toggleLabel = ((label) => {
         console.log(label)
         let temp_label = this.active_labels().find((m) => {
           return m.id == label.id
         })
         console.log(this.inactive_labels())
         if (temp_label != undefined){
           this.active_labels.remove(label)
           this.inactive_labels.push(label)
         }else{
           this.active_labels.push(label)
           this.inactive_labels.remove(label)
         }
         console.log("test")
       })
       //Helpers
       function getIds(items){
         let temp = []
         items.forEach((i) => {
           if (i.hasOwnProperty("id")){
             temp.push(i.id)
           }
           if (i.hasOwnProperty("member_id")){
             temp.push(i.member_id)
           }
         })
         return temp;
       }
       
       function difference(A,B){
           var M=A.length, N=B.length, C=[];
           for (var i=0; i<M; i++)
            { var j=0, k=0;
              while (B[j]!==A[i] && j<N) j++;
              while (C[k]!==A[i] && k<C.length) k++;
              if (j==N && k==C.length) C[C.length]=A[i];
            }
          return C;
       }
       
       function findLabelsByIds(ids){
         let labels = self.labels.filter((m) => {
           return ids.indexOf(m.id) != -1
         })
         return ko.observableArray(labels())
       }
    }

    dispose() {
        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    }
}

export default { viewModel: Labels, template: templateMarkup };
