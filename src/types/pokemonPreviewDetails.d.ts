export interface PokemonPreviewDetailsInterface   {
    abilities?: (AbilitiesEntity)[] | null;
    base_experience: number;
    forms?: (NamedEntity)[] | null;
    game_indices?: (GameIndicesEntity)[] | null;
    height: number;
    held_items?: (null)[] | null;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves?: (MovesEntity)[] | null;
    name: string;
    order: number;
    species: NamedEntity;
    sprites: Sprites;
    stats?: (StatsEntity)[] | null;
    types?: (TypesEntity)[] | null;
    weight: number;
  }
  export interface AbilitiesEntity {
    ability: NamedEntity;
    is_hidden: boolean;
    slot: number;
  }
  export interface NamedEntity {
    name: string;
    url: string;
  }
  export interface GameIndicesEntity {
    game_index: number;
    version: NamedEntity;
  }
  export interface MovesEntity {
    move: NamedEntity;
    version_group_details?: (VersionGroupDetailsEntity)[] | null;
  }
  export interface VersionGroupDetailsEntity {
    level_learned_at: number;
    move_learn_method: NamedEntity;
    version_group: NamedEntity;
  }
  export interface Sprites {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  }
  export interface StatsEntity {
    base_stat: number;
    effort: number;
    stat: NamedEntity;
  }
  export interface TypesEntity {
    slot: number;
    type: NamedEntity;
  }
  