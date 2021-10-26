import { gql } from 'apollo-server-express';

const typeDefs = gql`
  enum ControlMode {
    rc, vc
  }

  type TeamPassword {
    team: Int,
    password: String
  }

  input TeamPasswordInput {
    team: Int,
    password: String
  }

  type Speed {
    team: Int,
    command: CommandName,
    speed: Int
  }

  type SimilarWords {
    team: Int,
    command: CommandName,
    similarWords: [String]
  }

  enum PartName {
    Hand, Arm, Waist, Bottom
  }

  enum CommandName {
    handOpen, handClose,
    elbowOpen, elbowClose,
    shoulderOpen, shoulderClose,
    waistLeft, waistRight,
    bottomGo, bottomBack, bottomLeft, bottomRight, bottomGoFast
  }

  type Meta {
    adminPassword: String,
    controlMode: ControlMode,
    editableSimilarWords: Boolean,
    editableSpeeds: Boolean
  }

  type Command {
    team: Int,
    nameEN: String,
    nameKR: String,
    speed: Int,
    similarWords: [String],
    code: Int,
    stop: Int
  }

  type Commands {
    handOpen: Command,
    handClose: Command,
    elbowOpen: Command,
    elbowClose: Command,
    shoulderOpen: Command,
    shoulderClose: Command,
    waistLeft: Command,
    waistRight: Command,
    bottomGo: Command,
    bottomBack: Command,
    bottomLeft: Command,
    bottomRight: Command,
    bottomGoFast: Command
  }

  type TeamCommands {
    team: Int,
    commands: Commands
  }

  type Part {
    team: Int,
    nameEN: PartName,
    nameKR: String,
    commands: [Command]
  }

  type InitialState {
    teamPasswords: [TeamPassword],
    controlMode: ControlMode,
    editableSimilarWords: Boolean,
    editableSpeeds: Boolean
  }

  type UserLoginResult {
    team: Int,
    controlMode: ControlMode,
    editableSimilarWords: Boolean,
    editableSpeeds: Boolean,
  }

  type Query {
    login(password: String): String,
    verifyAccessToken(token: String): String,
    initialState: InitialState,
    meta: Meta,
    teamPassword(team: Int): TeamPassword,
    allTeamPasswords: [TeamPassword],
    teamCommands(teams: [Int]): [TeamCommands],
    teamCommand(team: Int): Commands,
    part(team: Int, part: PartName): Part,
    userLogin(password: String): UserLoginResult,
  }

  type Mutation {
    createAccessToken(password: String): String,
    updateAdminPassword(password: String): String,
    updateTeamPasswords(teamPasswords: [TeamPasswordInput]): [TeamPassword],
    addNewSimilarWord(team: Int, command: CommandName, word: String): SimilarWords,
    updateCommandSpeed(team: Int, command: CommandName, speed: Int): Speed,
    updateControlMode(mode: ControlMode): ControlMode,
    reset: String,
    resetSimilarWords: String,
    vacateSimilarWords: String,
    updateEditableSimilarWords(editable: Boolean): Boolean,
    updateEditableSpeeds(editable: Boolean): Boolean,
    resetSpeeds: String,
    vacateSpeeds: String
  }
`;

export default typeDefs;