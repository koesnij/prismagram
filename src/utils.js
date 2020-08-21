import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

import { adjectives, nouns } from './words';
import nodemailer from 'nodemailer';
import mgTransport from 'nodemailer-mailgun-transport';

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
  const options = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };
  const client = nodemailer.createTransport(mgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: 'no-reply@prismagram.com',
    to: address,
    subject: 'Login Secret for Prismagram 🔑',
    html: `Hello! Your login secret is ${secret}.<br/>Copy paste on the app/website to login`,
  };
  return sendMail(email);
};
