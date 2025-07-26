import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const jwtSecretKey = process.env.JWT_SECRET;
const jwtEncodedKey = new TextEncoder().encode(jwtSecretKey);

const loginExpSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400; // 24 horas
const loginExpStr = process.env.LOGIN_EXPIRATION || '24h';
const loginCookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession';

type JwtPayload = {
  username: string;
  expiresAt: Date;
};

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  const base64 = Buffer.from(hash).toString('base64');
  return base64;
}

export async function verifyPassword(password: string, base64Hash: string) {
  const hash = Buffer.from(base64Hash, 'base64').toString('utf-8');
  return await bcrypt.compare(password, hash);
}

export async function createLoginSession(username: string) {
  const expiresAt = new Date(Date.now() + loginExpSeconds * 1000);
  const loginSession = await signJWT({ username, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: expiresAt,
  });
}

export async function deleteLoginSession() {
  const cookieStore = await cookies();
  cookieStore.set(loginCookieName, '', { expires: new Date(0) }); // Expira o cookie
  cookieStore.delete(loginCookieName);
}

export async function signJWT(payload: JwtPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(loginExpStr)
    .sign(jwtEncodedKey);
}
