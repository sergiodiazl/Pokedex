export interface EvolutionDetails {
    baby_trigger_item?: null;
    chain: Chain;
    id: number;
  }
  export interface Chain {
    evolution_details?: (null)[] | null;
    evolves_to?: (EvolvesToEntity)[] | null;
    is_baby: boolean;
    species: TriggerOrSpecies;
  }
  export interface EvolvesToEntity {
    evolution_details?: (EvolutionDetailsEntity)[] | null;
    evolves_to?: (EvolvesToEntity1)[] | null;
    is_baby: boolean;
    species: TriggerOrSpecies;
  }
  export interface EvolutionDetailsEntity {
    gender?: null;
    held_item?: null;
    item?: null;
    known_move?: null;
    known_move_type?: null;
    location?: null;
    min_affection?: null;
    min_beauty?: null;
    min_happiness?: null;
    min_level: number;
    needs_overworld_rain: boolean;
    party_species?: null;
    party_type?: null;
    relative_physical_stats?: null;
    time_of_day: string;
    trade_species?: null;
    trigger: TriggerOrSpecies;
    turn_upside_down: boolean;
  }
  export interface TriggerOrSpecies {
    name: string;
    url: string;
  }
  export interface EvolvesToEntity1 {
    evolution_details?: (EvolutionDetailsEntity)[] | null;
    evolves_to?: (null)[] | null;
    is_baby: boolean;
    species: TriggerOrSpecies;
  }
  