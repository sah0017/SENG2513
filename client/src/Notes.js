import "./Notes.css";
import React, { useState, useEffect, useRef } from "react";

const Notes = () => {
  // State to manage the input value
  const [inputValue, setInputValue] = useState("");
  // Ref to keep track of whether listeners have been added
  const listenerAdded = useRef(false);

  // Handle toggling checked class when clicking on a list item
  const handleItemClick = (ev) => {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  };

  // Effect to add close buttons to existing list items on component mount
  useEffect(() => {
    // Add close button to existing list items
    const myNodelist = document.getElementsByTagName("LI");
    for (let i = 0; i < myNodelist.length; i++) {
      addCloseButton(myNodelist[i]);
    }

    // Set up click handlers for existing close buttons
    setupCloseButtonHandlers();

    // Add click event listener to the list for toggling checked status
    const list = document.querySelector('ul');
    if (list && !listenerAdded.current) {
      list.addEventListener('click', handleItemClick, false);
      listenerAdded.current = true;
    }
    
    // Cleanup function to remove event listener when component unmounts
    return () => {
      if (list) {
        list.removeEventListener('click', handleItemClick, false);
        listenerAdded.current = false;
      }
    };
  }, []);

  // Function to add close button to a list item
  const addCloseButton = (li) => {
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  };

  // Function to set up click handlers for close buttons
  const setupCloseButtonHandlers = () => {
    const close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        const div = this.parentElement;
        div.style.display = "none";
      };
    }
  };

  // Function to add a new list item
  const newElement = () => {
    if (inputValue === '') {
      alert("You must write something!");
      return;
    }
    
    const li = document.createElement("li");
    const textNode = document.createTextNode(inputValue);
    li.appendChild(textNode);
    
    document.getElementById("myUL").appendChild(li);
    setInputValue(""); // Clear input field
    
    addCloseButton(li);
    setupCloseButtonHandlers();
  };

  // Handle pressing Enter key to add a new item
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      newElement();
    }
  };

  return (
    <div>
      <div id="myDIV" className="header">
        <h2>Notes</h2>
        <input
          type="text"
          id="myInput"
          placeholder="Title..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <span onClick={newElement} className="addBtn">Add</span>
      </div>
      
      <ul id="myUL">
        {/* List items will be added here dynamically */}
      </ul>
    </div>
  );
};

export default Notes;