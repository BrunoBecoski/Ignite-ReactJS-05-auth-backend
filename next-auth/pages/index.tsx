import { FormEvent, useContext, useState } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { withSSRGuest } from '../utils/withSSRGuest';

import styles from '../styles/Login.module.css';

export default function Home() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password
    }

    await signIn(data);
  }
 
  return (
    <div className={styles.container}>
      <h1>NEXT AUTH</h1>
      <form onSubmit={handleSubmit} >
        <h2>Login</h2>
        <label htmlFor="email">
          E-mail
          <input 
            id="email" 
            type="email" 
            value={email} 
            placeholder="diego@rocketseat.team"
            onChange={e => setEmail(e.target.value)} 
          />
        </label>

        <label htmlFor="password">
          Senha
          <input 
            id="password" 
            type="password" 
            value={password} 
            placeholder="123456"
            onChange={e => setPassword(e.target.value)} 
          />
        </label>

        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}


export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});