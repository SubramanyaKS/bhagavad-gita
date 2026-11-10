export type KeyVerse = {
  chapter: number
  verse: number
  sanskrit: string
  iast: string
  translation: string
  context: string
}

export type Lesson = {
  id: string
  title: string
  sanskritTitle?: string
  subtitle: string
  duration: string
  summary: string
  keyVerses: KeyVerse[]
  coreTakeaways: string[]
  practicalReflection: string
}

export type Track = {
  id: string
  title: string
  sanskritTitle: string
  subtitle: string
  description: string
  icon: string
  lessons: Lesson[]
}

export const LEARN_TRACKS: Track[] = [
  {
    id: 'seven-day-journey',
    title: '7-Day Foundations',
    sanskritTitle: 'सप्तदिवसीय यात्रा',
    subtitle: 'A week to understand the core message of Krishna',
    description:
      'Seven curated daily steps that guide you through Arjuna’s crisis, Krishna’s timeless perspective on identity, duty, and spiritual liberation.',
    icon: '☀️',
    lessons: [
      {
        id: 'day-1',
        title: 'Day 1: The Human Dilemma',
        sanskritTitle: 'विषादः',
        subtitle: 'Why we freeze when duty and emotions collide',
        duration: '5 min read',
        summary:
          'On the battlefield of Kurukshetra, Arjuna stands paralyzed. His dilemma is universal: what do you do when your heart aches, certainty crumbles, and walking away seems easier than facing your responsibilities?',
        keyVerses: [
          {
            chapter: 1,
            verse: 47,
            sanskrit: 'एवमुक्त्वार्जुनः सङ्ख्ये रथोपस्थ उपाविशत्।\nविसृज्य सशरं चापं शोकसंविग्नमानसः।।',
            iast: 'evam uktvārjunaḥ saṅkhye rathopastha upāviśat | visṛjya sa-śaraṁ cāpaṁ śoka-saṁvigna-mānasaḥ ||',
            translation:
              'Having spoken thus on the battlefield, Arjuna cast aside his bow and arrows, sinking down onto the chariot seat with a mind overwhelmed by sorrow.',
            context: 'Arjuna surrenders to grief, creating the opening for Krishna’s transformative counsel.',
          },
        ],
        coreTakeaways: [
          'Crisis and confusion are not moral failures; they are the starting point of wisdom.',
          'True spiritual seeking begins when we realize our customary formulas can no longer solve our grief.',
          'Acknowledging our vulnerability is the essential first step before genuine clarity can emerge.',
        ],
        practicalReflection:
          'Notice an area in your life today where you feel pulled between what is comfortable and what is truly right. Simply name it without self-judgment.',
      },
      {
        id: 'day-2',
        title: 'Day 2: The Eternal Self',
        sanskritTitle: 'आत्मतत्त्वम्',
        subtitle: 'You are not your fleeting roles, thoughts, or fears',
        duration: '6 min read',
        summary:
          'Krishna begins his teaching not with rules, but with reality: the body changes, suffers, and dies, but the consciousness (Atman) that witnesses life is imperishable and whole.',
        keyVerses: [
          {
            chapter: 2,
            verse: 20,
            sanskrit: 'न जायते म्रियते वा कदाचिन्\nनायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे।।',
            iast: 'na jāyate mriyate vā kadācin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ | ajo nityaḥ śāśvato ’yaṁ purāṇo na hanyate hanyamāne śarīre ||',
            translation:
              'The soul is never born, nor does it ever die. Unborn, eternal, ever-existing, and primeval, it is not destroyed when the physical body perishes.',
            context: 'Krishna reminds Arjuna of his indestructible spiritual essence.',
          },
        ],
        coreTakeaways: [
          'You are the observer of experiences, not merely the recipient of circumstances.',
          'Loss and physical change are inevitable garments of nature; your core awareness remains untouched.',
          'Deep fear dissipates when you realize your fundamental existence is not fragile.',
        ],
        practicalReflection:
          'When anxiety or anger surfaces today, take three deep breaths and repeat mentally: "I am observing this feeling; I am larger than this emotion."',
      },
      {
        id: 'day-3',
        title: 'Day 3: The Art of Action',
        sanskritTitle: 'कर्मकौशलम्',
        subtitle: 'How to work with 100% excellence without burnout',
        duration: '5 min read',
        summary:
          'Most anxiety comes from agonizing over outcomes we cannot control. Krishna reveals the secret of Karma Yoga: give your absolute best to the effort, and surrender anxiety about the harvest.',
        keyVerses: [
          {
            chapter: 2,
            verse: 47,
            sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि।।',
            iast: 'karmaṇy evādhikāras te mā phaleṣu kadācana | mā karma-phala-hetur bhūr mā te saṅgo ’stv akarmaṇi ||',
            translation:
              'You have a right to perform your prescribed duties, but never to the fruits of action. Never let the fruits be your motive, nor be attached to inaction.',
            context: 'The definitive formulation of detached, noble action.',
          },
        ],
        coreTakeaways: [
          'Focus solely on inputs (craft, integrity, presence); release obsessing over outputs (applause, outcome).',
          'Detachment is not indifference; it is total absorption in action without the paralyzing fear of failure.',
          'Inaction through fear is as harmful as reckless action through greed.',
        ],
        practicalReflection:
          'Pick one task today. Put your whole heart into doing it gracefully, while actively deciding not to check for validation or obsess over its result.',
      },
      {
        id: 'day-4',
        title: 'Day 4: Mastery of the Mind',
        sanskritTitle: 'मनोनिग्रहः',
        subtitle: 'Disciplining the restless inner monologue',
        duration: '6 min read',
        summary:
          'Arjuna protests that controlling the mind is like trying to catch the wind. Krishna agrees it is challenging, but promises it is possible through consistent practice (Abhyasa) and non-attachment (Vairagya).',
        keyVerses: [
          {
            chapter: 6,
            verse: 26,
            sanskrit: 'यतो यतो निश्चरति मनश्चञ्चलमस्थिरम्।\nततस्ततो नियम्यैतदात्मन्येव वशं नयेत्।।',
            iast: 'yato yato niścarati manaś cañcalam asthiram | tatas tato niyamyaitad ātmany eva vaśaṁ nayet ||',
            translation:
              'From whatever direction the restless and unsteady mind wanders away, one should gently restrain it and bring it back under the guidance of the Self.',
            context: 'Practical mindfulness guidance from Chapter 6 (Dhyana Yoga).',
          },
        ],
        coreTakeaways: [
          'Do not fight the mind violently; gently escort your attention back whenever it wanders.',
          'The mind is either your greatest ally or your worst tormentor depending on conscious cultivation.',
          'Consistency in small daily pauses transforms long-term mental resilience.',
        ],
        practicalReflection:
          'Spend 3 minutes in silence. When thoughts wander to past regrets or future worries, gently notice them and return your focus to your natural breathing.',
      },
      {
        id: 'day-5',
        title: 'Day 5: Seeing the Divine Everywhere',
        sanskritTitle: 'विश्वदर्शनम्',
        subtitle: 'Transcending isolation through interconnectedness',
        duration: '6 min read',
        summary:
          'Krishna reveals that all life, beauty, courage, and vitality in the universe are expressions of one shared supreme divine consciousness. You are never alone or disconnected.',
        keyVerses: [
          {
            chapter: 7,
            verse: 7,
            sanskrit: 'मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय।\nमयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव।।',
            iast: 'mattaḥ parataraṁ nānyat kiñcid asti dhanañjaya | mayi sarvam idaṁ protaṁ sūtre maṇi-gaṇā iva ||',
            translation:
              'There is nothing higher than Me, O Arjuna. All this universe is strung upon Me, like clusters of pearls upon a thread.',
            context: 'The realization of unity underlying all multiplicity.',
          },
        ],
        coreTakeaways: [
          'Behind diverse personalities and situations lies a singular continuous reality.',
          'Recognizing divinity in everyday existence turns everyday encounters into sacred connections.',
          'Seeing unity eliminates prejudice, hatred, and deep loneliness.',
        ],
        practicalReflection:
          'Look at someone today you usually disagree with. Remind yourself: the same spark of consciousness that lights my thoughts is lighting theirs.',
      },
      {
        id: 'day-6',
        title: 'Day 6: The Three Energies of Life',
        sanskritTitle: 'गुणत्रयम्',
        subtitle: 'Understanding Sattva, Rajas, and Tamas in your daily moods',
        duration: '6 min read',
        summary:
          'Nature operates through three qualities (Gunas): Sattva (clarity, peace, light), Rajas (passion, agitation, greed), and Tamas (lethargy, confusion, darkness). Recognizing which gunas dominate allows you to consciously elevate your life.',
        keyVerses: [
          {
            chapter: 14,
            verse: 6,
            sanskrit: 'तत्र सत्त्वं निर्मलत्वात्प्रकाशकमनामयम्।\nसुखसङ्गेन बध्नाति ज्ञानसङ्गेन चानघ।।',
            iast: 'tatra sattvaṁ nirmalatvāt prakāśakam anāmayam | sukha-saṅgena badhnāti jñāna-saṅgena cānagha ||',
            translation:
              'Of these, Sattva, being luminous and free from disease on account of its purity, binds through attachment to happiness and knowledge.',
            context: 'Krishna explains how nature’s three energies shape human behavior.',
          },
        ],
        coreTakeaways: [
          'Lethargy is not laziness; it is Tamas. Agitation is not ambition; it is Rajas. Peace is Sattva.',
          'Cultivate Sattva through clean food, mindful reading, calm spaces, and honest contemplation.',
          'Eventually, the highest sage rises even above Sattva into pure unconditioned awareness.',
        ],
        practicalReflection:
          'Assess your energy right now: Is it heavy and dull (Tamas), frantic and restless (Rajas), or calm and alert (Sattva)? What simple shift can invite more Sattva?',
      },
      {
        id: 'day-7',
        title: 'Day 7: Freedom and Surrender',
        sanskritTitle: 'मोक्षसंन्यासः',
        subtitle: 'The supreme secret: living in grace',
        duration: '7 min read',
        summary:
          'In the closing chapter, Krishna distills all 700 verses into one sublime promise: let go of the burden of carrying the world on your fragile shoulders. Act with love, trust the divine order, and walk fearless.',
        keyVerses: [
          {
            chapter: 18,
            verse: 66,
            sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः।।',
            iast: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja | ahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||',
            translation:
              'Relinquishing all dualities and burdens of ego, surrender unto Me alone. I shall deliver you from all fear and sorrow; do not grieve.',
            context: 'The ultimate teaching (Charama Shloka) of the Bhagavad Gita.',
          },
        ],
        coreTakeaways: [
          'True surrender is not resignation; it is highest trust in the cosmic intelligence.',
          'When you surrender the ego’s illusion of control, infinite grace carries you.',
          'The Gita ends not with Arjuna fleeing the world, but picking up his bow with calm, decisive courage.',
        ],
        practicalReflection:
          'What is one heavy burden you have been carrying alone this week? Silently hand it over to the Divine, breathe freely, and step forward into your day with confidence.',
      },
    ],
  },
  {
    id: 'four-yogas',
    title: 'The 4 Paths of Yoga',
    sanskritTitle: 'चतुर्योगमार्गः',
    subtitle: 'Action, Knowledge, Devotion, and Meditation',
    description:
      'Krishna understands human diversity. Different temperaments need different paths to realize truth. Discover which of the four classical yogas resonates most with you.',
    icon: '☸️',
    lessons: [
      {
        id: 'karma-yoga',
        title: 'Karma Yoga: The Path of Action',
        sanskritTitle: 'कर्मयोगः',
        subtitle: 'Transforming daily work into spiritual evolution',
        duration: '6 min read',
        summary:
          'Ideal for active, practical personalities. Karma Yoga teaches how to live in the bustling marketplace while keeping an inner sanctuary of peace, acting without selfish desire.',
        keyVerses: [
          {
            chapter: 3,
            verse: 19,
            sanskrit: 'तस्मादसक्तः सततं कार्यं कर्म समाचर।\nअसक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः।।',
            iast: 'tasmād asaktaḥ satataṁ kāryaṁ karma samācara | asakto hy ācaran karma param āpnoti pūruṣaḥ ||',
            translation:
              'Therefore, constantly perform obligatory work without attachment; for by performing action without attachment, a person attains the highest.',
            context: 'Chapter 3 (Karma Yoga).',
          },
        ],
        coreTakeaways: [
          'Work is not an obstacle to spirituality; when consecrated, work IS spiritual practice.',
          'Serve without demanding entitlement to the result.',
          'Efficiency peaks when mental energy is not leaked into worry about success or failure.',
        ],
        practicalReflection:
          'Approach your next work meeting or household task not as a chore, but as an offering of excellence to life itself.',
      },
      {
        id: 'jnana-yoga',
        title: 'Jnana Yoga: The Path of Wisdom',
        sanskritTitle: 'ज्ञानयोगः',
        subtitle: 'Inquiring into the true nature of reality',
        duration: '7 min read',
        summary:
          'Ideal for philosophical, reflective minds. Jnana Yoga uses sharp discrimination (Viveka) between the fleeting (Asat) and the eternal (Sat) to pierce through illusions of the ego.',
        keyVerses: [
          {
            chapter: 4,
            verse: 38,
            sanskrit: 'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति।।',
            iast: 'na hi jñānena sadṛśaṁ pavitram iha vidyate | tat svayaṁ yoga-saṁsiddhaḥ kālenātmani vindati ||',
            translation:
              'Certainly, there is nothing in this world as purifying as wisdom. One who is perfected in yoga realizes it naturally within oneself in due course.',
            context: 'Chapter 4 (Jnana Karma Sannyasa Yoga).',
          },
        ],
        coreTakeaways: [
          'Knowledge dissolves the darkness of ignorance just as sunrise dispels shadow.',
          'Distinguish between what changes (body, emotions, thoughts) and that which observes them (Atman).',
          'Intellectual knowing must mature into lived realization.',
        ],
        practicalReflection:
          'Ask yourself in quiet contemplation: "Behind my name, profession, and physical features, who is the conscious one observing all of this right now?"',
      },
      {
        id: 'bhakti-yoga',
        title: 'Bhakti Yoga: The Path of Devotion',
        sanskritTitle: 'भक्तियोगः',
        subtitle: 'Directing the heart’s emotional power toward the Divine',
        duration: '6 min read',
        summary:
          'Ideal for feeling, emotional natures. Bhakti transforms human affection, longing, and reverence into an intimate, sweet relationship with God in whatever form touches your heart.',
        keyVerses: [
          {
            chapter: 9,
            verse: 26,
            sanskrit: 'पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः।।',
            iast: 'patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati | tad ahaṁ bhakty-upahṛtam aśnāmi prayatātmanaḥ ||',
            translation:
              'Whoever offers Me with love and devotion a leaf, a flower, a fruit, or even water, that heartfelt offering I accept.',
            context: 'Krishna reveals that genuine love matters infinitely more than expensive rituals.',
          },
        ],
        coreTakeaways: [
          'God asks not for wealth or grandeur, but for sincere devotion and a humble heart.',
          'Love melts the rigid walls of the ego faster than severe austerity.',
          'True devotion manifests as unconditional kindness toward all creation.',
        ],
        practicalReflection:
          'Offer whatever you eat, see, or create today with a quiet prayer of gratitude to the source of all existence.',
      },
      {
        id: 'dhyana-yoga',
        title: 'Dhyana Yoga: The Path of Meditation',
        sanskritTitle: 'ध्यानयोगः',
        subtitle: 'Stillness, posture, and inner contemplation',
        duration: '6 min read',
        summary:
          'Ideal for disciplined seekers seeking inner stillness. Chapter 6 provides systematic, practical instruction on posture, breathing, moderation, and steadying the light of awareness.',
        keyVerses: [
          {
            chapter: 6,
            verse: 19,
            sanskrit: 'यथा दीपो निवातस्थो नेङ्गते सोपमा स्मृता।\nयोगिनो यतचित्तस्य युञ्जतो योगमात्मनः।।',
            iast: 'yathā dīpo nivāta-stho neṅgate sopamā smṛtā | yogino yata-cittasya yuñjato yogam ātmanaḥ ||',
            translation:
              'As a lamp placed in a windless place does not flicker, so is compared the controlled mind of a yogi absorbed in meditation on the Self.',
            context: 'The timeless simile of the steady flame in Chapter 6.',
          },
        ],
        coreTakeaways: [
          'Meditation requires moderation: avoid extreme fasting or overindulgence, too much sleep or too little.',
          'Create a clean, uncluttered space for daily quiet sitting.',
          'A quiet mind reflects truth clearly, like a still lake reflects the sky.',
        ],
        practicalReflection:
          'Sit upright for 5 minutes with spine aligned. Watch your breath gently enter and leave, holding the stillness of a flame sheltered from the wind.',
      },
    ],
  },
  {
    id: 'life-lessons',
    title: 'Krishna’s Guide to Life Dilemmas',
    sanskritTitle: 'जीवनमार्गदर्शनम्',
    subtitle: 'Ancient solutions for the modern seeker’s deepest challenges',
    description:
      'Practical wisdom for real-life crossroads: overcoming anxiety, finding your calling, mastering anger, and facing failure with dignity.',
    icon: '🧭',
    lessons: [
      {
        id: 'handling-anger',
        title: 'The Anatomy of Anger and Fall',
        sanskritTitle: 'क्रोधविजयः',
        subtitle: 'Understanding the downward spiral of desire and rage',
        duration: '5 min read',
        summary:
          'Krishna maps out the precise psychological sequence that causes rational people to ruin their lives: dwelling on objects leads to attachment, attachment breeds desire, unfulfilled desire explodes as anger, and anger destroys intellect.',
        keyVerses: [
          {
            chapter: 2,
            verse: 62,
            sanskrit: 'ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते।\nसङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते।।',
            iast: 'dhyāyato viṣayān puṁsaḥ saṅgas teṣūpajāyate | saṅgāt sañjāyate kāmaḥ kāmāt krodho ’bhijāyate ||',
            translation:
              'While contemplating sense objects, attachment to them develops. From attachment arises craving, and from obstructed craving arises anger.',
            context: 'The ladder of mental fall in Chapter 2.',
          },
        ],
        coreTakeaways: [
          'Anger never arrives unannounced; it begins with uncontrolled rumination and obsessive desire.',
          'When anger takes over, memory of values is lost and discriminative intellect collapses.',
          'Guard what your mind constantly feeds upon in quiet moments.',
        ],
        practicalReflection:
          'When you feel irritation mounting today, pause for 10 seconds. Ask yourself: "What personal expectation or craving of mine was just blocked?"',
      },
      {
        id: 'finding-svadharma',
        title: 'Finding Your Personal Calling (Svadharma)',
        sanskritTitle: 'स्वधर्मः',
        subtitle: 'Why living an authentic life beats imitating someone else',
        duration: '6 min read',
        summary:
          'Krishna gives one of the boldest insights in world philosophy: it is far better to live your own duty imperfectly than to mimic another person’s path brilliantly. Authenticity brings peace; imitation brings fear.',
        keyVerses: [
          {
            chapter: 3,
            verse: 35,
            sanskrit: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः।।',
            iast: 'śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt | sva-dharme nidhanaṁ śreyaḥ para-dharmo bhayāvahaḥ ||',
            translation:
              'Better is one’s own duty, though devoid of merit, than another’s duty well performed. Death in the performance of one’s own duty is beneficial; pursuing another’s path is perilous.',
            context: 'The teaching of authentic personal purpose.',
          },
        ],
        coreTakeaways: [
          'Do not judge your intrinsic worth against the benchmarks or careers of others.',
          'Your Svadharma is aligned with your unique nature, talents, and ethical obligations.',
          'Imitation leads to chronic inner friction and imposter syndrome.',
        ],
        practicalReflection:
          'What is one task or responsibility that feels genuinely true to who you are, even if no one applauds you for it? Honor it today.',
      },
      {
        id: 'inner-balance',
        title: 'The Qualities of an Enlightened Mind (Sthitaprajna)',
        sanskritTitle: 'स्थितप्रज्ञलक्षणम्',
        subtitle: 'How an unshakable person speaks, acts, and lives',
        duration: '7 min read',
        summary:
          'Arjuna asks: "What are the signs of someone who has mastered their mind? How do they speak, sit, and walk?" Krishna’s answer is an immortal portrait of psychological freedom.',
        keyVerses: [
          {
            chapter: 2,
            verse: 56,
            sanskrit: 'दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः।\nवीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते।।',
            iast: 'duḥkheṣv anudvigna-manāḥ sukheṣu vigata-spṛhaḥ | vīta-rāga-bhaya-krodhaḥ sthita-dhīr munir ucyate ||',
            translation:
              'One whose mind is undisturbed in sorrow, who does not crave after pleasures, and who is free from passion, fear, and anger, is called a sage of steady wisdom.',
            context: 'The definition of Sthitaprajna in Chapter 2.',
          },
        ],
        coreTakeaways: [
          'Enlightenment is not escaping the world, but living within it with unshakeable calm.',
          'Joy does not inflate them into arrogance; sorrow does not crush them into despair.',
          'They treat praise and blame as passing weather.',
        ],
        practicalReflection:
          'Today, practice reacting with equal composure to both a pleasant surprise and a minor annoyance. Be the silent anchor in the storm.',
      },
    ],
  },
]
