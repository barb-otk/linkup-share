# Linkup Share Pages — Dev Split

## Stack
- **Framework**: Next.js 14 App Router + TypeScript
- **Styling**: Tailwind CSS
- **Deploy**: Vercel

## Domain
Using path-based routing on the main domain (e.g. `linkupapp.io/linkup/[id]`)
instead of a subdomain. Coordinate with whoever owns the main domain's Vercel
project — both projects can share a domain via Vercel's domain settings, or
this app takes over the full domain.

---

## 👤 Dev A — Infrastructure, Data & Logic

### Done for you (scaffold)
- `types/index.ts` — all shared TypeScript types
- `lib/api.ts` — `fetchLinkupEvent` and `fetchUserProfile`
- `lib/datetime.ts` — `formatEventDate`, `getDateStatus`
- `lib/attendees.ts` — `getAttendeeDisplay`
- `lib/device.ts` — `detectDevice`, `isMobile`
- `lib/deeplink.ts` — deep link URL builders + store URLs
- `app/linkup/[id]/page.tsx` — route shell with data fetching + OG metadata
- `app/profile/[id]/page.tsx` — route shell with data fetching + OG metadata

### Your tasks
1. **Connect real API endpoints** in `lib/api.ts`
   - Replace placeholder base URL with actual API
   - Add auth headers if needed (Bearer token, API key, etc.)
   - Update types in `types/index.ts` to match actual API response shapes
2. **Environment variables** — fill in `.env.local` from `.env.local.example`
3. **Vercel setup**
   - Create project, connect repo
   - Add env vars in Vercel dashboard
   - Configure domain
4. **Deep link scheme** — confirm `linkup://` is the correct registered scheme
   with the mobile team. Update `lib/deeplink.ts` if different.
5. **Wire Dev B's components into the page files** once they're ready:
   ```tsx
   // In app/linkup/[id]/page.tsx — swap the <pre> debug block:
   if (mobile) return <LinkupPageMobile event={event} device={device} />;
   return <LinkupPageDesktop event={event} />;
   ```
6. **QA**: deep link testing on iOS + Android, API error states, OG preview

---

## 👤 Dev B — UI Components & Pages

### Done for you (stubs)
All component files are created as empty stubs. Just fill them in.

### Your tasks

#### Shared components (`components/shared/`)
| Component | What it does |
|---|---|
| `TopBanner` | App promo banner at the top of every page |
| `AppStoreButtons` | App Store + Google Play download buttons |
| `QRCodeCard` | Desktop card with QR code to open on phone |
| `AttendeeAvatarStack` | Overlapping avatar circles (up to 4 shown) |
| `AttendeeGrid` | Full attendee grid for the event page |

#### Linkup event page (`components/linkup/`)
| Component | What it does |
|---|---|
| `LinkupHero` | Cover image + avatar stack + event title |
| `LinkupInfoRow` | Type, date/time, location icon rows |
| `LinkupDescription` | Expandable description with "See more" |
| `LinkupMap` | Google Maps embed for event location |
| `LinkupAttendees` | Attendee grid section |
| `JoinButton` | CTA — triggers deep link, falls back to store |
| `LinkupPageMobile` | Full mobile layout assembling above components |
| `LinkupPageDesktop` | Full desktop layout with QR code card |

#### Profile page (`components/profile/`)
| Component | What it does |
|---|---|
| `ProfileHeader` | Avatar, name, age, location, occupation |
| `ProfileAbout` | Bio with "Read more" expand |
| `ProfileTags` | Interests + languages as pill tags |
| `ProfileLinkups` | User's upcoming linkup cards |
| `AddFriendButton` | CTA — triggers deep link to open app |
| `ProfilePageMobile` | Full mobile layout |
| `ProfilePageDesktop` | Full desktop layout with QR card |

### Props contracts

```tsx
// LinkupPageMobile / LinkupPageDesktop
import { LinkupEvent } from "@/types";
import { DeviceType } from "@/lib/device";
interface Props { event: LinkupEvent; device: DeviceType; }

// ProfilePageMobile / ProfilePageDesktop
import { UserProfile } from "@/types";
interface Props { profile: UserProfile; device: DeviceType; }
```

### Helpers available to you
```ts
import { formatEventDate, getDateStatus } from "@/lib/datetime";
import { getAttendeeDisplay } from "@/lib/attendees";
import { getLinkupDeepLink, getProfileDeepLink, getStoreUrl } from "@/lib/deeplink";
```

### Deep link client-side pattern (for JoinButton / AddFriendButton)
```tsx
"use client";
function JoinButton({ eventId, device }: { eventId: string; device: DeviceType }) {
  function handleJoin() {
    const deep = getLinkupDeepLink(eventId);
    window.location.href = deep;
    // Fallback: if app not installed, redirect to store after 2s
    setTimeout(() => {
      const store = device === "mobile-ios" ? getStoreUrl("ios") : getStoreUrl("android");
      window.location.href = store;
    }, 2000);
  }
  return <button onClick={handleJoin}>Join Linkup</button>;
}
```

---

## Project structure

```
linkup-share/
├── app/
│   ├── linkup/[id]/page.tsx     ← Dev A owns
│   └── profile/[id]/page.tsx    ← Dev A owns
├── components/
│   ├── shared/                  ← Dev B owns
│   ├── linkup/                  ← Dev B owns
│   └── profile/                 ← Dev B owns
├── lib/
│   ├── api.ts                   ← Dev A owns
│   ├── attendees.ts             ← Dev A owns
│   ├── datetime.ts              ← Dev A owns
│   ├── deeplink.ts              ← Dev A owns
│   └── device.ts                ← Dev A owns
└── types/
    └── index.ts                 ← Dev A owns (update to match API)
```

## Integration point
Dev A wires Dev B's page components into the route pages.
The handoff happens in `app/linkup/[id]/page.tsx` and `app/profile/[id]/page.tsx`
— the commented-out imports and the `<pre>` debug block get replaced once
Dev B's components are ready.
