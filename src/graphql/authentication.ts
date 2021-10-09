import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import { Request } from 'express';
import { OutgoingMessage } from 'http';
import { verify } from "jsonwebtoken";

const context = ({ req }: { req: Request }) => {
  let loggedin = true;
  const token = req.headers.authorization || '';
  if (!!token === false) loggedin = false;
  else {
    try {
      const payload = verify(token, process.env.SECRET_KEY);
    } catch (err) {
      loggedin = false;
    }
  }
  return { loggedin: true }
}

export default context;