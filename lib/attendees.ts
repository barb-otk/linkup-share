import { Attendee } from "@/types";

export interface AttendeeDisplayData {
  label: string;
  avatars: Attendee[];
  totalCount: number;
}

export function getAttendeeDisplay(
  host: Attendee,
  attendees: Attendee[],
  total: number
): AttendeeDisplayData {
  const guests = attendees.filter((a) => a.id !== host.id);
  const avatars = [host, ...guests].slice(0, 4);

  let label: string;
  if (guests.length === 0) {
    label = `${host.name} is hosting`;
  } else if (guests.length === 1) {
    label = `${host.name} and ${guests[0].name} are going`;
  } else {
    const extras = total - 2;
    label = `${host.name}, ${guests[0].name}${extras > 0 ? `, and ${extras} others` : ""} are going`;
  }

  return { label, avatars, totalCount: total };
}
