import { useContext } from 'react';

import { setupAPIClient } from '../services/api';
import { withSSRAuth } from '../utils/withSSRAuth';
import { AuthContext } from '../contexts/AuthContext';

import styles from '../styles/Metrics.module.css';

export default function Metrics() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>NEXT AUTH</h1>
        <h2>Métricas</h2>
        <button onClick={signOut}>Sign</button>
      </header>

      <main className={styles.main}>
        <h2>Permissões</h2>
        <ul>
          {user?.permissions.map(permission => <li>{permission.replace(/\./, " ")}</li>)}
        </ul>
      </main>
    </div>
  ) 
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');


  return {
    props: {}
  }
}, {
  permissions: ['metrics.list'],
  roles: ['administrator']
})