import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { account } from '@/db/schema';

export const getAccessTokenByCode = async (code: string) => {
  const res = await fetch(
    `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.WECHAT_APP_ID!}&secret=${process.env.WECHAT_APP_SECRET!}&code=${code}&grant_type=authorization_code`
  );
  const data = await res.json();
  return data;
};

export const findAccountByOpenid = async (openid: string) => {
  const data = await db.query.account.findFirst({
    where: eq(account.openid, openid),
  });
  return data;
};

export const getUserInfoByAccessToken = async (
  accessToken: string,
  openid: string
) => {
  const res = await fetch(
    `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openid}`
  );
  const data = await res.json();
  return data;
};
