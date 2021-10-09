namespace VC {
  export type Context = {
    loggedin: boolean
  }
  export type PartNames = 'hand' | 'arm' | 'waist' | 'bottom'
  // export type CommandNameEN = 'handOpen' | 'handClose' | 'elbowOpen' | 'elbowClose' | 'shoulderOpen' | 'shoulderClose' | 'waistLeft' | 'waistRight' | 'bottomGo' | 'bottomBack' | 'bottomLeft' | 'bottomRight' | 'bottomGoFast';
  // export type CommandNameKR = '손펴' | '잡아' | '팔펴' | '접어' | '들어' | '내려' | '왼쪽' | '오른쪽' | '앞으로' | '뒤로' | '왼쪽' | '오른쪽' | '빠르게';
  // export type CommandColumn = 'hand_open' | 'hand_close' | 'elbow_open' | 'elbow_close' | 'shoulder_open' | 'shoulder_close' | 'waist_left' | 'waist_right' | 'bottom_go' | 'bottom_back' | 'bottom_left' | 'bottom_right' | 'bottom_go_fast';
  export type CommandMeta = {
    nameEN: 'handOpen' | 'handClose' | 'elbowOpen' | 'elbowClose' | 'shoulderOpen' | 'shoulderClose' | 'waistLeft' | 'waistRight' | 'bottomGo' | 'bottomBack' | 'bottomLeft' | 'bottomRight' | 'bottomGoFast',
    nameKR: '손펴' | '잡아' | '팔펴' | '접어' | '들어' | '내려' | '왼쪽' | '오른쪽' | '앞으로' | '뒤로' | '왼쪽' | '오른쪽' | '빠르게',
    column: 'hand_open' | 'hand_close' | 'elbow_open' | 'elbow_close' | 'shoulder_open' | 'shoulder_close' | 'waist_left' | 'waist_right' | 'bottom_go' | 'bottom_back' | 'bottom_left' | 'bottom_right' | 'bottom_go_fast',
    code: number,
    stop: number,
  }
  export type Command = CommandMeta & {
    speed: number,
    similarWords: [string]
  }
}

export default VC;