import type { BetterAuthPlugin, User } from 'better-auth';
import { createAuthEndpoint } from 'better-auth/plugins';
import { z } from 'zod';
import type { Account } from '@/db/schema';
import { getAccessTokenByCode } from './wechat/wechat-plugin';

export const wechatPlugin = () => {
  return {
    id: 'wechat',
    endpoints: {
      wechatCallback: createAuthEndpoint(
        '/wechat/callback',
        {
          method: 'GET',
          query: z.object({
            code: z.string().meta({
              description: '微信授权码',
            }),
            state: z.string().meta({
              description: '状态',
            }),
          }),
        },
        async (ctx) => {
          const { code } = ctx.query;
          const accessTokenData = await getAccessTokenByCode(code);
          const existingAccount =
            await ctx.context.adapter.findOne<Account | null>({
              model: 'account',
              where: [
                {
                  field: 'openid',
                  value: accessTokenData.openid,
                },
                {
                  field: 'providerId',
                  value: 'wechat',
                },
              ],
            });

          if (existingAccount) {
            const existingUser = await ctx.context.adapter.findOne<User | null>(
              {
                model: 'user',
                where: [
                  {
                    field: 'id',
                    value: existingAccount.userId,
                  },
                ],
              }
            );

            if (existingUser) {
              const session = await ctx.context.internalAdapter.createSession(
                existingUser.id,
                ctx
              );
              ctx.setCookie('session', session.token, {
                httpOnly: true,
              });
              return ctx.redirect('http://localhost:3000/admin');
            }
          }
        }
      ),
    },
    schema: {
      account: {
        fields: {
          openid: {
            type: 'string',
            required: false,
          },
          unionid: {
            type: 'string',
            required: false,
          },
        },
      },
    },
  } satisfies BetterAuthPlugin;
};
