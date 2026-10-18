# Velaris in Winter — UGC NET JRF planner

A mobile-friendly, Night Court-inspired study planner with a month-by-month UGC NET Psychology + Paper 1 schedule, tap-or-draw checkboxes (mouse/touch/Apple Pencil), heavier animated snowfall, high-contrast text, rewards, notes, offline saving, and Supabase sync.

## Imported from the original planner
- 221 past task records from 5 September–17 October 2026, retaining their completed/unfinished status.
- Original dated notes and recorded study-minute values.
- Full-mock / SET scores, Paper 1 and Paper 2 PYQ scores, and unit-wise scores.
- The two original priority tables and the study-resource checklist.
- Editable scores, priority rows, and resources under **Scores & resources**. These extras sync across devices through the `planner_data` table.

## Included plan

- **Oct 18–Nov 3:** light NET tasks only around MBA end-terms, MAPC practical-record/synopsis deadlines, BITS NeuroSymp and the expected MBA timetable update.
- **Nov 4–Dec 3:** first syllabus pass, weighted toward research/statistics, testing, biological basis, social psychology, clinical/development, and history/Indian psychology. Paper 1 Quant/DI and high-memory units recur throughout.
- **Nov weekends:** 150-minute placeholders for the instructor's five-hour unit revision/PYQ/MCQ recordings watched at 2x, plus catch-up and RMET blocks. These are intended to be moved to the relevant unit recording once it is available.
- **Dec 4–6:** timed papers and analysis.
- **Dec 7–11:** one-hour NET maintenance only around MBA midterms.
- **Dec 12–14:** no study planned due to ACCS conference/travel.
- **Dec 15:** light review only. **Dec 16 is provisional**, pending NTA's Psychology shift announcement.

This is a prioritised working plan, not a guarantee of JRF qualification. The eight-hour and two-hour weekday slots are intentionally flexible until the MBA timetable is known. Edit or move tasks when dates change.

## Deploy on GitHub Pages

1. Create a GitHub repository, for example `velaris-in-winter`.
2. Upload the contents of this folder to the repository root, including the hidden `.github` directory.
3. In **Settings → Pages**, choose **GitHub Actions** as the source. The included workflow deploys the site on pushes to `main`.
4. Wait for the workflow to complete and open the URL shown in GitHub Pages.

## Enable Supabase cloud sync

1. Create or open a Supabase project.
2. Open **SQL Editor** and run all of `supabase/schema.sql`. If you already created the older version of this planner's tables, run the updated full script again; it safely creates the additional `planner_data` table and refreshes the planner's own policies.
3. Open **Project Settings → API** (or **Connect**) and copy the project URL and the public publishable key / legacy anon key.
4. Paste them into `config.js`:

   ```js
   window.APP_CONFIG = {
     SUPABASE_URL: "https://YOUR_PROJECT.supabase.co",
     SUPABASE_ANON_KEY: "YOUR_PUBLIC_PUBLISHABLE_OR_ANON_KEY"
   };
   ```

5. In **Authentication → Providers**, enable Email. Create an account under **Authentication → Users → Add user**.
6. Open the deployed site and press **Sync**; sign in with that account. Use the same account on laptop and iPad.

**Security:** the browser-side publishable/anon key is intended to be public. Never put a `service_role` key or secret key in this repository. Row Level Security in the supplied schema restricts each account to its own tasks and notes.

## Behaviour and limitations

- Tapping/clicking a checkbox saves immediately to the browser. Signed-in users sync tasks and notes to Supabase; changes also sync automatically while online.
- Offline changes remain in local storage and can sync after reconnecting. Test both devices before depending on it.
- This is a tap/click checkbox, not a freehand ink canvas. Apple Pencil works by tapping the checkbox.
- The planner stores its initial seeded schedule locally. The app uses a new local-storage version key for this personalised schedule. If an older generic starter schedule remains in your cloud account, the app ignores its old `starter-*` rows.
- The date assumption and session recordings are editable tasks; update them when NTA and the instructor publish exact dates/content.

## Updating an already deployed site
Upload/commit **all files** from the updated folder to the same repository, including `legacy-data.js` and the updated `supabase/schema.sql`. Keep `index.html` at the repository root. After the GitHub Pages workflow completes, the site will import the historical data on first load. The historical import is bundled into the site and merged by task ID to avoid duplicate past tasks.
