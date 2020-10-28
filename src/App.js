import React, { useEffect, useState } from 'react';

import './styles.css';

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [id, setId] = useState('');

  useEffect(() => {
    api
      .get('/repositories') // sim eu sei que é repository o certo, mas já foi assim mesmo
      .then((response) => {
        setRepositories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Repositorio ${Date.now()}`,
      url: 'www.git.com/repo1',
      techs: ['React', 'Nodejs'],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
    console.log(repositories);
  }

  const handleRemoveRepository = async (id) => {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));
  };

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((element) => {
          return (
            <li key={element.id}>
              <h1>{element.title}</h1>
              <button onClick={() => handleRemoveRepository(element.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
