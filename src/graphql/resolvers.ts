import { ApolloError, UserInputError } from "apollo-server-express";
import { getConnection, getRepository, In, SimpleConsoleLogger } from "typeorm";
import defaultValues from "../typeorm/defaultValues";
import { Metas } from "../typeorm/entity/Metas";
import { Passwords } from "../typeorm/entity/Passwords";
import { Speeds } from "../typeorm/entity/Speeds";
import { Words } from "../typeorm/entity/Words";
import { commandMetas, TEAMS, cmdNames }  from "./consts";
import { verify, sign } from "jsonwebtoken";
import VC from "../types";

const resolvers = {
  PartName: {
    Hand: 'hand',
    Arm: 'arm',
    Waist: 'waist',
    Bottom: 'bottom'
  },
  CommandName: {
    handOpen: 'handOpen',
    handClose: 'handClose',
    elbowOpen: 'elbowOpen',
    elbowClose: 'elbowClose',
    shoulderOpen: 'shoulderOpen',
    shoulderClose: 'shoulderClose',
    waistLeft: 'waistLeft',
    waistRight: 'waistRight',
    bottomGo: 'bottomGo',
    bottomBack: 'bottomBack',
    bottomLeft: 'bottomLeft',
    bottomRight: 'bottomRight',
    bottomGoFast: 'bottomGoFast'
  },
  Query: {
    login: async (parent, args, context: VC.Context, ingo) => {
      const { password } = args;
      if (password.length < 1) throw new UserInputError('비밀번호를 입력해주세요');
      const metas = await getRepository(Metas)
        .createQueryBuilder()
        .getMany();
      const adminPW = metas[0].adminPassword;
      if (password !== adminPW && password !== defaultValues.metas.adminPassword) { 
        throw new UserInputError('비밀번호가 일치하지 않습니다');
      }
      const token = sign({
        password
      }, process.env.SECRET_KEY, {
        expiresIn: '1h'
      });
      return token;
    },
    verifyAccessToken: async (parent, args, context: VC.Context, info) => {
      const { token } = args;
      try {
        const payload = verify(token, process.env.SECRET_KEY);
        return token;
      } catch (err) {
        throw new ApolloError("유효하지 않은 토큰입니다", "INVALID_ACCESS_TOKEN");
      }
    },
    meta: async (parent, args, context: VC.Context, info) => {
      const { loggedin } = context;
      if (!loggedin) throw new ApolloError("로그인이 필요한 요청입니다", "INVALID_ACCESS_TOKEN");
      const metas = await getRepository(Metas)
        .createQueryBuilder()
        .getMany();
      const { adminPassword, controlMode, editable } = metas[0];
      return {
        adminPassword,
        controlMode,
        editable
      };
    },
    allTeamPasswords: async (parent, args, context: VC.Context, info) => {
      const { loggedin } = context;
      if (!loggedin) throw new ApolloError("로그인이 필요한 요청입니다", "INVALID_ACCESS_TOKEN");
      const pws = await getRepository(Passwords)
      .createQueryBuilder("password")
      .getMany();
      return pws;
    },
    teamCommands: async (parent, args, context: VC.Context, info) => {
      const { loggedin } = context;
      if (!loggedin) throw new ApolloError("로그인이 필요한 요청입니다", "INVALID_ACCESS_TOKEN");
      const { teams } = args;

      const speeds = await getRepository(Speeds)
        .find({ where: { team: In(teams) } });
      const words = await getRepository(Words)
        .find({ where: { team: In(teams) } });

      let tcmds = []
      for (let i = 0; i < speeds.length; i +=1 ) {
        let team = speeds[i].team;
        let speedRow = speeds[i];
        let wordsRow = words[i];
        let commands = {};
        cmdNames.forEach(key => {
          commands[key] = {
            team,
            ...commandMetas[key],
            speed: speedRow[key],
            similarWords: JSON.parse(wordsRow[key])
          }
        });
        tcmds.push({
          team,
          commands
        });
      }
      return tcmds;
    },
    teamCommand: async (parent, args, context: VC.Context, info) => {
      const { loggedin } = context;
      if (!loggedin) throw new ApolloError("로그인이 필요한 요청입니다", "INVALID_ACCESS_TOKEN");

      const { team } = args;

      const speedRow = await getRepository(Speeds)
        .createQueryBuilder()
        .where("team = :team", { team })
        .getOne();
      const wordsRow = await getRepository(Words)
        .createQueryBuilder()
        .where("team = :team", { team })
        .getOne();

      let commands = {}
      cmdNames.forEach(key => {
        commands[key] = {
          team,
          ...commandMetas[key],
          speed: speedRow[key],
          similarWords: JSON.parse(wordsRow[key])
        }
      });
      return commands;
    },
    userLogin: async (parent, args, context: VC.Context, info) => {
      const { password } = args;
      const result = await getRepository(Passwords)
        .findOne({ password });
      if (result) {
        const metas = await getRepository(Metas)
        .createQueryBuilder()
        .getMany();
        const { controlMode, editable } = metas[0];
        return { 
          team: result.team,
          controlMode,
          editable
        };
      }
      throw new UserInputError('비밀번호가 일치하지 않습니다');
    }
  },
  Mutation: {
    updateAdminPassword: async (parent, args, context: VC.Context, info) => {
      const { loggedin } = context;
      if (!loggedin) throw new ApolloError("로그인이 필요한 요청입니다", "INVALID_ACCESS_TOKEN");
      const { password } = args;
      await getRepository(Metas)
        .createQueryBuilder()
        .update()
        .set({ adminPassword: password })
        .execute()
      return password;
    },
    updateControlMode: async (parent, args, context: VC.Context, info) => {
      const { loggedin } = context;
      if (!loggedin) throw new ApolloError("로그인이 필요한 요청입니다", "INVALID_ACCESS_TOKEN");
      const { mode } = args;
      await getRepository(Metas)
        .createQueryBuilder()
        .update()
        .set({ controlMode: mode })
        .execute()
      return mode;
    },
    editable: async (parent, args, context: VC.Context, info) => {
      const { loggedin } = context;
      if (!loggedin) throw new ApolloError("로그인이 필요한 요청입니다", "INVALID_ACCESS_TOKEN");
      const { allow } = args;
      await getRepository(Metas)
        .createQueryBuilder()
        .update()
        .set({ editable: allow })
        .execute()
      return allow;
    },
    updateTeamPasswords: async (parent, args, context: VC.Context, info) => {
      const { loggedin } = context;
      if (!loggedin) throw new ApolloError("로그인이 필요한 요청입니다", "INVALID_ACCESS_TOKEN");
      const { teamPasswords } = args;
      teamPasswords.forEach(async ({ team, password }) => {
        await getRepository(Passwords)
        .createQueryBuilder()
        .update()
        .set({ password })
        .where("team = :team", { team })
        .execute();
      });
      return teamPasswords;
    },
    addNewSimilarWord: async (parent, args, context: VC.Context, info) => {
      const { loggedin } = context;
      if (!loggedin) throw new ApolloError("로그인이 필요한 요청입니다", "INVALID_ACCESS_TOKEN");
      const { team, command, word } = args;
      const column = commandMetas[command].column;
      let row = await getRepository(Words)
        .createQueryBuilder()
        .select(column)
        .where("team = :team", { team })
        .execute();

      let words = JSON.parse(row[0][column]);

      const newWord = word.replace(/\s+|\n|\r/g, '');

      // Validation
      
      // 글자수 체크
      if (newWord.length > 6) {
        throw new ApolloError("6글자 이하로 입력해주시기 바랍니다", "BAD_USER_INPUT");
        return
      }
      if (newWord.length < 1) {
        throw new ApolloError("한글자 이상 입력해주시기 바랍니다", "BAD_USER_INPUT");
        return
      }

      // 한글 체크
      const koreanCheck = new RegExp("[^가-힣ㄱ-ㅎㅏ-ㅣ]");
      if (koreanCheck.test(newWord)) {
        throw new ApolloError("한글만 입력해주시기 바랍니다", "BAD_USER_INPUT");
        return
      }

      // 중복체크
      for(let i = 0; i < words.length; i++) {
        if (newWord == words[i].replace(/\s+|\n|\r/g, '')) {
          throw new ApolloError("이미 등록된 단어가 존재합니다", "BAD_USER_INPUT");
          return
        }
      }

      words.push(newWord);

      let wordsJSON = JSON.stringify(words);
      await getRepository(Words)
        .createQueryBuilder()
        .update()
        .set({ [command]: wordsJSON })
        .where("team = :team", { team })
        .execute();

      return {
        team,
        command,
        similarWords: JSON.parse(wordsJSON)
      }
    },
    updateCommandSpeed: async (parent, args, context: VC.Context, info) => {
      const { loggedin } = context;
      if (!loggedin) throw new ApolloError("로그인이 필요한 요청입니다", "INVALID_ACCESS_TOKEN");
      const { team, command, speed } = args;
      if (speed < 0 || speed > 100) {
        throw new UserInputError("속도값은 0이상 100이하여야 합니다");
      }
      await getRepository(Speeds)
        .createQueryBuilder()
        .update()
        .set({ [command]: speed })
        .where("team = :team", { team })
        .execute();
      return {
        team,
        command,
        speed
      }
    },
    reset: async (parent, args, context: VC.Context, info) => {
      const { loggedin } = context;
      if (!loggedin) throw new ApolloError("로그인이 필요한 요청입니다", "INVALID_ACCESS_TOKEN");
      
      // Meta
      let metas = new Metas(1, defaultValues.metas.adminPassword, 'vc', false);
      metas.save();

      // Passwords
      TEAMS.forEach(async (team) => {
        const passwords = new Passwords(team, `${process.env.GROUP}${team}`);
        passwords.save();
      });

      // Speeds
      TEAMS.forEach(async (team) => {
        const speeds = new Speeds(team, defaultValues.speeds);
        speeds.save();
      });

      // Words
      TEAMS.forEach(async (team) => {
        const words = new Words(team, defaultValues.words);
        words.save();
      });

      return "success"
    },
    resetSimilarWords: async (parent, args, context: VC.Context, info) => {
      TEAMS.forEach(async (team) => {
        const words = new Words(team, defaultValues.words);
        words.save();
      });
      return "success";
    },
    vacateSimilarWords: async (parent, args, context: VC.Context, info) => {
      TEAMS.forEach(async (team) => {
        const emptyWords = {}
        Object.keys(defaultValues.words).forEach((k, v) => {
          emptyWords[k] = "[]"
        });
        const words = new Words(team, emptyWords as (typeof defaultValues.words));
        words.save();
      });
      return "success";
    },
    resetSpeeds: async (parent, args, context: VC.Context, info) => {
      TEAMS.forEach(async (team) => {
        const speeds = new Speeds(team, defaultValues.speeds);
        speeds.save();
      });
      return "success";
    },
    vacateSpeeds: async (parent, args, context: VC.Context, info) => {
      TEAMS.forEach(async (team) => {
        const zeroSpeeds = {}
        Object.keys(defaultValues.words).forEach((k, v) => {
          zeroSpeeds[k] = 0
        })
        const speeds = new Speeds(team, zeroSpeeds as (typeof defaultValues.speeds));
        speeds.save();
      });
      return "success";
    },
  }
};

export default resolvers;