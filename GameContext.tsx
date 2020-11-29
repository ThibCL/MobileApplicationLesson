import React, { FunctionComponent, useContext, useState } from "react"

type GameContextProps = {
  players: string[]
  setPlayers: (players: string[]) => void
}

export const GameContext = React.createContext<GameContextProps>({
  players: [],
  setPlayers: (plyrs) => {},
})

interface GameProviderProps {
  children: React.ReactNode
}

export const GameProvider: FunctionComponent<GameProviderProps> = ({
  children,
}: GameProviderProps) => {
  const [players, setPlayers] = useState<string[]>([])

  return (
    <GameContext.Provider
      value={{
        players: players,
        setPlayers: (plyrs) => {
          setPlayers(plyrs)
        },
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
