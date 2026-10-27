import emailjs from "@emailjs/browser";

/**
 * Send admission enquiry details via EmailJS.
 * @param {{ name, email, phone, currentClass, course, message, branch, school }} data
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
    nearest_branch: data.branch || "N/A",
    current_class: data.currentClass,
    course_interested: data.course || "N/A",
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

/**
 * Send Admission Cancellation & Refund Request details via EmailJS.
 * Target recipient: contact@manchclasses.in
 * @param {Object} data
 */
export const sendRefundRequestEmail = async (data) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_REFUND_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn("EmailJS credentials are not set in .env. Skipping refund email dispatch.");
    return;
  }

  const templateParams = {
    student_name: data.studentName,
    student_id: data.studentId || "N/A",
    student_email: data.email || "N/A",
    student_phone: data.phone,
    parent_name: data.parentName,
    relationship: data.relationship,
    nearest_branch: data.branch || "N/A",
    current_class: data.currentClass || "N/A",
    board: data.board || "N/A",
    course_enrolled: data.courseEnrolled || "N/A",
    admission_date: data.admissionDate || "N/A",
    last_date_attended: data.lastDateAttended || "N/A",
    total_fees_paid: data.feesPaid ? `₹${data.feesPaid}` : "N/A",
    refund_requested: data.refundRequested || "Yes",
    payment_reference: data.paymentReference || "N/A",
    cancellation_reason: data.cancellationReason || "No details provided",
    submission_type: "Admission Cancellation & Refund Request",
    recipient_email: "contact@manchclasses.in",
    submission_date: new Date().toLocaleString(),
    // Standard template fallbacks
    course_interested: `Cancellation: ${data.courseEnrolled || data.currentClass} (${data.branch})`,
    student_message: `Admission Cancellation & Refund Request:
Student ID: ${data.studentId || 'N/A'}
Branch: ${data.branch} | Board: ${data.board}
Course Enrolled: ${data.courseEnrolled} | Class: ${data.currentClass}
Admission Date: ${data.admissionDate} | Last Attended: ${data.lastDateAttended}
Parent/Guardian: ${data.parentName} (${data.relationship}) | Phone: ${data.phone}
Total Fees Paid: ₹${data.feesPaid} | Refund Choice: ${data.refundRequested}
Payment Reference: ${data.paymentReference || 'N/A'}
Reason for Cancellation:
${data.cancellationReason}`,
  };

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    console.log("Refund Request Email sent via EmailJS:", response.status, response.text);
    return response;
  } catch (error) {
    console.error("EmailJS Refund dispatch failed:", error);
    throw error;
  }
};
