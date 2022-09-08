import Head from 'next/head'
import { useRouter } from "next/router";
import { Article } from '../../components/Article/Article'
import { SideMenu } from '../../components/Sidemenu/Sidemenu'

export const getStaticProps = async () => {
  const controller = new AbortController();

  const res=await fetch("http://localhost:1337/api/blogs")
  const posts=await res.json();
  console.log(posts);
  

  return {
    props:{posts}
  }
}

export default function Blog(data) {
    return (
        <div>
        <main>
            <SideMenu data = {data}></SideMenu>
            <Article></Article>
        </main>
        </div>
    )
}
