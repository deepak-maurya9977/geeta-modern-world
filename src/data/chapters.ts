// Complete Bhagavad Gita chapters with modern stories and original shlokas

export interface Shloka {
  number: string;
  sanskrit: string;
  translation: string;
}

export interface Story {
  character: string;
  setting: string;
  plot: string;
  dilemma: string;
  resolution: string;
  lesson: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface Chapter {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  phase: 'Foundation' | 'Devotion' | 'Integration';
  story: Story;
  summary: string;
  shlokas: Shloka[];
  keyTeaching: string;
  modernContext: string;
  bgImage: string;
  practicalTakeaway: string;
  reflectionQuestions: string[];
  tryThis: string;
  glossaryTerms: GlossaryTerm[];
  readingTimeMinutes: number;
}

export const chapters: Chapter[] = [
  {
    id: 1,
    badge: "Chapter 01",
    title: "Arjuna's Dilemma",
    subtitle: "Arjuna Vishada Yoga - The Yoga of Arjuna's Dejection",
    story: {
      character: "Maya, a 28-year-old marketing executive at a Fortune 500 company",
      setting: "A corporate office in Mumbai, the night before a major board presentation",
      plot: "Maya has been asked to compromise her ethical standards to secure a promotion. Her boss wants her to manipulate data to mislead investors about the company's environmental impact. As she sits at her desk, overwhelmed by the weight of the decision, she finds her grandmother's old journal in her bag—a gift she had forgotten about. The journal contains handwritten notes about the Bhagavad Gita, passed down through generations.",
      dilemma: "Should she compromise her values for career advancement and financial security, or stand by her principles and risk losing everything she's worked for, including her reputation and livelihood?",
      resolution: "Reading her grandmother's words about dharma and duty, Maya realizes that true success comes from integrity, not titles. She decides to document the truth and present it to the board, whatever the consequences. Her courage inspires others in the company to speak up, leading to genuine reform rather than cover-up.",
      lesson: "When faced with moral crisis, we must look within and choose the path of righteousness, even when it's difficult. External rewards are temporary, but inner peace comes from living with integrity."
    },
    summary: "This chapter sets the stage for the Gita. Arjuna, seeing his relatives and teachers arrayed against him in battle, is overcome with grief and drops his weapons. His distress becomes the catalyst for Krishna's divine teachings on duty, righteousness, and the nature of the self.",
    keyTeaching: "Recognition of moral complexity and the need for spiritual guidance in times of crisis. The battlefield represents the conflicts we all face in life.",
    modernContext: "Workplace ethical dilemmas, major life decisions, existential crisis, choosing between right and easy",
    bgImage: "/ch1_bg.jpg",
    phase: 'Foundation',
    practicalTakeaway: 'When you face a tough moral decision, pause before reacting. Sit with the discomfort instead of rushing to choose the easy path — clarity comes from stillness, not speed.',
    reflectionQuestions: [
      'Have you ever felt paralyzed by a decision where both options seemed painful? What did you do?',
      'Is there a situation in your life right now where you are avoiding a difficult but necessary choice?',
      'How do you distinguish between genuine moral confusion and simply not wanting to face consequences?',
    ],
    tryThis: 'Journal for 10 minutes about a current dilemma in your life. Write out both sides honestly without trying to resolve it — just observe what emotions come up as you write.',
    glossaryTerms: [
      { term: 'Dharma', definition: 'Your moral duty or righteous path — the right thing to do in a given situation, even when it is hard.' },
      { term: 'Vishada', definition: 'Deep sorrow or dejection — the emotional crisis that can become the starting point for spiritual awakening.' },
      { term: 'Kurukshetra', definition: 'Literally "field of action" — a metaphor for the battlefield of life where inner conflicts play out.' },
    ],
    readingTimeMinutes: 6,
    shlokas: [
      {
        number: "1.1",
        sanskrit: "धृतराष्ट्र उवाच |\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय || 1.1||",
        translation: "Dhritarashtra said: O Sanjaya, assembled at Kurukshetra, the field of righteousness, what did my sons and the sons of Pandu do, desiring to fight?"
      },
      {
        number: "1.28",
        sanskrit: "अर्जुन उवाच |\nदृष्ट्वेमं स्वजनं कृष्ण युयुत्सुं समुपस्थितम् |\nसीदन्ति मम गात्राणि मुखं च परिशुष्यति || 1.28||",
        translation: "Arjuna said: O Krishna, seeing my kinsmen arrayed for battle, my limbs fail me, and my mouth is parched."
      },
      {
        number: "1.47",
        sanskrit: "सञ्जय उवाच |\nएवमुक्त्वार्जुनः संख्ये रथोपस्थ उपाविशत् |\nविसृज्य सशरं चापं शोकसंविग्नमानसः || 1.47||",
        translation: "Sanjaya said: Speaking thus, Arjuna cast aside his bow and arrows, and sat down on the chariot, his mind overwhelmed with grief."
      }
    ]
  },
  {
    id: 2,
    badge: "Chapter 02",
    title: "The Eternal Self",
    subtitle: "Sankhya Yoga - The Yoga of Knowledge",
    story: {
      character: "Aryan, a 24-year-old social media influencer with 2 million followers",
      setting: "His apartment in Bangalore, three days after a viral controversy",
      plot: "Aryan made a mistake—an honest but poorly worded post about a sensitive social issue that was misinterpreted and spread like wildfire. In 72 hours, he lost half his followers, three major brand deals, and his confidence. He's questioning his entire identity and purpose. His mental health is deteriorating as he obsessively reads hate comments.",
      dilemma: "Without his online persona, who is he? Has he built his self-worth on something too fragile? Is his value determined by likes and followers?",
      resolution: "His grandfather, a retired philosophy professor, shares the teaching of the eternal soul. Aryan learns that he is not his profile, his followers, or his mistakes—he is the eternal consciousness behind it all. He begins meditation and gradually rebuilds his platform with authentic content, this time grounded in deeper values.",
      lesson: "The true self is eternal and indestructible, beyond the temporary body and social identity. External validation is fleeting; inner worth is permanent."
    },
    summary: "Krishna begins His teachings by explaining the distinction between the temporary physical body and the eternal soul. He teaches Arjuna about the indestructible nature of the self, comparing the soul's journey to changing clothes.",
    keyTeaching: "The soul is eternal, unborn, and indestructible. It transcends the physical body and all temporary identities.",
    modernContext: "Social media anxiety, identity crisis, self-worth beyond external validation, mental health",
    bgImage: "/ch2_bg.jpg",
    phase: 'Foundation',
    practicalTakeaway: 'Next time you feel crushed by a failure or someone\'s opinion of you, remind yourself: you are not your grades, your job title, or your follower count. Your core identity is deeper than any external label.',
    reflectionQuestions: [
      'How much of your self-worth is tied to things that could disappear tomorrow — a job, a relationship, social media presence?',
      'If you lost everything external, what would remain that you could still call "you"?',
      'Have you ever experienced a loss that, looking back, actually freed you to become someone better?',
    ],
    tryThis: 'Sit quietly for 5 minutes and mentally list all the labels you identify with (student, employee, friend, etc.). Then ask yourself: "Who am I without these labels?" Notice what comes up.',
    glossaryTerms: [
      { term: 'Atman', definition: 'The eternal self or soul — the unchanging consciousness within you that is beyond body, mind, and ego.' },
      { term: 'Sankhya', definition: 'The path of analytical knowledge — using reason and discernment to understand the difference between the real and the unreal.' },
      { term: 'Dehi', definition: 'The embodied soul — the one who dwells within the body but is not limited to it.' },
    ],
    readingTimeMinutes: 7,
    shlokas: [
      {
        number: "2.11",
        sanskrit: "श्रीभगवानुवाच |\nअशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे |\nगतासूनगतासूंश्च नानुशोचन्ति पण्डिताः || 2.11||",
        translation: "The Blessed Lord said: You grieve for those who should not be grieved for, and yet speak words of wisdom. The wise do not grieve for the living or the dead."
      },
      {
        number: "2.13",
        sanskrit: "देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा |\nतथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति || 2.13||",
        translation: "Just as the embodied soul passes through childhood, youth, and old age in this body, so it passes into another body. The wise are not deluded by this."
      },
      {
        number: "2.20",
        sanskrit: "न जायते म्रियते वा कदाचिन्\nनायं भूत्वा भविता वा न भूयः |\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे || 2.20||",
        translation: "The soul is never born nor does it die. It does not come into being, nor does it cease to exist. It is unborn, eternal, ever-existing, and primeval. The soul is not killed when the body is killed."
      },
      {
        number: "2.22",
        sanskrit: "वासांसि जीर्णानि यथा विहाय\nनवानि गृह्णाति नरोऽपराणि |\nतथा शरीराणि विहाय जीर्णा\nन्यन्यानि संयाति नवानि देही || 2.22||",
        translation: "As a person puts on new garments, giving up old ones, the soul similarly accepts new material bodies, giving up the old and useless ones."
      }
    ]
  },
  {
    id: 3,
    badge: "Chapter 03",
    title: "Selfless Action",
    subtitle: "Karma Yoga - The Yoga of Action",
    story: {
      character: "Priya, a 32-year-old team lead at a tech startup",
      setting: "A corporate meeting room during layoff announcements, late evening",
      plot: "Priya's company is downsizing. She's been asked to select three team members for termination. Her manager hints that if she cooperates, she'll be promoted to Director. But Priya sees another option—she could take a 40% pay cut and advocate to save her entire team. Her team members are young professionals with families and student loans.",
      dilemma: "Should she prioritize her career and follow orders, or sacrifice her advancement to protect her team? Can she afford to be selfless in a competitive industry?",
      resolution: "Inspired by the teaching of Karma Yoga, Priya chooses to act without attachment to the fruits. She presents a proposal to reduce costs through voluntary pay cuts across the leadership team, saving everyone's jobs. Though she doesn't get the promotion, she gains the loyalty of her team and the respect of senior leadership.",
      lesson: "Perform your duty with dedication, but without attachment to the results. True leadership is selfless service. The action itself is your reward."
    },
    summary: "Krishna explains the path of selfless action—performing one's duties without attachment to the results. He emphasizes that action is better than inaction and that everyone must perform their prescribed duties.",
    keyTeaching: "Perform your prescribed duties without attachment to the fruits of action. Action is superior to inaction.",
    modernContext: "Workplace ethics, leadership challenges, social responsibility, corporate decisions",
    bgImage: "/ch3_bg.jpg",
    phase: 'Foundation',
    practicalTakeaway: 'Focus on doing your best work today without obsessing over the outcome. Put your energy into the effort, not into imagining rewards or fearing failure.',
    reflectionQuestions: [
      'Can you think of a time when attachment to a specific result actually made your performance worse?',
      'What would change in your daily life if you focused entirely on the quality of your actions rather than the rewards they might bring?',
      'Who in your life models selfless action — doing the right thing without expecting recognition?',
    ],
    tryThis: 'Pick one task today and do it with full attention, deliberately letting go of any thought about what you will gain from it. Afterward, reflect on how the experience felt different.',
    glossaryTerms: [
      { term: 'Karma Yoga', definition: 'The path of selfless action — performing your duties with dedication but without clinging to the results.' },
      { term: 'Nishkama Karma', definition: 'Desireless action — working not for personal gain but because the action itself is the right thing to do.' },
      { term: 'Svadharma', definition: 'One\'s own duty — the unique role and responsibility that belongs to you based on your situation and abilities.' },
    ],
    readingTimeMinutes: 6,
    shlokas: [
      {
        number: "2.47",
        sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि || 2.47||",
        translation: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, nor be attached to inaction."
      },
      {
        number: "3.19",
        sanskrit: "तस्मादसक्तः सततं कार्यं कर्म समाचर |\nअसक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः || 3.19||",
        translation: "Therefore, perform your prescribed duties without attachment, for by performing action without attachment, one attains the Supreme."
      },
      {
        number: "3.21",
        sanskrit: "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः |\nस यत्प्रमाणं कुरुते लोकस्तदनुवर्तते || 3.21||",
        translation: "Whatever action a great man performs, common men follow. Whatever standards he sets, the world follows."
      }
    ]
  },
  {
    id: 4,
    badge: "Chapter 04",
    title: "Divine Incarnation",
    subtitle: "Jnana Karma Sannyasa Yoga - The Yoga of Knowledge and Action",
    story: {
      character: "Rahul, a 19-year-old second-year engineering student",
      setting: "A neighborhood community center in Delhi facing demolition",
      plot: "The local government has decided to demolish the 50-year-old community center to build a shopping mall. Rahul has been quietly observing the protests but staying uninvolved, focused on his studies. One evening, he sees elderly residents crying—they have nowhere else to gather, no other place for their morning yoga, their evening discussions, their community.",
      dilemma: "Should he stay quiet and focus on his studies and career, or step up to lead the community's fight even though he feels unqualified and fears it might affect his academic performance?",
      resolution: "Remembering that divine help comes to those who stand for righteousness, Rahul organizes a social media campaign, petitions the local council, and mobilizes the community. His efforts gain traction, media attention follows, and the center is saved through a public-private partnership.",
      lesson: "When dharma is in decline, those who step up to restore righteousness receive divine support. You don't need to be ready; you just need to begin."
    },
    summary: "Krishna reveals that He incarnates whenever righteousness declines and unrighteousness rises, to restore the balance of dharma. He explains the eternal nature of His teachings.",
    keyTeaching: "The Lord incarnates to establish virtue and destroy evil whenever necessary. The divine appears when needed most.",
    modernContext: "Social justice movements, ethical activism, community leadership, youth engagement",
    bgImage: "/ch4_bg.jpg",
    phase: 'Foundation',
    practicalTakeaway: 'You do not need to feel "ready" to stand up for what is right. When you see injustice or a community need, take the first small step — momentum and support will follow.',
    reflectionQuestions: [
      'Is there a cause or issue in your community that you care about but have been too hesitant to act on?',
      'Do you believe ordinary people can restore fairness and justice, or do you wait for someone more powerful to step in?',
      'What would it look like to be the person who shows up when dharma needs defending in your everyday life?',
    ],
    tryThis: 'Identify one small injustice in your immediate environment — at school, work, or in your neighborhood — and take one concrete action to address it this week, no matter how small.',
    glossaryTerms: [
      { term: 'Avatar', definition: 'A divine incarnation — the idea that higher consciousness descends into the world whenever righteousness is threatened.' },
      { term: 'Jnana', definition: 'Spiritual knowledge — wisdom that goes beyond information to a direct understanding of truth.' },
      { term: 'Adharma', definition: 'Unrighteousness — actions, systems, or behaviors that violate moral order and harm others.' },
    ],
    readingTimeMinutes: 5,
    shlokas: [
      {
        number: "4.7",
        sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत |\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् || 4.7||",
        translation: "Whenever and wherever there is a decline in religious practice, O descendant of Bharata, and a predominant rise of irreligion—at that time I descend Myself."
      },
      {
        number: "4.8",
        sanskrit: "परित्राणाय साधूनां विनाशाय च दुष्कृताम् |\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे || 4.8||",
        translation: "To deliver the pious and to annihilate the miscreants, as well as to reestablish the principles of religion, I Myself appear, millennium after millennium."
      }
    ]
  },
  {
    id: 5,
    badge: "Chapter 05",
    title: "Inner Renunciation",
    subtitle: "Karma Sannyasa Yoga - The Yoga of Renunciation of Action",
    story: {
      character: "Vikram, a 35-year-old senior graphic designer at an agency",
      setting: "His home office, 11 PM on a Tuesday, struggling with burnout",
      plot: "Vikram loves his work, but he's been working 14-hour days, answering emails at midnight, and sacrificing his health and relationships. His doctor warns him about stress-related health issues—elevated blood pressure, insomnia, anxiety. He's addicted to the validation his work brings and fears slowing down will make him irrelevant.",
      dilemma: "How can he stay engaged with his passion without letting it consume him? Can he succeed without sacrificing everything else?",
      resolution: "Learning about inner renunciation, Vikram sets boundaries—no work after 7 PM, no weekend emails, daily meditation, and one day completely offline. He discovers that by detaching from the need for constant validation, his creativity actually flourishes. His work improves, and so does his life.",
      lesson: "Perform your duties with dedication but remain detached like a lotus leaf in water—engaged yet unaffected. True success includes well-being."
    },
    summary: "Krishna explains that true renunciation is not giving up action but giving up attachment to the fruits of action. One should act with detachment, like a lotus leaf in water.",
    keyTeaching: "True renunciation is inner detachment while performing one's duties. External renunciation without inner detachment is meaningless.",
    modernContext: "Work-life balance, digital detox, mindful productivity, burnout prevention",
    bgImage: "/ch5_bg.jpg",
    phase: 'Foundation',
    practicalTakeaway: 'Set one firm boundary this week — a time you stop working, a notification you turn off — and protect it. Detachment is not apathy; it is choosing to engage fully without being consumed.',
    reflectionQuestions: [
      'Are you working hard because you love the work, or because you are addicted to the validation it brings?',
      'What would "enough" look like for you — enough success, enough recognition, enough productivity?',
      'Can you stay passionate about something without letting it control your peace of mind?',
    ],
    tryThis: 'Choose one evening this week to go completely offline — no screens, no work, no social media. Spend it on something that nourishes you (a walk, cooking, conversation) and notice how it feels.',
    glossaryTerms: [
      { term: 'Sannyasa', definition: 'Renunciation — not necessarily giving up action, but giving up attachment to the outcomes of action.' },
      { term: 'Vairagya', definition: 'Dispassion or detachment — the ability to engage with life without being enslaved by desires or fears.' },
      { term: 'Samadarshana', definition: 'Equal vision — seeing all beings with the same respect and compassion, regardless of status.' },
    ],
    readingTimeMinutes: 6,
    shlokas: [
      {
        number: "5.10",
        sanskrit: "ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः |\nलिप्यते न स पापेन पद्मपत्रमिवाम्भसा || 5.10||",
        translation: "One who performs his duty without attachment, surrendering the results unto the Supreme Lord, is unaffected by sinful action, as the lotus leaf is untouched by water."
      },
      {
        number: "5.18",
        sanskrit: "विद्याविनयसंपन्ने ब्राह्मणे गवि हस्तिनि |\nशुनि चैव श्वपाके च पण्डिताः समदर्शिनः || 5.18||",
        translation: "The humble sages, by virtue of true knowledge, see with equal vision a learned and gentle brahmana, a cow, an elephant, a dog, and a dog-eater."
      }
    ]
  },
  {
    id: 6,
    badge: "Chapter 06",
    title: "Meditation",
    subtitle: "Dhyana Yoga - The Yoga of Meditation",
    story: {
      character: "Ananya, a 21-year-old university student preparing for competitive exams",
      setting: "Her dorm room during exam week, surrounded by books and coffee cups",
      plot: "Ananya has always struggled with focus. Her mind jumps from thought to thought, worry to worry. During exam preparation, her anxiety is at its peak. She can't concentrate on her studies despite hours of trying. She's tried everything—caffeine, study groups, apps—but nothing works. Her grades are suffering.",
      dilemma: "How can she calm her restless mind and find the focus she needs? Is there a way to control the mind, or is she just wired this way?",
      resolution: "Her yoga teacher introduces her to simple meditation—just observing her breath without trying to control it. Gradually, she learns to witness her thoughts without getting entangled. Her focus improves dramatically, her anxiety decreases, and so do her exam results. She discovers the mind can be trained.",
      lesson: "The mind can be your greatest friend or your worst enemy. Through meditation and practice, learn to master it."
    },
    summary: "Krishna describes the practice of meditation, the posture, the place, and the method of controlling the mind to achieve self-realization. He explains the qualities of a true yogi.",
    keyTeaching: "Meditation and self-control lead to mastery over the mind and self-realization. The mind must be trained like a muscle.",
    modernContext: "Mental health awareness, mindfulness, digital wellness, focus and concentration",
    bgImage: "/ch6_bg.jpg",
    phase: 'Foundation',
    practicalTakeaway: 'Start with just 2 minutes of focused breathing each morning. The goal is not to empty your mind but to notice when it wanders and gently bring it back — that act of returning is the exercise.',
    reflectionQuestions: [
      'When was the last time you sat in complete silence without reaching for your phone? How did it feel?',
      'Is your mind typically your ally or your obstacle — does it help you focus, or does it pull you into anxiety and distraction?',
      'What would change if you could concentrate fully on one thing at a time instead of constantly multitasking?',
    ],
    tryThis: 'Try a 5-minute "breath observation" meditation right now: sit comfortably, close your eyes, and simply count each exhale from 1 to 10, then start over. When you lose count, gently begin again without judgment.',
    glossaryTerms: [
      { term: 'Dhyana', definition: 'Meditation — sustained, focused attention that leads to deeper awareness and inner stillness.' },
      { term: 'Yoga', definition: 'Union — the practice of connecting mind, body, and spirit; also the state of inner harmony that results.' },
      { term: 'Manas', definition: 'The mind — the faculty of thought and emotion that can be trained to serve you rather than control you.' },
    ],
    readingTimeMinutes: 6,
    shlokas: [
      {
        number: "6.5",
        sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत् |\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः || 6.5||",
        translation: "One must deliver himself with the help of his mind, and not degrade himself. The mind is the friend of the conditioned soul, and his enemy as well."
      },
      {
        number: "6.6",
        sanskrit: "बन्धुरात्मात्मनस्तस्य येनात्मैवात्मना जितः |\nअनात्मनस्तु शत्रुत्वे वर्तेतात्मैव शत्रुवत् || 6.6||",
        translation: "For him who has conquered the mind, the mind is the best of friends; but for one who has failed to do so, his mind will remain the greatest enemy."
      }
    ]
  },
  {
    id: 7,
    badge: "Chapter 07",
    title: "Divine Connections",
    subtitle: "Jnana Vijnana Yoga - The Yoga of Knowledge and Wisdom",
    story: {
      character: "Sneha, a 29-year-old volunteer at an NGO teaching underprivileged children",
      setting: "A rural village school during a community development project",
      plot: "Sneha has been volunteering for three years, but lately, she feels her work is insignificant. She sees large-scale problems—poverty, inequality, educational gaps—and her small acts of teaching a few children feel like drops in an ocean. She's considering quitting to pursue a more 'impactful' corporate career.",
      dilemma: "Is her work really making a difference? Should she quit and find a more impactful career? How does one find true purpose?",
      resolution: "A wise elder explains that every small act is connected to a larger pattern. Her calling isn't something to find—it's something she builds through consistent, devoted action. She realizes that showing up matters, that each child she teaches is a universe unto themselves. She stays, and eventually starts her own educational initiative.",
      lesson: "Every sincere effort is held in the divine pattern. Your calling is built through devoted service, not found. All beings are connected in the web of existence."
    },
    summary: "Krishna reveals His divine manifestations and explains how everything in the universe rests in Him. He describes the two types of knowledge—ordinary and spiritual—and how to recognize the divine in all.",
    keyTeaching: "Everything in the universe is connected to and sustained by the Divine. True knowledge sees this interconnectedness.",
    modernContext: "Finding purpose, meaningful work, volunteerism, career counseling, interconnectedness",
    bgImage: "/ch7_bg.jpg",
    phase: 'Devotion',
    practicalTakeaway: 'Your small, consistent efforts matter more than you think. Instead of waiting for a grand purpose to reveal itself, keep showing up with sincerity — purpose is built through devoted action, not discovered in a flash.',
    reflectionQuestions: [
      'Have you ever dismissed your own contributions as "too small to matter"? What if each one was part of a larger pattern you cannot see yet?',
      'Where in your daily life do you already sense a connection to something larger than yourself?',
      'What would change if you treated your everyday work — however ordinary — as a form of devotion?',
    ],
    tryThis: 'Spend 10 minutes writing about a moment when you felt deeply connected to another person or to nature. What made that moment feel sacred? How can you create more moments like it?',
    glossaryTerms: [
      { term: 'Jnana', definition: 'Knowledge of facts and information — understanding the world through intellect and analysis.' },
      { term: 'Vijnana', definition: 'Realized wisdom — knowledge that has moved from the head to the heart through direct experience.' },
      { term: 'Maya', definition: 'Illusion — the force that makes the temporary appear permanent and the separate appear disconnected.' },
    ],
    readingTimeMinutes: 6,
    shlokas: [
      {
        number: "7.7",
        sanskrit: "मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय |\nमयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव || 7.7||",
        translation: "O conqueror of wealth, there is no truth superior to Me. Everything rests upon Me, as pearls are strung on a thread."
      },
      {
        number: "7.19",
        sanskrit: "बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते |\nवासुदेवः सर्वमिति स महात्मा सुदुर्लभः || 7.19||",
        translation: "After many births and deaths, he who is actually in knowledge surrenders unto Me, knowing Me to be the cause of all causes and all that is. Such a great soul is very rare."
      }
    ]
  },
  {
    id: 8,
    badge: "Chapter 08",
    title: "The Imperishable Lord",
    subtitle: "Akshara Brahma Yoga - The Yoga of the Imperishable Absolute",
    story: {
      character: "Dr. Sameer, a 45-year-old oncologist facing his own mortality",
      setting: "A hospital room after receiving his own diagnosis",
      plot: "Dr. Sameer has spent his career helping patients face death, but now he's the patient. A routine checkup revealed advanced-stage illness. Suddenly, all his medical knowledge feels inadequate. He begins to question what happens after death, what he's truly accomplished, and what will remain of him.",
      dilemma: "How should one face death? What carries forward after this life ends? Is there anything permanent in this transient existence?",
      resolution: "Through studying the Gita's teachings on the imperishable soul, Dr. Sameer finds peace. He realizes that while the body perishes, the soul continues its journey. He spends his remaining time teaching medical students not just clinical skills, but compassion and the deeper dimensions of healing.",
      lesson: "The soul is imperishable and eternal. Death is a transition, not an end. What matters is the consciousness with which we live and leave."
    },
    summary: "Krishna explains the journey of the soul after death, the concept of the imperishable Brahman, and the importance of remembering the Divine at the time of death.",
    keyTeaching: "The Supreme Lord is imperishable and eternal. Remembering the Divine at the time of death leads to liberation.",
    modernContext: "End-of-life care, facing mortality, hospice work, spiritual preparation for death",
    bgImage: "/ch1_bg.jpg",
    phase: 'Devotion',
    practicalTakeaway: 'Live each day as if the quality of your attention matters — because it does. What you consistently think about shapes who you become. Fill your mind with what you value most.',
    reflectionQuestions: [
      'If your life ended today, what would your mind be most occupied with — worries, regrets, gratitude, or something else?',
      'How do you want to be remembered, and are your daily habits aligned with that vision?',
      'Does the idea of impermanence frighten you or motivate you to live more intentionally?',
    ],
    tryThis: 'Before bed tonight, spend 3 minutes reflecting on what occupied your mind today. Then consciously choose one thought — something meaningful to you — to hold in awareness as you fall asleep.',
    glossaryTerms: [
      { term: 'Brahman', definition: 'The imperishable, ultimate reality — the unchanging consciousness that underlies all of existence.' },
      { term: 'Akshara', definition: 'The indestructible — that which does not decay or perish, referring to the eternal nature of the soul and the Supreme.' },
      { term: 'Antakala', definition: 'The time of death — a pivotal moment in which one\'s state of consciousness determines the soul\'s onward journey.' },
    ],
    readingTimeMinutes: 5,
    shlokas: [
      {
        number: "8.5",
        sanskrit: "अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम् |\nयः प्रयाति स मद्भावं याति नास्त्यत्र संशयः || 8.5||",
        translation: "And whoever, at the end of his life, quits his body remembering Me alone at once attains My nature. Of this there is no doubt."
      },
      {
        number: "8.6",
        sanskrit: "यं यं वापि स्मरन्भावं त्यजत्यन्ते कलेवरम् |\nतं तमेवैति कौन्तेय सदा तद्भावभावितः || 8.6||",
        translation: "Whatever state of being one remembers when he quits his body, O son of Kunti, that state he will attain without fail."
      }
    ]
  },
  {
    id: 9,
    badge: "Chapter 09",
    title: "Supreme Knowledge",
    subtitle: "Raja Vidya Raja Guhya Yoga - The Yoga of Royal Knowledge",
    story: {
      character: "Riya, a 26-year-old data scientist searching for deeper meaning",
      setting: "Her apartment after a meditation retreat, contemplating her life path",
      plot: "Riya has achieved everything society told her to want—top education, high-paying job, recognition. Yet she feels empty. At a meditation retreat, she experiences a glimpse of something beyond her achievements. Now she's torn between her successful career and a calling to explore spirituality more deeply.",
      dilemma: "Should she continue on her successful but unfulfilling path, or risk everything to pursue spiritual truth? Can intellect and devotion coexist?",
      resolution: "The Gita's teaching on supreme knowledge shows her that the highest wisdom combines both—using her analytical mind in service of devotion. She doesn't quit her job; she transforms it, bringing mindfulness and compassion into her work while deepening her spiritual practice.",
      lesson: "The highest knowledge is knowing the Divine through devotion. Pure devotion is the most confidential path to the Supreme."
    },
    summary: "Krishna reveals the most confidential knowledge—devotional service. He explains that through pure devotion, one can directly connect with the Divine, and that this path is available to all.",
    keyTeaching: "Pure devotional service is the most confidential path to the Supreme. The Lord protects and provides for His devotees.",
    modernContext: "Spiritual seeking, combining career and spirituality, finding meaning beyond success",
    bgImage: "/ch2_bg.jpg",
    phase: 'Devotion',
    practicalTakeaway: 'You do not have to choose between intellect and devotion, or between career and spirituality. Bring wholehearted sincerity to whatever you do — that itself becomes a spiritual practice.',
    reflectionQuestions: [
      'Have you ever achieved a major goal only to feel unexpectedly empty afterward? What do you think was missing?',
      'Do you believe devotion requires religion, or can it exist as deep commitment to something larger than yourself?',
      'What would it look like to approach your work, relationships, or hobbies with the same reverence as a spiritual practice?',
    ],
    tryThis: 'Choose one routine activity today — cooking, commuting, working — and do it with complete presence and care, as if it were an offering. Notice if the quality of the experience changes.',
    glossaryTerms: [
      { term: 'Bhakti', definition: 'Devotion — loving, wholehearted dedication to something greater than the ego, whether expressed as faith, service, or reverence.' },
      { term: 'Raja Vidya', definition: 'The king of knowledge — the supreme wisdom that Krishna calls the most confidential and direct path to the Divine.' },
      { term: 'Yoga-kshema', definition: 'Security and well-being — the promise that those who act with sincere devotion will be sustained and protected.' },
    ],
    readingTimeMinutes: 6,
    shlokas: [
      {
        number: "9.22",
        sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते |\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् || 9.22||",
        translation: "But those who always worship Me with exclusive devotion, meditating on My transcendental form—to them I carry what they lack, and I preserve what they have."
      },
      {
        number: "9.34",
        sanskrit: "मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु |\nमामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे || 9.34||",
        translation: "Engage your mind always in thinking of Me, become My devotee, offer obeisances to Me, and worship Me. Surely you will come to Me."
      }
    ]
  },
  {
    id: 10,
    badge: "Chapter 10",
    title: "Divine Manifestations",
    subtitle: "Vibhuti Yoga - The Yoga of Divine Glories",
    story: {
      character: "Arun, a 31-year-old photographer documenting India's diversity",
      setting: "Traveling across India, capturing its beauty and contrasts",
      plot: "Arun's project is to photograph the divine in everyday life—the light in a farmer's eyes, the devotion in a temple, the strength of mountains, the wisdom of elders. As he travels, he begins to see beauty everywhere, in everyone. His perspective shifts from seeing separateness to seeing connected divinity.",
      dilemma: "How can one see the divine in everything? Is divinity present even in difficult circumstances and people?",
      resolution: "Through his lens and his practice, Arun learns to recognize the Divine's manifestations everywhere—the brilliance of the sun, the wisdom of the learned, the strength of the powerful, the beauty of nature. His photography becomes a meditation on divine presence.",
      lesson: "The Divine manifests in all that is glorious, beautiful, and powerful. Learning to see this transforms ordinary perception into sacred vision."
    },
    summary: "Krishna describes His divine manifestations throughout the universe—how He is present in all that is glorious, beautiful, and powerful. He reveals His opulences.",
    keyTeaching: "The Divine is present in all that is excellent and glorious in the universe. Everything beautiful reflects the Divine beauty.",
    modernContext: "Seeing beauty in diversity, artistic expression, recognizing excellence, sacred vision",
    bgImage: "/ch3_bg.jpg",
    phase: 'Devotion',
    practicalTakeaway: 'Train yourself to notice excellence and beauty in everyday life — a brilliant sunset, a friend\'s kindness, a moment of flow at work. Recognizing the extraordinary in the ordinary is a daily spiritual practice.',
    reflectionQuestions: [
      'When was the last time something in nature or daily life left you genuinely awestruck?',
      'Do you tend to focus more on what is wrong in the world or what is beautiful? How might shifting that balance change your outlook?',
      'If the divine were present in every person you met today, how would you treat them differently?',
    ],
    tryThis: 'Spend one day as a "sacred photographer" — use your phone to capture 5 moments of beauty or excellence you would normally overlook. At the end of the day, review them and reflect on what they reveal.',
    glossaryTerms: [
      { term: 'Vibhuti', definition: 'Divine glory or manifestation — the presence of the sacred in all that is excellent, powerful, or beautiful in the world.' },
      { term: 'Atma', definition: 'The Self or soul — the conscious, eternal essence seated in the heart of every being.' },
      { term: 'Tejas', definition: 'Splendor or radiance — the divine energy that shines through all remarkable things in creation.' },
    ],
    readingTimeMinutes: 6,
    shlokas: [
      {
        number: "10.20",
        sanskrit: "अहमात्मा गुडाकेश सर्वभूताशयस्थितः |\nअहमादिश्च मध्यं च भूतानामन्त एव च || 10.20||",
        translation: "I am the Self, O Gudakesha, seated in the hearts of all creatures. I am the beginning, the middle, and the end of all beings."
      },
      {
        number: "10.41",
        sanskrit: "यद्यद्विभूतिमत्सत्त्वं श्रीमदूर्जितमेव वा |\nतत्तदेवावगच्छ त्वं मम तेजोंऽशसंभवम् || 10.41||",
        translation: "Know that all opulent, beautiful and glorious creations spring from but a spark of My splendor."
      }
    ]
  },
  {
    id: 11,
    badge: "Chapter 11",
    title: "The Universal Form",
    subtitle: "Vishvarupa Darshana Yoga - The Yoga of the Cosmic Form",
    story: {
      character: "Meera, a 38-year-old astrophysicist studying the cosmos",
      setting: "An observatory in the Himalayas, looking at deep space images",
      plot: "Meera has spent her career studying the vastness of the universe—billions of galaxies, infinite space, cosmic time scales. The more she learns, the more humbled she feels. One night, looking at images from the deepest space telescope, she has an experience of cosmic consciousness—the universe as one interconnected whole.",
      dilemma: "How can the human mind comprehend the infinite? What is our place in this vast cosmos?",
      resolution: "Her scientific understanding merges with spiritual insight. She realizes that the universe is not just matter and energy but conscious, aware, alive. Her research takes on new dimensions as she explores the intersection of science and spirituality.",
      lesson: "The Divine is infinite and all-pervading. The cosmic form reveals that all of creation is one interconnected whole, held in divine consciousness."
    },
    summary: "Krishna reveals His cosmic universal form to Arjuna, showing His infinite, all-pervading nature that transcends all limitations. Arjuna is awestruck by this vision.",
    keyTeaching: "The Divine transcends all limitations and pervades the entire cosmos. The universal form reveals the infinite nature of the Supreme.",
    modernContext: "Cosmic consciousness, science and spirituality, understanding infinity, awe and wonder",
    bgImage: "/ch4_bg.jpg",
    phase: 'Devotion',
    practicalTakeaway: 'When you feel overwhelmed by the scale of life\'s challenges, zoom out. Look at the night sky, watch a time-lapse of nature, or read about the cosmos — perspective on infinity can dissolve anxiety about your small problems.',
    reflectionQuestions: [
      'Have you ever had an experience where the sheer scale of the universe or nature made your personal worries feel insignificant?',
      'If time destroys everything eventually, what gives your actions meaning right now?',
      'How comfortable are you with not being able to understand or control everything in your life?',
    ],
    tryThis: 'On a clear night, spend 10 minutes stargazing without your phone. Let the vastness sink in. Afterward, journal about what shifted in your perspective about your current worries.',
    glossaryTerms: [
      { term: 'Vishvarupa', definition: 'The cosmic or universal form — a vision of the divine as the totality of all existence, containing all beings and all of time.' },
      { term: 'Kala', definition: 'Time — the unstoppable force of creation and destruction that governs all material existence.' },
      { term: 'Darshana', definition: 'Sacred seeing or vision — the experience of beholding the divine, whether through meditation, nature, or spiritual practice.' },
    ],
    readingTimeMinutes: 6,
    shlokas: [
      {
        number: "11.32",
        sanskrit: "श्रीभगवानुवाच |\nकालोऽस्मि लोकक्षयकृत्प्रवृद्धो\nलोकान्समाहर्तुमिह प्रवृत्तः |\nऋतेऽपि त्वां न भविष्यन्ति सर्वे\nयेऽवस्थिताः प्रत्यनीकेषु योधाः || 11.32||",
        translation: "The Supreme Lord said: Time I am, the great destroyer of the worlds, and I have come here to destroy all people. With the exception of you, all the soldiers here on both sides will be slain."
      },
      {
        number: "11.55",
        sanskrit: "मत्कर्मकृन्मत्परमो मद्भक्तः सङ्गवर्जितः |\nनिर्वैरः सर्वभूतेषु यः स मामेति पाण्डव || 11.55||",
        translation: "My dear Arjuna, he who engages in My pure devotional service, free from the contaminations of fruitive activities and mental speculation, he who works for Me, who makes Me the supreme goal of his life, and who is friendly to every living being—he certainly comes to Me."
      }
    ]
  },
  {
    id: 12,
    badge: "Chapter 12",
    title: "The Path of Devotion",
    subtitle: "Bhakti Yoga - The Yoga of Devotion",
    story: {
      character: "Kavita, a 42-year-old classical dancer facing career challenges",
      setting: "Her dance studio, contemplating giving up after a major injury",
      plot: "Kavita has devoted her life to classical dance. After a serious injury, doctors say she may never perform again. Her identity, her livelihood, her passion—all seem lost. In her grief, she discovers that her love for dance was always about something deeper than performance—it was about connection to the divine through art.",
      dilemma: "How does one continue when the external form of devotion is taken away? Can devotion exist without the ability to express it?",
      resolution: "Kavita discovers that true devotion transcends external forms. She begins teaching, choreographing, and writing about dance. Her devotion transforms from performance to presence, from doing to being. She finds that love for the divine can express itself in infinite ways.",
      lesson: "Pure devotion is the highest path. It transcends all external forms and expresses itself through love, service, and surrender."
    },
    summary: "Krishna explains the path of devotion—how to cultivate pure love for the Divine and the qualities of a true devotee. He compares different types of spiritual practitioners.",
    keyTeaching: "Pure devotional service is the highest spiritual path. The devotee who loves the Supreme with pure heart attains the highest perfection.",
    modernContext: "Devotional arts, finding new expressions, love beyond form, spiritual practice through creativity",
    bgImage: "/ch5_bg.jpg",
    phase: 'Devotion',
    practicalTakeaway: 'Devotion is not about grand gestures — it is about showing up with love in whatever you do. Whether cooking, working, or listening to a friend, bring your full heart to the moment.',
    reflectionQuestions: [
      'What activity in your life feels closest to a devotional practice, even if it is not religious?',
      'Have you ever lost the ability to do something you loved? How did you find new ways to express that passion?',
      'What does it mean to you to love something or someone without attachment to a specific outcome?',
    ],
    tryThis: 'Choose one routine task today — washing dishes, commuting, eating lunch — and do it with complete presence and gratitude, as if it were an offering. Notice how the experience changes.',
    glossaryTerms: [
      { term: 'Bhakti', definition: 'Devotion or pure love — the path of connecting with the divine through heartfelt love, service, and surrender rather than intellect alone.' },
      { term: 'Nirmama', definition: 'Freedom from possessiveness — the quality of acting without claiming ownership over people, outcomes, or achievements.' },
      { term: 'Kshami', definition: 'Forgiveness or patience — the ability to remain calm and compassionate even when wronged or challenged.' },
    ],
    readingTimeMinutes: 5,
    shlokas: [
      {
        number: "12.13",
        sanskrit: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च |\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी || 12.13||",
        translation: "One who is not envious but is a kind friend to all living entities, who does not think himself a proprietor, who is free from false ego and equal in happiness and distress, who is tolerant..."
      },
      {
        number: "12.20",
        sanskrit: "ये तु धर्म्यामृतमिदं यथोक्तं पर्युपासते |\nश्रद्दधाना मत्परमा भक्तास्तेऽतीव मे प्रियाः || 12.20||",
        translation: "Those who follow this imperishable path of devotional service and who completely engage themselves with faith, making Me the supreme goal, are very, very dear to Me."
      }
    ]
  },
  {
    id: 13,
    badge: "Chapter 13",
    title: "The Field and the Knower",
    subtitle: "Kshetra Kshetrajna Yoga - The Yoga of the Field and Knower",
    story: {
      character: "Prof. Iyer, a 55-year-old neuroscientist studying consciousness",
      setting: "His research lab, examining the relationship between brain and mind",
      plot: "Prof. Iyer's life's work has been understanding consciousness—how the physical brain produces subjective experience. His research leads him to the ancient question: what is the relationship between the body (the field) and consciousness (the knower)? Modern science struggles with this; ancient wisdom offers insights.",
      dilemma: "Is consciousness merely a product of the brain, or is it something more? What is the relationship between matter and awareness?",
      resolution: "Studying the Gita's distinction between the field (body/matter) and the knower (soul/consciousness), Prof. Iyer develops a new research framework. His work bridges neuroscience and spirituality, showing how ancient wisdom and modern science can illuminate each other.",
      lesson: "The body is the field of activities; the soul is the knower of the field. Understanding this distinction is essential for self-knowledge."
    },
    summary: "Krishna distinguishes between the field (the body) and the knower of the field (the soul), explaining the difference between matter and consciousness, and the path to true knowledge.",
    keyTeaching: "True knowledge is understanding the distinction between the material body and the spiritual soul. The soul is the conscious observer within the material field.",
    modernContext: "Consciousness studies, neuroscience and spirituality, philosophy of mind, self-knowledge",
    bgImage: "/ch6_bg.jpg",
    phase: 'Integration',
    practicalTakeaway: 'You are not your body, your job title, or your emotions — you are the awareness behind all of them. Practicing this distinction even briefly each day reduces stress and increases clarity.',
    reflectionQuestions: [
      'When you say "I am angry" or "I am tired," who is the "I" that is aware of being angry or tired?',
      'How much of your identity is tied to your body, job, or social role? What would remain if those were stripped away?',
      'Can you observe your own thoughts without getting caught up in them? What happens when you try?',
    ],
    tryThis: 'Sit quietly for 5 minutes and practice being the observer. Watch your thoughts arise without following them — label each one "thinking" and return to stillness. Notice the gap between you and your thoughts.',
    glossaryTerms: [
      { term: 'Kshetra', definition: 'The field — the body, mind, and senses through which we experience the material world.' },
      { term: 'Kshetrajna', definition: 'The knower of the field — the conscious soul or awareness that observes and experiences through the body.' },
      { term: 'Prakriti', definition: 'Material nature — the physical, mental, and energetic substance from which the body and world are made.' },
    ],
    readingTimeMinutes: 6,
    shlokas: [
      {
        number: "13.27",
        sanskrit: "यावत्सञ्जायते किञ्चित्सत्त्वं स्थावरजङ्गमम् |\nक्षेत्रक्षेत्रज्ञसंयोगात्तद्विद्धि भरतर्षभ || 13.27||",
        translation: "O chief of the Bharatas, know that whatever you see in existence, both the moving and the nonmoving, is only a combination of the field of activities and the knower of the field."
      },
      {
        number: "13.28",
        sanskrit: "समं पश्यन्हि सर्वत्र समवस्थितमीश्वरम् |\nन हिनस्त्यात्मनात्मानं ततो याति परां गतिम् || 13.28||",
        translation: "One who sees the Supersoul equally present everywhere, in every living being, does not degrade himself by his mind. Thus he approaches the transcendental destination."
      }
    ]
  },
  {
    id: 14,
    badge: "Chapter 14",
    title: "The Three Qualities",
    subtitle: "Gunatraya Vibhaga Yoga - The Yoga of the Three Modes",
    story: {
      character: "Nisha, a 33-year-old therapist helping clients with behavioral patterns",
      setting: "Her therapy practice, observing how different personalities respond to situations",
      plot: "Nisha notices patterns in her clients—some are naturally calm and peaceful, some are driven and passionate, others are stuck and lethargic. She begins to see these as fundamental qualities that influence behavior, choices, and life outcomes. Her therapeutic approach evolves as she understands these modes.",
      dilemma: "How do we work with our inherent tendencies? Can we transcend our natural modes, or are we bound by them?",
      resolution: "Learning about the three modes—goodness (sattva), passion (rajas), and ignorance (tamas)—Nisha develops a holistic therapeutic approach. She helps clients understand their dominant mode and work toward the mode of goodness, ultimately transcending all modes through spiritual practice.",
      lesson: "The three modes of nature—goodness, passion, and ignorance—influence all behavior. Understanding and transcending them leads to true freedom."
    },
    summary: "Krishna explains the three modes of material nature—goodness (sattva), passion (rajas), and ignorance (tamas)—and how they influence human behavior, perception, and spiritual progress.",
    keyTeaching: "The three modes of material nature govern all material activities. Transcending these modes through devotional service leads to liberation.",
    modernContext: "Personality psychology, behavioral patterns, self-improvement, understanding human nature",
    bgImage: "/ch7_bg.jpg",
    phase: 'Integration',
    practicalTakeaway: 'Notice your energy throughout the day. When you feel lazy and foggy, that is tamas; when restless and competitive, that is rajas; when calm and clear, that is sattva. Name the mode and consciously choose activities that move you toward clarity.',
    reflectionQuestions: [
      'Which of the three modes — calm clarity, restless ambition, or dull inertia — dominates your typical day?',
      'When you make poor decisions, can you trace them back to a particular mental state or mood?',
      'What specific habits or routines help you shift from a scattered or lethargic state into a clear, focused one?',
    ],
    tryThis: 'Track your dominant mode at three points today — morning, afternoon, and evening. Write down what you were doing and how you felt. After a week, look for patterns and identify your triggers for each mode.',
    glossaryTerms: [
      { term: 'Sattva', definition: 'The mode of goodness — a state of clarity, calm, wisdom, and balance that supports spiritual growth.' },
      { term: 'Rajas', definition: 'The mode of passion — a state of restless activity, desire, ambition, and attachment to results.' },
      { term: 'Tamas', definition: 'The mode of ignorance — a state of inertia, dullness, confusion, and negligence.' },
    ],
    readingTimeMinutes: 6,
    shlokas: [
      {
        number: "14.26",
        sanskrit: "मां च योऽव्यभिचारेण भक्तियोगेन सेवते |\nस गुणान्समतीत्यैतान्ब्रह्मभूयाय कल्पते || 14.26||",
        translation: "One who engages in full devotional service, unfailing in all circumstances, at once transcends the modes of material nature and thus comes to the level of Brahman."
      },
      {
        number: "14.27",
        sanskrit: "ब्रह्मणो हि प्रतिष्ठाहममृतस्याव्ययस्य च |\nशाश्वतस्य च धर्मस्य सुखस्यैकान्तिकस्य च || 14.27||",
        translation: "And I am the basis of the impersonal Brahman, which is immortal, imperishable, and eternal and is the constitutional position of ultimate happiness."
      }
    ]
  },
  {
    id: 15,
    badge: "Chapter 15",
    title: "The Supreme Being",
    subtitle: "Purushottama Yoga - The Yoga of the Supreme Person",
    story: {
      character: "Rajesh, a 48-year-old entrepreneur reflecting on his life's journey",
      setting: "His garden, watching his grandchildren play, contemplating legacy",
      plot: "Rajesh has built a successful business empire. Now, watching his grandchildren, he thinks about what he's really leaving behind. The material achievements feel hollow. He begins to understand that his true legacy is not his wealth but the values he's passed on, the lives he's touched, the love he's shared.",
      dilemma: "What is the true measure of a life well-lived? What remains when everything else falls away?",
      resolution: "Through the Gita's teaching on the Supreme Person, Rajesh realizes that he is an eternal soul, part of the divine whole. He begins using his resources for charitable causes, focusing on education and healthcare. His life finds new meaning in service.",
      lesson: "The Supreme Lord is the source of all. We are eternal parts of the divine whole. Our true purpose is to reconnect with our source."
    },
    summary: "Krishna uses the metaphor of a banyan tree to explain the material world's entanglement and reveals Himself as the Supreme Person beyond all—the source of everything.",
    keyTeaching: "The Supreme Lord is the source of all beings and the ultimate destination of all spiritual paths. He is beyond both the perishable and imperishable.",
    modernContext: "Legacy and purpose, philanthropy, finding meaning in later life, spiritual maturity",
    bgImage: "/ch1_bg.jpg",
    phase: 'Integration',
    practicalTakeaway: 'Ask yourself: "What will matter about my life in 50 years?" Let the answer guide how you spend your time and energy today. Purpose comes from serving something larger than yourself.',
    reflectionQuestions: [
      'If you could only be remembered for one thing, what would you want it to be?',
      'Are you spending most of your energy on things that are perishable (money, status) or imperishable (relationships, values, growth)?',
      'What does it mean to you to be "a part of something greater"? How does that show up in your daily life?',
    ],
    tryThis: 'Write a letter from your 80-year-old self to your current self. What advice would future-you give about what truly matters? Keep it and revisit it in six months.',
    glossaryTerms: [
      { term: 'Purushottama', definition: 'The Supreme Person — the divine source beyond both the perishable material world and the imperishable soul.' },
      { term: 'Ashvattha', definition: 'The sacred banyan tree — a metaphor for the material world with roots above and branches below, representing entanglement in worldly life.' },
      { term: 'Amsha', definition: 'A fragment or part — the teaching that every living being is an eternal spark of the divine whole.' },
    ],
    readingTimeMinutes: 6,
    shlokas: [
      {
        number: "15.7",
        sanskrit: "ममैवांशो जीवलोके जीवभूतः सनातनः |\nमनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति || 15.7||",
        translation: "The living entities in this conditioned world are My eternal fragmental parts. Due to the conditioned life, they are struggling very hard with the six senses, which include the mind."
      },
      {
        number: "15.15",
        sanskrit: "सर्वस्य चाहं हृदि सन्निविष्टो\nमत्तः स्मृतिर्ज्ञानमपोहनं च |\nवेदैश्च सर्वैरहमेव वेद्यो\nवेदान्तकृद्वेदविदेव चाहम् || 15.15||",
        translation: "I am seated in everyone's heart, and from Me come remembrance, knowledge and forgetfulness. By all the Vedas, I am to be known; indeed, I am the compiler of Vedanta, and I am the knower of the Vedas."
      }
    ]
  },
  {
    id: 16,
    badge: "Chapter 16",
    title: "Divine and Demoniac",
    subtitle: "Daivasura Sampad Vibhaga Yoga - The Yoga of Divine and Demoniac Qualities",
    story: {
      character: "Inspector Vikrant, a 40-year-old police officer fighting corruption",
      setting: "A police station, investigating a high-profile corruption case involving powerful people",
      plot: "Vikrant is investigating corruption that reaches the highest levels. He faces pressure, threats, and temptation to drop the case. He sees clearly the two types of people—those who act with integrity despite difficulty, and those who abuse power for personal gain. The case becomes a meditation on human nature itself.",
      dilemma: "How does one maintain integrity in a corrupt system? What makes some people choose righteousness while others choose self-interest?",
      resolution: "Understanding the divine and demoniac qualities helps Vikrant navigate his challenges. He recognizes that his duty is to act with integrity regardless of others' choices. His courage inspires others, and together they bring the corrupt to justice.",
      lesson: "Divine qualities lead to liberation; demoniac qualities lead to bondage. The choice is always ours, moment by moment."
    },
    summary: "Krishna describes the divine and demoniac qualities that exist in human beings, helping us recognize and cultivate the divine nature within while avoiding the demoniac tendencies.",
    keyTeaching: "Divine qualities lead to liberation; demoniac qualities lead to bondage. We must cultivate the divine nature within us.",
    modernContext: "Ethics in challenging environments, moral courage, integrity under pressure, character development",
    bgImage: "/ch2_bg.jpg",
    phase: 'Integration',
    practicalTakeaway: 'Guard against the three inner enemies: lust (impulsive craving), anger (reactive hostility), and greed (never-enough thinking). When you feel any of them rising, pause for three breaths before acting.',
    reflectionQuestions: [
      'Which of the three gates — lust, anger, or greed — do you find yourself most susceptible to in daily life?',
      'Think of someone you admire for their integrity. What specific qualities do they embody that you would like to develop?',
      'When you face pressure to compromise your values, what internal or external support helps you stay on course?',
    ],
    tryThis: 'For one week, keep an "integrity journal." Each evening, write down one moment where you chose the right thing despite temptation or pressure, and one moment where you wish you had acted differently. Look for patterns.',
    glossaryTerms: [
      { term: 'Daivi Sampat', definition: 'Divine qualities — virtues like fearlessness, truthfulness, non-violence, and self-control that lead to spiritual freedom.' },
      { term: 'Asuri Sampat', definition: 'Demoniac qualities — tendencies like arrogance, cruelty, anger, and deceit that lead to suffering and bondage.' },
      { term: 'Kama', definition: 'Lust or uncontrolled desire — one of the three destructive gates that degrades character when left unchecked.' },
    ],
    readingTimeMinutes: 6,
    shlokas: [
      {
        number: "16.21",
        sanskrit: "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः |\nकामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत् || 16.21||",
        translation: "There are three gates leading to this hell—lust, anger, and greed. Every sane man should give these up, for they lead to the degradation of the soul."
      },
      {
        number: "16.23",
        sanskrit: "यः शास्त्रविधिमुत्सृज्य वर्तते कामकारतः |\nन स सिद्धिमवाप्नोति न सुखं न परां गतिम् || 16.23||",
        translation: "But he who discards scriptural injunctions and acts according to his own whims attains neither perfection, nor happiness, nor the supreme destination."
      }
    ]
  },
  {
    id: 17,
    badge: "Chapter 17",
    title: "The Threefold Faith",
    subtitle: "Shraddhatraya Vibhaga Yoga - The Yoga of the Threefold Faith",
    story: {
      character: "Anjali, a 36-year-old nutritionist exploring food and spirituality",
      setting: "Her wellness center, counseling clients on holistic health",
      plot: "Anjali notices how people's relationship with food reflects their inner state. Some eat mindfully, some eat compulsively, some eat without awareness. She begins to see food as not just nutrition but as a spiritual practice—how we eat reflects how we live.",
      dilemma: "How do our inner qualities manifest in our daily habits? Can simple acts like eating become spiritual practice?",
      resolution: "Learning about the threefold faith, Anjali develops a holistic approach to wellness that includes not just what we eat, but how, when, and why. She helps clients transform eating from compulsion to consciousness, from consumption to communion.",
      lesson: "Faith manifests in our daily activities—food, charity, austerity. The quality of our faith determines the quality of our actions."
    },
    summary: "Krishna explains how faith is influenced by the three modes of nature and discusses different types of food, sacrifice, charity, and austerity according to these modes.",
    keyTeaching: "Faith is influenced by the modes of nature. Sattvic faith leads to spiritual progress; rajasic and tamasic faith bind one to material existence.",
    modernContext: "Mindful eating, holistic wellness, daily spiritual practice, conscious living",
    bgImage: "/ch3_bg.jpg",
    phase: 'Integration',
    practicalTakeaway: 'Your daily habits reveal your inner state. Pay attention to what you eat, how you spend money, and how you treat your body — these small choices shape your character more than any grand intention.',
    reflectionQuestions: [
      'How would you describe your relationship with food — do you eat mindfully, compulsively, or out of habit?',
      'When you give to others (time, money, attention), is it done with joy, with expectation of return, or with reluctance?',
      'What is one daily habit you have that you know does not serve your higher self? What would replacing it look like?',
    ],
    tryThis: 'Eat one meal today in complete silence, without screens or distractions. Chew slowly, taste every flavor, and notice how your body feels. Afterward, write a few lines about what you noticed.',
    glossaryTerms: [
      { term: 'Shraddha', definition: 'Faith or conviction — the deep inner orientation that shapes your worldview and determines the quality of your actions.' },
      { term: 'Tapas', definition: 'Austerity or discipline — voluntary self-restraint of body, speech, and mind undertaken for spiritual growth.' },
      { term: 'Sattvic', definition: 'Of the nature of goodness — describing food, actions, or faith that promote clarity, health, and spiritual well-being.' },
    ],
    readingTimeMinutes: 6,
    shlokas: [
      {
        number: "17.3",
        sanskrit: "सत्त्वानुरूपा सर्वस्य श्रद्धा भवति भारत |\nश्रद्धामयोऽयं पुरुषो यो यच्छ्रद्धः स एव सः || 17.3||",
        translation: "O son of Bharata, according to one's existence under the various modes of nature, one evolves a particular kind of faith. The living being is said to be of a particular faith according to the modes he has acquired."
      },
      {
        number: "17.28",
        sanskrit: "अश्रद्धया हुतं दत्तं तपस्तप्तं कृतं च यत् |\nअसदित्युच्यते पार्थ न च तत्प्रेत्य नो इह || 17.28||",
        translation: "Anything done as sacrifice, charity or penance without faith in the Supreme, O son of Pritha, is impermanent. It is called asat and is useless both in this life and the next."
      }
    ]
  },
  {
    id: 18,
    badge: "Chapter 18",
    title: "Liberation and Renunciation",
    subtitle: "Moksha Sannyasa Yoga - The Yoga of Liberation",
    story: {
      character: "Arjun (named after the Gita's hero), a 50-year-old preparing for retirement",
      setting: "His home, reflecting on his career and preparing for the next chapter of life",
      plot: "Arjun has had a successful career, raised a family, contributed to society. Now facing retirement, he contemplates what comes next. The Gita has been his companion throughout life; now its final teachings on liberation take on new meaning. He realizes retirement is not an end but a beginning.",
      dilemma: "How does one approach the final stages of life? What is true liberation? How does one surrender completely?",
      resolution: "The final teaching of the Gita—that complete surrender to the Divine leads to liberation—becomes Arjun's guiding light. He dedicates his retirement to spiritual practice and service, finding that true freedom comes from letting go of all attachments, even to identity and achievement.",
      lesson: "Complete surrender to the Divine leads to liberation. True renunciation is giving up the sense of doership and offering everything to the Supreme."
    },
    summary: "The final chapter summarizes all the teachings. Krishna explains renunciation, the different types of knowledge, action, doer, and intelligence, concluding with the path of complete surrender.",
    keyTeaching: "Complete surrender to the Supreme Lord leads to liberation. This is the essence of all spiritual teachings.",
    modernContext: "Retirement and purpose, life transitions, complete surrender, ultimate liberation",
    bgImage: "/ch4_bg.jpg",
    phase: 'Integration',
    practicalTakeaway: 'Do your best, then let go of the outcome. True freedom comes not from controlling results but from giving your full effort and surrendering the rest — in exams, relationships, and career decisions alike.',
    reflectionQuestions: [
      'What are you holding onto so tightly that it is actually causing you suffering? What would it feel like to let it go?',
      'What does "surrender" mean to you — is it weakness, or could it be the ultimate act of courage and trust?',
      'If you knew you were fully supported by something greater than yourself, how would you live differently starting tomorrow?',
    ],
    tryThis: 'Write down three things you are currently anxious about. For each one, write what is in your control and what is not. Consciously release the parts you cannot control by saying "I have done my part; the rest is not mine to carry."',
    glossaryTerms: [
      { term: 'Moksha', definition: 'Liberation — freedom from the cycle of suffering and attachment; the ultimate goal of spiritual life.' },
      { term: 'Sannyasa', definition: 'Renunciation — not abandoning the world, but giving up attachment to the fruits of action and the sense of being the doer.' },
      { term: 'Sharanagati', definition: 'Complete surrender — the act of offering oneself wholly to the divine, trusting in a wisdom greater than one\'s own.' },
    ],
    readingTimeMinutes: 7,
    shlokas: [
      {
        number: "18.66",
        sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज |\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः || 18.66||",
        translation: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear."
      },
      {
        number: "18.78",
        sanskrit: "यत्र योगेश्वरः कृष्णो यत्र पार्धो धनुर्धरः |\nतत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम || 18.78||",
        translation: "Wherever there is Krishna, the master of all mystics, and wherever there is Arjuna, the supreme archer, there will also certainly be opulence, victory, extraordinary power, and morality. That is my opinion."
      }
    ]
  }
];

export default chapters;
