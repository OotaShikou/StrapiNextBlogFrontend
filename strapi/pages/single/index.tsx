import Head from 'next/head'
import { Article } from '../../components/Article/Article'
import { SideMenu } from '../../components/Sidemenu/Sidemenu'

export const getStaticProps = async () => {
  const controller = new AbortController();

  const res=await fetch("https://code-ota-blog.herokuapp.com/api/blogs")
  const posts=await res.json();
  console.log(posts);
  

  return {
    props:{posts}
  }
}

export default function Home(data) {
  return (
    <div>
      <main>
        <SideMenu data = {data}></SideMenu>
        <Article></Article>
      </main>
    </div>
  )
}
