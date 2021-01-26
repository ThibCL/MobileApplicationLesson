import { Game, Options, Player } from "./GameContext"

const getGameEndpoint = "/getGame"

export class Client {
  url: string

  constructor(url: string) {
    this.url = url
  }

  //Game
  getGame = async (
    token: string,
    gameId: string
  ): Promise<{ id: number; name: string; players: Player[] }> => {
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
      return { id: 0, name: "", players: [] }
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
  ): Promise<
    { id: number; name: string; players: Player[]; option: Options }[]
  > => {
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
    game: Game,
    players: Player[],
    option: Options
  ): Promise<{
    id: number
    name: string
    players: Player[]
    option: Options
  }> => {
    try {
      const addGameResp = await fetch(this.url + "/addGame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          game: {
            ...game,
            players: players,
            option: option,
          },
        }),
      })

      const addGameBody = await addGameResp.json()

      return addGameBody.game
    } catch (e) {
      console.log(e)
      return {
        id: 0,
        name: "",
        players: [],
        option: { id: 0, number_choices: 3, vote_anyway: false, time: 5 },
      }
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

  //Option
  getDefaultOption = async (token: string): Promise<Options> => {
    try {
      const getDefaultOptionResp = await fetch(this.url + "/defaultOption", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
      const getDefaultOptionBody = await getDefaultOptionResp.json()

      return getDefaultOptionBody.option
    } catch (e) {
      console.log(e)
      return { id: 0, number_choices: 3, vote_anyway: false, time: 5 }
    }
  }

  saveDefaultOption = async (token: string, option: Options): Promise<void> => {
    try {
      await fetch(this.url + "/saveDefaultOption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          option: option,
        }),
      })
    } catch (e) {
      console.log(e)
    }
  }
}
