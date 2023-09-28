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

const invalidGoalsToUpdate = {
  homeTeamGoals: 2,
}

const matchToCreate = {
  "homeTeamId": 16, 
  "awayTeamId": 8, 
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

const invalidMatchToCreate = {
  "homeTeamId": 16, 
  "awayTeamId": 8, 
  "homeTeamGoals": 2,
}

const sameTeamsMatchToCreate = {
  "homeTeamId": 8, 
  "awayTeamId": 8, 
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

const createdMatch = {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
  "inProgress": true
}

export default {
  matches,
  matchesInProgress,
  finishedMatches,
  goalsToUpdate,
  invalidGoalsToUpdate,
  matchToCreate,
  createdMatch,
  invalidMatchToCreate,
  sameTeamsMatchToCreate,
}