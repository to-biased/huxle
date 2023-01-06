import { defineStore } from "pinia";

export type ColoredLetters = {
  gray: string[]; // letters not in prompt
  yellow: string[]; // letters in prompt
  green: string[]; // letters in prompt and guessed correctly
};

export type GameState = {
  prompt: string;
  guesses: string[];
  guessIndex: number;
  letters: ColoredLetters;
};

export const useGameStore = defineStore("game", {
  state: () => ({
    gameState: {
      prompt: "",
      guesses: ["", "", "", "", "", ""],
      guessIndex: 0,
      letters: { gray: [], yellow: [], green: [] },
    } as GameState,
  }),
  getters: {
    getGameState(): GameState {
      return this.gameState;
    },
    getPrompt(): string {
      return this.gameState.prompt;
    },
    getGuesses(): string[] {
      return this.gameState.guesses;
    },
    getGuessIndex(): number {
      return this.gameState.guessIndex;
    },
    getLetters(): ColoredLetters {
      return this.gameState.letters;
    },
  },
  actions: {
    setGameState(gameState: GameState) {
      this.gameState = gameState;
    },
    setPrompt(prompt: string) {
      this.gameState.prompt = prompt;
    },
    addGuess(guess: string) {
      this.gameState.guesses.push(guess);
    },
    incGuessIndex() {
      this.gameState.guessIndex++;
    },
    addGrayLetter(letter: string) {
      this.gameState.letters.gray.push(letter);
    },
    addYellowLetter(letter: string) {
      this.gameState.letters.yellow.push(letter);
    },
    addGreenLetter(letter: string) {
      this.gameState.letters.green.push(letter);
    },
    backspace() {
      const guessIndex = this.gameState.guessIndex;
      this.gameState.guesses[guessIndex] = this.gameState.guesses[
        guessIndex
      ].slice(0, -1);
    },
    getCurrentGuess() {
      return this.gameState.guesses[this.gameState.guessIndex];
    },
    appendGuess(key: string) {
      this.gameState.guesses[this.gameState.guessIndex] += key;
    },
  },
});
