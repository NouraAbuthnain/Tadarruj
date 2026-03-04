/**
 * TADARRUJ — script.js
 * ─────────────────────────────────────────────────────────────
 * Responsibilities
 *   1. Asset-check badge  (confirms CSS + JS both loaded)
 *   2. Language / i18n    (Arabic ↔ English, RTL ↔ LTR)
 *   3. Navbar             (scroll shadow, active link, burger)
 *   4. Mobile drawer      (open/close, a11y)
 *   5. Smooth anchor scroll
 *   6. Progress bar animation
 *   7. Scroll-reveal      (IntersectionObserver)
 *   8. FAQ auto-close siblings
 *   9. Toast helper       (reusable, not used here but available)
 *
 * NO inline <script> blocks in HTML.
 * All text comes from the T translation object below.
 * ─────────────────────────────────────────────────────────────
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   SECTION 1 — TRANSLATIONS
   All visible text lives here. HTML uses data-i18n="key"
   attributes; the Lang module writes the values in.
   ═══════════════════════════════════════════════════════════ */
const T = {

  /* ── Arabic ────────────────────────────────────────────── */
  ar: {
    /* Navbar */
    lang_btn:      'English',
    nav_problem:   'المشكلة',
    nav_solution:  'الحل',
    nav_how:       'كيف يعمل',
    nav_faq:       'الأسئلة الشائعة',
    nav_cta:       'ابدأ مجاناً',

    /* Hero */
    hero_pill:     '🎓 منصة الطالب السعودي الأكاديمية',
    hero_name:     'تدرج',
    hero_tagline:  'طريقك الهادئ نحو النجاح',
    hero_sub:
      'تدرج يجمع فرصك الأكاديمية، يرتّب خطواتك ' +
      'للقدرات والتحصيلي، ويبقيك متمركزاً على هدفك بوضوح تام.',
    hero_cta1:     'ابدأ مجاناً',
    hero_cta2:     'استكشف كضيف',

    /* Trust bar */
    trust_students:     'طالب مسجّل',
    trust_sat:          'نسبة الرضا',
    trust_tools:        'أداة متكاملة',

    /* Preview card */
    card_title:    'لوحة التقدم',
    feat1_n:       'رادار الفرص',
    feat1_d:       'اكتشف فرصك الأكاديمية',
    feat2_n:       'لوحة المواعيد',
    feat2_d:       'لا تفوتك مواعيد القدرات',
    feat3_n:       'خارطة الطريق',
    feat3_d:       'خطة ٣ سنوات واضحة',
    badge_new:     'جديد',
    badge_hot:     'شائع',
    badge_calm:    'منظّم',
    prog_qudurat:  'قدرات',
    prog_tahsili:  'تحصيلي',

    /* Problem section */
    prob_eyebrow:  'التحديات',
    prob_title:    'لماذا يضيع مسار كثير من الطلاب؟',
    prob_sub:
      'الطموح وحده لا يكفي — تحتاج إلى نظام ' +
      'يحوّله إلى خطوات واضحة وقابلة للتنفيذ.',
    p1_t: 'فرص فائتة',
    p1_b: 'تُغلق نوافذ التسجيل في اختبارات القدرات والتحصيلي دون إشعار، ويضيع جهد أشهر في لحظات.',
    p2_t: 'قلق أكاديمي',
    p2_b: 'الضغط الناتج عن الغموض وكثرة المتطلبات يضعف التركيز ويؤثر على الأداء الحقيقي.',
    p3_t: 'معلومات مبعثرة',
    p3_b: 'الجداول والتواريخ والمتطلبات موزّعة بين تويتر والموقع الرسمي والتطبيقات.',
    p4_t: 'غياب الهيكلية',
    p4_b: 'بدون خطة أكاديمية ممتدة تتراكم المهام وتتشتت الجهود وتُفقد الأولويات.',

    /* Solution section */
    sol_eyebrow:   'الحلول',
    sol_title:     'منظومة متكاملة مصمّمة للطالب السعودي',
    sol_sub:
      'أربع أدوات ذكية تعمل معاً لتوفير رؤية ' +
      'كاملة وهادئة لمسارك الأكاديمي.',
    s1_t:  'رادار الفرص',
    s1_b:  'اكتشف الفرص الأكاديمية والمنح المناسبة لمسارك ومستواك.',
    s1_tag: 'ذكاء اصطناعي',
    s2_t:  'لوحة المواعيد المهمة',
    s2_b:  'جميع مواعيد القدرات والتحصيلي وتقديم الجامعات في مكان واحد.',
    s2_tag: 'تنبيهات ذكية',
    s3_t:  'مخطط الدراسة الذكي',
    s3_b:  'خطة يومية مخصصة للتحضير للقدرات والتحصيلي وIELTS.',
    s3_tag: 'مخصص لك',
    s4_t:  'خارطة الطريق لثلاث سنوات',
    s4_b:  'رؤية شاملة لمسارك من الآن حتى القبول الجامعي خطوة بخطوة.',
    s4_tag: 'تخطيط بعيد المدى',

    /* How it works */
    how_eyebrow:   'كيف يعمل',
    how_title:     'ثلاث خطوات إلى الوضوح',
    how_sub:       'البداية بسيطة، والتحول حقيقي في طريقة إدارة مسارك.',
    step1_t:       'حدّد مسارك',
    step1_b:       'أخبرنا عن صفك وأهدافك في القدرات والتحصيلي والجامعات التي تطمح إليها.',
    step2_t:       'استلم خطتك',
    step2_b:       'خارطة طريق شخصية مع جدول زمني دقيق وتنبيهات ذكية.',
    step3_t:       'تقدّم بهدوء',
    step3_b:       'تابع تقدمك اليومي واكتشف فرصاً جديدة خطوةً خطوة.',

    /* FAQ */
    faq_eyebrow:   'الأسئلة الشائعة',
    faq_title:     'هل لديك سؤال؟',
    faq1_q:        'ما الفرق بين تدرج وتطبيقات الدراسة الأخرى؟',
    faq1_a:
      'تدرج ليس مجرد تطبيق مذاكرة — بل منظومة أكاديمية متكاملة تجمع بين ' +
      'تتبع المواعيد الرسمية لاختبارات القدرات والتحصيلي، واكتشاف الفرص، ' +
      'وبناء خطة دراسية مخصصة، وخارطة طريق تمتد لثلاث سنوات.',
    faq2_q:        'هل تدرج مجاني؟',
    faq2_a:
      'نعم، تدرج يوفر خطة مجانية كاملة تشمل جميع الأدوات الأساسية. ' +
      'الخطة المدفوعة تضيف ميزات متقدمة مثل التحليل التفصيلي.',
    faq3_q:        'هل يدعم الطلاب في المرحلة الثانوية والتحضيرية؟',
    faq3_a:
      'نعم. تدرج مصمّم للطلاب من الصف العاشر وحتى نهاية السنة التحضيرية، ' +
      'مع خارطة طريق مخصصة لكل مرحلة.',
    faq4_q:        'هل بياناتي محمية؟',
    faq4_a:
      'نعم. جميع بياناتك مخزّنة محلياً على جهازك ولا تُشارك مع أي طرف خارجي. ' +
      'يمكنك حذف حسابك وبياناتك في أي وقت.',

    /* CTA band */
    cta_title:     'ابدأ مسارك الهادئ اليوم',
    cta_sub:       'انضم إلى آلاف الطلاب السعوديين الذين يخططون بوضوح ويتقدمون بثبات.',
    cta_btn1:      'ابدأ مجاناً الآن',
    cta_btn2:      'جولة تجريبية',
    cta_fine:      'لا يُطلب بيانات بنكية · إنشاء حساب في أقل من دقيقة',

    /* Footer */
    footer_tagline: 'وضوح. هيكلية. تقدم هادئ نحو النجاح الأكاديمي.',
    footer_col1:    'المنتج',
    footer_col2:    'الشركة',
    footer_pricing: 'الأسعار',
    footer_about:   'من نحن',
    footer_contact: 'تواصل معنا',
    footer_privacy: 'سياسة الخصوصية',

    /* ── Extended signup form ── */
    signup_name_label:    'الاسم الكامل',
    signup_grade_label:   'الصف الدراسي',
    signup_grade_ph:      'اختر صفك',
    signup_grade_10:      'الصف العاشر',
    signup_grade_11:      'الصف الحادي عشر',
    signup_grade_12:      'الصف الثاني عشر',
    signup_city_label:    'المدينة',
    signup_city_ph:       'اختر مدينتك',
    city_riyadh:          'الرياض',
    city_jeddah:          'جدة',
    city_mecca:           'مكة المكرمة',
    city_medina:          'المدينة المنورة',
    city_dammam:          'الدمام',
    city_taif:            'الطائف',
    city_tabuk:           'تبوك',
    city_abha:            'أبها',
    city_other:           'مدينة أخرى',
    signup_career_label:  'الاهتمام المهني',
    signup_career_ph:     'اختر مجالك (اختياري)',
    career_medicine:      'الطب والصحة',
    career_engineering:   'الهندسة',
    career_cs:            'الحاسب وتقنية المعلومات',
    career_business:      'الأعمال والإدارة',
    career_law:           'الحقوق والشريعة',
    career_education:     'التعليم',
    career_sciences:      'العلوم',
    career_arts:          'الفنون والآداب',
    career_other:         'أخرى',
    signup_have_account:  'لديك حساب بالفعل؟',
    signup_login_link:    'سجّل دخولك',
    signup_err_name:      'يرجى إدخال اسمك الكامل (حرفان على الأقل).',
    signup_err_grade:     'يرجى اختيار صفك الدراسي.',
    signup_err_city:      'يرجى اختيار مدينتك.',
    /* ── Login panel ── */
    login_title:          'أهلاً بعودتك',
    login_subtitle:       'سجّل دخولك للوصول إلى مسارك',
    login_password_label: 'كلمة المرور',
    login_password_ph:    '••••••••',
    login_btn:            'تسجيل الدخول',
    login_no_account:     'ليس لديك حساب؟',
    login_signup_link:    'أنشئ حساباً مجانياً',
    login_success:        '🎉 تم تسجيل الدخول بنجاح!',
    login_err_email:      'يرجى إدخال بريد إلكتروني صحيح.',
    /* ── Check email panel ── */
    confirm_title:        'تحقق من بريدك الإلكتروني ✉️',
    confirm_body:         'أرسلنا إليك رسالة تأكيد. افتح بريدك الإلكتروني وانقر على رابط التأكيد لتفعيل حسابك والوصول إلى لوحة التحكم.',
    confirm_check_btn:    'لقد أكدت — انتقل للوحة التحكم',
    confirm_resend_btn:   'إعادة إرسال رسالة التأكيد',
    confirm_fine:         'لم تجد الرسالة؟ تحقق من مجلد البريد غير المرغوب فيه.',
    confirm_resent:       '✅ تم إعادة الإرسال! تحقق من بريدك.',
    /* ── Dashboard panel ── */
    dash_title:           'لوحة التحكم',
    dash_subtitle:        'مرحباً في تدرج',
    dash_subline:         'حسابك نشط — استكشف أدواتك',
    dash_grade_label:     'الصف',
    dash_city_label:      'المدينة',
    dash_career_label:    'المجال',
    dash_features_label:  'الأدوات المتاحة لك',
    dash_explore_btn:     'استكشف الأدوات',
    dash_greeting_prefix: 'مرحباً،',
    /* ── Guest-restricted modal ── */
    lock_body_msg:         'أنشئ حسابًا مجانيًا لحفظ تقدمك وخططك الدراسية.',
    lock_cta_login:        'تسجيل الدخول',
    lock_cta_not_now:      'ليس الآن',
    /* ── Dashboard guest banner ── */
    dash_guest_banner_msg: 'أنت تتصفح تدرج كضيف.',
    footer_copy:    '© 2025 تدرج | Tadarruj — جميع الحقوق محفوظة',
    /* Guest mode & features */
    nav_features:         'الميزات',
    guest_chip:           'وضع الضيف',
    guest_banner_msg:     'أنت تتصفح كضيف — بعض الميزات مقفلة',
    guest_create_account: 'إنشاء حساب مجاني',
    lock_title:           'يتطلب حساباً',
    lock_subtitle:        'هذه الميزة متاحة لأصحاب الحسابات فقط',
    lock_f1:              'حفظ الخطط الدراسية',
    lock_f2:              'تتبع التقدم اليومي',
    lock_f3:              'الوصول إلى لوحة التحكم',
    lock_f4:              'توليد خارطة الطريق',
    lock_cta_create:      'إنشاء حساب مجاني',
    lock_cta_guest:       'متابعة كضيف',
    signup_title:         'أنشئ حسابك المجاني',
    signup_subtitle:      'انضم إلى آلاف الطلاب السعوديين',
    signup_optional:      '(اختياري)',
    signup_name_ph:       'اسمك',
    signup_email_label:   'البريد الإلكتروني',
    signup_email_ph:      'example@email.com',
    signup_btn:           'إنشاء الحساب',
    signup_or:            'أو',
    signup_back_guest:    'العودة إلى وضع الضيف',
    signup_success:       '🎉 مرحباً! تم إنشاء حسابك بنجاح.',
    signup_err_email:     'يرجى إدخال بريد إلكتروني صحيح.',
    preview_eyebrow:      'معاينة مجانية',
    preview_title:        'استكشف تدرج كضيف',
    preview_sub:          'جرّب رادار الفرص وخارطة الطريق مجاناً — بدون تسجيل.',
    tab_radar:            '🔍 رادار الفرص',
    tab_roadmap:          '🗺️ خارطة الطريق',
    radar1_t:             'تسجيل القدرات — الدورة الثانية',
    radar1_d:             'فتح التسجيل لاختبار القدرات العامة للفصل الثاني',
    radar1_date:          'يفتح: ١ مارس',
    radar2_t:             'تقديم KAUST لعام 2025',
    radar2_d:             'قبول طلبات الدراسة في جامعة الملك عبدالله',
    radar2_date:          'ينتهي: ٣١ مارس',
    radar3_t:             'منح جامعة الملك فهد',
    radar3_d:             'منح دراسية جزئية وكاملة للطلاب المتميزين',
    radar3_date:          'يفتح: ١٥ أبريل',
    preview_locked_item:  'تتطلب حساباً',
    rm_yr1_dot:           '١',
    rm_yr1_t:             'السنة الأولى — التأسيس',
    rm_yr1_a:             'قياس المستوى الحالي في القدرات والتحصيلي',
    rm_yr1_b:             'وضع خطة دراسية أسبوعية',
    rm_yr1_c:             'متابعة التواريخ المهمة',
    rm_yr2_dot:           '٢',
    rm_yr2_t:             'السنة الثانية — التطور',
    rm_yr2_a:             'أول اختبار تجريبي للقدرات',
    rm_yr2_b:             'اكتشاف الجامعات المستهدفة',
    rm_yr2_c:             'التسجيل في دورات IELTS',
    preview_radar_hint:   'أنشئ حساباً للوصول إلى جميع الفرص المتاحة لمسارك.',
    preview_roadmap_hint: 'أنشئ حساباً لتوليد خارطة طريق مخصصة خطوة بخطوة.',
    feat_eyebrow:         'المنصة',
    feat_title:           'كل أدواتك في مكان واحد',
    feat_sub:             'استكشف مجاناً أو سجّل لفتح كامل المنظومة الأكاديمية.',
    feat_btn_explore:     'استكشف المعاينة',
    feat_btn_locked:      '🔒 يتطلب حساباً',
    feat_btn_active:      'افتح الميزة',
    badge_preview:        'معاينة',
    badge_locked:         'مقفل',
    badge_unlocked:       'مفعّل',
    goal_grade_t:         'تتبع الدرجات المستهدفة',
    goal_grade_b:         'راقب تقدمك نحو درجة القدرات والتحصيلي التي تستهدفها.',
    dashboard_t:          'لوحة التحكم الشاملة',
    dashboard_b:          'تابع كل شيء دفعة واحدة: المواعيد، الخطط، التقدم، الفرص.',
  },

  /* ── English ────────────────────────────────────────────── */
  en: {
    /* Navbar */
    lang_btn:      'عربي',
    nav_problem:   'Problem',
    nav_solution:  'Solution',
    nav_how:       'How It Works',
    nav_faq:       'FAQ',
    nav_cta:       'Start Free',

    /* Hero */
    hero_pill:     '🎓 The Saudi Student Academic Platform',
    hero_name:     'Tadarruj',
    hero_tagline:  'Your Calm Path to Success',
    hero_sub:
      'Tadarruj gathers your academic opportunities, structures your ' +
      'Qudurat & Tahsili preparation, and keeps you focused on your goals.',
    hero_cta1:     'Start Free',
    hero_cta2:     'Explore as Guest',

    /* Trust bar */
    trust_students:     'Registered Students',
    trust_sat:          'Satisfaction Rate',
    trust_tools:        'Integrated Tools',

    /* Preview card */
    card_title:    'Progress Dashboard',
    feat1_n:       'Opportunity Radar',
    feat1_d:       'Discover your academic opportunities',
    feat2_n:       'Dates Dashboard',
    feat2_d:       'Never miss a Qudurat deadline',
    feat3_n:       'Roadmap',
    feat3_d:       'Clear 3-year academic plan',
    badge_new:     'New',
    badge_hot:     'Popular',
    badge_calm:    'Structured',
    prog_qudurat:  'Qudurat',
    prog_tahsili:  'Tahsili',

    /* Problem section */
    prob_eyebrow:  'The Problem',
    prob_title:    'Why Do Students Lose Direction?',
    prob_sub:
      'Ambition alone is not enough — you need a system that ' +
      'converts it into clear, actionable steps.',
    p1_t: 'Missed Deadlines',
    p1_b: 'Qudurat and Tahsili registration windows close without warning, wasting months of effort.',
    p2_t: 'Academic Anxiety',
    p2_b: 'The pressure from unclear requirements and scattered information weakens focus and performance.',
    p3_t: 'Fragmented Information',
    p3_b: 'Schedules, dates and requirements are scattered across Twitter, official sites and apps.',
    p4_t: 'Lack of Structure',
    p4_b: 'Without a multi-year plan, tasks pile up, energy scatters, and priorities get lost.',

    /* Solution section */
    sol_eyebrow:   'The Solution',
    sol_title:     'An Integrated System for Saudi Students',
    sol_sub:
      'Four smart tools working together for a complete, ' +
      'calm view of your academic journey.',
    s1_t:  'Opportunity Radar',
    s1_b:  'Discover academic opportunities and scholarships relevant to your path.',
    s1_tag: 'AI-Powered',
    s2_t:  'Important Dates Dashboard',
    s2_b:  'All Qudurat, Tahsili and university deadlines in one place.',
    s2_tag: 'Smart Alerts',
    s3_t:  'Smart Study Planner',
    s3_b:  'Personalized daily schedule for Qudurat, Tahsili and IELTS prep.',
    s3_tag: 'Personalized',
    s4_t:  '3-Year Academic Roadmap',
    s4_b:  'A full view from now to university admission — step by step.',
    s4_tag: 'Long-Term Planning',

    /* How it works */
    how_eyebrow:   'How It Works',
    how_title:     'Three Steps to Clarity',
    how_sub:       'Simple to start, real transformation in how you manage your path.',
    step1_t:       'Set Your Path',
    step1_b:       'Tell us your grade, your Qudurat & Tahsili goals, and target universities.',
    step2_t:       'Receive Your Plan',
    step2_b:       'A personal roadmap with precise timelines and smart deadline alerts.',
    step3_t:       'Progress Calmly',
    step3_b:       'Track your daily progress and discover new opportunities step by step.',

    /* FAQ */
    faq_eyebrow:   'FAQ',
    faq_title:     'Got Questions?',
    faq1_q:        'How is Tadarruj different from study apps?',
    faq1_a:
      'Tadarruj is a full academic system — official deadline tracking for ' +
      'Qudurat & Tahsili, opportunity discovery, personalized planning, ' +
      'and a 3-year roadmap all in one platform.',
    faq2_q:        'Is Tadarruj free?',
    faq2_a:
      'Yes. A complete free plan covers all core tools. ' +
      'The paid plan adds advanced analytics and multi-track planning.',
    faq3_q:        'Does it support high school and prep year students?',
    faq3_a:
      'Yes. Tadarruj is designed from Grade 10 through the preparatory year, ' +
      'with a stage-specific roadmap for each level.',
    faq4_q:        'Is my data protected?',
    faq4_a:
      'Yes. All data is stored locally on your device and never shared. ' +
      'You can delete your account and all data at any time.',

    /* CTA band */
    cta_title:     'Start Your Calm Journey Today',
    cta_sub:       'Join thousands of Saudi students planning clearly and advancing steadily.',
    cta_btn1:      'Start Free Now',
    cta_btn2:      'Demo Tour',
    cta_fine:      'No credit card required · Account created in under a minute',

    /* Footer */
    footer_tagline: 'Clarity. Structure. Calm progress toward academic success.',
    footer_col1:    'Product',
    footer_col2:    'Company',
    footer_pricing: 'Pricing',
    footer_about:   'About Us',
    footer_contact: 'Contact',
    footer_privacy: 'Privacy Policy',

    /* ── Extended signup form ── */
    signup_name_label:    'Full name',
    signup_grade_label:   'Grade',
    signup_grade_ph:      'Select your grade',
    signup_grade_10:      'Grade 10',
    signup_grade_11:      'Grade 11',
    signup_grade_12:      'Grade 12',
    signup_city_label:    'City',
    signup_city_ph:       'Select your city',
    city_riyadh:          'Riyadh',
    city_jeddah:          'Jeddah',
    city_mecca:           'Mecca',
    city_medina:          'Medina',
    city_dammam:          'Dammam',
    city_taif:            'Taif',
    city_tabuk:           'Tabuk',
    city_abha:            'Abha',
    city_other:           'Other city',
    signup_career_label:  'Career interest',
    signup_career_ph:     'Choose your field (optional)',
    career_medicine:      'Medicine & Health',
    career_engineering:   'Engineering',
    career_cs:            'Computer Science & IT',
    career_business:      'Business & Management',
    career_law:           'Law & Sharia',
    career_education:     'Education',
    career_sciences:      'Sciences',
    career_arts:          'Arts & Humanities',
    career_other:         'Other',
    signup_have_account:  'Already have an account?',
    signup_login_link:    'Log in',
    signup_err_name:      'Please enter your full name (at least 2 characters).',
    signup_err_grade:     'Please select your grade.',
    signup_err_city:      'Please select your city.',
    /* ── Login panel ── */
    login_title:          'Welcome back',
    login_subtitle:       'Log in to access your path',
    login_password_label: 'Password',
    login_password_ph:    '••••••••',
    login_btn:            'Log In',
    login_no_account:     "Don't have an account?",
    login_signup_link:    'Create a free account',
    login_success:        '🎉 Logged in successfully!',
    login_err_email:      'Please enter a valid email address.',
    /* ── Check email panel ── */
    confirm_title:        'Check your email ✉️',
    confirm_body:         'We sent you a confirmation email. Open it and click the link to activate your account and access your dashboard.',
    confirm_check_btn:    "I've confirmed — go to Dashboard",
    confirm_resend_btn:   'Resend confirmation email',
    confirm_fine:         "Can't find the email? Check your spam or junk folder.",
    confirm_resent:       '✅ Resent! Check your inbox.',
    /* ── Dashboard panel ── */
    dash_title:           'Dashboard',
    dash_subtitle:        'Welcome to Tadarruj',
    dash_subline:         'Your account is active — explore your tools',
    dash_grade_label:     'Grade',
    dash_city_label:      'City',
    dash_career_label:    'Field',
    dash_features_label:  'Your available tools',
    dash_explore_btn:     'Explore Tools',
    dash_greeting_prefix: 'Hello,',
    /* ── Guest-restricted modal ── */
    lock_body_msg:         'Create a free account to save your progress and study plans.',
    lock_cta_login:        'Log In',
    lock_cta_not_now:      'Not Now',
    /* ── Dashboard guest banner ── */
    dash_guest_banner_msg: 'You are exploring Tadarruj as a guest.',
    footer_copy:    '© 2025 تدرج | Tadarruj — All rights reserved',
    /* Guest mode & features */
    nav_features:         'Features',
    guest_chip:           'Guest Mode',
    guest_banner_msg:     'Browsing as guest — some features are locked',
    guest_create_account: 'Create Free Account',
    lock_title:           'Account Required',
    lock_subtitle:        'This feature is available to account holders only',
    lock_f1:              'Saving study plans',
    lock_f2:              'Daily progress tracking',
    lock_f3:              'Dashboard access',
    lock_f4:              'Roadmap generation',
    lock_cta_create:      'Create Free Account',
    lock_cta_guest:       'Continue as Guest',
    signup_title:         'Create Your Free Account',
    signup_subtitle:      'Join thousands of Saudi students on Tadarruj',
    signup_optional:      '(optional)',
    signup_name_ph:       'Your name',
    signup_email_label:   'Email address',
    signup_email_ph:      'example@email.com',
    signup_btn:           'Create Account',
    signup_or:            'or',
    signup_back_guest:    'Back to Guest Mode',
    signup_success:       '🎉 Welcome! Your account was created successfully.',
    signup_err_email:     'Please enter a valid email address.',
    preview_eyebrow:      'Free Preview',
    preview_title:        'Explore Tadarruj as a Guest',
    preview_sub:          'Try the Opportunity Radar and Roadmap preview for free — no sign-up needed.',
    tab_radar:            '🔍 Opportunity Radar',
    tab_roadmap:          '🗺️ Roadmap Preview',
    radar1_t:             'Qudurat Registration — Round 2',
    radar1_d:             'General Ability Test registration opens for Semester 2',
    radar1_date:          'Opens: Mar 1',
    radar2_t:             'KAUST Admission 2025',
    radar2_d:             'King Abdullah University applications open',
    radar2_date:          'Closes: Mar 31',
    radar3_t:             'KFUPM Scholarships',
    radar3_d:             'Partial and full scholarships for outstanding students',
    radar3_date:          'Opens: Apr 15',
    preview_locked_item:  'Account required',
    rm_yr1_dot:           '1',
    rm_yr1_t:             'Year 1 — Foundation',
    rm_yr1_a:             'Baseline assessment for Qudurat & Tahsili',
    rm_yr1_b:             'Build a weekly study schedule',
    rm_yr1_c:             'Track all important upcoming deadlines',
    rm_yr2_dot:           '2',
    rm_yr2_t:             'Year 2 — Progress',
    rm_yr2_a:             'First Qudurat mock exam session',
    rm_yr2_b:             'Research and shortlist target universities',
    rm_yr2_c:             'Begin IELTS preparation',
    preview_radar_hint:   'Create an account to access all opportunities matching your path.',
    preview_roadmap_hint: 'Create an account to generate a fully personalized roadmap.',
    feat_eyebrow:         'Platform',
    feat_title:           'All Your Tools in One Place',
    feat_sub:             'Explore for free or sign up to unlock the full academic system.',
    feat_btn_explore:     'Explore Preview',
    feat_btn_locked:      '🔒 Account Required',
    feat_btn_active:      'Open Feature',
    badge_preview:        'Preview',
    badge_locked:         'Locked',
    badge_unlocked:       'Active',
    goal_grade_t:         'Goal Grade Tracking',
    goal_grade_b:         'Monitor your progress toward your Qudurat & Tahsili target scores.',
    dashboard_t:          'Full Dashboard',
    dashboard_b:          'See everything at a glance: deadlines, plans, progress, and opportunities.',
  },
};


/* ═══════════════════════════════════════════════════════════
   SECTION 2 — LANGUAGE MANAGER
   Handles reading/writing the lang preference, translating
   all [data-i18n] elements, and flipping RTL/LTR.
   ═══════════════════════════════════════════════════════════ */
const Lang = (() => {
  const STORAGE_KEY = 'tadarruj_lang';
  let current = 'ar';

  /**
   * Translate every element that has a data-i18n attribute.
   * The attribute value is the key in T[lang].
   */
  function translateDOM(lang) {
    const dict = T[lang] || T.ar;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (Object.prototype.hasOwnProperty.call(dict, key)) {
        el.textContent = dict[key];
      }
    });
  }

  /**
   * Apply a language to the page.
   * @param {string}  lang     - 'ar' or 'en'
   * @param {boolean} animate  - whether to fade body during switch
   */
  function apply(lang, animate = true) {
    current = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    const html = document.documentElement;

    // Fade transition when user toggles (not on initial load)
    if (animate) {
      document.body.style.transition = 'opacity .15s ease';
      document.body.style.opacity   = '0';
    }

    // Apply direction and lang attributes
    html.setAttribute('lang', lang === 'ar' ? 'ar' : 'en');
    html.setAttribute('dir',  lang === 'ar' ? 'rtl' : 'ltr');
    document.title = lang === 'ar' ? 'تدرج | Tadarruj' : 'Tadarruj | تدرج';

    // Translate all data-i18n elements
    translateDOM(lang);
    if (typeof translatePlaceholders === 'function') translatePlaceholders(lang);

    // Update the lang-toggle button label (desktop + mobile)
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.textContent = (T[lang] || T.ar).lang_btn;
    const mobileLangBtn = document.getElementById('lang-btn-mobile');
    if (mobileLangBtn) mobileLangBtn.textContent = (T[lang] || T.ar).lang_btn;

    if (animate) {
      // Re-show body after next frame so the transition is visible
      requestAnimationFrame(() => {
        document.body.style.opacity = '1';
      });
    }
  }

  /** Toggle between ar and en */
  function toggle() {
    apply(current === 'ar' ? 'en' : 'ar', true);
  }

  /** Read preference from localStorage (default: 'ar') */
  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    current = saved === 'en' ? 'en' : 'ar';
    apply(current, false);   // no fade on first load
  }

  /** Expose current lang for external checks */
  function getCurrent() { return current; }

  return { init, toggle, getCurrent };
})();




/* ═══════════════════════════════════════════════════════════
   SECTION 4 — NAVBAR
   • Adds .scrolled class for border/shadow on scroll
   • Highlights active nav link via IntersectionObserver
   ═══════════════════════════════════════════════════════════ */
function initNavbar() {
  const header = document.getElementById('nav-header');
  if (!header) return;

  // Scroll shadow
  window.addEventListener(
    'scroll',
    () => header.classList.toggle('scrolled', window.scrollY > 12),
    { passive: true }
  );

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links .nav-link[href^="#"]');

  if (sections.length && links.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            links.forEach(a => a.classList.remove('active'));
            const match = document.querySelector(
              `.nav-links .nav-link[href="#${entry.target.id}"]`
            );
            if (match) match.classList.add('active');
          }
        });
      },
      {
        rootMargin: `-${header.offsetHeight}px 0px -55% 0px`,
      }
    );
    sections.forEach(s => observer.observe(s));
  }
}


/* ═══════════════════════════════════════════════════════════
   SECTION 5 — MOBILE DRAWER (hamburger menu)
   Improvements over original:
   • Body scroll lock (body.drawer-open class)
   • Backdrop element for clean outside-click detection
   • Syncs mobile lang-btn text with desktop lang-btn
   • ESC closes
   • All links close on click
   • Wires mobile lang button to Lang.toggle()
   ═══════════════════════════════════════════════════════════ */
function initMobileDrawer() {
  const burger   = document.getElementById('burger');
  const drawer   = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (!burger || !drawer) return;

  // Compute scrollbar width once to prevent layout jump on lock
  const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-w', scrollbarW + 'px');

  function closeDrawer() {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
  }

  function openDrawer() {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
    // Focus first link for accessibility
    const firstLink = drawer.querySelector('a, button');
    if (firstLink) firstLink.focus();
  }

  burger.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  // Close when a nav link is clicked
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeDrawer);
  });

  // Backdrop click → close
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // ESC → close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });

  // Mobile lang button → same behavior as desktop lang button
  const mobileLangBtn = document.getElementById('lang-btn-mobile');
  if (mobileLangBtn) {
    mobileLangBtn.addEventListener('click', () => {
      Lang.toggle();
      // Don't close drawer — user might want to keep browsing
    });
  }
}


/* ═══════════════════════════════════════════════════════════
   SECTION 6 — SMOOTH ANCHOR SCROLL
   Offsets scrollTop by the fixed navbar height.
   ═══════════════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();

      // Read nav height from CSS custom property (keeps single source of truth)
      const navH =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
          10
        ) || 64;

      const top =
        target.getBoundingClientRect().top + window.scrollY - navH - 8;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}


/* ═══════════════════════════════════════════════════════════
   SECTION 7 — PROGRESS BAR ANIMATION
   Reads data-pct on .prog-fill elements, then sets width.
   Uses IntersectionObserver so animation triggers on scroll.
   ═══════════════════════════════════════════════════════════ */
function initProgressBars() {
  const bars = document.querySelectorAll('.prog-fill[data-pct]');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const pct = parseInt(entry.target.getAttribute('data-pct'), 10);
          if (!Number.isNaN(pct)) {
            // Small delay makes the animation clearly visible
            setTimeout(() => {
              entry.target.style.width = pct + '%';
            }, 250);
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach(bar => observer.observe(bar));
}


/* ═══════════════════════════════════════════════════════════
   SECTION 8 — SCROLL REVEAL
   Adds .in-view to .reveal elements as they enter viewport.
   ═══════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach(el => observer.observe(el));
}


/* ═══════════════════════════════════════════════════════════
   SECTION 9 — FAQ ACCORDION
   Auto-closes other open items when one is opened.
   Native <details> handles the toggle itself; we just hook in.
   ═══════════════════════════════════════════════════════════ */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        items.forEach(other => {
          if (other !== item && other.open) {
            other.removeAttribute('open');
          }
        });
      }
    });
  });
}


/* ═══════════════════════════════════════════════════════════
   SECTION 10 — TOAST HELPER  (utility, available globally)
   Usage: Toast.success('Saved!') / Toast.error('Oops')
   ═══════════════════════════════════════════════════════════ */
const Toast = (() => {
  function show(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML =
      `<span>${message}</span>` +
      `<span class="toast-x" role="button" aria-label="Dismiss" tabindex="0">✕</span>`;

    const dismiss = () => {
      el.classList.add('leaving');
      el.addEventListener('animationend', () => el.remove(), { once: true });
    };

    el.querySelector('.toast-x').addEventListener('click', dismiss);
    el.querySelector('.toast-x').addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') dismiss();
    });

    container.appendChild(el);
    setTimeout(dismiss, duration);
  }

  return {
    show,
    success: (m, d) => show(m, 'success', d),
    info:    (m, d) => show(m, 'info',    d),
    warn:    (m, d) => show(m, 'warn',    d),
    error:   (m, d) => show(m, 'error',   d),
  };
})();


/* ═══════════════════════════════════════════════════════════
   BOOT — runs after DOM is ready (script has defer attribute)
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /*
    ORDER MATTERS:
    1. Lang.init() must run first — it writes all [data-i18n]
       text before anything else renders.
    2. Asset badge next — checks CSS immediately after DOM ready.
    3. Everything else in any order.
  */

  // 1. Apply saved language (translates all data-i18n elements)
  Lang.init();

  // 2. Wire up the lang-toggle button
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => Lang.toggle());
  }


  // 4. Navbar interactions
  initNavbar();

  // 5. Mobile drawer
  initMobileDrawer();

  // 6. Smooth scroll
  initSmoothScroll();

  // 7. Progress bars
  initProgressBars();

  // 8. Scroll reveal
  initScrollReveal();

  // 9. FAQ accordion
  initFAQ();

  // 10. Modal manager
  Modal.init();

  // 11. App mode (guest/account state)
  AppMode.init();

  // 12. Guest mode interactions
  initGuestMode();

  // 13. Signup flow
  initSignup();

  // 14. Translate input placeholders on load
  translatePlaceholders(Lang.getCurrent());

  window.Toast = Toast;
});

  

/* ═══════════════════════════════════════════════════════════
   SECTION 11 — APP MODE (Guest / Account)
   ═══════════════════════════════════════════════════════════ */
const AppMode = (() => {
  const KEY = 'tadarruj_mode';

  function get() {
    return localStorage.getItem(KEY) || null;
  }

  function set(mode) {
    localStorage.setItem(KEY, mode);
    applyUI(mode);
  }

  function applyUI(mode) {
    const banner  = document.getElementById('guest-banner');
    const preview = document.getElementById('guest-preview');
    const isGuest   = mode === 'guest';
    const isAccount = mode === 'account';

    document.body.classList.toggle('guest-active',   isGuest);
    document.body.classList.toggle('account-active', isAccount);

    if (banner)  banner.classList.toggle('visible', isGuest);
    if (preview && isGuest) preview.classList.add('visible');

    if (isAccount) {
      const lang = Lang.getCurrent();
      const dict = T[lang] || T.ar;
      document.querySelectorAll('.js-locked-btn').forEach(btn => {
        btn.textContent = dict['feat_btn_active'] || (lang === 'ar' ? 'افتح الميزة' : 'Open Feature');
        btn.classList.remove('btn-locked');
        btn.classList.add('btn-active');
      });
    }
  }

  function init() {
    // Check localStorage for a confirmed profile (survives page reload)
    let stored;
    try { stored = JSON.parse(localStorage.getItem('tadarruj_profile') || 'null'); } catch(e) {}
    if (stored && stored.confirmed) {
      localStorage.setItem(KEY, 'account');
    }
    const mode = get();
    if (mode) applyUI(mode);
  }

  return { get, set, applyUI, init };
})();


/* ═══════════════════════════════════════════════════════════
   SECTION 12 — MODAL MANAGER
   ═══════════════════════════════════════════════════════════ */
const Modal = (() => {
  let _active = null;

  function open(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (_active && _active !== el) close(_active.id);
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
    _active = el;
    requestAnimationFrame(() => {
      const f = el.querySelector('button, input, [tabindex="0"]');
      if (f) f.focus();
    });
  }

  function close(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('open');
    document.body.style.overflow = '';
    if (_active === el) _active = null;
  }

  function closeAll() {
    document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
    document.body.style.overflow = '';
    _active = null;
  }

  function init() {
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', e => { if (e.target === backdrop) closeAll(); });
    });
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => close(btn.getAttribute('data-modal-close')));
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
  }

  return { open, close, closeAll, init };
})();


/* ═══════════════════════════════════════════════════════════
   SECTION 13 — GUEST MODE CONTROLLER
   ═══════════════════════════════════════════════════════════ */
function initGuestMode() {

  // ── Hero "Explore as Guest" ──────────────────────────────────────────
  // Sets guest mode and opens the dashboard panel (in the modal) so the
  // user can explore the dashboard without an account.
  const heroGuestBtn = document.getElementById('hero-guest-btn');
  if (heroGuestBtn) {
    heroGuestBtn.addEventListener('click', e => {
      e.preventDefault();
      AppMode.set('guest');
      // Show the dashboard panel with a guest greeting, then open modal
      SignupFlow.showPanel('signup-panel-dashboard');
      SignupFlow.renderGuestDashboard();
      Modal.open('signup-modal');
    });
  }

  // ── Guest banner CTA (top-of-page banner) ───────────────────────────
  const bannerCta = document.getElementById('guest-banner-cta');
  if (bannerCta) {
    bannerCta.addEventListener('click', () => {
      SignupFlow.resetForm();
      Modal.open('signup-modal');
    });
  }

  // ── Locked feature buttons → guest-restricted modal ─────────────────
  document.querySelectorAll('.js-locked-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (AppMode.get() === 'account') return;
      Modal.open('lock-modal');
    });
  });

  // ── Guest-restricted modal: "Create Free Account" ───────────────────
  const lockToSignup = document.getElementById('lock-to-signup');
  if (lockToSignup) {
    lockToSignup.addEventListener('click', () => {
      Modal.close('lock-modal');
      SignupFlow.resetForm();
      Modal.open('signup-modal');
    });
  }

  // ── Guest-restricted modal: "Log In" ────────────────────────────────
  const lockToLogin = document.getElementById('lock-to-login');
  if (lockToLogin) {
    lockToLogin.addEventListener('click', () => {
      Modal.close('lock-modal');
      SignupFlow.showPanel('signup-panel-login');
      Modal.open('signup-modal');
    });
  }
}


/* ═══════════════════════════════════════════════════════════
   SECTION 14 — SIGNUP / AUTH FLOW
   ═══════════════════════════════════════════════════════════ */

/* ── Signup panel system ─────────────────────────────────── */
const SignupFlow = (() => {

  // In-memory profile store (simulates DB row)
  let _profile = null;
  let _pendingEmail = '';

  // City display names — resolved at render time from T dict
  const CITY_MAP = {
    riyadh:'city_riyadh', jeddah:'city_jeddah', mecca:'city_mecca',
    medina:'city_medina', dammam:'city_dammam', taif:'city_taif',
    tabuk:'city_tabuk', abha:'city_abha', other:'city_other',
  };
  const CAREER_MAP = {
    medicine:'career_medicine', engineering:'career_engineering',
    cs:'career_cs', business:'career_business', law:'career_law',
    education:'career_education', sciences:'career_sciences',
    arts:'career_arts', other:'career_other',
  };

  /* ── Panel switching ── */
  function showPanel(id) {
    document.querySelectorAll('.signup-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById(id);
    if (panel) {
      panel.classList.add('active');
      // Focus first input
      requestAnimationFrame(() => {
        const first = panel.querySelector('input, select, button');
        if (first) first.focus();
      });
    }
  }

  /* ── Field validation helpers ── */
  function showErr(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.textContent = msg; el.classList.add('visible'); }
  }
  function clearErr(id) {
    const el = document.getElementById(id);
    if (el) { el.textContent = ''; el.classList.remove('visible'); }
  }
  function markField(inputId, errorId, hasError, msg) {
    const input = document.getElementById(inputId);
    if (hasError) {
      input && input.classList.add('input-error');
      showErr(errorId, msg);
    } else {
      input && input.classList.remove('input-error');
      clearErr(errorId);
    }
    return !hasError;
  }

  /* ── Signup form submission ── */
  function handleSignupSubmit() {
    const lang = Lang.getCurrent();
    const dict = T[lang] || T.ar;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const name   = (document.getElementById('signup-name')?.value  || '').trim();
    const email  = (document.getElementById('signup-email')?.value || '').trim();
    const grade  = document.getElementById('signup-grade')?.value  || '';
    const city   = document.getElementById('signup-city')?.value   || '';
    const career = document.getElementById('signup-career')?.value || '';

    let valid = true;
    valid = markField('signup-name',  'err-name',  name.length < 2,
      dict.signup_err_name  || 'Please enter your full name (at least 2 characters).') && valid;
    valid = markField('signup-email', 'err-email', !emailRe.test(email),
      dict.signup_err_email || 'Please enter a valid email address.') && valid;
    valid = markField('signup-grade', 'err-grade', !grade,
      dict.signup_err_grade || 'Please select your grade.') && valid;
    valid = markField('signup-city',  'err-city',  !city,
      dict.signup_err_city  || 'Please select your city.') && valid;

    if (!valid) return;

    // Store profile (simulates auth user creation + profile write)
    _profile = { name, email, grade, city, career, lang, createdAt: Date.now() };
    _pendingEmail = email;

    // Persist to localStorage (simulates confirmed auth session later)
    localStorage.setItem('tadarruj_profile', JSON.stringify({ ..._profile, confirmed: false }));

    // Show check-email panel
    const emailDisplay = document.getElementById('confirm-email-show');
    if (emailDisplay) emailDisplay.textContent = email;
    showPanel('signup-panel-confirm');
  }

  /* ── Login form submission ── */
  function handleLoginSubmit() {
    const lang = Lang.getCurrent();
    const dict = T[lang] || T.ar;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = (document.getElementById('login-email')?.value || '').trim();

    if (!emailRe.test(email)) {
      markField('login-email', 'err-login-email', true,
        dict.login_err_email || 'Please enter a valid email address.');
      return;
    }

    // Check localStorage for a matching profile (simulates session check)
    let stored;
    try { stored = JSON.parse(localStorage.getItem('tadarruj_profile') || 'null'); } catch(e) {}

    if (stored && stored.email === email && stored.confirmed) {
      _profile = stored;
      AppMode.set('account');
      Modal.closeAll();
      Toast.success((T[lang] || T.ar).login_success || 'Logged in!', 4000);
    } else if (stored && stored.email === email && !stored.confirmed) {
      // Registered but not confirmed — send back to confirm screen
      _pendingEmail = email;
      const emailDisplay = document.getElementById('confirm-email-show');
      if (emailDisplay) emailDisplay.textContent = email;
      showPanel('signup-panel-confirm');
    } else {
      // No match — open signup with email pre-filled
      markField('login-email', 'err-login-email', true,
        (lang === 'ar' ? 'البريد الإلكتروني غير مسجّل.' : 'Email not found. Create an account?'));
    }
  }

  /* ── "I've confirmed" button ── */
  function handleConfirmCheck() {
    const lang = Lang.getCurrent();
    // Simulate email confirmation: mark as confirmed in localStorage
    let stored;
    try { stored = JSON.parse(localStorage.getItem('tadarruj_profile') || 'null'); } catch(e) {}
    if (stored) {
      stored.confirmed = true;
      localStorage.setItem('tadarruj_profile', JSON.stringify(stored));
      _profile = stored;
    } else if (_pendingEmail) {
      // Fallback if storage failed
      _profile = { email: _pendingEmail, confirmed: true };
    }

    AppMode.set('account');
    renderDashboardPanel();
    showPanel('signup-panel-dashboard');
  }

  /* ── Resend email (simulated) ── */
  function handleResend() {
    const lang = Lang.getCurrent();
    const dict = T[lang] || T.ar;
    Toast.success(dict.confirm_resent || '✅ Resent!', 4000);
  }

  /* ── Render dashboard panel with profile data ── */
  function renderDashboardPanel() {
    if (!_profile) return;
    const lang = Lang.getCurrent();
    const dict = T[lang] || T.ar;

    // Avatar initials
    const avatarEl = document.getElementById('dash-avatar-initials');
    if (avatarEl) {
      const initials = (_profile.name || 'U')
        .split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
      avatarEl.textContent = initials;
    }

    // Greeting
    const greetEl = document.getElementById('dash-greeting');
    if (greetEl) {
      const prefix = dict.dash_greeting_prefix || (lang === 'ar' ? 'مرحباً،' : 'Hello,');
      greetEl.textContent = prefix + ' ' + (_profile.name || '');
    }

    // Grade
    const gradeEl = document.getElementById('dash-grade-val');
    if (gradeEl) gradeEl.textContent = _profile.grade || '—';

    // City
    const cityEl = document.getElementById('dash-city-val');
    if (cityEl) {
      const cityKey = CITY_MAP[_profile.city];
      cityEl.textContent = (cityKey && dict[cityKey]) ? dict[cityKey] : (_profile.city || '—');
    }

    // Career
    const careerEl = document.getElementById('dash-career-val');
    if (careerEl) {
      const careerKey = CAREER_MAP[_profile.career];
      careerEl.textContent = (careerKey && dict[careerKey]) ? dict[careerKey] :
        (lang === 'ar' ? 'لم يُحدَّد' : 'Not specified');
    }
  }

  /* ── Render dashboard panel in guest mode (no profile) ── */
  function renderGuestDashboard() {
    const lang = Lang.getCurrent();
    const dict = T[lang] || T.ar;

    // Avatar: guest icon
    const avatarEl = document.getElementById('dash-avatar-initials');
    if (avatarEl) avatarEl.textContent = lang === 'ar' ? 'ض' : 'G';

    // Greeting
    const greetEl = document.getElementById('dash-greeting');
    if (greetEl) {
      greetEl.textContent = lang === 'ar'
        ? 'أهلاً بك في تدرج'
        : 'Welcome to Tadarruj';
    }

    // Stats: show "—" for guest
    ['dash-grade-val', 'dash-city-val', 'dash-career-val'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '—';
    });

    // Show guest banner, hide it for account mode (CSS also handles this)
    const guestBanner = document.getElementById('dash-guest-banner');
    if (guestBanner) {
      guestBanner.style.display = AppMode.get() === 'account' ? 'none' : '';
    }
  }

  /* ── "Explore tools" dismisses dashboard panel ── */
  function handleDashExplore() {
    Modal.closeAll();
    // Scroll to features section
    const featuresEl = document.getElementById('features');
    if (featuresEl) {
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 64;
      window.scrollTo({ top: featuresEl.getBoundingClientRect().top + window.scrollY - navH - 8, behavior: 'smooth' });
    }
  }

  /* ── translatePlaceholders for selects (option text via data-i18n) ── */
  function translateSelectOptions(lang) {
    const dict = T[lang] || T.ar;
    document.querySelectorAll('select option[data-i18n]').forEach(opt => {
      const key = opt.getAttribute('data-i18n');
      if (dict[key]) opt.textContent = dict[key];
    });
  }

  /* ── Clear form fields when modal opens ── */
  function resetForm() {
    ['signup-name','signup-email','signup-grade','signup-city','signup-career'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = el.tagName === 'SELECT' ? '' : '';
    });
    ['err-name','err-email','err-grade','err-city'].forEach(clearErr);
    ['signup-name','signup-email','signup-grade','signup-city'].forEach(id => {
      document.getElementById(id)?.classList.remove('input-error');
    });
    showPanel('signup-panel-form');
  }

  function init() {
    // Open signup modal from all .js-open-signup triggers
    document.querySelectorAll('.js-open-signup').forEach(btn => {
      btn.addEventListener('click', () => {
        // Check if already logged in
        let stored;
        try { stored = JSON.parse(localStorage.getItem('tadarruj_profile') || 'null'); } catch(e) {}
        if (stored && stored.confirmed) {
          _profile = stored;
          AppMode.set('account');
          renderDashboardPanel();
          showPanel('signup-panel-dashboard');
        } else {
          resetForm();
        }
        Modal.open('signup-modal');
      });
    });

    // Signup form
    document.getElementById('signup-submit')?.addEventListener('click', handleSignupSubmit);
    document.getElementById('signup-name')?.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('signup-email')?.focus(); });
    document.getElementById('signup-email')?.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('signup-grade')?.focus(); });

    // Clear errors on input
    ['signup-name','signup-email','signup-grade','signup-city'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => {
        document.getElementById(id)?.classList.remove('input-error');
        const errId = 'err-' + id.replace('signup-', '');
        clearErr(errId);
      });
    });

    // Switch to login
    document.getElementById('signup-to-login')?.addEventListener('click', () => showPanel('signup-panel-login'));

    // Back to guest from signup
    document.getElementById('signup-back-guest')?.addEventListener('click', () => {
      Modal.close('signup-modal');
      if (AppMode.get() !== 'account') AppMode.set('guest');
    });

    // Login form
    document.getElementById('login-submit')?.addEventListener('click', handleLoginSubmit);
    document.getElementById('login-email')?.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('login-password')?.focus(); });
    document.getElementById('login-password')?.addEventListener('keydown', e => { if (e.key === 'Enter') handleLoginSubmit(); });

    // Switch to signup from login
    document.getElementById('login-to-signup')?.addEventListener('click', () => showPanel('signup-panel-form'));

    // Back to guest from login
    document.getElementById('login-back-guest')?.addEventListener('click', () => {
      Modal.close('signup-modal');
      if (AppMode.get() !== 'account') AppMode.set('guest');
    });

    // Check-email panel
    document.getElementById('confirm-check-btn')?.addEventListener('click', handleConfirmCheck);
    document.getElementById('confirm-resend-btn')?.addEventListener('click', handleResend);

    // Dashboard panel
    document.getElementById('dash-explore-btn')?.addEventListener('click', handleDashExplore);

    // Translate select options on init
    translateSelectOptions(Lang.getCurrent());

    // Re-translate select options when language changes
    const origToggle = Lang.toggle.bind(Lang);
    // We patch translatePlaceholders to also hit select options
    const _origTranslatePlaceholders = window.translatePlaceholders;
  }

  return { init, showPanel, renderDashboardPanel, renderGuestDashboard, translateSelectOptions, resetForm };
})();

function initSignup() {
  SignupFlow.init();

  // Also wire old guest-mode triggers (lock modal "create account" button) to open signup
  // These already call Modal.open('signup-modal') via initGuestMode — just reset the form
  const originalModalOpen = Modal.open.bind(Modal);
  const patchedOpen = function(id) {
    if (id === 'signup-modal') {
      let stored;
      try { stored = JSON.parse(localStorage.getItem('tadarruj_profile') || 'null'); } catch(e) {}
      if (!stored || !stored.confirmed) SignupFlow.resetForm();
    }
    originalModalOpen(id);
  };
  Modal.open = patchedOpen;
}


/* ═══════════════════════════════════════════════════════════
   SECTION 15 — PLACEHOLDER TRANSLATIONS
   ═══════════════════════════════════════════════════════════ */
function translatePlaceholders(lang) {
  const dict = T[lang] || T.ar;
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });
  // Also translate select option text (data-i18n on <option>)
  document.querySelectorAll('select option[data-i18n]').forEach(opt => {
    const key = opt.getAttribute('data-i18n');
    if (dict[key]) opt.textContent = dict[key];
  });
}