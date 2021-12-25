import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const POKEMON_NAMES = [
  'bulbasaur',
  'ivysaur',
  'venusaur',
  'charmander',
  'charmeleon',
  'charizard',
  'mew',
] as const;

export type PokemonName = typeof POKEMON_NAMES[number];

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getPokemonByName: builder.query({
      query: (name: PokemonName) => `pokemon/${name}`,
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetPokemonByNameQuery } = pokemonApi;
