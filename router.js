import routerConfig from "./routerConfig.js";
import store from "./store/index.js";
import Requests from "./requests.js";

function link(route){
    window.dispatchEvent(new CustomEvent('changeRoute', {detail:{route}}));
}
export default class Router{
    constructor(anchor){
        this.anchor = anchor;
        
        store.events.subscribe('change', this.logined.bind(this));

       
        window.addEventListener('popstate', event=> {

            link(event.state.url);
        })

    }

    logined(){
     
        if(store.state.userInfo.authorized  && this.state.url == "login"){

            const conf = routerConfig['login'];
            link(conf.settings.redirect);
        }
        else if(!store.state.userInfo.authorized  && this.state.url == "list"){
            const conf = routerConfig['list'];
            link(conf.settings.redirect);
        }
    
    }

    changeRoute(route){

        let token = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        Requests.checkAuth(token).then(authorized => {
           
            if(authorized)
            {
              
                store.setToken(token);
            }
        });
      

    const conf = routerConfig[route];

      
      if (!conf) return;

      this.state = conf.data;

      if(this.component){
        
      this.component.onDestroy();
      }

      window.history.pushState(conf.data, '',conf.url);

      this.component = new conf.component(this.anchor, conf.settings);
      this.component.render();

    }
     
}