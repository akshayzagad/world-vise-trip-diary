import { Link } from "react-router-dom"
import PageNav from "../components/pageNav"
import AppNav from "../components/AppNav"

function homepage() {
    return (
        <div>
            <PageNav/>
            <AppNav/>
            <h1 className="test">Homepage</h1>  
            <Link to="/App">App</Link>
        </div>
    )
}

export default homepage
 