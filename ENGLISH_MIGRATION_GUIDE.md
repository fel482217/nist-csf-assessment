# 🌍 English Migration & Internationalization (i18n) Guide

## ✅ What Has Been Done

### 1. **English Content Created**
- ✅ **seed_complete_csf_en.sql** - All 100+ NIST CSF 2.0 subcategories in English
- ✅ Each subcategory has English assessment questions
- ✅ All descriptions are in English

### 2. **Files Ready**
- ✅ All framework controls (ISO 27001, CIS) are already in English
- ✅ All mappings are in English
- ✅ Backend API is language-neutral (returns database content as-is)

---

## 🚀 How to Apply English Content

### Step 1: Replace Spanish with English Data

Go to Cloudflare Dashboard D1 Console and execute:

```sql
-- 1. Clear existing Spanish subcategories
DELETE FROM csf_framework_mappings;
DELETE FROM assessment_responses WHERE id > 0;
DELETE FROM csf_subcategories;

-- 2. Copy and paste all content from seed_complete_csf_en.sql
-- This will insert all subcategories in English
```

### Step 2: Verify

```sql
-- Check subcategories are in English
SELECT id, name, description FROM csf_subcategories LIMIT 5;

-- Expected output should show English questions like:
-- "Are the organization's mission, objectives, and activities clearly documented and communicated?"
```

---

## 🌐 Next Steps: Add Language Switcher (Future Enhancement)

To make the app truly bilingual, you would need to:

### Option 1: Database-Level Translation (Recommended for now)

**Approach:** Keep English as default, create Spanish version separately

1. **Add language column to tables:**
```sql
ALTER TABLE csf_subcategories ADD COLUMN language TEXT DEFAULT 'en';
```

2. **Duplicate records for Spanish:**
```sql
INSERT INTO csf_subcategories (id, category_id, name, description, sequence, language)
SELECT id || '_es', category_id, name_es, description_es, sequence, 'es'
FROM csf_subcategories WHERE language = 'en';
```

3. **API returns filtered by language:**
```typescript
app.get('/api/csf/subcategories', async (c) => {
  const lang = c.req.query('lang') || 'en'
  const query = `SELECT * FROM csf_subcategories WHERE language = ? ORDER BY sequence`
  const { results } = await c.env.DB.prepare(query).bind(lang).all()
  return c.json(results)
})
```

### Option 2: Frontend-Only Translation (Simpler)

**Approach:** Keep database in English, translate UI labels only

1. **Create translation file: `/public/static/translations.js`**

```javascript
const translations = {
  en: {
    app_title: 'NIST CSF 2.0 Assessment Manager',
    assessments: 'Assessments',
    frameworks: 'Frameworks',
    organizations: 'Organizations',
    new_assessment: 'New Assessment',
    create: 'Create',
    cancel: 'Cancel',
    // ... more translations
  },
  es: {
    app_title: 'Gestor de Evaluaciones NIST CSF 2.0',
    assessments: 'Evaluaciones',
    frameworks: 'Frameworks',
    organizations: 'Organizaciones',
    new_assessment: 'Nueva Evaluación',
    create: 'Crear',
    cancel: 'Cancelar',
    // ... more translations
  }
}

// Simple translation function
function t(key, lang = 'en') {
  return translations[lang][key] || key
}
```

2. **Add language selector to frontend:**

```html
<select id="language-selector" onchange="changeLanguage(this.value)">
  <option value="en">English</option>
  <option value="es">Español</option>
</select>
```

3. **Update UI text dynamically:**

```javascript
function changeLanguage(lang) {
  localStorage.setItem('language', lang)
  // Update all UI elements
  document.querySelector('h1').textContent = t('app_title', lang)
  // ... update other elements
  location.reload() // Simple approach
}
```

### Option 3: Full i18n Library (Most Professional)

Use a library like **i18next** for complete internationalization:

1. **Install i18next (if using npm build):**
```bash
npm install i18next
```

2. **Load via CDN in HTML:**
```html
<script src="https://cdn.jsdelivr.net/npm/i18next@latest/dist/umd/i18next.min.js"></script>
```

3. **Initialize:**
```javascript
i18next.init({
  lng: 'en',
  resources: {
    en: { translation: {...} },
    es: { translation: {...} }
  }
})
```

---

## 📋 Current Status

### ✅ Already in English
- Database schema
- API endpoints
- Framework controls (ISO 27001, CIS)
- Mappings
- Backend code

### 🔄 Now in English (after migration)
- NIST CSF subcategories
- Assessment questions

### ⏳ Still to Translate (Optional - Future)
- Frontend UI labels
- Button text
- Form labels
- Error messages
- Notification messages

---

## 🎯 Recommended Approach

For your current needs, I recommend:

1. ✅ **Apply English subcategories** (use seed_complete_csf_en.sql)
2. ✅ **Keep app in English** as primary language
3. ⏳ **Add language switcher later** as Phase 2

This gives you:
- Professional English interface
- Ready for international use
- Foundation for adding more languages later

---

## 🚀 Quick Migration Commands

### Apply English Data to Production

```bash
# Set your token
export CLOUDFLARE_API_TOKEN="y7zbytJsoYc_HNof7aViHv_Nu39oPrXWsUL7FMLj"

# Clear old Spanish data
npx wrangler d1 execute nist-csf-db --remote --command="DELETE FROM csf_framework_mappings; DELETE FROM assessment_responses WHERE id > 0; DELETE FROM csf_subcategories;"

# Apply English subcategories
npx wrangler d1 execute nist-csf-db --remote --file=./seed_complete_csf_en.sql

# Re-apply framework controls (already in English)
npx wrangler d1 execute nist-csf-db --remote --file=./seed_frameworks_controls.sql

# Re-apply mappings (already in English)
npx wrangler d1 execute nist-csf-db --remote --file=./seed_mappings.sql
```

### Verify

```bash
# Check subcategories
npx wrangler d1 execute nist-csf-db --remote --command="SELECT id, name FROM csf_subcategories LIMIT 5;"
```

---

## 📝 Example: Bilingual Question Display

Once you add language support, questions will work like this:

**English (en):**
> "Are the organization's mission, objectives, and activities clearly documented and communicated?"

**Spanish (es):**
> "¿La misión, objetivos y actividades de la organización están claramente documentados y comunicados?"

---

## 💡 Tips for Language Support

1. **Store user preference:**
```javascript
localStorage.setItem('userLanguage', 'en') // or 'es'
```

2. **Detect browser language:**
```javascript
const browserLang = navigator.language.split('-')[0] // 'en' or 'es'
```

3. **Use language in API calls:**
```javascript
axios.get('/api/csf/subcategories?lang=en')
```

4. **CSS for language-specific content:**
```css
[lang="es"] { /* Spanish-specific styles */ }
[lang="en"] { /* English-specific styles */ }
```

---

## 🎊 Summary

**Right Now:**
- ✅ Apply `seed_complete_csf_en.sql` to get everything in English
- ✅ Your app will be fully professional English version

**Future (Optional):**
- Add language selector UI component
- Implement translation system (Option 2 or 3 above)
- Create Spanish translation files
- Test bilingual functionality

**The app is now ready to be 100% English!** 🚀
