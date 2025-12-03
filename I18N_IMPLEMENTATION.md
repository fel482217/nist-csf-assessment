# Internationalization (i18n) Implementation Guide

## Overview
The NIST CSF 2.0 Assessment Manager now supports **multiple languages** with a user-friendly language switcher. The application defaults to English and allows users to switch between English and Spanish.

## Features Implemented

### 1. Language Switcher UI
- **Location**: Top navigation bar (right side)
- **Languages**: English (EN) and Spanish (ES)
- **Icon**: Font Awesome language icon
- **Persistence**: User language preference saved in browser localStorage

### 2. Translation Files
Located in `/public/static/i18n/`:
- **en.json** - English translations
- **es.json** - Spanish translations

### 3. i18n System
**File**: `/public/static/i18n.js`

**Key Features**:
- Automatic language detection from localStorage
- Dynamic content translation
- Support for nested translation keys (e.g., `app.title`, `nav.assessments`)
- Automatic page updates when language changes
- Fallback to English if translation not found

## Translation Structure

```json
{
  "app": {
    "title": "Application title",
    "language": "Language selector label"
  },
  "nav": {
    "assessments": "Assessments menu",
    "frameworks": "Frameworks menu",
    "organizations": "Organizations menu"
  },
  "assessments": {
    "title": "Page title",
    "new": "New button",
    "empty": "Empty state message",
    ...
  },
  "status": {
    "draft": "Draft status",
    "in_progress": "In Progress status",
    "completed": "Completed status",
    "archived": "Archived status"
  }
}
```

## How to Use

### For Users
1. **Access the application**: Open the web app
2. **Locate the language selector**: Top-right corner of navigation bar
3. **Select language**: Choose between English or Spanish
4. **Automatic save**: Your preference is saved and persists across sessions

### For Developers

#### Adding New Translations
1. Open `/public/static/i18n/en.json` and `/public/static/i18n/es.json`
2. Add new translation keys following the nested structure:
   ```json
   {
     "section": {
       "key": "English translation"
     }
   }
   ```
3. Use the translation in HTML with `data-i18n` attribute:
   ```html
   <span data-i18n="section.key">Default text</span>
   ```
4. Use in JavaScript:
   ```javascript
   const text = i18n.t('section.key', 'Default text');
   ```

#### Translation Methods

**Static HTML Content**:
```html
<h2 data-i18n="app.title">NIST CSF 2.0 Assessment Manager</h2>
```

**Placeholder Text**:
```html
<input data-i18n-placeholder="assessments.name" placeholder="Assessment Name">
```

**Dynamic JavaScript Content**:
```javascript
const statusLabel = i18n.t('status.draft', 'Draft');
```

#### Updating Page Language
Call `i18n.updatePageLanguage()` after dynamically adding content with `data-i18n` attributes.

## Database Content Language

### Current Implementation
- **Database**: Contains 100+ NIST CSF 2.0 subcategories in **English**
- **Content**: All framework controls and descriptions in English
- **Questions**: Assessment questions in English

### Future Enhancement (Optional)
To support database content in multiple languages:
1. Add language column to relevant tables
2. Create language-specific seed files
3. Update API endpoints to filter by language parameter
4. Frontend sends user's language preference to API

**Example**:
```sql
-- Add language column
ALTER TABLE csf_subcategories ADD COLUMN language TEXT DEFAULT 'en';

-- Query by language
SELECT * FROM csf_subcategories WHERE language = ?;
```

## Testing

### Local Testing
1. Start local server: `npm run dev`
2. Open browser: http://localhost:3000
3. Click language selector (top-right)
4. Verify content changes to selected language
5. Refresh page - language preference should persist

### Production Testing
- **URL**: https://faf2a252.nist-csf-assessment.pages.dev
- **URL**: https://nist-csf-assessment.pages.dev

## File Structure
```
webapp/
├── public/
│   └── static/
│       ├── i18n.js              # i18n system core
│       ├── i18n/
│       │   ├── en.json          # English translations
│       │   └── es.json          # Spanish translations
│       └── app.js               # Updated with i18n support
├── src/
│   └── index.tsx                # Updated with language switcher
└── I18N_IMPLEMENTATION.md       # This file
```

## Supported Languages

| Language | Code | Status | Completeness |
|----------|------|--------|--------------|
| English  | en   | ✅ Active | 100% |
| Spanish  | es   | ✅ Active | 100% |

## Adding New Languages

To add a new language (e.g., French):

1. **Create translation file**:
   - Create `/public/static/i18n/fr.json`
   - Copy structure from `en.json`
   - Translate all values to French

2. **Update i18n.js**:
   ```javascript
   this.supportedLangs = ['en', 'es', 'fr'];
   ```

3. **Update language selector** in `src/index.tsx`:
   ```html
   <select id="language-selector" ...>
       <option value="en">English</option>
       <option value="es">Español</option>
       <option value="fr">Français</option>
   </select>
   ```

4. **Test thoroughly**
5. **Deploy**

## Best Practices

1. **Keep keys consistent**: Use the same key structure across all language files
2. **Provide defaults**: Always provide default text in case translation is missing
3. **Test after changes**: Verify all languages after modifying translation files
4. **Update both files**: When adding new keys, update ALL language files
5. **Use semantic keys**: Use descriptive key names (e.g., `assessments.new` not `button1`)

## Known Limitations

1. **Database content**: Currently only in English (subcategories, descriptions)
2. **Date formats**: Uses browser's default locale formatting
3. **Number formats**: Uses browser's default locale formatting

## Future Enhancements

1. **Multi-language database**: Support for NIST CSF content in multiple languages
2. **RTL support**: Right-to-left language support (Arabic, Hebrew)
3. **Language auto-detection**: Detect user's browser language preference
4. **More languages**: French, German, Portuguese, Italian, Japanese, Chinese
5. **Translation API**: Integration with translation services for dynamic content

## Support

For issues or questions about the i18n implementation:
- Check this guide first
- Review translation files for structure
- Verify console for i18n-related errors
- Check localStorage for language preference: `localStorage.getItem('lang')`

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Status**: ✅ Production Ready
