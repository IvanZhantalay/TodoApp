import Component from "./component.js";
import store from "./store/index.js";
import Requests from "./requests.js";

export default class LoginComponent extends Component{
    constructor(app, settings){
        const template = document.getElementById('login').content.cloneNode(true);
        app.appendChild(template);
            super(
            store,
            app
           );
           
        app.querySelector('#signin').addEventListener('click', ()=>{
            let login = app.querySelector('#email').value;
            let pass = app.querySelector('#password').value;
            
            Requests.sendLoginReq(login, pass)
            .then((token)=>{
                store.setToken(token);
                document.cookie =`userToken=${token}`;
            }).catch(error=>{
                this.errortext = error;
                app.querySelector('.error').innerHTML=`${error}`;
           });
            
        })
    }
        

    render(){

       
    }
}