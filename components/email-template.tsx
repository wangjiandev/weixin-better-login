import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

type LinearLoginCodeEmailProps = {
  url: string;
};

export const LinearLoginCodeEmail = ({ url }: LinearLoginCodeEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Your login code for Linear</Preview>
      <Container style={container}>
        <Heading style={heading}>Your login code for Linear</Heading>
        <Section style={buttonContainer}>
          <Button href={url} style={button}>
            Sign in to your account
          </Button>
        </Section>
        <Text style={paragraph}>
          This link and code will only be valid for the next 5 minutes. If the
          link does not work, you can use the login verification code directly:
        </Text>
      </Container>
    </Body>
  </Html>
);

LinearLoginCodeEmail.PreviewProps = {
  url: 'https://dezhiyun.online',
} as LinearLoginCodeEmailProps;

export default LinearLoginCodeEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#484848',
  padding: '17px 0 0',
};

const paragraph = {
  margin: '0 0 15px',
  fontSize: '15px',
  lineHeight: '1.4',
  color: '#3c4149',
};

const buttonContainer = {
  padding: '27px 0 27px',
};

const button = {
  backgroundColor: '#5e6ad2',
  borderRadius: '3px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '11px 23px',
};
