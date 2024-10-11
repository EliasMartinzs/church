import emailjs from "emailjs-com";

type EMAIL_TEMPLATE = {
  email: string;
  password: string;
  from_name: string;
};

const SERVICE_KEY = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
const TEMPLATE_KEY = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_KEY as string;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

export const sendEmail = async (template: EMAIL_TEMPLATE) => {
  emailjs.send(SERVICE_KEY, TEMPLATE_KEY, template, PUBLIC_KEY).then(
    (response) => {},
    (error) => {}
  );

  return;
};
