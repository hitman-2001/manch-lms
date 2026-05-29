import emailjs from "@emailjs/browser";

/**
 * Send admission enquiry details via EmailJS.
 * @param {{ name, email, phone, currentClass, course, message }} data
 */
export const sendEnquiryEmail = async (data) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn("EmailJS credentials are not set in the environment variables (.env). Skipping email dispatch.");
    return;
  }

  // Template variables mapping
  const templateParams = {
    student_name: data.name,
    student_email: data.email || "N/A",
    student_phone: data.phone,
    current_class: data.currentClass,
    course_interested: data.course,
    school_name: data.school || "N/A",
    student_message: data.message || "No query message provided.",
    submission_type: "Admission Enquiry",
    submission_date: new Date().toLocaleString(),
  };

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log("Email successfully sent via EmailJS:", response.status, response.text);
    return response;
  } catch (error) {
    console.error("EmailJS dispatch failed:", error);
    throw error;
  }
};

/**
 * Send MSAT (Scholarship Test) Registration details via EmailJS.
 * @param {{ name, email, phone, currentClass, preferredDate, school }} data
 */
export const sendMSATRegistrationEmail = async (data) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_MSAT_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn("EmailJS credentials are not set in .env. Skipping MSAT email.");
    return;
  }

  const templateParams = {
    student_name: data.name,
    student_email: data.email || "N/A",
    student_phone: data.phone,
    current_class: data.currentClass,
    preferred_date: data.preferredDate,
    school_name: data.school || "N/A",
    submission_type: "MSAT Registration",
    submission_date: new Date().toLocaleString(),
  };

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log("MSAT Registration Email sent:", response.status, response.text);
    return response;
  } catch (error) {
    console.error("EmailJS MSAT dispatch failed:", error);
    throw error;
  }
};
