const initialNavTexts = Array.from(document.querySelectorAll('nav a'), link => link.textContent);
const initialBodyTexts = Array.from(document.querySelectorAll('.center-text'), term => term.textContent);

function changeLanguage(language) {
    // Update the HTML lang attribute
    document.documentElement.lang = language;

    // Update content based on the selected language
    if (language === 'fi') {
        // Finnish content
        document.querySelector('p').textContent = 'Tervetuloa Suomalaisen jalkapallon ja futsalin sivuille!';
        updateNavbarText(initialNavTexts, {
            'Etusivu': 'Etusivu',
            'Jalkapallo Minipeli': 'Jalkapallo Minipeli',
            'Huuhkajat': 'Huuhkajat',
            'Helmarit': 'Helmarit',
            'Futsal Miehet': 'Futsal Miehet',
            'Futsal Naiset': 'Futsal Naiset',
            'Tietoa Suomen Palloliitosta': 'Tietoa Suomen Palloliitosta',
            'Suomen Lupaavimmat Pelaajat': 'Suomen Lupaavimmat Pelaajat',
        });
        translateBodyContent(getTietoaTranslations(language));
        translateBodyContent2(getTranslations(language, true));
        translateBodyContent3(getFootball(language));
        translateBodyContent4(getTalentit(language));
    } else {
        // English content
        document.querySelector('p').textContent = 'Welcome to the pages of Finnish football and futsal!';
        updateNavbarText(initialNavTexts, {
            'Etusivu': 'Homepage',
            'Jalkapallo Minipeli': 'Football Minigame',
            'Huuhkajat': "Men's Football",
            'Helmarit': "Women's Football",
            'Futsal Miehet': "Men's Futsal",
            'Futsal Naiset': "Women's Futsal",
            'Tietoa Suomen Palloliitosta': 'About the Finnish Football Association',
            'Suomen Lupaavimmat Pelaajat': 'Finland\'s Most Promising Players',
        });
        translateBodyContent(getTietoaTranslations(language));
        translateBodyContent2(getTranslations(language, true));
        translateBodyContent3(getFootball(language));
        translateBodyContent4(getTalentit(language));
    }
}


function updateNavbarText(initialTexts, translationMap) {
    // Update text content for each navigation link using the initial text content
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link, index) => {
        link.textContent = translationMap[initialTexts[index]] || initialTexts[index];
    });
}

function translateBodyContent(translations) {
    // Update text content for elements in the body
    const bodyTerms = document.querySelectorAll('.center-text4');
    bodyTerms.forEach((term, index) => {
        term.textContent = translations[index] || initialBodyTexts[index];
    });
}

function translateBodyContent2(translations) {
    // Update text content for elements in the body with class 'center-text2'
    const bodyTerms = document.querySelectorAll('.center-text2');
    bodyTerms.forEach((term, index) => {
        term.textContent = translations[index] || initialBodyTexts[index];
    });
}

function translateBodyContent3(translations) {
    // Update text content for elements in the body with class 'center-text2'
    const bodyTerms = document.querySelectorAll('.center-text');
    bodyTerms.forEach((term, index) => {
        term.textContent = translations[index] || initialBodyTexts[index];
    });
}

function translateBodyContent4(translations) {
    // Update text content for elements in the body with class 'center-text2'
    const bodyTerms = document.querySelectorAll('.center-text5');
    bodyTerms.forEach((term, index) => {
        term.textContent = translations[index] || initialBodyTexts[index];
    });
}

function getTranslations(language, isFutsalMen) {
    const menTranslations = {
        'fi': ['Maalivahdit', 'Kenttäpelaajat', 'Taustahenkilöt'],
        'en': ['Goalkeepers', 'Field Players', 'Background Staff'],
    };

    const futsalMenTranslations = {
        'fi': ['Maalivahdit', 'Kenttäpelaajat', 'Taustahenkilöt'],
        'en': ['Goalkeepers', 'Field Players', 'Background Staff'],
    };

    return isFutsalMen ? futsalMenTranslations[language] || futsalMenTranslations['en'] : menTranslations[language] || menTranslations['en'];
}

function getFootball(language) {
    const translations = {
        'fi': ['Maalivahdit', 'Puolustajat', 'Keskikenttä', 'Hyökkääjät', 'Taustahenkilöt'],
        'en': ['Goalkeepers', 'Defenders', 'Midfielders', 'Forwards', 'Background Staff'],
    };
    return translations[language] || [];
}

function getTalentit(language) {
    const translations = {
        'fi': [
            'Suomen Talentit',
        ],
        'en': [
            'Finland\'s Talent',
        ],
    };

    return translations[language] || [];
}

function getTietoaTranslations(language) {
    const translations = {
        'fi': [
            'Olennaista Tietoa',
            'Suomen Palloliitto perustettiin vuonna 1907 Helsingissä. Vuodesta 1908 asti Suomen Palloliitto on ollut FIFA:n jäsen ja UEFA:n jäsen vuodesta 1954. Suomen ensimmäinen maaottelu oli vuonna 1911 Ruotsia vastaan, joka päättyi 5-2 Ruotsille.',
            'Maajoukkueen suurin tappio oli Saksaa vastaan 1.9.1940, joka päättyi 13-0. Suurimmat voitot tulivat 1922 Viroa vastaan, joka päättyi 10-2 Suomelle  ja 2010 San Marinoa vastaan, joka päättyi 8-0.',
            'Vuoden 2024 Em - Karsintaosuus on ohi. Suomi sijoittui omassa lohkossan kolmanneksi, joka tarkoittaa sitä, että Suomi karsiutuu pois. Lohkon kaksi parasta osallistuu turnaukseen. Suomella on kuitenkin vielä mahdollisuus päästä kisoihin jatko karsintojen kautta, jotka pelataan keväällä.',
            'Huuhkajien isoimpiin saavutuksiin kuuluu EM - Kilpailukarsintojen voitto ja osallistuminen ensimmäistä kertaa EM-lopputurnaukseen vuonna 2020',
            'Eniten miesten maajoukkueen maaleja on tehnyt Teemu Pukki (39), eniten naisten maajoukkueen maaleja on tehnyt Linda Sällström (56) ja eniten miesten otteluita on pelannut Jari Litmanen (137), eniten naisten otteluita on pelannut Anna Westerlund (147)',
            'Helmarit edustavat Suomen naisten jalkapallomaajoukkuetta, Helmarit perustettiin 1973, samana vuonna pidettiin ensimmäinen ottelu Ruotsia vastaan, joka loppui 0-0.',
            'Miesten jalkapallomaajoukkueen FIFA-ranking on #59, ja naisten jalkapallomaajoukkueen FIFA-ranking on #28.',
        ],
        'en': [
            'Essential Information',
            'The Finnish Football Association was founded in 1907 in Helsinki. Since 1908, the Finnish Football Association has been a member of FIFA and a member of UEFA since 1954. Finland\'s first international match was in 1911 against Sweden, which ended 5-2 in favor of Sweden.',
            'The national team\'s biggest defeat was against Germany on September 1, 1940, ending 13-0. The biggest victories came in 1922 against Estonia, ending 10-2 for Finland, and in 2010 against San Marino, ending 8-0.',
            'The qualification phase for Euro 2024 is over. Finland finished third in their group, meaning Finland is eliminated. The top two teams in the group qualify for the tournament. However, Finland still has a chance to qualify through the additional qualifiers, which will be played in the spring.',
            'One of Huuhkajat\'s significant achievements is winning the Euro Qualifiers and participating in the UEFA European Championship for the first time in 2020.',
            'Teemu Pukki is the top scorer for the men\'s national team with',
            'Helmarit represent the Finnish women\'s national football team. Helmarit was founded in 1973, and the first match was held in the same year against Sweden, ending 0-0.',
            'The men\'s national football team FIFA ranking is #59, and the women\'s national football team FIFA ranking is #28.',
        ],
    };

    return translations[language] || [];
}

