import React from 'react';

const PR = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Dummy Pull Request Component</h1>
      <p>This is a placeholder component for testing purposes.</p>
      <button
        onClick={() => alert('Dummy PR button clicked!')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Test Button
      </button>
    </div>
  );
};

export default PR;
