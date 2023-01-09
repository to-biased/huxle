import { defineStore } from "pinia";
import { i18n } from "../i18n";

export type ColoredLetters = {
  gray: string[]; // letters not in prompt
  yellow: string[]; // letters in prompt
  green: string[]; // letters in prompt and guessed correctly
};

const Colors = {
  Green: "🟩",
  Yellow: "🟨",
  Gray: "⬜"
};

export type GameState = {
  promptDE: string;
  promptEN: string;
  guesses: string[];
  guessIndex: number;
  letters: ColoredLetters;
  win: boolean;
  lose: boolean;
  stats: boolean;
  result: string[];
};

export const useGameStore = defineStore("game", {
  state: () => ({
    gameState: {
      promptDE: "",
      promptEN: "",
      guesses: ["", "", "", "", "", ""],
      guessIndex: 0,
      letters: { gray: [], yellow: [], green: [] },
      win: false,
      lose: false,
      stats: false,
      result: []
    } as GameState,
  }),
  getters: {
    getGameState(): GameState {
      return this.gameState;
    },
    getPrompt(): string {
      return i18n.global.locale.value == "de"
        ? this.gameState.promptDE
        : this.gameState.promptEN;
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
    isFinished(): boolean {
      return this.gameState.win || this.gameState.lose;
    },
    isWin(): boolean {
      return this.gameState.win;
    },
    getStats(): boolean {
      return this.gameState.stats;
    },
    getResult(): string[] {
      return this.gameState.result;
    }
  },
  actions: {
    setGameState(gameState: GameState) {
      this.gameState = gameState;
    },
    win() {
      this.gameState.win = true;
    },
    lose() {
      this.gameState.lose = true;
    },
    showStats() {
      this.gameState.stats = true;
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
      this.gameState.result.push(Colors.Gray);
    },
    addYellowLetter(letter: string) {
      this.gameState.letters.yellow.push(letter);
      this.gameState.result.push(Colors.Yellow);
    },
    addGreenLetter(letter: string) {
      this.gameState.letters.green.push(letter);
      this.gameState.result.push(Colors.Green);
    },
    addNewLine() {
      this.gameState.result.push('\n');
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
