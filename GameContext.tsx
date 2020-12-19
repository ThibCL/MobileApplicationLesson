import React, { FunctionComponent, useContext, useState } from "react"

export enum Role {
  Master = "Master",
  Traitor = "Traitor",
  Citizen = "Citizen",
}

export type Player = {
  name: string
  role: Role
  vote: Player | undefined
  score: number
  scoreVar: number
}

export type Options = {
  time: number
  voteAnyway: boolean
  numberChoices: number
}

type GameContextProps = {
  word: string
  setWord: (wrd: string) => void
  players: Player[]
  setPlayers: (plys: Player[]) => void
  playersElected: Player[]
  setPlayersElected: (plyslct: Player[]) => void
  options: Options
  setOptions: (opts: Options) => void
  eraseGame: () => void
  playAgain: () => void
}

export const GameContext = React.createContext<GameContextProps>({
  word: "",
  setWord: (wrd) => {},
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
  const [word, setWord] = useState<string>("DefaultWord")
  const [players, setPlayers] = useState<Player[]>([
    
  ])
  const [playersElected, setPlayersElected] = useState<Player[]>([])
  const [options, setOptions] = useState<Options>({
    time: 5,
    voteAnyway: false,
    numberChoices: 3,
  })

  const eraseGame = () => {
    setPlayers([
      {
        name: "Thib",
        score: 0,
        vote: undefined,
        scoreVar: 0,
        role: Role.Citizen,
      },
      {
        name: "Meg",
        score: 0,
        vote: undefined,
        scoreVar: 0,
        role: Role.Citizen,
      },
      {
        name: "Elo",
        score: 0,
        vote: undefined,
        scoreVar: 0,
        role: Role.Citizen,
      },
      {
        name: "Matho",
        score: 0,
        vote: undefined,
        scoreVar: 0,
        role: Role.Citizen,
      },
      {
        name: "Arsene",
        score: 0,
        vote: undefined,
        scoreVar: 0,
        role: Role.Citizen,
      },
      {
        name: "Flo",
        score: 0,
        vote: undefined,
        scoreVar: 0,
        role: Role.Citizen,
      },
      {
        name: "Maman",
        score: 0,
        vote: undefined,
        scoreVar: 0,
        role: Role.Citizen,
      },
      {
        name: "Papa",
        score: 0,
        vote: undefined,
        scoreVar: 0,
        role: Role.Citizen,
      },
      {
        name: "Mamie",
        score: 0,
        vote: undefined,
        scoreVar: 0,
        role: Role.Citizen,
      },
    ])
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
        word: word,
        setWord: setWord,
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
