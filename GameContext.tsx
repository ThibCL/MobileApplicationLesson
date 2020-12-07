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
  options: Options
  setOptions: (opts: Options) => void
}

export const GameContext = React.createContext<GameContextProps>({
  word: "",
  setWord: (wrd) => {},
  players: [],
  setPlayers: (plyrs) => {},
  options: { time: 5, voteAnyway: false, numberChoices: 1 },
  setOptions: (opt) => {},
})

interface GameProviderProps {
  children: React.ReactNode
}

export const GameProvider: FunctionComponent<GameProviderProps> = ({
  children,
}: GameProviderProps) => {
  const [word, setWord] = useState<string>("DefaultWord")
  const [players, setPlayers] = useState<Player[]>([
    {
      name: "Thib",
      score: 0,
      vote: undefined,
      scoreVar: 0,
      role: Role.Citizen,
    },
    { name: "Meg", score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen },
    { name: "Elo", score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen },
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
    { name: "Flo", score: 0, vote: undefined, scoreVar: 0, role: Role.Citizen },
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
  const [options, setOptions] = useState<Options>({
    time: 5,
    voteAnyway: false,
    numberChoices: 3,
  })

  return (
    <GameContext.Provider
      value={{
        word: word,
        setWord: setWord,
        players: players,
        setPlayers: setPlayers,
        options: options,
        setOptions: setOptions,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
