import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "../drizzle/db";
import { users } from "../drizzle/schema";
import "dotenv/config";
import { eq } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

const generateToken = (user: any) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (user: any) => {
  return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePasswords = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, username, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await db
      .insert(users)
      .values({
        email,
        name,
        username,
        password: hashedPassword,
      })
      .returning();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isMatch = await comparePasswords(password, user[0].password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const accessToken = generateToken(user[0]);
    const refreshToken = generateRefreshToken(user[0]);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const refresh = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = db
      .select()
      .from(users)
      .where(eq(users.id, payload as string))
      .limit(1);
    const accessToken = generateToken(user);
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
