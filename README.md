# OfficeWiz — אתר תדמית · שלומית קלמן

אתר סטטי + Decap CMS. כל הטקסטים נערכים דרך `/admin` בלי לגעת בקוד.

## מבנה
- `index.html`, `styles.css`, `app.js` — האתר
- `content.json` — **כל הטקסטים** (זה מה שה-CMS עורך)
- `admin/` — ממשק הניהול של שלומית
- `assets/` — לוגו ותמונות
- `SKILL.md` — כללי המותג לעבודה עתידית עם Claude

## פריסה (פעם אחת)
1. צור repo חדש `officewiz-site` והעלה את כל הקבצים (branch: `main`)
2. ב-[Netlify](https://app.netlify.com): Add new site → Import from GitHub → בחר את ה-repo. בלי build command, publish directory: `/`
3. ב-Netlify: **Site configuration → Identity → Enable Identity**
4. שם: Identity → Registration → **Invite only**, ואז Services → **Enable Git Gateway**
5. Identity → Invite users → המייל של שלומית. היא מקבלת מייל, קובעת סיסמה
6. דומיין: Domain management → הוסף את `officewiz.co.il` אחרי הרכישה

## שימוש יומיומי (שלומית)
- נכנסת ל-`האתר/admin` → מתחברת → עורכת → Publish
- השינוי עולה לאתר תוך ~דקה

## נשאר להשלים
- [ ] תמונה של שלומית → להעלות כ-`assets/shlomit.jpg` (או דרך ה-CMS)
- [ ] טלפון/וואטסאפ/מייל אמיתיים ב-`content.json` (כרגע placeholders)
- [ ] רשימת שירותים סופית במילים שלה
- [ ] רכישת דומיין officewiz.co.il
- [ ] טופס לידים (כרגע: וואטסאפ בלבד)
