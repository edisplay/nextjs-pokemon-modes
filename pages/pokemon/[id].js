/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Details.module.css";

// Static Site Generation (SSG) - Know what all the routes are
export async function getStaticPaths() {
    const resp = await fetch(
       "https://raw.githubusercontent.com/edisplay/pokemon/main/index.json"
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
       `https://raw.githubusercontent.com/edisplay/pokemon/main/pokemon/${params.id}.json`
    );
    return {
       props: {
           pokemon: await resp.json(),
       },
       // revalidate : 30, // add fresh dynamic data every 30 seconds
    };
}

export default function Details({ pokemon }) {
    if (!pokemon) return null;
    return (
       <div>
           <Head>
               <title>{pokemon.name} - Pokemon Explorer</title>
               <meta name="description" content={`Learn about ${pokemon.name}`} />
               <meta name="viewport" content="width=device-width, initial-scale=1" />
           </Head>
           <Link href="/" className={styles.backButton}>
               ← Back to Explorer
           </Link>
           <div className={styles.layout}>
               <div className={styles.imageContainer}>
                   <img
                       className={styles.picture}
                       src={`https://raw.githubusercontent.com/edisplay/pokemon/main/${pokemon.image}`}
                       alt={pokemon.name}
                       loading="lazy"
                   />
               </div>
               <div className={styles.info}>
                   <div className={styles.header}>
                       <h1 className={styles.name}>{pokemon.name}</h1>
                       <div className={styles.type}>
                           {Array.isArray(pokemon.type) && pokemon.type.map((t) => (
                               <span key={t} className={styles.typeTag}>{t}</span>
                           ))}
                       </div>
                   </div>
                   <div className={styles.statsSection}>
                       <h2 className={styles.statsTitle}>Base Stats</h2>
                       <div className={styles.statsList}>
                           {Array.isArray(pokemon.stats) && pokemon.stats.map(({ name, value }) => (
                               <div key={name} className={styles.statItem}>
                                   <div className={styles.statName}>{name}</div>
                                   <div className={styles.statValue}>{value}</div>
                                   <div className={styles.statBar}>
                                       <div 
                                           className={styles.statBarFill}
                                           style={{ width: `${Math.min(value / 1.5, 100)}%` }}
                                       />
                                   </div>
                               </div>
                           ))}
                       </div>
                   </div>
               </div>
           </div>
       </div>
    );
}
