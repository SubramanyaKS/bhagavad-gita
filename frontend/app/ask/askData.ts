export type AskVerse = {
  chapter: number
  verse: number
  sanskrit: string
  iast: string
  translation: string
  context: string
}

export type AskTopic = {
  id: string
  theme: string
  sanskritName: string
  title: string
  subtitle: string
  keywords: string[]
  krishnaCounsel: string
  coreTakeaways: string[]
  practicalAction: string
  verses: AskVerse[]
}

export const ASK_TOPICS: AskTopic[] = [
  {
    id: 'fear',
    theme: 'Fear',
    sanskritName: 'अभयम्',
    title: 'Conquering Fear and Anxiety',
    subtitle: 'Overcoming dread of the unknown and future uncertainty',
    keywords: [
      'fear',
      'anxiety',
      'panic',
      'afraid',
      'worry',
      'scared',
      'future',
      'uncertainty',
      'terrified',
      'dread',
      'how do i deal with fear',
    ],
    krishnaCounsel:
      'Fear arises when the mind obsesses over outcomes it cannot control and misidentifies with the mortal body rather than the eternal witness (Atman). When you realize that the core of your being is indestructible and that every ethical effort protects your soul, fear loses its grip.',
    coreTakeaways: [
      'Even small steps in ethical, grounded living protect you from paralyzing fear.',
      'You are never alone; cosmic intelligence upholds and carries whoever surrenders ego.',
      'Fear lives only in imaginations of the future; bring your attention fully into present duty.',
    ],
    practicalAction:
      'Whenever panic or anxiety tightens your chest today, inhale slowly and whisper Krishna’s promise: "मा शुचः" (Grieve no more; fear no more). Shift your focus from what might happen to what small good action you can take right now.',
    verses: [
      {
        chapter: 2,
        verse: 40,
        sanskrit: 'नेहाभिक्रमनाशोऽस्ति प्रत्यवायो न विद्यते।\nस्वल्पमप्यस्य धर्मस्य त्रायते महतो भयात्।।',
        iast: 'nehābhikrama-nāśo ’sti pratyavāyo na vidyate | sv-alpam apy asya dharmasya trāyate mahato bhayāt ||',
        translation:
          'In this path of selfless action, no effort is ever lost, nor is there any adverse result. Even a little practice of this dharma delivers one from great fear.',
        context: 'Chapter 2 (Sankhya Yoga) — Krishna assures Arjuna that no positive spiritual effort is ever wasted.',
      },
      {
        chapter: 18,
        verse: 66,
        sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः।।',
        iast: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja | ahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||',
        translation:
          'Relinquishing all dualities and anxieties of ego, surrender unto Me alone. I shall deliver you from all fear and sorrow; do not grieve.',
        context: 'Chapter 18 (Moksha Sannyasa Yoga) — The supreme assurance of divine protection.',
      },
    ],
  },
  {
    id: 'lost',
    theme: 'Purpose',
    sanskritName: 'कर्तव्यसंमोहः',
    title: 'When You Feel Lost and Confused',
    subtitle: 'Navigating crossroads when all direction seems gone',
    keywords: [
      'lost',
      'confused',
      'direction',
      'what should i do',
      'overwhelmed',
      'feeling lost',
      'stuck',
      'crossroads',
      'helpless',
      'despair',
      'hopeless',
    ],
    krishnaCounsel:
      'Arjuna stood at the exact same crossroads: his legs shook, his bow slipped from his hand, and he had no clarity on what was right. Feeling lost is not a weakness; it is the breakdown of naive assumptions, creating the fertile soil where genuine spiritual awakening begins.',
    coreTakeaways: [
      'Admitting confusion is the doorway to wisdom. Do not mask uncertainty with false bravado.',
      'Seek guidance from timeless truth rather than reactionary social expectations.',
      'Clarity returns not by over-analyzing from a distance, but by taking the first honest step in duty.',
    ],
    practicalAction:
      'Stop trying to figure out your entire 10-year life plan today. Ask yourself simply: "What is my immediate, most honest responsibility in front of me in the next hour?" Do only that with presence.',
    verses: [
      {
        chapter: 2,
        verse: 7,
        sanskrit: 'कार्पण्यदोषोपहतस्वभावः\nपृच्छामि त्वां धर्मसंमूढचेताः।\nयच्छ्रेयः स्यान्निश्चितं ब्रूहि तन्मे\nशिष्यस्तेऽहं शाधि मां त्वां प्रपन्नम्।।',
        iast: 'kārpaṇya-doṣopahata-svabhāvaḥ pṛcchāmi tvāṁ dharma-saṁmūḍha-cetāḥ | yac chreyaḥ syān niścitaṁ brūhi tan me śiṣyas te ’haṁ śādhi māṁ tvāṁ prapannam ||',
        translation:
          'My heart is overcome by grief, and my mind is confused about my duty. I beseech You to tell me clearly what is truly best for me. I am Your student; instruct me who has surrendered unto You.',
        context: 'Chapter 2 (Sankhya Yoga) — Arjuna asks Krishna for guidance after dropping his pride.',
      },
      {
        chapter: 18,
        verse: 73,
        sanskrit: 'नष्टो मोहः स्मृतिर्लब्धा त्वत्प्रसादान्मयाच्युत।\nस्थितोऽस्मि गतसन्देहः करिष्ये वचनं तव।।',
        iast: 'naṣṭo mohaḥ smṛtir labdhā tvat-prasādān mayācyuta | sthito ’smi gata-sandehaḥ kariṣye vacanaṁ tava ||',
        translation:
          'My delusion is destroyed; memory has been regained through Your grace, O Infallible One! I stand firm, free from doubt; I shall act according to Your word.',
        context: 'Chapter 18 (Moksha Sannyasa Yoga) — Arjuna’s triumph after receiving Krishna’s counsel.',
      },
    ],
  },
  {
    id: 'failure',
    theme: 'Karma',
    sanskritName: 'सिद्ध्यसिद्धिः',
    title: 'Handling Failure, Defeat, and Rejection',
    subtitle: 'Reclaiming peace and dignity when plans fall apart',
    keywords: [
      'failure',
      'defeat',
      'rejected',
      'lost',
      'disappointment',
      'failed',
      'unsuccessful',
      'how should i handle failure',
      'worthless',
      'letdown',
    ],
    krishnaCounsel:
      'Success and failure are not reflections of your intrinsic self-worth; they are the shifting waves of nature. Most suffering comes from demanding a specific outcome from life. Shift your pride from the harvest to the integrity of your planting.',
    coreTakeaways: [
      'You are entitled to the effort, but never to guaranteed results.',
      'Equanimity in both triumph and catastrophe is the true definition of Yoga.',
      'A failure in an endeavor is merely information; it is never a failure of the soul.',
    ],
    practicalAction:
      'Reflect on a recent setback. Detach your identity from the outcome and ask: "Did I bring sincerity to it? What did it teach me?" Let that wisdom become your victory.',
    verses: [
      {
        chapter: 2,
        verse: 48,
        sanskrit: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते।।',
        iast: 'yoga-sthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya | siddhy-asiddhyoḥ samo bhūtvā samatvaṁ yoga ucyate ||',
        translation:
          'Established in yoga, perform your duties, abandoning attachment, O Arjuna. Remain steadfast in both success and failure; such equanimity is called Yoga.',
        context: 'Chapter 2 — The classic definition of Yoga as inner poise.',
      },
      {
        chapter: 2,
        verse: 47,
        sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि।।',
        iast: 'karmaṇy evādhikāras te mā phaleṣu kadācana | mā karma-phala-hetur bhūr mā te saṅgo ’stv akarmaṇi ||',
        translation:
          'You have a right to your actions, but never to the fruits of your actions. Let not the fruit of action be your motive, nor let your attachment be to inaction.',
        context: 'Chapter 2 — Freedom from the paralyzing fear of failure.',
      },
    ],
  },
  {
    id: 'purpose',
    theme: 'Purpose',
    sanskritName: 'स्वधर्मः',
    title: 'Discovering Your Purpose and Svadharma',
    subtitle: 'Why living authentically beats imitating another person’s path',
    keywords: [
      'purpose',
      'calling',
      'mission',
      'svadharma',
      'meaning',
      'career',
      'authenticity',
      'understanding my purpose',
      'destiny',
      'talent',
    ],
    krishnaCounsel:
      'Your purpose is not found in copying the glamorous lives of others. Krishna declares that your Svadharma — your authentic duty aligned with your natural strengths and ethical calling — is sacred, even if modest. Imitating someone else breeds insecurity and friction.',
    coreTakeaways: [
      'Better is your own path imperfectly walked than another’s path perfectly mimicked.',
      'Your gifts, your context, and your ethical obligations point directly to your duty.',
      'True calling brings internal harmony, not chronic competition with peers.',
    ],
    practicalAction:
      'Identify one thing you do that energizes you and helps others, even if society does not crown it with status. Treat that as your sacred altar of contribution today.',
    verses: [
      {
        chapter: 3,
        verse: 35,
        sanskrit: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः।।',
        iast: 'śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt | sva-dharme nidhanaṁ śreyaḥ para-dharmo bhayāvahaḥ ||',
        translation:
          'Better is one’s own duty, though devoid of excellence, than another’s duty well performed. Death in one’s own duty is auspicious; pursuing another’s path is dangerous.',
        context: 'Chapter 3 (Karma Yoga) — The call for genuine authenticity.',
      },
      {
        chapter: 18,
        verse: 46,
        sanskrit: 'यतः प्रवृत्तिर्भूतानां येन सर्वमिदं ततम्।\nस्वकर्मणा तमभ्यर्च्य सिद्धिं विन्दति मानवः।।',
        iast: 'yataḥ pravṛttir bhūtānāṁ yena sarvam idaṁ tatam | sva-karmaṇā tam abhyarcya siddhiṁ vindati mānavaḥ ||',
        translation:
          'From Whom all beings emanate and by Whom all this universe is pervaded — by worshiping Him through the dedication of one’s own natural duties, a person attains spiritual perfection.',
        context: 'Chapter 18 — How regular work becomes highest worship.',
      },
    ],
  },
  {
    id: 'anger',
    theme: 'Peace',
    sanskritName: 'क्रोधः',
    title: 'Mastering Anger and Irritation',
    subtitle: 'Unpacking the psychological trigger of rage before it causes damage',
    keywords: [
      'anger',
      'irritation',
      'rage',
      'frustration',
      'bitter',
      'temper',
      'screaming',
      'resentment',
      'patience',
      'grudge',
    ],
    krishnaCounsel:
      'Krishna traces anger to its root cause: obsessing over desires. When external circumstances block what you feel entitled to, desire curdles into fury. In that moment of rage, memory of values is lost and discriminative intellect collapses into ruin.',
    coreTakeaways: [
      'Anger is obstructed desire. Notice what expectation was just violated.',
      'Never make a major decision or send an angry message while under the spell of Krodha.',
      'Gentle self-restraint protects your relationships and inner sanctuary.',
    ],
    practicalAction:
      'The next time anger flares today, take a deliberate 10-second pause. Ask silently: "What expectation of mine was just denied? Can I accept reality as it is for this moment?"',
    verses: [
      {
        chapter: 2,
        verse: 63,
        sanskrit: 'क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः।\nस्मृतिभ्रंशाद्बुद्धिनाशो बुद्धिनाशात्प्रणश्यति।।',
        iast: 'krodhād bhavati saṁmohaḥ saṁmohāt smṛti-vibhramaḥ | smṛti-bhraṁśād buddhi-nāśo buddhi-nāśāt praṇaśyati ||',
        translation:
          'From anger arises delusion; from delusion comes loss of memory; from loss of memory comes the ruin of discriminative intellect; and from the ruin of intellect, a person is completely undone.',
        context: 'Chapter 2 — The fatal descent from irritation to spiritual downfall.',
      },
      {
        chapter: 5,
        verse: 23,
        sanskrit: 'शक्नोतीहैव यः सोढुं प्राक्शरीरविमोक्षणात्।\nकामक्रोधोद्भवं वेगं स युक्तः स सुखी नरः।।',
        iast: 'śaknotīhaiva yaḥ soḍhuṁ prāk śarīra-vimokṣaṇāt | kāma-krodhodbhavaṁ vegaṁ sa yuktaḥ sa sukhī naraḥ ||',
        translation:
          'One who is able to withstand, here in this very life before shedding the body, the powerful rushes of desire and anger — that person is united in Yoga; that person is truly happy.',
        context: 'Chapter 5 (Karma Sannyasa Yoga) — The joy of self-mastery.',
      },
    ],
  },
  {
    id: 'peace',
    theme: 'Peace',
    sanskritName: 'शान्तिः',
    title: 'Finding Inner Calm Amid Chaos',
    subtitle: 'Quiet stillness when the world around you is loud',
    keywords: [
      'peace',
      'calm',
      'quiet',
      'mind',
      'stress',
      'burnout',
      'meditation',
      'restless',
      'overthinking',
      'tranquility',
      'inner peace',
    ],
    krishnaCounsel:
      'True peace does not mean running away to a mountain cave; it means standing centered amidst the storm. Just as the deep ocean receives countless rushing rivers without overflowing, a disciplined mind receives circumstances without losing its equilibrium.',
    coreTakeaways: [
      'Peace is an internal state of being, not an external arrangement of circumstances.',
      'Do not fight the wandering mind; gently return it to the presence of the Self.',
      'Simplicity and moderation in lifestyle safeguard mental tranquility.',
    ],
    practicalAction:
      'Turn off all device notifications for 15 minutes today. Sit comfortably, observe your natural breathing, and visualize your consciousness as the still depths of the ocean.',
    verses: [
      {
        chapter: 2,
        verse: 70,
        sanskrit: 'आपूर्यमाणमचलप्रतिष्ठं\nसमुद्रमापः प्रविशन्ति यद्वत्।\nतद्वत्कामा यं प्रविशन्ति सर्वे\nस शान्तिमाप्नोति न कामकामी।।',
        iast: 'āpūryamāṇam acala-pratiṣṭhaṁ samudram āpaḥ praviśanti yadvat | tadvat kāmā yaṁ praviśanti sarve sa śāntim āpnoti na kāma-kāmī ||',
        translation:
          'As the ocean remains calm and undisturbed while endless waters flow into it, so the person into whom all desires enter without disturbing their depth attains true peace — not one who chases after desires.',
        context: 'Chapter 2 — The ocean simile of the enlightened mind.',
      },
      {
        chapter: 6,
        verse: 19,
        sanskrit: 'यथा दीपो निवातस्थो नेङ्गते सोपमा स्मृता।\nयोगिनो यतचित्तस्य युञ्जतो योगमात्मनः।।',
        iast: 'yathā dīpo nivāta-stho neṅgate sopamā smṛtā | yogino yata-cittasya yuñjato yogam ātmanaḥ ||',
        translation:
          'As a lamp placed in a windless place does not flicker, so is compared the steady mind of a yogi practicing meditation on the Self.',
        context: 'Chapter 6 (Dhyana Yoga) — The steady flame of focused meditation.',
      },
    ],
  },
  {
    id: 'detachment',
    theme: 'Detachment',
    sanskritName: 'अनासक्तिः',
    title: 'Letting Go and Healthy Detachment',
    subtitle: 'Loving deeply without suffocating possessiveness',
    keywords: [
      'detachment',
      'letting go',
      'loss',
      'breakup',
      'possessive',
      'clinging',
      'unattached',
      'moving on',
      'control',
      'heartbreak',
    ],
    krishnaCounsel:
      'Detachment in the Gita does not mean cold indifference or numbness. It means loving unconditionally without needing to manipulate or possess what you love. When you realize all people and roles belong to the Divine, you hold them with reverent open hands.',
    coreTakeaways: [
      'Attachment seeks possession; love seeks the flourishing of the other.',
      'Sensory experiences come and go like seasons; cultivate patience through the transitions.',
      'Surrendering control of others is the greatest gift of freedom you give yourself.',
    ],
    practicalAction:
      'Think of a person or outcome you have been clinging to with tension. Silently say: "I care for you deeply, but I release the need to control you. May truth guide your path."',
    verses: [
      {
        chapter: 2,
        verse: 14,
        sanskrit: 'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत।।',
        iast: 'mātrā-sparśās tu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ | āgamāpāyino ’nityās tāṁs titikṣasva bhārata ||',
        translation:
          'The contacts of senses with their objects give rise to sensations of cold, heat, pleasure, and pain. They come and go and are impermanent; learn to endure them calmly, O Arjuna.',
        context: 'Chapter 2 — The nature of fleeting worldly experiences.',
      },
      {
        chapter: 5,
        verse: 10,
        sanskrit: 'ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः।\nलिप्यते न स पापेन पद्मपत्रमिवाम्भसा।।',
        iast: 'brahmaṇy ādhāya karmāṇi saṅgaṁ tyaktvā karoti yaḥ | lipyate na sa pāpena padma-patram ivāmbhasā ||',
        translation:
          'One who dedicates all actions to the Supreme, abandoning attachment, is untouched by negativity, just as a lotus leaf is untouched by water.',
        context: 'Chapter 5 — The pristine lotus leaf metaphor.',
      },
    ],
  },
  {
    id: 'grief',
    theme: 'The Self',
    sanskritName: 'शोकनिवारणम्',
    title: 'Facing Grief and the Loss of Loved Ones',
    subtitle: 'Healing through the eternal perspective of the soul',
    keywords: [
      'grief',
      'sorrow',
      'death',
      'mourning',
      'loss',
      'crying',
      'bereavement',
      'heartache',
      'sadness',
      'dying',
    ],
    krishnaCounsel:
      'Grief is born when we confuse the temporary body with the eternal soul. Krishna comforts Arjuna by showing that death is only a transition of form, like shedding old clothes for new ones. Those you love are not extinguished; their consciousness continues in the infinite tapestry of life.',
    coreTakeaways: [
      'The physical body is a temporary garment; the spirit within is birthless and deathless.',
      'Grief is natural, but prolonged despair comes from forgetting the eternal truth of being.',
      'Honoring those who have passed means living with the wisdom and love they inspired in you.',
    ],
    practicalAction:
      'Close your eyes and send a wave of silent love and gratitude to someone you have lost. Remember: the physical vessel has rested, but their essence remains part of the eternal Divine.',
    verses: [
      {
        chapter: 2,
        verse: 22,
        sanskrit: 'वासांसि जीर्णानि यथा विहाय\nनवानि गृह्णाति नरोऽपराणि।\nतथा शरीराणि विहाय जीर्णा\nन्यन्यानि संयाति नवानि देही।।',
        iast: 'vāsāṁsi jīrṇāni yathā vihāya navāni gṛhṇāti naro ’parāṇi | tathā śarīrāṇi vihāya jīrṇāny anyāni saṁyāti navāni dehī ||',
        translation:
          'Just as a person casts off worn-out garments and puts on new ones, so the embodied soul casts off worn-out bodies and enters into other new ones.',
        context: 'Chapter 2 — The garment metaphor of transition.',
      },
      {
        chapter: 2,
        verse: 20,
        sanskrit: 'न जायते म्रियते वा कदाचिन्\nनायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे।।',
        iast: 'na jāyate mriyate vā kadācin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ | ajo nityaḥ śāśvato ’yaṁ purāṇo na hanyate hanyamāne śarīre ||',
        translation:
          'The soul is neither born, nor does it ever die. Unborn, eternal, ever-existing, and primeval, it is not slain when the physical body perishes.',
        context: 'Chapter 2 — The imperishable nature of the soul.',
      },
    ],
  },
  {
    id: 'dharma',
    theme: 'Dharma',
    sanskritName: 'धर्मः',
    title: 'Making Hard Ethical Choices (Dharma)',
    subtitle: 'Choosing right action when all choices feel heavy',
    keywords: [
      'dharma',
      'ethics',
      'moral',
      'right and wrong',
      'duty',
      'integrity',
      'hard choice',
      'responsibility',
      'justice',
      'principles',
    ],
    krishnaCounsel:
      'Dharma is that which upholds, sustains, and nourishes the collective good. When caught between conflicting obligations, step back from personal vanity or convenience. Ask what choice protects righteousness, serves truth, and uplifts the highest welfare.',
    coreTakeaways: [
      'Dharma is not dogma; it is living in harmony with cosmic balance and empathy.',
      'Acting with integrity requires courage, especially when doing right is unpopular.',
      'Whenever righteousness is protected, righteousness in turn protects the actor.',
    ],
    practicalAction:
      'When faced with a thorny dilemma today, ask: "If everyone in the world acted the way I am about to act right now, would the world be more compassionate or more selfish?" Let that answer guide you.',
    verses: [
      {
        chapter: 4,
        verse: 7,
        sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्।।',
        iast: 'yadā yadā hi dharmasya glānir bhavati bhārata | abhyutthānam adharmasya tadātmānaṁ sṛjāmy aham ||',
        translation:
          'Whenever and wherever there is a decline in righteousness, and a predominant rise of unrighteousness, at that time I manifest Myself on earth.',
        context: 'Chapter 4 — The divine promise to restore righteousness.',
      },
      {
        chapter: 3,
        verse: 20,
        sanskrit: 'कर्मणैव हि संसिद्धिमास्थिता जनकादयः।\nलोकसंग्रहमेवापि संपश्यन्कर्तुमर्हसि।।',
        iast: 'karmaṇaiva hi saṁsiddhim āsthitā janakādayaḥ | loka-saṁgraham evāpi saṁpaśyan kartum arhasi ||',
        translation:
          'Kings like Janaka attained perfection solely through dedicated action. Even with a view to the welfare and cohesion of the world, you should perform your duty.',
        context: 'Chapter 3 — Loka-samgraha: action for world welfare.',
      },
    ],
  },
  {
    id: 'devotion',
    theme: 'Devotion',
    sanskritName: 'भक्तिः',
    title: 'Connecting with Divine Love and Faith',
    subtitle: 'Nurturing sincere spiritual devotion in everyday life',
    keywords: [
      'devotion',
      'faith',
      'bhakti',
      'god',
      'prayer',
      'surrender',
      'spiritual',
      'trust',
      'grace',
      'divine',
    ],
    krishnaCounsel:
      'Krishna makes spiritual realization accessible to every human heart: God does not demand impossible penance or costly rituals. A single leaf, a humble flower, a wild fruit, or even pure water offered with heartfelt love is received with infinite joy.',
    coreTakeaways: [
      'Sincerity of feeling is the only currency that matters in spiritual devotion.',
      'Transform mundane activities — cooking, eating, walking — into loving offerings.',
      'Divine grace protects, guides, and provides for whoever loves unconditionally.',
    ],
    practicalAction:
      'Before your next meal, pause for 5 seconds. Offer the food mentally to the Divine with a feeling of deep gratitude before taking the first bite.',
    verses: [
      {
        chapter: 9,
        verse: 26,
        sanskrit: 'पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः।।',
        iast: 'patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati | tad ahaṁ bhakty-upahṛtam aśnāmi prayatātmanaḥ ||',
        translation:
          'Whoever offers Me with love and devotion a leaf, a flower, a fruit, or even water, that heartfelt offering made with a pure mind I accept.',
        context: 'Chapter 9 (Raja Vidya Raja Guhya Yoga) — The simplicity of pure love.',
      },
      {
        chapter: 9,
        verse: 22,
        sanskrit: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्।।',
        iast: 'ananyāś cintayanto māṁ ye janāḥ paryupāsate | teṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham ||',
        translation:
          'For those who meditate upon Me with undistracted devotion, I personally carry what they lack and preserve what they already have.',
        context: 'Chapter 9 — The divine promise of Yogakshema.',
      },
    ],
  },
  {
    id: 'the-self',
    theme: 'The Self',
    sanskritName: 'आत्मबोधः',
    title: 'Understanding Who You Really Are',
    subtitle: 'Piercing the illusions of the ego and discovering the Atman',
    keywords: [
      'the self',
      'who am i',
      'soul',
      'atman',
      'consciousness',
      'ego',
      'identity',
      'spirit',
      'awareness',
      'higher self',
    ],
    krishnaCounsel:
      'You are not the physical body that tires, nor the fluctuating emotions that storm and pass, nor the clever intellect that calculates. You are the silent, changeless, luminous witness of all of them — the eternal Atman that was never born and can never die.',
    coreTakeaways: [
      'You are the screen upon which the movie of life is projected; movies change, the screen remains untouched.',
      'Elevate your mind through the Self; do not degrade yourself with petty self-doubts.',
      'Realizing your spiritual nature dissolves fear, vanity, and loneliness.',
    ],
    practicalAction:
      'Whenever self-doubt whispers today, remind yourself: "I am not my temporary worries; I am the vast, clear awareness in which these thoughts arise and dissolve."',
    verses: [
      {
        chapter: 6,
        verse: 5,
        sanskrit: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः।।',
        iast: 'uddhared ātmanātmānaṁ nātmānam avasādayet | ātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ ||',
        translation:
          'Let a person lift oneself by one’s own mind, and not degrade oneself. For the mind alone is one’s greatest friend, and the mind alone is one’s greatest enemy.',
        context: 'Chapter 6 (Dhyana Yoga) — The call to self-elevation.',
      },
      {
        chapter: 13,
        verse: 2,
        sanskrit: 'इदं शरीरं कौन्तेय क्षेत्रमित्यभिधीयते।\nएतद्यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति तद्विदः।।',
        iast: 'idaṁ śarīraṁ kaunteya kṣetram ity abhidhīyate | etad yo vetti taṁ prāhuḥ kṣetrajña iti tad-vidaḥ ||',
        translation:
          'This body, O Arjuna, is called the Field; and one who knows this body is called the Knower of the Field by the wise.',
        context: 'Chapter 13 (Kshetra Kshetrajna Vibhaga Yoga) — The distinction between the body and consciousness.',
      },
    ],
  },
]

export const ALL_THEMES = [
  'All',
  'Fear',
  'Purpose',
  'Karma',
  'Peace',
  'Detachment',
  'The Self',
  'Dharma',
  'Devotion',
]

export function searchAskGita(query: string, themeFilter: string): AskTopic[] {
  const cleanQuery = query.trim().toLowerCase()
  const isAllThemes = !themeFilter || themeFilter.toLowerCase() === 'all'

  return ASK_TOPICS.filter((topic) => {
    // Check theme match
    const matchesTheme =
      isAllThemes || topic.theme.toLowerCase() === themeFilter.toLowerCase()

    if (!matchesTheme) return false
    if (!cleanQuery) return true

    // Check query match across keywords, title, subtitle, counsel, takeaways, and verses
    const searchable = [
      topic.title,
      topic.subtitle,
      topic.theme,
      topic.sanskritName,
      topic.krishnaCounsel,
      ...topic.keywords,
      ...topic.coreTakeaways,
      ...topic.verses.map((v) => `${v.translation} ${v.context} ${v.iast}`),
    ]
      .join(' ')
      .toLowerCase()

    // Match if words in query are found
    const queryWords = cleanQuery.split(/\s+/).filter(Boolean)
    return queryWords.every((word) => searchable.includes(word))
  })
}
