export type PokemonList = {
  name: string;
  url: string;
};

export type PokemonType = { name: string };

export type PokemonDetail = {
  id: string;
  types: { type: { name: string } }[];
  name: string;
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
};
