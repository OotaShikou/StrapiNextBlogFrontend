import type {InferGetStaticPropsType, NextPage } from 'next'
import CommonMeta from '../../components/CommonMeta/CommonMeta'
import { Grid, Box, Autocomplete, TextField, Card, CardActionArea, Typography, Breadcrumbs, Link} from '@mui/material';
import { useState } from 'react';
import Profile from "../../components/Profile/Profile";

type Props = InferGetStaticPropsType<typeof getStaticProps>

const CategoryArticleList: NextPage<Props> = ( {blog,serch_option} ) => {

  const [value, setValue] = useState<string | null>("");
  const [inputValue, setInputValue] = useState('');
  return (
    <>
      <CommonMeta></CommonMeta>
      <Breadcrumbs sx={{ pt: 4 }} aria-label="breadcrumb">
          <Link underline="hover" color="inherit">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/category">
            Category
          </Link>
          <Typography color="text.primary">{blog.attributes.name}</Typography>
      </Breadcrumbs>
      <Grid container spacing={2} sx={{ pt: 2, mb: 3,justifyContent: "center"}}>
        <Grid item xs={12} md={9}>
          <Box sx={{ background: "white", p: 2, borderRadius: 1 }}>
            <Autocomplete
              value={value}
              freeSolo
              onChange={(event: any, newValue: string | null) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              options={serch_option}
              sx={{ width: 300, mb: 2 }}
              size="small"
              renderInput={(params) => <TextField {...params} label={`${blog.attributes.name}の記事を検索`} />}
            />

          {blog.attributes.blogs.data.map((item: any) => (
            (
              item.attributes.title.indexOf(value) !== -1
              || item.attributes.title.indexOf(inputValue) !== -1 
            ) && <Box key={item.id}>
              <Card variant="outlined" sx={{ border: "none" }}>
                <CardActionArea className='px-3 py-2' href={`/article/${item.id}`}>
                  <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" ,color:"#999"}}>
                    {item.attributes.updatedAt.substring(0,10)}
                  </Typography>
                  <Typography variant="h5" sx={{ fontSize: "1.1rem", fontWeight: "bold" ,color:"#222"}}>
                    {item.attributes.title}
                  </Typography>
                  <Typography sx={{ fontWeight: "500",fontSize: "0.92rem" ,color:"#222" }}>
                    {item.attributes.description}
                  </Typography>
                </CardActionArea>
              </Card>
              <hr />
            </Box>
          ))}
          </Box> 
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ background: "white", borderRadius: 1, p: 2, maxHeight: "400px" }} >
            <Profile></Profile>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export const getStaticPaths = async () => {
  const res_categories=await fetch(`https://strapi-production-66a0.up.railway.app/api/categories`)
  const categories = await res_categories.json()  

  const paths = categories.data.map((category: any) => ({
    params: {
      id: category.id.toString(),
    },
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async (params: any) => {

  const post_id = params.params.id

  const res=await fetch(`https://strapi-production-66a0.up.railway.app/api/categories/${post_id}?populate=*`)
  const posts=await res.json();
  
  // console.log(posts.data.attributes.blogs)
  const blog = posts.data

  let serch_option:any = []
  for (let i = 0; i < blog.attributes.blogs.data.length; i++) {
    const label = blog.attributes.blogs.data[i].attributes.title
    serch_option.push(label)
  }

  return {
    props:{
      blog: blog || null,
      serch_option
    }
  }
}

export default CategoryArticleList