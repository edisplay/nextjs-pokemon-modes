import React, { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

// Server-side rendering
// export async function getServerSideProps() { // Server side rendering
export async function getStaticProps() { // Change to Static Site Generation (SSG)
    const resp = await fetch(
        "https://raw.githubusercontent.com/edisplay/pokemon/main/index.json"
    );
  return {
    props: {
        pokemon: await resp.json(),
    },
  };
}

// export default function Home() { // Client-side rendering
export default function Home({pokemon}) { // Server-side rendering
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPokemon = useMemo(() => {
        return pokemon.filter((p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.type.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [pokemon, searchTerm]);

    return (
        <div>
            <Head>
                <title>Pokemon Explorer</title>
                <meta name="description" content="Explore and search Pokemon" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className={styles.searchContainer}>
                <div className={styles.searchWrapper}>
                    <div className={styles.header}>
                        <h1>🔴 Pokemon Explorer</h1>
                        <div className={styles.searchBox}>
                            <span className={styles.searchIcon}>🔍</span>
                            <input
                                type="text"
                                placeholder="Search by name or type..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    {searchTerm && (
                        <div className={styles.resultCount}>
                            Found {filteredPokemon.length} result{filteredPokemon.length !== 1 ? "s" : ""}
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {filteredPokemon.map((pokemon) => (
                        <div className={styles.card} key={pokemon.id}>
                            <Link href={`/pokemon/${pokemon.id}`}>
                                <a>
                                    <img
                                        src={`https://raw.githubusercontent.com/edisplay/pokemon/main/${pokemon.image}`}
                                        alt={pokemon.name}
                                        loading="lazy"
                                    />
                                    <h3>{pokemon.name}</h3>
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
                {filteredPokemon.length === 0 && searchTerm && (
                    <div style={{ textAlign: "center", padding: "3rem", color: "white" }}>
                        <h2>No Pokemon found</h2>
                        <p>Try searching for a different name or type</p>
                    </div>
                )}
            </div>
        </div>
    );
}
