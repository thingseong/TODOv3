import { AppBar, Toolbar, Button } from "@mui/material";
import routes from "../routes/routes";
import {Link as RouterLink} from "react-router-dom";




function Header(){
    return(
        <AppBar position="static">
            <Toolbar>
                {routes.map((route, index) => (
                    <Button key={index} component={RouterLink} to={route.path} sx={{color: 'white', display: 'block'}}>
                        {route.name}
                    </Button>
                ))}
            </Toolbar>
        </AppBar>
    )
}

export default Header;