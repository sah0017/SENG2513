import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Timer from './Timer';

// Mock timer functions
jest.useFakeTimers();

describe('Timer Component', () => {
  test('renders initial timer state correctly', () => {
    render(<Timer />);
    
    // Check if all elements are rendered with correct initial values
    expect(screen.getByText('Hr')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
    
    // Initial time should be 00:00:00:00
    const digits = screen.getAllByTestId('digit');
    expect(digits[0]).toHaveTextContent('00'); // Hours
    expect(digits[1]).toHaveTextContent('00'); // Minutes
    expect(digits[2]).toHaveTextContent('00'); // Seconds
    expect(digits[3]).toHaveTextContent('00'); // Milliseconds
  });

  test('starts the timer when Start button is clicked', () => {
    render(<Timer />);
    
    // Click the Start button
    fireEvent.click(screen.getByText('Start'));
    
    // Advance timer by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Time should be 00:00:01:00
    const digits = screen.getAllByTestId('digit');
    expect(digits[0]).toHaveTextContent('00'); // Hours
    expect(digits[1]).toHaveTextContent('00'); // Minutes
    expect(digits[2]).toHaveTextContent('01'); // Seconds
    expect(digits[3]).toHaveTextContent('00'); // Milliseconds rounded to tenths
  });

  test('stops the timer when Stop button is clicked', () => {
    render(<Timer />);
    
    // Start the timer
    fireEvent.click(screen.getByText('Start'));
    
    // Advance timer by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Stop the timer
    fireEvent.click(screen.getByText('Stop'));
    
    // Record current time values
    const digitsAfterStop = screen.getAllByTestId('digit');
    const secondsAfterStop = digitsAfterStop[2].textContent;
    
    // Advance timer more
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Time should remain the same as when stopped
    const digitsAfterMoreTime = screen.getAllByTestId('digit');
    expect(digitsAfterMoreTime[2].textContent).toBe(secondsAfterStop);
  });

  test('resets the timer when Reset button is clicked', () => {
    render(<Timer />);
    
    // Start the timer
    fireEvent.click(screen.getByText('Start'));
    
    // Advance timer by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Reset the timer
    fireEvent.click(screen.getByText('Reset'));
    
    // Timer should be reset to 00:00:00:00
    const digits = screen.getAllByTestId('digit');
    expect(digits[0]).toHaveTextContent('00'); // Hours
    expect(digits[1]).toHaveTextContent('00'); // Minutes
    expect(digits[2]).toHaveTextContent('00'); // Seconds
    expect(digits[3]).toHaveTextContent('00'); // Milliseconds
  });

  test('correctly formats time with minutes, hours, and milliseconds', () => {
    render(<Timer />);
    
    // Start the timer
    fireEvent.click(screen.getByText('Start'));
    
    // Mock advancing time to 1 hour, 30 minutes, 45 seconds, and 500 ms
    // (3600000 + 1800000 + 45000 + 500 = 5445500 ms)
    act(() => {
      // Need to directly manipulate the state since we can't practically advance timers by that much
      jest.advanceTimersByTime(5445500);
    });
    
    // Check if time is displayed correctly
    const digits = screen.getAllByTestId('digit');
    expect(digits[0]).toHaveTextContent('01'); // Hours
    expect(digits[1]).toHaveTextContent('30'); // Minutes
    expect(digits[2]).toHaveTextContent('45'); // Seconds
    expect(digits[3]).toHaveTextContent('50'); // Milliseconds (500ms displayed as 50)
  });
});