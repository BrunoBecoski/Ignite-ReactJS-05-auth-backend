import { useContext, useEffect } from 'react';

import { withSSRAuth } from '../utils/withSSRAuth';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/apiClient';
import { setupAPIClient } from '../services/api';
import { Can } from '../components/Can';

import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response));
  },[]);

  return (
    <div className={styles.container}>
    <header>
      <h1>NEXT AUTH</h1>

      <h2>Dashboard</h2>

      <button onClick={signOut}>Sign</button>
    </header>
      <h1>E-mail: {user?.email}</h1>

      <h3>Permissões</h3>
      <ul>
        {user?.permissions.map(permission => <li>{permission}</li>)}
      </ul>

      <h3>Funções</h3>
      <ul>
        {user?.roles.map(role => <li>{role}</li>)}
      </ul>

      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
    </div>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient =  setupAPIClient(ctx);
  const response = await apiClient.get('/me');

  console.log(response.data);

  return {
    props: {}
  }
});