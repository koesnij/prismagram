import './env';

import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { prisma } from '../generated/prisma-client';

// passport-jwt 인증에 사용할 옵션
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// 복호화 성공 시 호출할 콜백 함수
const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

// jwtOptions를 기반으로 한 JwtStrategy로 복호화하고, verifyUser 콜백 함수 호출
passport.use(new JwtStrategy(jwtOptions, verifyUser));
passport.initialize();

export const authenticateJwt = (req, res, next) =>
  passport.authenticate('jwt', { sessions: false }, (error, user) => {
    /* 인증 방식, session 사용여부, verifyUser()에서 리턴된 error와 user */
    if (user) {
      // req 객체에 user를 담아서 전달
      req.user = user;
    }
    next();
  })(req, res, next);
/*  1. Strategy를 활용해서 jwt 토큰을 추출
 *   2. verifyUser를 payload와 함께 실행
 *   3. payload는 토큰에서 해석된 id를 받아서, user를 찾아 리턴
 *   4. 콜백 함수((error, user) => ... 이하) 실행, 사용자가 있으면 req 객체에 추가 */
