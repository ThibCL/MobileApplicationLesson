import { Player } from "./GameContext"

const getGameEndpoint = "/getGame"

export class Client {
  url: string

  constructor(url: string) {
    this.url = url
  }

  //Game
  getGame = async (token: string, gameId: string): Promise<Player[]> => {
    try {
      const gameResp = await fetch(this.url + getGameEndpoint + "/" + gameId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
      const gameBody = await gameResp.json()
      return gameBody.game.players
    } catch (e) {
      console.log("getGame did not work")
      return []
    }
  }

  deleteGame = async (token: string, gameId: string): Promise<void> => {
    try {
      await fetch(this.url + "/deleteGame/" + gameId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }

  listGames = async (
    token: string
  ): Promise<{ id: number; players: Player[] }[]> => {
    try {
      const listGamesResp = await fetch(this.url + "/listGames", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })

      const listGamesBody = await listGamesResp.json()
      return listGamesBody.listGames
    } catch (e) {
      console.log(e)
      return []
    }
  }

  saveGame = async (
    token: string,
    gameId: number | undefined,
    players: Player[]
  ): Promise<{ id: number; players: Player[] }> => {
    try {
      const addGameResp = await fetch(this.url + "/addGame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          game: {
            id: gameId,
            players: players,
          },
        }),
      })

      console.log(addGameResp)
      const addGameBody = await addGameResp.json()
      console.log(addGameBody)

      return addGameBody.game
    } catch (e) {
      console.log(e)
      return { id: 0, players: [] }
    }
  }

  //Player

  deletePlayer = async (
    token: string,
    gameId: number | undefined,
    playerId: number | undefined
  ): Promise<void> => {
    try {
      console.log("delete")
      await fetch(this.url + "/deletePlayer/" + gameId + "/" + playerId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }
}
