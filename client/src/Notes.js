import "./Notes.css";
import React, { useState, useEffect, useRef, useCallback } from "react";

const Notes = () => {
  // State to manage the input value and notes
  const [inputValue, setInputValue] = useState("");
  const [notes, setNotes] = useState([]);
  // Ref to keep track of whether listeners have been added
  const listenerAdded = useRef(false);
  // Ref for file input element
  const fileInputRef = useRef(null);

  // Use useCallback to memoize the handleItemClick function
  const handleItemClick = useCallback((ev) => {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
      
      // Update the notes state when item is checked/unchecked
      const updatedNotes = [...notes];
      const index = Array.from(ev.target.parentNode.children).indexOf(ev.target);
      if (index !== -1) {
        updatedNotes[index].checked = ev.target.classList.contains('checked');
        setNotes(updatedNotes);
      }
    }
  }, [notes]);

  // Function to add close button to a list item
  const addCloseButton = useCallback((li) => {
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  }, []);

  // Function to set up click handlers for close buttons
  const setupCloseButtonHandlers = useCallback(() => {
    const close = document.getElementsByClassName("close");
    for (let i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        const div = this.parentElement;
        const index = Array.from(div.parentNode.children).indexOf(div);
        
        // Remove the note from state
        const updatedNotes = [...notes];
        updatedNotes.splice(index, 1);
        setNotes(updatedNotes);
        
        // Hide the element in the UI
        div.style.display = "none";
      };
    }
  }, [notes]);

  // Function to render all notes from state
  const renderNotes = useCallback(() => {
    const list = document.getElementById("myUL");
    if (!list) return;
    
    // Clear the list first
    list.innerHTML = "";
    
    // Add all notes from state
    notes.forEach(note => {
      const li = document.createElement("li");
      const textNode = document.createTextNode(note.text);
      li.appendChild(textNode);
      
      if (note.checked) {
        li.classList.add("checked");
      }
      
      list.appendChild(li);
      addCloseButton(li);
    });
    
    setupCloseButtonHandlers();
  }, [notes, addCloseButton, setupCloseButtonHandlers]);

  // Effect to initialize notes and set up event listeners
  useEffect(() => {
    // Set up click event listener for the list
    const list = document.querySelector('ul');
    if (list && !listenerAdded.current) {
      list.addEventListener('click', handleItemClick, false);
      listenerAdded.current = true;
    }
    
    // Render initial notes or any loaded notes
    renderNotes();
    
    // Cleanup function to remove event listener when component unmounts
    return () => {
      if (list) {
        list.removeEventListener('click', handleItemClick, false);
        listenerAdded.current = false;
      }
    };
  }, [handleItemClick, renderNotes]);

  // Function to add a new list item
  const newElement = () => {
    if (inputValue === '') {
      alert("You must write something!");
      return;
    }
    
    // Add new note to state
    const newNote = {
      text: inputValue,
      checked: false
    };
    
    setNotes([...notes, newNote]);
    setInputValue(""); // Clear input field
  };

  // Handle pressing Enter key to add a new item
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      newElement();
    }
  };

  // Function to export notes as JSON file
  const exportNotes = () => {
    // Create a JSON string of the notes
    const notesData = JSON.stringify(notes, null, 2);
    
    // Create a blob and download link
    const blob = new Blob([notesData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'notes.json';
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Function to handle file selection for import
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedNotes = JSON.parse(e.target.result);
        if (Array.isArray(importedNotes)) {
          setNotes(importedNotes);
        } else {
          alert("Invalid notes format. Expected an array.");
        }
      } catch (error) {
        alert("Error parsing the file: " + error.message);
      }
    };
    reader.readAsText(file);
    
    // Reset the file input
    event.target.value = null;
  };

  // Function to trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
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
      
      <div className="action-buttons">
        <button onClick={exportNotes} className="export-btn">Export Notes</button>
        <button onClick={triggerFileInput} className="import-btn">Import Notes</button>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept=".json" 
          onChange={handleFileSelect} 
        />
      </div>
      
      <ul id="myUL">
        {/* List items will be added here dynamically */}
      </ul>
    </div>
  );
};

export default Notes;