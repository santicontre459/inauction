import UserRepository from '../core/repository/user/userRepository';
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../configs/config";
import { User } from '../core/schema/user';
import { errorResponse } from '../core/controller/common/handler/responseHandler';

export class AuthorizationCheck {

  public static checkJWT(req: Request, res: Response, next: NextFunction) {
    if(!<string>req.headers["authorization"])
    res.status(401).send({message: 'Unauthorized!' });
    // Get the jwt token from the head
    const token = <string>req.headers["authorization"].substring(7);
    let jwtPayload: any;

    // Try to validate the token and get data
    try {
      jwtPayload = <any>jwt.verify(token, config.jwtSecretKey);
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      //If token is not valid, respond with 401 (unauthorized)
      res.status(401).send({message: 'Unauthorized!' });
      return;
    }

    // The token is valid for 1 hour
    // We want to send a new token on every request
    const { userId, email, roleId, subRoleId } = jwtPayload;
    const newToken = jwt.sign({ userId, email, roleId, subRoleId }, config.jwtSecretKey, {
      expiresIn: "1h"
    });

    res.setHeader("token", newToken);
    // Call the next middleware or controller
    next();

  }


  public static checkRole = (roles: Array<number>) => {

    return async (req: Request, res: Response, next: NextFunction) => {
      let userRepository = new UserRepository(User);
      const token = <string>req.headers["authorization"].substring(7);

      let jwtPayload: any;

      try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecretKey);
        res.locals.jwtPayload = jwtPayload;
      } catch (error) {

        // If token is not valid, respond with 401 (unauthorized)
        res.status(401).send({message: 'Unauthorized!' });
        return;
      }

      const { userId, roleId } = jwtPayload;


      // Get user role from the database
      try {

        await userRepository.findById(userId).then((data: User) => {

          // Check if array of authorized roles includes the user's role
          if (roles.indexOf(roleId) > -1 && data.role.id === roleId) next();
          else res.status(401).send({message: 'Unauthorized!' });

        }).catch(err => {
          errorResponse(err, res);
        });

      } catch (id) {
        res.status(401).send({message: 'Unauthorized!' });
      }
    };
  };

  public static checkSubRole = (subRoles: Array<number>) => {

    return async (req: Request, res: Response, next: NextFunction) => {
      let userRepository = new UserRepository(User);
      const token = <string>req.headers["authorization"].substring(7);

      let jwtPayload: any;

      try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecretKey);
        res.locals.jwtPayload = jwtPayload;
      } catch (error) {
        // If token is not valid, respond with 401 (unauthorized)
        res.status(401).send({message: 'Unauthorized!' });
        return;
      }

      const { userId, subRoleId } = jwtPayload;

      // Get user role from the database
      try {

        await userRepository.findById(userId).then((data: User) => {

          // Check if array of authorized roles includes the user's role
          if (subRoles.indexOf(subRoleId) > -1 && data.subrole.id === subRoleId) next();
          else res.status(401).send({message: 'Unauthorized!' });

        }).catch(err => {
          errorResponse(err, res);
        });

      } catch (id) {
        res.status(401).send({message: 'Unauthorized!' });
      }
    };
  };

  public static noAuthentication = () => { 
    return async (req: Request, res: Response, next: NextFunction) => {
      next();
    }
  };

  public static generateToken(userId: string, roleId: number, subRoleId: number,  email: string): string {

    if (!userId || !email)
      return;

    const token = jwt.sign(
      {
        userId: userId,
        email: email,
        roleId: roleId,
        subRoleId: subRoleId
      },
      config.jwtSecretKey, { expiresIn: "1h" }
    );
    return token;
  }

  public static getCurrentUser = (req: Request) => {

      const token = <string>req.headers["authorization"].substring(7);

      let jwtPayload: any;
      jwtPayload = <any>jwt.verify(token, config.jwtSecretKey);

      const { userId } = jwtPayload;

      return userId;

  };

  public static getCurrentCompany = (req: Request) => {

    const token = <string>req.headers["authorization"].substring(7);

    let jwtPayload: any;
    jwtPayload = <any>jwt.verify(token, config.jwtSecretKey);

    const { userId } = jwtPayload;

    let userRepository = new UserRepository(User);

    const user_filter = { id: userId };

    userRepository.filterUser(user_filter).then(data => {
      return data.company;
    }).catch(err => {
      return 0;
    });

  };


  /**
   * Middleware function to make sure that the user who uses the call is the same user of JWT Token
   * We are using this function only when user_id is part of Request Body
   */
  public static checkUser(req: Request, res: Response, next: NextFunction) {

      const token = <string>req.headers["authorization"].substring(7);

      let jwtPayload: any;
      jwtPayload = <any>jwt.verify(token, config.jwtSecretKey);

      const {userId} = jwtPayload;
      const requestUserId = req.body.user_id;

      // Check if user IDs are the ame
      if (userId === requestUserId) next();
      else res.status(401).send({message: 'Unauthorized!' });
    }

}
