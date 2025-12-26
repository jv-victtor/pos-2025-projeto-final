import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const ResourceManager = ({ resource }) => {
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Carregar dados (READ)
  useEffect(() => {
    loadData();
    setEditingItem(null);
    setIsFormOpen(false);
  }, [resource]);

  const loadData = async () => {
    try {
      const response = await axios.get(`${API_URL}/${resource}/`);
      setData(response.data);
    } catch (error) {
      console.error("Erro ao carregar dados", error);
    }
  };

  // Deletar (DELETE)
  const handleDelete = async (id) => {
    if(!window.confirm("Tem certeza?")) return;
    try {
      await axios.delete(`${API_URL}/${resource}/${id}/`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      alert("Erro ao deletar");
    }
  };

  // Preparar Edição
  const handleEdit = (item) => {
    setFormData(item);
    setEditingItem(item.id);
    setIsFormOpen(true);
  };

  // Preparar Criação
  const handleCreate = () => {
    setFormData({});
    setEditingItem(null);
    setIsFormOpen(true);
  };

  // Enviar Formulário (CREATE / UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        // Update
        const res = await axios.put(`${API_URL}/${resource}/${editingItem}/`, formData);
        setData(data.map(item => (item.id === editingItem ? res.data : item)));
      } else {
        // Create
        const res = await axios.post(`${API_URL}/${resource}/`, formData);
        setData([...data, res.data]);
      }
      setIsFormOpen(false);
    } catch (error) {
      alert("Erro ao salvar. Verifique o console para detalhes de validação.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    // Lida com campos simples. Para aninhados (JSON) seria necessário mais lógica.
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Renderização dinâmica dos campos do formulário baseada nas chaves do primeiro item
  // (Ou campos vazios se não houver dados ainda)
  const renderFormFields = () => {
    // Define chaves baseadas no item atual ou num modelo vazio se lista vazia
    const keys = data.length > 0 ? Object.keys(data[0]) : ['title', 'body', 'name', 'userId']; 
    
    return keys.map(key => {
      if (key === 'id') return null;
      // Simplificação: Transforma objetos/arrays em string para edição
      const value = typeof formData[key] === 'object' 
        ? JSON.stringify(formData[key]) 
        : formData[key] || '';

      return (
        <div key={key} className="form-group">
          <label style={{textTransform: 'capitalize'}}>{key}</label>
          <input 
            name={key} 
            value={value} 
            onChange={handleChange} 
            placeholder={key}
          />
        </div>
      );
    });
  };

  return (
    <div>
      <h2>Gerenciando: <span style={{color: '#007bff', textTransform: 'capitalize'}}>{resource}</span></h2>
      
      {!isFormOpen ? (
        <>
          <button className="btn btn-add" onClick={handleCreate}>+ Novo Item</button>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Info Principal</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {/* Tenta mostrar um campo representativo */}
                    {item.title || item.name || item.body || "Item sem título"}
                  </td>
                  <td>
                    <button className="btn btn-edit" onClick={() => handleEdit(item)}>Editar</button>
                    <button className="btn btn-del" onClick={() => handleDelete(item.id)}>X</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="card">
          <h3>{editingItem ? 'Editar' : 'Criar'}</h3>
          <form onSubmit={handleSubmit}>
            {renderFormFields()}
            <button type="submit" className="btn btn-add">Salvar</button>
            <button type="button" className="btn btn-del" onClick={() => setIsFormOpen(false)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResourceManager;