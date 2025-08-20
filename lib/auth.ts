import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, genericOAuth, organization } from 'better-auth/plugins';
import { db } from '@/db';
import { getActiveOrganization } from '@/server/organizations';
import { sendEmail } from './send-email';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg', // or "mysql", "sqlite"
  }),
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: 'Verify your email address',
        url,
      });
    },
  },
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const organization = await getActiveOrganization(session.userId);
          return {
            data: {
              ...session,
              activeOrganizationId: organization?.id,
            },
          };
        },
      },
    },
  },
  plugins: [
    admin(),
    organization(),
    genericOAuth({
      config: [
        {
          providerId: 'wechat',
          clientId: process.env.WECHAT_APP_ID!,
          clientSecret: process.env.WECHAT_APP_SECRET!,
          scopes: ['snsapi_login'],
          redirectURI: 'http://hcced68e.natappfree.cc/api/auth/callback/wechat',
          authorizationUrl: `https://open.weixin.qq.com/connect/qrconnect?appid=${process.env.WECHAT_APP_ID!}&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect`,
          tokenUrl: `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.WECHAT_APP_ID!}&secret=${process.env.WECHAT_APP_SECRET!}&grant_type=authorization_code`,
          userInfoUrl: 'https://api.weixin.qq.com/sns/userinfo',
          // getUserInfo: async (tokens) => {
          //   console.log('tokens: ', tokens);
          //   await new Promise((resolve) => setTimeout(resolve, 1000));
          //   return {
          //     id: 'userInfo.sub',
          //     email: 'userInfo.email',
          //     name: 'userInfo.name',
          //     emailVerified: true,
          //     createdAt: new Date(),
          //     updatedAt: new Date(),
          //   };
          // },
        },
      ],
    }),
  ],
});
