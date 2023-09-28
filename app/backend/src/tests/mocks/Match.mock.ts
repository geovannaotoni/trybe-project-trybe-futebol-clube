const matches = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    // "homeTeam": {
    //   "teamName": "São Paulo"
    // },
    // "awayTeam": {
    //   "teamName": "Grêmio"
    // }
  },
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    // "homeTeam": {
    //   "teamName": "São Paulo"
    // },
    // "awayTeam": {
    //   "teamName": "Internacional"
    // }
  }
]

const matchesInProgress = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    // "homeTeam": {
    //   "teamName": "São Paulo"
    // },
    // "awayTeam": {
    //   "teamName": "Grêmio"
    // }
  },
]

const finishedMatches = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    // "homeTeam": {
    //   "teamName": "São Paulo"
    // },
    // "awayTeam": {
    //   "teamName": "Grêmio"
    // }
  },
]

const goalsToUpdate = {
  homeTeamGoals: 2,
  awayTeamGoals: 0,
}

export default {
  matches,
  matchesInProgress,
  finishedMatches,
  goalsToUpdate,
}