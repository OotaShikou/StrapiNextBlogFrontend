import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { Stack, Button } from '@mui/material'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1 className="text-blue-600 md:text-green-600">
        Hello world!
      </h1>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <Stack spacing={2} direction="row">
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Stack>
      </main>
    </div>
  )
}

export default Home