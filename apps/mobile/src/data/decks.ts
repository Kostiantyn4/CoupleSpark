import { shuffle } from '@/utils/shuffle';

import intimateJson from './questions/intimate.json';
import regularJson from './questions/regular.json';

/** Decks that own their questions. */
export type SourceDeckId = 'regular' | 'intimate';
/** All decks, including those composed from other decks. */
export type DeckId = SourceDeckId | 'mixed';

/**
 * Shape of an entry in `questions/*.json`.
 * Format mismatches are caught by the type checker (see the `satisfies` checks below).
 */
type RawQuestion = {
  /** Unique within its own file */
  id: number;
  /** Not shown in the app for now: the card header already shows the deck */
  category: string;
  text: string;
};

export type Question = {
  /** Globally unique: `${deckId}-${JSON id}`, since numeric ids of different decks collide in `mixed` */
  id: string;
  text: string;
  /** Deck the question comes from: drives the card header. */
  deckId: SourceDeckId;
};

/** Deck ready for display: tab label + ordered list of questions. */
export type Deck = {
  id: DeckId;
  /** Tab label */
  label: string;
  questions: Question[];
};

/** Source deck: owns its questions and card styling. */
export type SourceDeck = Deck & {
  id: SourceDeckId;
};

/** Composite deck: only references source decks, has no questions of its own. */
type CompositeDeckDefinition = {
  id: DeckId;
  label: string;
  sources: SourceDeckId[];
};

function sourceDeck(meta: Omit<SourceDeck, 'questions'>, raw: RawQuestion[]): SourceDeck {
  return {
    ...meta,
    questions: raw.map(({ id, text }) => ({
      id: `${meta.id}-${id}`,
      text,
      deckId: meta.id,
    })),
  };
}

/** Each deck's questions live in `questions/<deckId>.json` and are bundled at build time. */
const SOURCE_DECKS: Record<SourceDeckId, SourceDeck> = {
  regular: sourceDeck(
    { id: 'regular', label: 'Загальні' },
    regularJson satisfies RawQuestion[],
  ),
  intimate: sourceDeck(
    { id: 'intimate', label: 'Інтимні' },
    intimateJson satisfies RawQuestion[],
  ),
};

const MIXED: CompositeDeckDefinition = {
  id: 'mixed',
  label: 'Змішані',
  sources: ['regular', 'intimate'],
};

/**
 * Collects questions from all sources and shuffles them.
 * Runs once at module load, so the order is new on every app launch
 * and stable within a session (deck progress is not reset).
 */
function resolveComposite(definition: CompositeDeckDefinition): Deck {
  return {
    id: definition.id,
    label: definition.label,
    questions: shuffle(definition.sources.flatMap((id) => SOURCE_DECKS[id].questions)),
  };
}

/** Tab order on screen. */
export const DECKS: Deck[] = [SOURCE_DECKS.regular, SOURCE_DECKS.intimate, resolveComposite(MIXED)];

const DECKS_BY_ID = Object.fromEntries(DECKS.map((d) => [d.id, d])) as Record<DeckId, Deck>;

export function getDeck(id: DeckId): Deck {
  return DECKS_BY_ID[id];
}

/** Card styling for a question: O(1). */
export function getSourceDeck(id: SourceDeckId): SourceDeck {
  return SOURCE_DECKS[id];
}
