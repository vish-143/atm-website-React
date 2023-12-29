import Home from "../pages/home"
import Language from "../pages/language"
import Options from "../pages/options"
import Withdrawal from "../pages/withdrawal"
import CheckBalance from "../pages/checkBalance"
import Deposit from "../pages/deposit"
import ResultPage from "../pages/resultPage"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"

function Router() {
    const isCardInserted=useSelector(state=>state.isCardInserted)

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' render={()=> isCardInserted ? <Redirect to='/language'/> : <Home/>} />
                    {isCardInserted ? null : <Redirect to='/'/>}
                    <Route path='/language' component={Language} />
                    <Route path='/options' component={Options} />
                    <Route path='/withdrawal' component={Withdrawal} />
                    <Route path='/checkBalance' component={CheckBalance} />
                    <Route path='/deposit' component={Deposit} />
                    <Route path='/successPage' render={()=><ResultPage emoji={'bi bi-emoji-smile'}/>} />
                    <Route path='/failurePage' render={()=><ResultPage emoji={'bi bi-emoji-frown'}/>} />
                </Switch>
            </BrowserRouter>
        </>
    )
}
export default Router