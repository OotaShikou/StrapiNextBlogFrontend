import type {InferGetStaticPropsType, NextPage } from 'next'
import Typography from '@mui/material/Typography';
import CommonMeta from '../../components/CommonMeta/CommonMeta'
import { Grid, Box, Autocomplete, TextField, Card, CardActionArea } from '@mui/material';
import { useState } from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>

const CategoryArticleList: NextPage<Props> = ( {blog} ) => {
  let serch_option:any = []
  for (let i = 0; i < blog.attributes.blogs.data.length; i++) {
    const label = blog.attributes.blogs.data[i].attributes.title
    serch_option.push(label)
  }
  const [value, setValue] = useState<string | null>("");
  const [inputValue, setInputValue] = useState('');
  return (
    <>
      <CommonMeta></CommonMeta>
      <Grid container spacing={2} sx={{ pt: 5, mb: 3,justifyContent: "center"}}>
        <Grid item xs={12} md={8}>
          <Box sx={{ background: "white", p: 2, borderRadius: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold",fontSize: "1.2rem" }}>
              {blog.attributes.name}の記事一覧
            </Typography>
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
              sx={{ width: 300, mt: 2 }}
              renderInput={(params) => <TextField {...params} label="記事を検索" />}
            />

          {blog.attributes.blogs.data.map((item: any) => (
            (
              item.attributes.title.indexOf(value) !== -1
              || item.attributes.title.indexOf(inputValue) !== -1 
            ) && <Box key={item.id} className='mt-3'>
              <Card variant="outlined" sx={{ border: "none" }}>
                <CardActionArea className='px-3 py-2' href={`/article/${item.id}`}>
                  <Typography>
                    {item.attributes.updatedAt.substring(0,10)}
                  </Typography>
                  <Typography variant="h5">
                    {item.attributes.title}
                  </Typography>
                  <Typography>
                    {item.attributes.description}
                  </Typography>
                </CardActionArea>
              </Card>
              <hr />
            </Box>
          ))}
          </Box> 
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ background: "white", borderRadius: 1, p: 2   }}>
            <Card variant="outlined">
                Icon
            </Card>
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

  return {
    props:{
      blog: blog || null,
    }
  }
}

export default CategoryArticleList