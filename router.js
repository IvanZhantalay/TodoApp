import routerConfig from "./routerConfig.js";
import store from "./store/index.js";
// import link from "./link.js";
import Requests from "./requests.js";

function link(route){
    window.dispatchEvent(new CustomEvent('changeRoute', {detail:{route}}));
}
export default class Router{
    constructor(anchor){
        this.anchor = anchor;

        store.events.subscribe('change', this.logined);

        let token = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        Requests.checkAuth(token).then(authorized => {

            if(authorized)
            {
                store.setToken(token);
            }
        });
      
        window.addEventListener('popstate', event=> {

            link(event.state.url)
        })

    }

    logined(){
    
        if(store.loginChanged)
        {
        if(store.state.userInfo.authorized){

            const conf = routerConfig['login'];
            link(conf.settings.redirect)
        }
        else{
            const conf = routerConfig['list'];
            link(conf.settings.redirect)
        }
    }
    }

    changeRoute(route){
    const conf = routerConfig[route];

      
      if (!conf) return;
      if(this.component){
        
      this.component.onDestroy();
      }

      window.history.pushState(conf.data, '',conf.url);

      this.component = new conf.component(this.anchor, conf.settings);
      this.component.render();

    }
     
}