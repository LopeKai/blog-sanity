import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import imageUrlBuilder from '@sanity/image-url'

import { Toolbar } from '../components/toolbar'

import styles from '../styles/Home.module.css'

export default function Home({ posts }) {
  const router = useRouter()
  const [mappedPosts, setMappedPosts] = useState([])

  console.log(mappedPosts)

  useEffect(() => {
    if(posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: 'cz1pq6vh',
        dataset: 'production'
      })

      setMappedPosts(
        posts.map(p => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage).width(500).height(250),
          }
        })
      )
    } 
    else {
      setMappedPosts([])
    }
  },[posts])

  return (
    <div className={styles.container}>
      <Toolbar />
      <div className={styles.main}>
        <h1 className={styles.title}>welcome To My Blog</h1>

        <h3>Recent Posts:</h3>

        <div className={styles.feed}>
          {mappedPosts.length ? mappedPosts.map((p, index) => {
            return (
              <div onClick={() => router.push(`/post/${p.slug.current}`)} key={index} className={styles.post}>
                <h3 className={styles.titlePost}>{p.title}</h3>
                <img className={styles.mainImage} src={p.mainImage} />
              </div> 
            )
          }) : <>No Posts Yet</>}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (pageContext) => {
  const query = encodeURIComponent('*[_type == "post"]')
  const url = `https://cz1pq6vh.api.sanity.io/v1/data/query/production?query=${query}`

  const result = await fetch(url).then(res => res.json())

  if (!result.result || !result.result.length) {
    return {
      props: {
        posts: []
      }
    }
  }
  else {
    return {
      props: {
        posts: result.result
      }
    }
  }
}
