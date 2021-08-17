import React, { useState, useEffect} from 'react';
import './style.css';

const getLocalData = () => {
    const list = localStorage.getItem("mytodolist");
    if(list)
        return JSON.parse(list);
    else
        return [];
};

const Todo = () => {
    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    const addItems = () =>{
        if(!inputdata)
            alert("Please type some task...");
        else if(toggleButton && inputdata){
            setItems(
                items.map((currEl) => {
                    if(currEl.id===isEditItem){
                        return {...currEl, name: inputdata};
                    }
                    return currEl;
                })
            );
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        }else{
            const myInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            };
            setItems([...items, myInputData]);
            setInputData("");
        }
    };

    const editItem = (index) => {
        const edited_item = items.find((currElem) => {
            return currElem.id === index;
        });
        setInputData(edited_item.name);
        setIsEditItem(index);
        setToggleButton(true);
    }

    const deleteItem = (index) => {
        const updatedItems = items.filter((currElem) =>{
            return currElem.id !== index;
        });
        setItems(updatedItems);
    };

    const removeAll = () =>{
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);

    return (
        <>
            <div className='main-div'>
                <div className="child-div">
                    <figure>
                        <img src="./images/TaskList-logos_transparent.png" alt="todo-logo" />
                        <figcaption>Add your task here 👇 </figcaption>
                    </figure>
                    <div className="add-items">
                        <input type="text" placeholder="✍ Add Task" className="form-control" value={inputdata} onChange={(event)=>setInputData(event.target.value)}/>
                        {toggleButton ? (<i class="fa fa-edit" onClick={addItems}></i>) : (<i class="fa fa-plus" onClick={addItems}></i>)}
                        
                    </div>
                    <div className="show-items">
                        {items.map((currEl, index)=>{
                            return (
                                <div className="each-item" key={currEl.id}>
                                    <p>{currEl.name}</p>
                                    <div className="todo-btn">
                                        <i class="far fa-edit" onClick={() => editItem(currEl.id)}></i>
                                        <i class="far fa-trash-alt" onClick={()=>deleteItem(currEl.id)}></i>
                                    </div>
                                </div>
                            );
                        })}
                        
                    </div>
                    <div className="show-items">
                        <button className="btn" onClick={removeAll}>Remove All</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;
