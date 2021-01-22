import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Box, Flex, Heading } from '@chakra-ui/react';
import Characters from '../components/Characters';

export default function Home(results) {
  const initialState = results;
  const [characters, setCharacters] = useState(initialState.characters)
  const [search, setSearch] = useState("");

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
        <Characters characters={characters} />
      </Box>

      <footer className={styles.footer}>
        Made by Faisal Sayed
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