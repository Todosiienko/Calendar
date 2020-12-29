import React, {useCallback, useState} from 'react';
import CalendarStore from "./Calendar/CalendarStore";
import './App.css';
import CalendarWrapper from "./Calendar/CalendarWrapper";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import ArticleComponent from "./ArticleComponent";

function App() {

    // const themes = CalendarStore.getThemes;
    //
    //
    // const [selectedTheme, setSelectedTheme] = useState("cadetBlue");
    //
    // const handleSelect = useCallback((e) => {
    //     setSelectedTheme(e.target.value);
    // },[setSelectedTheme]);
    //
    //
    //
    // const changeDate = React.useCallback((e)=>{
    //      e.preventDefault();
    //     CalendarStore.changeDate()
    // },[])
    //
    // const changeType = React.useCallback((e)=>{
    //      e.preventDefault();
    //      CalendarStore.changeType()
    // },[])
    //
    //
    // const [inputText,setInputText]=useState('')
    //
    // const inputTextHandler = (event)=>{
    //     setInputText(event.target.value)
    // }
    //
    // const createEvent = (event)=>{
    //     event.preventDefault();
    //     if(inputText.length > 0){
    //         CalendarStore.createNewEvent(inputText)
    //     }
    // }


        return (
            <Router>
                <div className="App">

                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/calendarWrapper">Calendar</Link>
                            </li>
                            <li>
                                <Link to="/article">Article</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/calendarWrapper">
                            <CalendarWrapper />
                        </Route>
                        <Route path="/home">
                            <ArticleComponent/>
                        </Route>
                        <Route path="/article">
                            <ArticleComponent/>
                        </Route>
                    </Switch>


                </div>
            </Router>


        )
}

export default App;

// <form style={{display:"flex"}}>
//     <label>
//         Choose your theme:
//         <select onChange={handleSelect}>
//             { Object.keys(themes).map((elem:string)=>{
//                 return <option key={Math.random()*1000} value={elem}>{elem}</option>
//             })}
//         </select>
//     </label>
//     <button onClick={changeDate}>change date</button>
//     <button onClick={changeType} style={{marginRight:"10px"}}>change type</button>
//
//     <input value={inputText} onChange={inputTextHandler}/>
//     <button onClick={createEvent}>add new event</button>
// </form>
// <CalendarWrapper selectedTheme={themes[selectedTheme]}/>

