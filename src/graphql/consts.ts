export const commandMetas = {
  handOpen: {
    nameEN: 'handOpen',
    nameKR: '손펴',
    column: 'hand_open',
    code: 11,
    stop: 10,
  },
  handClose: {
    nameEN: 'handClose',
    nameKR: '잡아',
    column: 'hand_close',
    code: 12,
    stop: 10,
  },
  elbowOpen: {
    nameEN: 'elbowOpen',
    nameKR: '팔펴',
    column: 'elbow_open',
    code: 21,
    stop: 20,
  },
  elbowClose: {
    nameEN: 'elbowClose',
    nameKR: '접어',
    column: 'elbow_close',
    code: 22,
    stop: 20,
  },
  shoulderOpen: {
    nameEN: 'shoulderOpen',
    nameKR: '들어',
    column: 'shoulder_open',
    code: 23,
    stop: 20,
  },
  shoulderClose: {
    nameEN: 'shoulderClose',
    nameKR: '내려',
    column: 'shoulder_close',
    code: 24,
    stop: 20,
  },
  waistLeft: {
    nameEN: 'waistLeft',
    nameKR: '왼쪽',
    column: 'waist_left',
    code: 31,
    stop: 30,
  },
  waistRight: {
    nameEN: 'waistRight',
    nameKR: '오른쪽',
    column: 'waist_right',
    code: 32,
    stop: 30,
  },
  bottomGo: {
    nameEN: 'bottomGo',
    nameKR: '앞으로',
    column: 'bottom_go',
    code: 41,
    stop: 40,
  },
  bottomBack: {
    nameEN: 'bottomBack',
    nameKR: '뒤로',
    column: 'bottom_back',
    code: 42,
    stop: 40,
  },
  bottomLeft: {
    nameEN: 'bottomLeft',
    nameKR: '왼쪽',
    column: 'bottom_left',
    code: 43,
    stop: 40,
  },
  bottomRight: {
    nameEN: 'bottomRight',
    nameKR: '오른쪽',
    column: 'bottom_right',
    code: 44,
    stop: 40,
  },
  bottomGoFast: {
    nameEN: 'bottomGoFast',
    nameKR: '빠르게',
    column: 'bottom_go_fast',
    code: 45,
    stop: 40,
  }
};

export const cmdNames = [
  'handOpen', 'handClose',
  'elbowOpen', 'elbowClose', 'shoulderOpen', 'shoulderClose',
  'waistLeft', 'waistRight',
  'bottomGo', 'bottomGoFast', 'bottomLeft', 'bottomRight', 'bottomBack'
];

export const TEAMS = Array(12).fill(1).map((val, index) => { return val + index });