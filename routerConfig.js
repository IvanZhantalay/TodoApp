import ListComponent from "./ListComponent.js"
import LoginComponent from "./LoginComponent.js"
export default{ 
        'login':{
            data:{url: 'login'},
            url:'login',
            component:LoginComponent,
            settings:{
                redirect: 'list'
            }
        },
        'list':{
            data:{url: 'list'},
            url:'list',
            component:ListComponent,
            settings:{
                redirect: 'login'
            }
        }
}