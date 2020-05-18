export interface PokemonFullDetailsInterface {
  base_happiness: number;
  capture_rate: number;
  color: NamedEntity;
  egg_groups?: (NamedEntity)[] | null;
  evolution_chain: EvolutionChain;
  evolves_from_species: NamedEntity;
  flavor_text_entries?: (FlavorTextEntriesEntity)[] | null;
  form_descriptions?: (null)[] | null;
  forms_switchable: boolean;
  gender_rate: number;
  genera?: (GeneraEntity)[] | null;
  generation: NamedEntity;
  growth_rate: NamedEntity;
  habitat: NamedEntity;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  name: string;
  names?: (NamesEntity)[] | null;
  order: number;
  pal_park_encounters?: (PalParkEncountersEntity)[] | null;
  pokedex_numbers?: (PokedexNumbersEntity)[] | null;
  shape: NamedEntity;
  varieties?: (VarietiesEntity)[] | null;
}
export interface NamedEntity {
  name: string;
  url: string;
}
export interface EvolutionChain {
  url: string;
}
export interface FlavorTextEntriesEntity {
  flavor_text: string;
  language: NamedEntity;
  version: NamedEntity;
}
export interface GeneraEntity {
  genus: string;
  language: NamedEntity;
}
export interface NamesEntity {
  language: NamedEntity;
  name: string;
}
export interface PalParkEncountersEntity {
  area: NamedEntity;
  base_score: number;
  rate: number;
}
export interface PokedexNumbersEntity {
  entry_number: number;
  pokedex: NamedEntity;
}
export interface VarietiesEntity {
  is_default: boolean;
  pokemon: NamedEntity;
}
