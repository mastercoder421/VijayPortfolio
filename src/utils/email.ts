import { portfolioData } from '../data/portfolio';

export interface EmailComposeOptions {
  subject?: string;
  body?: string;
}

const DEFAULT_SUBJECT = 'Software Development Internship / Project Inquiry';
const DEFAULT_BODY = 'Hi Vijay,\n\n';

/**
 * Returns a direct Gmail web compose URL pre-filled with Vijay's address,
 * subject, and body template. Opens with the user's logged-in Gmail account.
 */
export const getGmailComposeUrl = (options?: EmailComposeOptions): string => {
  const to = portfolioData.personal.email;
  const subject = options?.subject?.trim() || DEFAULT_SUBJECT;
  const body = options?.body?.trim() ? options.body : DEFAULT_BODY;

  const encodedTo = encodeURIComponent(to);
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`;
};

/**
 * Programmatically opens the Gmail web composer in a new tab.
 */
export const openEmailComposer = (options?: EmailComposeOptions): void => {
  const url = getGmailComposeUrl(options);
  window.open(url, '_blank', 'noopener,noreferrer');
};
