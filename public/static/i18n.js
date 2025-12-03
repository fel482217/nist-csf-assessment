// Simple i18n system for language switching
class I18n {
    constructor() {
        this.translations = {};
        this.currentLang = localStorage.getItem('lang') || 'en';
        this.supportedLangs = ['en', 'es'];
    }

    async loadTranslations(lang) {
        if (!this.supportedLangs.includes(lang)) {
            lang = 'en';
        }
        
        try {
            const response = await fetch(`/static/i18n/${lang}.json`);
            this.translations[lang] = await response.json();
            this.currentLang = lang;
            localStorage.setItem('lang', lang);
            return true;
        } catch (error) {
            console.error(`Failed to load translations for ${lang}:`, error);
            return false;
        }
    }

    async init() {
        await this.loadTranslations(this.currentLang);
        this.updatePageLanguage();
    }

    t(key, defaultValue = '') {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return defaultValue || key;
            }
        }
        
        return value || defaultValue || key;
    }

    async setLanguage(lang) {
        if (lang === this.currentLang) return;
        
        if (!this.translations[lang]) {
            await this.loadTranslations(lang);
        } else {
            this.currentLang = lang;
            localStorage.setItem('lang', lang);
        }
        
        this.updatePageLanguage();
        
        // Reload current view with new language
        const currentView = document.querySelector('.view-container:not(.hidden)');
        if (currentView) {
            const viewName = currentView.id.replace('-view', '');
            if (viewName === 'assessments') {
                loadAssessments();
                // If assessment detail is open, reload it
                if (currentAssessment) {
                    viewAssessmentDetail(currentAssessment.id);
                }
            }
            if (viewName === 'frameworks') loadFrameworks();
            if (viewName === 'organizations') loadOrganizations();
        }
    }

    updatePageLanguage() {
        document.documentElement.lang = this.currentLang;
        
        // Update page title
        document.title = this.t('app.title');
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });
        
        // Update all elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });

        // Update language selector
        const langSelector = document.getElementById('language-selector');
        if (langSelector) {
            langSelector.value = this.currentLang;
        }
    }

    getLanguage() {
        return this.currentLang;
    }

    getSupportedLanguages() {
        return this.supportedLangs;
    }
}

// Create global i18n instance
const i18n = new I18n();
