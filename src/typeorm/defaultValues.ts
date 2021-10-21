const defaultValues = {
  metas: {
    adminPassword: '5911',
    controlMode: 'vc',
    editable: false
  },
  speeds: {
    handOpen: 60,
    handClose: 60,
    elbowOpen: 90,
    elbowClose: 60,
    shoulderOpen: 100,
    shoulderClose: 100,
    waistLeft: 40,
    waistRight: 40,
    bottomGo: 60,
    bottomBack: 60,
    bottomLeft: 40,
    bottomRight: 40,
    bottomGoFast: 100
  },
  words: {
    handOpen: JSON.stringify(["손펴","손표","손피라고","손벽","손효","성표","송평","손뼉","송파","송표","손뼈","송편"]),
    handClose: JSON.stringify(["접어","잡아","자바","저봐","자봐","차바","잡아라","자바라","자막","참아","쳐바","전화","쳐바","쳐봐","봐봐","줘봐"]),
    elbowOpen: JSON.stringify(["팔펴","팔표","팔피라고","팔표","팔벽","팔효","팔벼","발표","발펴"]),
    elbowClose: JSON.stringify(["접어","저붜","자보","저봐","줘봐","줘바","접포","초밥","여보","초보","터보","초봉","서버","더워","전화"]),
    shoulderOpen: JSON.stringify(["들어","틀어","드론","트럭","불어","그럼","뚫어"]),
    shoulderClose: JSON.stringify(["내려","내려와","매력","노력","매려","노려","느려","재료","의료"]),
    waistLeft: JSON.stringify(["왼쪽","외쪽"]),
    waistRight: JSON.stringify(["오른쪽","어른쪽","어느쪽"]),
    bottomGo: JSON.stringify(["앞으로","아프로","아브로","어그로","바보"]),
    bottomBack: JSON.stringify(["뒤로","기록","귀로","1호","위로"]),
    bottomLeft: JSON.stringify(["왼쪽"]),
    bottomRight: JSON.stringify(["오른쪽","어른쪽","어느쪽"]),
    bottomGoFast: JSON.stringify(["빠르게","빠르개","바르게","바르개","파르게","파르개"])
  }
}


export default defaultValues;