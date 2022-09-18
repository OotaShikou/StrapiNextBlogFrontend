import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { Stack, Button } from '@mui/material'
import CommonMeta from '../components/CommonMeta/CommonMeta'

const Home: NextPage = () => {
  return (
    <>
      <CommonMeta></CommonMeta>
      <div className={styles.container}>
        <h1 className="text-blue-600">
          Hello world!
        </h1>
        <h1 className="text-blue-600">
          Hello world!
        </h1>
        <h1 className="text-blue-600">
          Hello world!
        </h1>
        <h1 className="text-blue-600">
          Hello world!
        </h1>
        <h1 className="text-blue-600">
          Hello world!
        </h1>
        
      </div>    
    </>
  )
}

export default Home