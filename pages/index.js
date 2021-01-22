import { ApolloClient, fromPromise, gql, InMemoryCache } from '@apollo/client';
import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Box, Flex, Heading } from '@chakra-ui/react';

export default function Home(results) {
  const initialState = results;
  const [characters, setCharacters] = useState(initialState.characters)

  return (
    <Flex direction="column" justify="center" align="center">
      <Head>
        <title>NextJS Apollo Tutorial</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box mb={4} flexDir="column" align="center" justify="center" py={8}>
        <Heading as="h1" size="2xl" mb={8}>
          Rick and Morty
        </Heading>
      </Box>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </Flex>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      {
        characters(page: 1) {
          info {
            count
            pages
          }
          results {
            name
            id
            location {
              id
              name
            }
            origin {
              id
              name
            }
            episode {
              id
              episode
              air_date
            }
            image
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    }
  }
}