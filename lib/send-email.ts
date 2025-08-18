import { Resend } from 'resend';

import { LinearLoginCodeEmail } from '@/components/email-template';

type SendEmailProps = {
  to: string;
  subject: string;
  url: string;
};

export const sendEmail = async ({ to, subject, url }: SendEmailProps) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'admin@dezhiyun.online',
    to,
    subject,
    react: LinearLoginCodeEmail({ url: `${url}email-verification` }),
  });
};
