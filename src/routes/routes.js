import Calendar from "../component/Calendar";
import Todolist from "../component/Todolist";



const routes = [
    {
        name: "TODO",
        path: "/",
        component: Todolist
    },
    {
        name: "Calendar",
        path: "/calendar",
        component: Calendar
    }
]


export default routes;