import React, {useState, useEffect, useCallback} from 'react';
import {observer} from "mobx-react";
import {StyleSheet, css} from 'aphrodite-jss';
import Calendar from "./Calendar";
import axios from "axios";
import CalendarStore from "./CalendarStore";



const CalendarWrapper=()=> {


    const [text, setText]= useState('text');

    useEffect(()=>{
        axios.get('https://api.spacexdata.com/v4/launches/latest')
            .then(res=> {
                const temp = res.data.details;
                setText(temp);

            })
    },[]);



    const themes = CalendarStore.getThemes;

    const [selectedTheme, setSelectedTheme] = useState("cadetBlue");

    const handleSelect = useCallback((e) => {
        setSelectedTheme(e.target.value);
    },[setSelectedTheme]);

    const sheet = StyleSheet.create({
        //selectedTheme
        //themes:selectedTheme
        themes
    })
    console.log(themes)
    console.log(sheet)

    const changeDate = React.useCallback((e)=>{
        e.preventDefault();
        CalendarStore.changeDate()
    },[])

    const changeType = React.useCallback((e)=>{
        e.preventDefault();
        CalendarStore.changeType()
    },[])


    const [inputText,setInputText]=useState('')

    const inputTextHandler = (event)=>{
        setInputText(event.target.value)
    }

    const createEvent = (event)=>{
        event.preventDefault();
        if(inputText.length > 0){
            CalendarStore.createNewEvent(inputText)
        }
    }



    return (
        <div className={css(sheet.selectedTheme)}>
            {text}
            <form style={{display:"flex"}}>
                <label>
                    Choose your theme:
                    <select onChange={handleSelect}>
                        { Object.keys(themes).map((elem:string)=>{
                            return <option key={Math.random()*1000} value={elem}>{elem}</option>
                        })}
                    </select>
                </label>
                <button onClick={changeDate}>change date</button>
                <button onClick={changeType} style={{marginRight:"10px"}}>change type</button>

                <input value={inputText} onChange={inputTextHandler}/>
                <button onClick={createEvent}>add new event</button>
            </form>
            <Calendar/>

        </div>
    );
}

export default observer(CalendarWrapper);