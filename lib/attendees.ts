import { Attendee } from "@/types";

export interface AttendeeDisplayData {
  label: string;
  avatars: Attendee[];
  totalCount: number;
}

export function getAttendeeDisplay(
  ownerName: string,
  attendees: Attendee[],
  total: number
): AttendeeDisplayData {
  const avatars = attendees.slice(0, 4);

  let label: string;
  if (total === 0) {
    label = `${ownerName} is attending`;
  } else if (total === 1) {
    label = `${ownerName} and 1 other`;
  } else {
    label = `${ownerName} and ${total} others`;
  }

  return { label, avatars, totalCount: total };
}