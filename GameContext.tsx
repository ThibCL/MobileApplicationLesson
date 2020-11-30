import React, { FunctionComponent, useState } from "react"
import * as Google from "expo-google-app-auth"
import { Client } from "./Api"

export enum Role {
  Master = "Master",
  Traitor = "Traitor",
  Citizen = "Citizen",
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
  time: number
  voteAnyway: boolean
  numberChoices: number
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
  gameId: number | undefined
  setGameId: (id: number) => void
  players: Player[]
  setPlayers: (plys: Player[]) => void
  playersElected: number[]
  setPlayersElected: (plyslct: number[]) => void
  options: Options
  setOptions: (opts: Options) => void
  eraseGame: () => void
  playAgain: () => void
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
  gameId: undefined,
  setGameId: (_id) => {},
  players: [],
  setPlayers: (plyrs) => {},
  playersElected: [],
  setPlayersElected: (plyrslct) => {},
  options: { time: 5, voteAnyway: false, numberChoices: 1 },
  setOptions: (opt) => {},
  eraseGame: () => {},
  playAgain: () => {},
})

interface GameProviderProps {
  children: React.ReactNode
}

export const GameProvider: FunctionComponent<GameProviderProps> = ({
  children,
}: GameProviderProps) => {
  const [apiClient, setApiClient] = useState<Client>(
    new Client(process.env["API_URL"] || "http://192.168.0.16:7171")
  )
  const [token, setToken] = useState<string>("")
  const [user, setUser] = useState<Google.GoogleUser | null>(null)
  const [word, setWord] = useState<string>("DefaultWord")
  const [wordFound, setWordFound] = useState<boolean>(false)
  const [gameId, setGameId] = useState<number | undefined>(undefined)
  const [players, setPlayers] = useState<Player[]>([])
  const [playersElected, setPlayersElected] = useState<number[]>([])
  const [options, setOptions] = useState<Options>({
    time: 5,
    voteAnyway: false,
    numberChoices: 3,
  })

  const eraseGame = () => {
    setGameId(undefined)
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
        gameId: gameId,
        setGameId: setGameId,
        players: players,
        setPlayers: setPlayers,
        playersElected: playersElected,
        setPlayersElected: setPlayersElected,
        options: options,
        setOptions: setOptions,
        eraseGame: eraseGame,
        playAgain: playAgain,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
