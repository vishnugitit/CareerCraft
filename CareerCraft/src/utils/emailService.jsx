// utils/emailService.js
// Uses emailjs-com package. Configure with your EmailJS userID, serviceID and templateID.
import emailjs from "emailjs-com";

// Call this to send. Replace serviceID, templateID, userID in .env in production.
// const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "your_service_id";
// const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "your_template_id";
// const USER_ID = process.env.REACT_APP_EMAILJS_USER_ID || "your_user_id";

export async function sendApplicationEmail(payload) {
  // payload: object with contact, skills, education, etc.
  // Simple map to a flat template params object:
  const templateParams = {
    subject: "New Application",
    message: JSON.stringify(payload, null, 2),
    applicant_name: payload.contact?.name || "",
    applicant_email: payload.contact?.email || "",
  };
  // emailjs returns a promise
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
}
