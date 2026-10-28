# Dr. Priyanka Reddy Homeopathy Clinic — website package

This package is designed to be edited on Android in Acode. It includes a premium responsive frontend, English/Telugu switch, WhatsApp appointment request, map/directions, and an optional Supabase-backed staff dashboard.

## Important: what works now vs what needs setup

### Works when you open `index.html`
- Responsive premium design.
- English/Telugu text switch.
- Click-to-call, WhatsApp request, and Google Maps search/directions.
- Appointment request form opens WhatsApp with a prefilled message. The user must review and press Send.
- No appointment data is saved by this default form.
- `admin.html` explains that the backend must be configured.

### Not live until you configure a backend
- Saving appointment requests to a database.
- Secure staff login and admin dashboard.
- Status updates for requests.

The included SQL is a starting point for Supabase Row Level Security, not a certification or guarantee of production security. A real clinic should have a developer review the policies, abuse prevention, backups, privacy notice, access controls, and legal obligations before collecting personal data. Never put a Supabase `service_role` or secret key in browser JavaScript.

## Quick start on Android / Acode
1. Download and extract this ZIP in Samsung My Files.
2. Open the extracted `priyanka_clinic_secure_website` folder in Acode.
3. Open `index.html` to inspect/edit the site. For local testing, use Acode preview if available.
4. Test phone link, language switch, map link, and appointment form. The WhatsApp form opens WhatsApp; it does not silently submit or save anything.
5. Do not publish until you verify the clinic phone, address, hours, doctor qualifications, registration details, and clinic approval.

## Configure real database-backed appointment requests (Supabase)
This is optional and requires an internet connection and a Supabase account. Ask a developer for help if any step is unfamiliar.

1. Create a Supabase project. Keep project ownership with the clinic owner.
2. In Supabase SQL Editor, run `supabase-schema.sql`.
3. In Supabase Authentication, create the staff login account. Use a strong unique password and enable appropriate account security.
4. Copy the staff user's UUID from Authentication > Users. In SQL Editor run:
   `insert into public.clinic_admins (user_id) values ('PASTE-STAFF-USER-UUID-HERE');`
   Replace the placeholder with the actual UUID.
5. Copy `config.js.example` to a new file named `config.js`. Replace the example project URL and public/publishable anon key with the values from Supabase project API settings. The anon/publishable key is designed for client use when RLS is correct. Never use a service_role/secret key.
6. Add this script line in `index.html` and `admin.html` before `app.js` / `admin.js`, respectively:
   `<script src="config.js"></script>`
   For example, in `index.html`, place it after the Supabase CDN script and before `<script defer src="app.js"></script>`.
7. The default booking form currently uses WhatsApp only. To enable database inserts, a developer must modify `app.js` to call Supabase `appointments.insert()` with only `full_name`, `phone`, `preferred_date`, `preferred_time`, `language`, `short_note`, and `status: "requested"`. Do not add sensitive health details. Test the RLS policy with both anonymous and staff accounts before going live.
8. In `admin.html`, sign in using the staff account. Only UUIDs listed in `clinic_admins` should be allowed by RLS to read or update appointments.
9. Deploy over HTTPS using a static host. Set the correct allowed redirect URLs in Supabase Authentication. Test the public form, staff sign-in, unauthorized reads, and status changes.

### Why the default form uses WhatsApp
It is useful immediately without pretending that a database exists. A WhatsApp message is only sent if the visitor reviews and sends it. It is not a substitute for a secure appointment database.

## Editing clinic details
Search these files for the details and verify them before public launch:
- `index.html`: clinic name, address, phone, consultation hours, map query, visible copy.
- `app.js`: WhatsApp number (`PHONE = "919155588488"`) and Telugu translations.
- `styles.css`: colours and responsive layout.
- `supabase-schema.sql`: appointment table and policies.

The phone is formatted as India country code +91 and the local number supplied for this draft. Confirm it is the clinic's intended public contact.

## Medical and privacy notes
- This website does not diagnose, prescribe, or provide emergency services.
- Homeopathy has not been shown to be effective for treating health conditions by reliable scientific evidence. It must not replace evidence-based care, prescribed treatments, vaccinations, or emergency care.
- Do not collect patient diagnoses, test results, prescriptions, or other sensitive clinical details through this simple form.
- The practitioner should verify and approve all qualifications, registration, services, hours, address, and public claims before launch.
- Before real use, obtain appropriate privacy/legal advice and have a qualified developer audit the complete system.
