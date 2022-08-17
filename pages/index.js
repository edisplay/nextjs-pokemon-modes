/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

// Server-side rendering
// export async function getServerSideProps() { // Server side rendering
export async function getStaticProps() { // Change to Static Site Generation (SSG)
    const resp = await fetch(
        "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
    );
  return {
    props: {
        pokemon: await resp.json(),
    },
  };
}

// export default function Home() { // Client-side rendering
export default function Home({pokemon}) { // Server-side rendering
    /* // Client-side rendering
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        async function getPokemon() {
            const resp = await fetch(
                "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
            );
            setPokemon(await resp.json());
        }
        getPokemon();
    }, []); */

    return (
        <div className={styles.container}>
            <Head>
                <title>Pokemon List</title>
            </Head>
            <h2>Pokemon List</h2>
            <div className={styles.grid}>
                {pokemon.map((pokemon) => (
                    <div className={styles.card} key={pokemon.id}>
                        <Link href={`/pokemon/${pokemon.id}`}>
                            <a>
                                <img
                                    src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                                    alt={pokemon.name}
                                />
                                <h3>{pokemon.name}</h3>
                            </a>
                        </Link>
                        {/* {JSON.stringify(pokemon)} */}
                    </div>
                ))}
            </div>
        </div>
    );
}
