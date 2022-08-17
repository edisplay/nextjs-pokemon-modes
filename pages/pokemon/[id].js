/* eslint-disable @next/next/no-img-element */
/* // Client-side rendering
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"; 
*/
import React from "react"; // Server-side rendering
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Details.module.css";

// Static Site Generation (SSG) - Know what all the routes are
export async function getStaticPaths() {
    const resp = await fetch(
        "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
    );
    const pokemon = await resp.json();
    return {
        paths: pokemon.map((pokemon) => ({
            params: { id: pokemon.id.toString() },
        })),
        fallback: false,
    }
}

// Server-side rendering
// export async function getServerSideProps({ params }) { // Server side rendering
export async function getStaticProps({ params }) { // Change to Static Site Generation (SSG)
    const resp = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
    );
    return {
        props: {
            pokemon: await resp.json(),
        },
        // revalidate : 30, // add fresh dynamic data every 30 seconds
    };
}

export default function Details({ pokemon }) {
    /* // Client-side rendering
    const {
        query: { id },
    } = useRouter();

    const [pokemon, setPokemon] = useState(null); // null - an object not an array []

    useEffect(() => {
        async function getPokemon() {
            const resp = await fetch(
                `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
            );
            setPokemon(await resp.json());
        }

        if (id) {
            getPokemon();
        }
    }, [id]);

    if (!pokemon) {
        return null;
    }
    */

    return (
        <div>
            <Head>
                <title>{pokemon.name}</title>
            </Head>
            <Link href="/">
                <a>Back to Home</a>
            </Link>
            <div className={styles.layout}>
                <div>
                    <img
                        className={styles.picture}
                        src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                        alt={pokemon.name.english}
                    />
                </div>
                <div>
                    <div className={styles.name}>{pokemon.name}</div>
                    <div className={styles.type}>{pokemon.type.join(", ")}</div>
                    <table>
                        <thead className={styles.header}>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon.stats.map(({ name, value }) => (
                                <tr key={name}>
                                    <td className={styles.attribute}>{name}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <div>{JSON.stringify(pokemon)}</div> */}
        </div>
    );
}
