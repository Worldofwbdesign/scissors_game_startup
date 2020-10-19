export default (components = {}) => [
  {
    path: '/',
    exact: true,
    component: components.PHome
  },
  {
    path: '/login',
    exact: true,
    component: components.PLogin
  },
  {
    path: '/createGame',
    exact: true,
    component: components.PGameCreate
  },
  {
    path: '/games',
    exact: true,
    component: components.PGames
  },
  {
    path: '/game/:gameId',
    exact: true,
    component: components.PGame
  },
  {
    path: '/gamesHistory',
    exact: true,
    component: components.PGamesHistory
  }
]
