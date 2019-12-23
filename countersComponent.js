import Component from "./component.js";
import store from "./store/index.js";

export default class CountersComponent extends Component{
    constructor(){
        super(
            store,
            document.querySelector('.js-count')
        );
}
    render(){

        this.anchor.innerHTML= `
            <div class="wrap_counter">
                <small>Done</small>
                <span class ="digi">${store.completedCount}</span>
                <small>things today</small>
            </div>

            <div class="wrap_counter">    
                <small>Active</small>
                <span class ="digi">${store.state.todo.length - store.completedCount}</span>
                <small>things today</small>
            </div>

            <div class="wrap_counter">    
                <small>Total</small>
                <span class ="digi">${store.state.todo.length}</span>
                <small>things</small>
            </div>
    `;
     }
}