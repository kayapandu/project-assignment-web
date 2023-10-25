import { useState, useEffect } from "react";
import { PokemonDetail, PokemonList, PokemonType } from "../types/Pokemon";

const BASE_URL = 'https://pokeapi.co/api/v2/';

export const usePokemonList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [nextPage, setNextPage] = useState("");

  const getPokemon = () => {
    setIsLoading(true);

    fetch(nextPage ? nextPage : `${BASE_URL}pokemon?limit=10`)
      .then((response) => response.json())
      .then((data) => {
        setNextPage(data.next);
        const results = data.results;
        const promisesArray = results.map((result: PokemonList) => {
          return fetch(result.url).then((response) => response.json());
        });
        return Promise.all(promisesArray);
      })
      .then((data) => {
        setPokemon(nextPage ? [...pokemon, ...data] : data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return {
    isLoading,
    pokemon,
    nextPage,
    getPokemon,
  };
};
