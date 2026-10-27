// ============================================================
// Firestore Service — CRUD for all collections
// ============================================================
// Collections: gallery | materials | enquiries | registrations
// ============================================================

import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

// ─── GALLERY ────────────────────────────────────────────────

/**
 * Add a new image to the gallery collection.
 * @param {{ imageUrl: string, title: string }} data
 * @returns {Promise<DocumentReference>}
 */
export const addGalleryImage = async ({ imageUrl, title = "", event = "" }) => {
  return await addDoc(collection(db, "gallery"), {
    imageUrl,
    title,
    event, // e.g., 'Aarambh - Annual Function'
    uploadedAt: serverTimestamp(),
  });
};

/**
 * Fetch all gallery images ordered by upload date (newest first).
 * @returns {Promise<Array>}
 */
export const getGalleryImages = async () => {
  const q = query(collection(db, "gallery"), orderBy("uploadedAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Delete a gallery image document from Firestore.
 * @param {string} docId - Firestore document ID
 * @returns {Promise<void>}
 */
export const deleteGalleryImage = async (docId) => {
  await deleteDoc(doc(db, "gallery", docId));
};

/**
 * Update title and/or event of an existing gallery image.
 * @param {string} docId
 * @param {{ title: string, event: string }} updates
 * @returns {Promise<void>}
 */
export const updateGalleryImage = async (docId, { title, event }) => {
  const imageRef = doc(db, "gallery", docId);
  await updateDoc(imageRef, { title, event, updatedAt: serverTimestamp() });
};

// ─── STUDY MATERIALS ────────────────────────────────────────

/**
 * Add a study material entry to Firestore.
 * @param {{ title, subject, fileUrl, type }} data
 * @returns {Promise<DocumentReference>}
 */
export const addMaterial = async ({ title, standard, subject, fileUrl, type }) => {
  return await addDoc(collection(db, "materials"), {
    title,
    standard: standard || "Other",
    subject: subject || "General",
    fileUrl,
    type, // 'pdf' | 'image'
    uploadedAt: serverTimestamp(),
  });
};

/**
 * Fetch all materials, ordered by upload date (newest first).
 * @returns {Promise<Array>}
 */
export const getMaterials = async () => {
  const q = query(collection(db, "materials"), orderBy("uploadedAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Fetch materials filtered by subject.
 * @param {string} subject
 * @returns {Promise<Array>}
 */
export const getMaterialsBySubject = async (subject) => {
  const q = query(
    collection(db, "materials"),
    where("subject", "==", subject),
    orderBy("uploadedAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Delete a material entry from Firestore.
 * @param {string} docId
 * @returns {Promise<void>}
 */
export const deleteMaterial = async (docId) => {
  await deleteDoc(doc(db, "materials", docId));
};

// ─── FACULTY ────────────────────────────────────────────────

/**
 * Add a new faculty member.
 * @param {{ name, subject, qualification, experience, imageUrl }} data
 * @returns {Promise<DocumentReference>}
 */
export const addFaculty = async (data) => {
  return await addDoc(collection(db, "faculty"), {
    name: data.name || "",
    subject: data.subject || "",
    qualification: data.qualification || "",
    experience: data.experience || "",
    imageUrl: data.imageUrl || "",
    createdAt: serverTimestamp(),
  });
};

/**
 * Fetch all faculty members ordered by creation date.
 * @returns {Promise<Array>}
 */
export const getFaculty = async () => {
  const q = query(collection(db, "faculty"), orderBy("createdAt", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/**
 * Update a faculty member's fields.
 * @param {string} docId
 * @param {Object} updates
 * @returns {Promise<void>}
 */
export const updateFaculty = async (docId, updates) => {
  const ref = doc(db, "faculty", docId);
  await updateDoc(ref, { ...updates, updatedAt: serverTimestamp() });
};

/**
 * Delete a faculty member.
 * @param {string} docId
 * @returns {Promise<void>}
 */
export const deleteFaculty = async (docId) => {
  await deleteDoc(doc(db, "faculty", docId));
};

// ─── ENQUIRIES ──────────────────────────────────────────────

/**
 * Submit an admission enquiry to Firestore.
 * @param {{ name, email, phone, currentClass, course, message }} data
 * @returns {Promise<DocumentReference>}
 */
export const submitEnquiry = async ({
  name,
  email = "",
  phone,
  currentClass = "",
  course = "",
  message = "",
  branch = "",
  school = "",
}) => {
  return await addDoc(collection(db, "enquiries"), {
    name,
    email: email || "",
    phone,
    currentClass: currentClass || "",
    course: course || "",
    message: message || "",
    branch: branch || "",
    school: school || "",
    createdAt: serverTimestamp(),
  });
};

// ─── MSAT REGISTRATIONS ─────────────────────────────────────

/**
 * Submit an MSAT (Manch Scholarship Admission Test) registration.
 * @param {{ name, email, phone, currentClass, preferredDate, school }} data
 * @returns {Promise<DocumentReference>}
 */
export const submitMSATRegistration = async ({
  name,
  email,
  phone,
  currentClass,
  preferredDate,
  school,
}) => {
  return await addDoc(collection(db, "registrations"), {
    name,
    email,
    phone,
    currentClass,
    preferredDate,
    school,
    createdAt: serverTimestamp(),
  });
};

// ─── RESULTS ─────────────────────────────────────────────────

/**
 * Add a result entry (topper / result card).
 * @param {{ name, score, exam, year, category, imageUrl, description }} data
 */
export const addResult = async (data) => {
  return await addDoc(collection(db, "results"), {
    name: data.name || "",
    score: data.score || "",
    exam: data.exam || "",
    year: data.year || "",
    category: data.category || "NEET/JEE",
    imageUrl: data.imageUrl || "",
    description: data.description || "",
    createdAt: serverTimestamp(),
  });
};

/**
 * Fetch all results ordered by creation date (newest first).
 */
export const getResults = async () => {
  const q = query(collection(db, "results"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/**
 * Update a result entry.
 */
export const updateResult = async (docId, updates) => {
  const ref = doc(db, "results", docId);
  await updateDoc(ref, { ...updates, updatedAt: serverTimestamp() });
};

/**
 * Delete a result entry.
 */
export const deleteResult = async (docId) => {
  await deleteDoc(doc(db, "results", docId));
};

/**
 * Update study material text fields (title, subject).
 */
export const updateMaterial = async (docId, updates) => {
  const ref = doc(db, "materials", docId);
  await updateDoc(ref, { ...updates, updatedAt: serverTimestamp() });
};

// ─── GET & DELETE ENQUIRIES ─────────────────────────────────

/**
 * Fetch all admission enquiries ordered by creation date (newest first).
 * @returns {Promise<Array>}
 */
export const getEnquiries = async () => {
  const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
      };
    })
    .filter((item) => {
      // Exclude cancellation/refund requests so they only appear under Refund Requests
      const isRefund =
        item.submissionType === "Admission Cancellation & Refund Request" ||
        (item.course && typeof item.course === "string" && item.course.startsWith("Cancellation:")) ||
        (item.message && typeof item.message === "string" && item.message.includes("[CANCELLATION & REFUND REQUEST]"));
      return !isRefund;
    });
};

/**
 * Delete an enquiry entry from Firestore.
 * @param {string} docId
 * @returns {Promise<void>}
 */
export const deleteEnquiry = async (docId) => {
  await deleteDoc(doc(db, "enquiries", docId));
};

// ─── GET & DELETE REGISTRATIONS ──────────────────────────────

/**
 * Fetch all MSAT registrations ordered by creation date (newest first).
 * @returns {Promise<Array>}
 */
export const getRegistrations = async () => {
  const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
    };
  });
};

/**
 * Delete an MSAT registration entry from Firestore.
 * @param {string} docId
 * @returns {Promise<void>}
 */
export const deleteRegistration = async (docId) => {
  await deleteDoc(doc(db, "registrations", docId));
};

// ─── STUDENTS ───────────────────────────────────────────────

/**
 * Check if a student with the given phone number already exists in Firestore.
 * @param {string} phone
 * @returns {Promise<boolean>}
 */
export const checkStudentExists = async (phone) => {
  const q = query(collection(db, "students"), where("phone", "==", phone));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};

/**
 * Add a new student record to the students collection.
 * @param {{ name, standard, school, phone }} data
 * @returns {Promise<DocumentReference>}
 */
export const addStudentInfo = async ({ name, standard, school, phone }) => {
  return await addDoc(collection(db, "students"), {
    name,
    standard,
    school,
    phone,
    createdAt: serverTimestamp(),
  });
};

/**
 * Fetch all registered students ordered by registration date (newest first).
 * @returns {Promise<Array>}
 */
export const getStudents = async () => {
  const q = query(collection(db, "students"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
    };
  });
};

/**
 * Delete a student record from Firestore.
 * @param {string} docId
 * @returns {Promise<void>}
 */
export const deleteStudent = async (docId) => {
  await deleteDoc(doc(db, "students", docId));
};




// ─── REFUND & CANCELLATION REQUESTS ──────────────────────────

/**
 * Helper to parse a legacy refund request stored in the enquiries collection.
 */
const parseEnquiryRefundMessage = (docData) => {
  const msg = docData.message || "";
  const extract = (label) => {
    const match = msg.match(new RegExp(label + ":\\s*([^\\n\\|]+)"));
    return match ? match[1].trim() : "";
  };
  const extractReason = () => {
    const p = msg.split(/Reason:\s*\n/i);
    return p.length > 1 ? p[1].trim() : "";
  };

  const parentMatch = extract("Parent/Guardian");
  const relMatch = parentMatch ? parentMatch.match(/\(([^)]+)\)/) : null;
  const parentName = parentMatch ? parentMatch.replace(/\s*\([^)]*\)/, "").trim() : "";

  return {
    studentName: docData.name || "",
    studentId: extract("Student ID") || "N/A",
    currentClass: docData.currentClass || "",
    board: extract("Board") || "",
    branch: docData.branch || extract("Branch") || "",
    courseEnrolled: extract("Enrolled Course") || docData.course || "",
    admissionDate: extract("Date of Admission") || "",
    lastDateAttended: extract("Last Date Attended") || "",
    parentName: parentName || "",
    relationship: relMatch ? relMatch[1] : "Parent",
    phone: docData.phone || "",
    email: docData.email || "",
    feesPaid: extract("Total Fees Paid")?.replace(/[^\d.]/g, "") || "",
    refundRequested: extract("Refund Choice") || "Yes, I wish to request a refund",
    paymentReference: extract("Payment Reference") || "N/A",
    cancellationReason: extractReason() || msg,
    status: docData.status || "Pending",
    consentAccuracy: true,
    consentVerification: true,
    consentContact: true,
    createdAt: docData.createdAt,
  };
};

/**
 * Migrate any existing refund requests from enquiries collection to refund_requests.
 */
export const migrateExistingRefundEnquiries = async () => {
  try {
    const q = query(collection(db, "enquiries"));
    const snapshot = await getDocs(q);
    const refundEnquiryDocs = snapshot.docs.filter((d) => {
      const data = d.data();
      return (
        data.submissionType === "Admission Cancellation & Refund Request" ||
        (data.course && typeof data.course === "string" && data.course.startsWith("Cancellation:")) ||
        (data.message && typeof data.message === "string" && data.message.includes("[CANCELLATION & REFUND REQUEST]"))
      );
    });

    for (const d of refundEnquiryDocs) {
      const data = d.data();
      const parsed = parseEnquiryRefundMessage({ id: d.id, ...data });

      await addDoc(collection(db, "refund_requests"), {
        ...parsed,
        createdAt: data.createdAt || serverTimestamp(),
      });

      await deleteDoc(doc(db, "enquiries", d.id));
    }
  } catch (err) {
    console.warn("Migration notice (enquiries -> refund_requests):", err);
  }
};

/**
 * Submit an Admission Cancellation and Refund Request.
 * Saves strictly to the refund_requests collection.
 * @param {Object} data
 * @returns {Promise<DocumentReference>}
 */
export const submitRefundRequest = async (data) => {
  return await addDoc(collection(db, "refund_requests"), {
    studentName: data.studentName || "",
    studentId: data.studentId || "",
    currentClass: data.currentClass || "",
    board: data.board || "",
    branch: data.branch || "",
    courseEnrolled: data.courseEnrolled || "",
    admissionDate: data.admissionDate || "",
    parentName: data.parentName || "",
    relationship: data.relationship || "",
    phone: data.phone || "",
    email: data.email || "",
    cancellationReason: data.cancellationReason || "",
    lastDateAttended: data.lastDateAttended || "",
    feesPaid: data.feesPaid || "",
    refundRequested: data.refundRequested || "Yes, I wish to request a refund",
    paymentReference: data.paymentReference || "",
    consentAccuracy: Boolean(data.consentAccuracy),
    consentVerification: Boolean(data.consentVerification),
    consentContact: Boolean(data.consentContact),
    status: "Pending",
    createdAt: serverTimestamp(),
  });
};

/**
 * Fetch all refund requests ordered by creation date (newest first).
 * Auto-migrates any legacy enquiries on first fetch.
 * @returns {Promise<Array>}
 */
export const getRefundRequests = async () => {
  try {
    await migrateExistingRefundEnquiries();
  } catch (mErr) {
    console.warn("Auto-migration check notice:", mErr);
  }

  try {
    const q = query(collection(db, "refund_requests"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
      };
    });
  } catch (err) {
    const snapshot = await getDocs(collection(db, "refund_requests"));
    const list = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
      };
    });
    return list.sort((a, b) => {
      const tA = new Date(a.createdAt || 0).getTime();
      const tB = new Date(b.createdAt || 0).getTime();
      return tB - tA;
    });
  }
};

/**
 * Update refund request status.
 * @param {string} docId
 * @param {string} status - Pending | In Review | Approved | Refunded | Rejected
 */
export const updateRefundRequestStatus = async (docId, status) => {
  const ref = doc(db, "refund_requests", docId);
  await updateDoc(ref, { status, updatedAt: serverTimestamp() });
};

/**
 * Delete a refund request from Firestore.
 * @param {string} docId
 * @returns {Promise<void>}
 */
export const deleteRefundRequest = async (docId) => {
  await deleteDoc(doc(db, "refund_requests", docId));
};
