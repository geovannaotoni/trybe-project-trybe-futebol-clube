const finishedMatches = [
  {
    id: 1,
    homeTeamId: 1,
    homeTeamGoals: 0,
    awayTeamId: 2,
    awayTeamGoals: 3,
    inProgress: false,
  },
  {
    id: 2,
    homeTeamId: 1,
    homeTeamGoals: 2,
    awayTeamId: 3,
    awayTeamGoals: 3,
    inProgress: false,
  },
  {
    id: 3,
    homeTeamId: 2,
    homeTeamGoals: 0,
    awayTeamId: 1,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 4,
    homeTeamId: 2,
    homeTeamGoals: 0,
    awayTeamId: 3,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 5,
    homeTeamId: 3,
    homeTeamGoals: 2,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: false,
  },
]

const leaderboard = [
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": 86.67
  },
  {
    "name": "Corinthians",
    "totalPoints": 12,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 12,
    "goalsOwn": 3,
    "goalsBalance": 9,
    "efficiency": 80
  },
  {
    "name": "Santos",
    "totalPoints": 11,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 12,
    "goalsOwn": 6,
    "goalsBalance": 6,
    "efficiency": 73.33
  },
];

const leaderboardHome = [
  {
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 2,
    goalsOwn: 0,
    goalsBalance: 2,
    efficiency: 100,
    name: 'Botafogo'
  },
  {
    totalPoints: 0,
    totalGames: 2,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 2,
    goalsFavor: 0,
    goalsOwn: 2,
    goalsBalance: -2,
    efficiency: 0,
    name: 'Bahia'
  },
  {
    totalPoints: 0,
    totalGames: 2,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 2,
    goalsFavor: 2,
    goalsOwn: 6,
    goalsBalance: -4,
    efficiency: 0,
    name: 'Avaí/Kindermann'
  }
];

const leaderboardAway = [
  {
    totalPoints: 6,
    totalGames: 2,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 4,
    goalsOwn: 2,
    goalsBalance: 2,
    efficiency: 100,
    name: 'Botafogo'
  },
  {
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 3,
    goalsOwn: 0,
    goalsBalance: 3,
    efficiency: 100,
    name: 'Bahia'
  },
  {
    totalPoints: 3,
    totalGames: 2,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 1,
    goalsOwn: 2,
    goalsBalance: -1,
    efficiency: 50,
    name: 'Avaí/Kindermann'
  }
];

export default {
  finishedMatches,
  leaderboard,
  leaderboardHome,
  leaderboardAway,
}

