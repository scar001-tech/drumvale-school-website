// ─────────────────────────────────────────────────────────────────────────────
// Seed data — initial staff and one demo application
// ─────────────────────────────────────────────────────────────────────────────

import type { Staff, Application, DrumvaleDB } from "./schema";
import { DB_VERSION } from "./schema";

export const SEED_STAFF: Staff[] = [
    {
        id: "STF001",
        name: "Dr. Elizabeth Harper",
        email: "e.harper@drumvale.edu",
        passwordHash: "principal2024",
        role: "Principal",
        department: "Administration",
        phone: "+1 (555) 001-0001",
        subjects: ["Leadership", "School Management"],
        joinDate: "2010-01-15",
        active: true,
        timetable: [],
    },
    {
        id: "STF002",
        name: "Prof. James Adeyemi",
        email: "j.adeyemi@drumvale.edu",
        passwordHash: "academics2024",
        role: "Vice Principal, Academics",
        department: "Administration",
        phone: "+1 (555) 001-0002",
        subjects: ["Mathematics", "Physics"],
        joinDate: "2012-08-20",
        active: true,
        timetable: [
            { day: "Monday",    period: "1", time: "08:00–08:45", subject: "Mathematics",  class: "Form 4A", room: "Room 101" },
            { day: "Monday",    period: "3", time: "10:00–10:45", subject: "Physics",       class: "Form 5B", room: "Lab 2"    },
            { day: "Tuesday",   period: "2", time: "09:00–09:45", subject: "Mathematics",  class: "Form 4B", room: "Room 101" },
            { day: "Wednesday", period: "1", time: "08:00–08:45", subject: "Physics",       class: "Form 5A", room: "Lab 2"    },
            { day: "Thursday",  period: "4", time: "11:00–11:45", subject: "Mathematics",  class: "Form 4A", room: "Room 101" },
            { day: "Friday",    period: "2", time: "09:00–09:45", subject: "Physics",       class: "Form 5B", room: "Lab 2"    },
        ],
    },
    {
        id: "STF003",
        name: "Ms. Anika Patel",
        email: "a.patel@drumvale.edu",
        passwordHash: "admissions2024",
        role: "Director of Admissions",
        department: "Admissions",
        phone: "+1 (555) 001-0003",
        subjects: ["Guidance & Counselling"],
        joinDate: "2015-03-10",
        active: true,
        timetable: [
            { day: "Monday",    period: "2", time: "09:00–09:45", subject: "Guidance", class: "Form 1A", room: "Counselling Room" },
            { day: "Wednesday", period: "3", time: "10:00–10:45", subject: "Guidance", class: "Form 2B", room: "Counselling Room" },
        ],
    },
    {
        id: "STF004",
        name: "Mr. David Osei",
        email: "d.osei@drumvale.edu",
        passwordHash: "studentlife2024",
        role: "Director of Student Life",
        department: "Student Affairs",
        phone: "+1 (555) 001-0004",
        subjects: ["Physical Education", "Life Skills"],
        joinDate: "2018-09-01",
        active: true,
        timetable: [
            { day: "Monday",    period: "5", time: "12:00–12:45", subject: "Physical Education", class: "Form 3A", room: "Sports Hall" },
            { day: "Tuesday",   period: "5", time: "12:00–12:45", subject: "Physical Education", class: "Form 3B", room: "Sports Hall" },
            { day: "Thursday",  period: "5", time: "12:00–12:45", subject: "Life Skills",         class: "Form 2A", room: "Room 205"    },
        ],
    },
];

export const SEED_APPLICATION: Application = {
    id: "APP2024001",
    studentFirstName: "Amara",
    studentLastName: "Okonkwo",
    studentDOB: "2010-05-14",
    studentGender: "Female",
    studentNationality: "Nigerian",
    gradeApplying: "Form 3",
    parentName: "Mrs. Grace Okonkwo",
    parentIdNumber: "ID123456789",
    parentEmail: "grace.okonkwo@email.com",
    parentPhone: "+2348012345678",
    parentRelationship: "Mother",
    status: "assessment",
    submittedAt: "2024-11-01",
    approvedAt: "2024-11-10",
    feesPaid: true,
    feesPaidAt: "2024-11-12",
    feesAmount: 13300,
};

export function buildInitialDB(): DrumvaleDB {
    const staffMap: Record<string, Staff> = {};
    SEED_STAFF.forEach((s) => { staffMap[s.id] = s; });

    return {
        applications: { [SEED_APPLICATION.id]: SEED_APPLICATION },
        students: {},
        staff: staffMap,
        smsLogs: {},
        feeRecords: {},
        meta: {
            version: DB_VERSION,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            nextAdmissionSeq: 1,
        },
    };
}
