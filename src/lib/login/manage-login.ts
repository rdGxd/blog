import bcrypt from 'bcryptjs';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const jwtSecretKey = process.env.JWT_SECRET_KEY;
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

export async function createLoginSessionFromApi(jwt: string) {
  const expiresAt = new Date(Date.now() + loginExpSeconds * 1000);
  const loginSession = jwt;
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

export async function getLoginSession() {
  const cookieStore = await cookies();

  const jwt = cookieStore.get(loginCookieName)?.value;

  if (!jwt) return false;

  return verifyJWT(jwt);
}

export async function getLoginSessionApi() {
  const cookieStore = await cookies();

  const jwt = cookieStore.get(loginCookieName)?.value;

  if (!jwt) return false;

  return jwt;
}

// * SÓ SERVE PARA ESSE SISTEMA, NÃO É PARA SER USADO EM OUTROS LUGARES
export async function verifyLoginSession() {
  const jwtPayload = await getLoginSession();

  if (!jwtPayload) return false;

  return jwtPayload?.username === process.env.LOGIN_USER;
}

export async function requiredLoginSessionOrRedirect() {
  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    redirect('/login');
  }
}

export async function requiredLoginSessionForApiOrRedirect() {
  const isAuthenticated = await getLoginSessionApi();

  if (!isAuthenticated) {
    redirect('/login');
  }
}

export async function signJWT(payload: JwtPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(loginExpStr)
    .sign(jwtEncodedKey);
}

export async function verifyJWT(jwt: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(jwt, jwtEncodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.error('Token invalid:', error);
    return false;
  }
}
