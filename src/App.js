import React, { useState, useEffect } from 'react';

function App() {
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('diaryEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (input.trim()) {
      const newEntry = {
        id: Date.now(),
        text: input,
        date: new Date().toLocaleDateString()
      };
      setEntries([newEntry, ...entries]);
      setInput('');
    }
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 一言日記</h1>
      <textarea
        rows="4"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="今日の出来事を書こう"
        style={styles.textarea}
      />
      <button onClick={addEntry} style={styles.button}>保存</button>
      <div style={styles.entryList}>
        {entries.map(entry => (
          <div key={entry.id} style={styles.entry}>
            <div style={styles.entryDate}>{entry.date}</div>
            <div style={styles.entryText}>{entry.text}</div>
            <button onClick={() => deleteEntry(entry.id)} style={styles.deleteButton}>削除</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'sans-serif',
    backgroundColor: '#fffefc',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    resize: 'none',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#5cb85c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  entryList: {
    marginTop: '20px',
  },
  entry: {
    backgroundColor: '#f8f8f8',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  entryDate: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '5px',
  },
  entryText: {
    fontSize: '16px',
    color: '#333',
    whiteSpace: 'pre-wrap',
  },
  deleteButton: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#d9534f',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  }
};

export default App;
