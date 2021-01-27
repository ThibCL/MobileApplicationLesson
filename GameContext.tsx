import React, { FunctionComponent, useEffect, useState } from "react"
import * as Google from "expo-google-app-auth"
import { Client } from "./Api"

export enum Role {
  Master = "Master",
  Traitor = "Traitor",
  Citizen = "Citizen",
}

export type Game = {
  id: number | undefined
  name: string
  finished: boolean
}

export type Player = {
  id: number | undefined
  name: string
  role: Role
  vote: number | undefined
  score: number
  scoreVar: number
}

export type Options = {
  id: number
  time: number
  vote_anyway: boolean
  number_choices: number
  score_limit: number
}

type GameContextProps = {
  apiClient: Client
  user: Google.GoogleUser | null
  setUser: (user: Google.GoogleUser) => void
  token: string
  setToken: (token: string) => void
  word: string
  setWord: (wrd: string) => void
  wordFound: boolean
  setWordFound: (wrdFound: boolean) => void
  game: Game
  setGame: (gm: Game) => void
  players: Player[]
  setPlayers: (plys: Player[]) => void
  playersElected: number[]
  setPlayersElected: (plyslct: number[]) => void
  options: Options
  setOptions: (opts: Options) => void
  eraseGame: () => void
  playAgain: () => void
  newGame: (game: Game, players: Player[], option: Options) => void
}

export const GameContext = React.createContext<GameContextProps>({
  apiClient: new Client(""),
  token: "",
  setToken: (_token) => {},
  user: null,
  setUser: (_user) => {},
  word: "",
  setWord: (_wrd) => {},
  wordFound: false,
  setWordFound: (_wrdFnd) => {},
  game: { id: undefined, name: "", finished: false },
  setGame: (_gm) => {},
  players: [],
  setPlayers: (plyrs) => {},
  playersElected: [],
  setPlayersElected: (plyrslct) => {},
  options: {
    id: 0,
    time: 5,
    vote_anyway: false,
    number_choices: 1,
    score_limit: 100,
  },
  setOptions: (opt) => {},
  eraseGame: () => {},
  playAgain: () => {},
  newGame: (_g, _p, _o) => {},
})

interface GameProviderProps {
  children: React.ReactNode
}

export const GameProvider: FunctionComponent<GameProviderProps> = ({
  children,
}: GameProviderProps) => {
  const [apiClient, setApiClient] = useState<Client>(
    new Client(
      process.env["API_URL"] ||
        "https://gameinsider.herokuapp.com" ||
        "http://192.168.0.16:7171"
    )
  )
  const [token, setToken] = useState<string>("")
  const [user, setUser] = useState<Google.GoogleUser | null>(null)
  const [word, setWord] = useState<string>("DefaultWord")
  const [wordFound, setWordFound] = useState<boolean>(false)
  const [game, setGame] = useState<Game>({
    id: undefined,
    name: "",
    finished: false,
  })
  const [players, setPlayers] = useState<Player[]>([])
  const [playersElected, setPlayersElected] = useState<number[]>([])
  const [options, setOptions] = useState<Options>({
    id: 0,
    time: 5,
    vote_anyway: false,
    number_choices: 3,
    score_limit: 100,
  })

  const eraseGame = () => {
    setGame({ id: undefined, name: "", finished: false })
    setPlayers([])
    setWord("DefaultWord")
    setPlayersElected([])
  }

  const playAgain = () => {
    let updatedPlayers = [...players]
    for (let player of updatedPlayers) {
      player.scoreVar = 0
      player.vote = undefined
      player.role = Role.Citizen
    }
    setPlayers(updatedPlayers)
    setWord("DefaultWord")
    setPlayersElected([])
  }

  const newGame = (
    previousGame: Game,
    previousPlayers: Player[],
    previousOption: Options
  ) => {
    setWord("DefaultWord")
    setGame({ ...previousGame, id: 0, finished: false })
    setPlayers(
      previousPlayers.map((player: Player, index: number) => {
        player.id = -index
        player.score = 0
        return player
      })
    )
    setOptions({ ...previousOption, id: 0 })
  }

  return (
    <GameContext.Provider
      value={{
        apiClient: apiClient,
        token: token,
        setToken: setToken,
        user: user,
        setUser: setUser,
        word: word,
        setWord: setWord,
        wordFound: wordFound,
        setWordFound: setWordFound,
        game: game,
        setGame: setGame,
        players: players,
        setPlayers: setPlayers,
        playersElected: playersElected,
        setPlayersElected: setPlayersElected,
        options: options,
        setOptions: setOptions,
        eraseGame: eraseGame,
        playAgain: playAgain,
        newGame: newGame,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
