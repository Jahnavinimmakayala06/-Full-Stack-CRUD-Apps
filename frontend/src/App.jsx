import { useState } from 'react';

function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item One', category: 'Category A' },
    { id: 2, name: 'Item Two', category: 'Category B' }
  ]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [editId, setEditId] = useState(null);

  // CREATE / UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !category) return;

    if (editId) {
      setItems(items.map(item => item.id === editId ? { ...item, name, category } : item));
      setEditId(null);
    } else {
      setItems([...items, { id: Date.now(), name, category }]);
    }
    setName('');
    setCategory('');
  };

  // READ (EDIT PRE-FILL)
  const handleEdit = (item) => {
    setEditId(item.id);
    setName(item.name);
    setCategory(item.category);
  };

  // DELETE
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h2>CRUD Application Manager</h2>

      {/* Form for Create & Update */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Item Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={{ padding: '8px', flex: 1 }}
        />
        <input 
          type="text" 
          placeholder="Category" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          style={{ padding: '8px', flex: 1 }}
        />
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
          {editId ? 'Update' : 'Add'}
        </button>
      </form>

      {/* Table for Read & Delete */}
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>
                <button onClick={() => handleEdit(item)} style={{ marginRight: '8px' }}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;