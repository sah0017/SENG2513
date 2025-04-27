import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Notes from './Notes';

describe('Notes Component', () => {
  beforeEach(() => {
    // Reset the DOM
    document.body.innerHTML = '';
  });

  test('renders the Notes component', () => {
    render(<Notes />);
    expect(screen.getByText('Notes')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title...')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  test('adds a new note when Add button is clicked', () => {
    render(<Notes />);
    
    const input = screen.getByPlaceholderText('Title...');
    const addButton = screen.getByText('Add');
    
    fireEvent.change(input, { target: { value: 'Test Note' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Test Note')).toBeInTheDocument();
    // Input should be cleared after adding
    expect(input.value).toBe('');
  });

  test('shows alert when trying to add empty note', () => {
    window.alert = jest.fn();
    render(<Notes />);
    
    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);
    
    expect(window.alert).toHaveBeenCalledWith('You must write something!');
  });

  test('adds a new note when Enter key is pressed', () => {
    render(<Notes />);
    
    const input = screen.getByPlaceholderText('Title...');
    
    fireEvent.change(input, { target: { value: 'Enter Key Note' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
    
    expect(screen.getByText('Enter Key Note')).toBeInTheDocument();
    expect(input.value).toBe('');
  });

  test('deletes a note when close button is clicked', async () => {
    render(<Notes />);
    
    // Add a note first
    const input = screen.getByPlaceholderText('Title...');
    const addButton = screen.getByText('Add');
    
    fireEvent.change(input, { target: { value: 'Delete Test' } });
    fireEvent.click(addButton);
    
    // Find the close button and click it
    const closeButtons = document.getElementsByClassName('close');
    expect(closeButtons.length).toBe(1);
    
    fireEvent.click(closeButtons[0]);
    
    // The note should no longer be visible
    const listItems = document.querySelectorAll('li');
    expect(listItems.length).toBe(0);
  });
});