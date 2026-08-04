import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.EXPO_PUBLIC_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = process.env.EXPO_PUBLIC_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = process.env.EXPO_PUBLIC_EMAILJS_PUBLIC_KEY as string;

/**
 * Sends an email using EmailJS.
 * 
 * @param templateParams - An object containing the template parameters.
 * @returns A promise that resolves when the email is sent.
 */
export const sendEmail = async (templateParams: Record<string, unknown>) => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );
    return response;
  } catch (error) {
    console.error('Error sending email via EmailJS:', error);
    throw error;
  }
};
