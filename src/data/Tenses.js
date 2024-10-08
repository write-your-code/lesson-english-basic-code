const tensesArray = [
  {
    question: "I need to wake up early tomorrow.",
    options: {
      a: "I woke up early tomorrow.",
      b: "I am waking up early tomorrow.",
      c: "I need to wake up early tomorrow.", // Correct answer
      d: "I have woken up early tomorrow.",
    },
    answer: "c",
    explanation:
      "This sentence uses the present tense 'need' to express a future action, implying an obligation to wake up early in the future (tomorrow).",
  },
  {
    question: "The movie was better than the book.",
    options: {
      a: "The movie was better than the book.", // Correct answer
      b: "The movie is better than the book.",
      c: "The movie will be better than the book.",
      d: "The movie had been better than the book.",
    },
    answer: "a",
    explanation:
      "This sentence uses the simple past tense 'was' to compare the movie and the book, indicating that this comparison took place in the past.",
  },
  {
    question: "I will call you when I arrive.",
    options: {
      a: "I call you when I arrive.",
      b: "I will call you when I arrive.", // Correct answer
      c: "I had called you when I arrived.",
      d: "I am calling you when I arrive.",
    },
    answer: "b",
    explanation:
      "This sentence uses the future tense 'will call' to describe an action that will happen in the future when the person arrives.",
  },
  {
    question: "I enjoy watching the sunset.",
    options: {
      a: "I enjoyed watching the sunset.",
      b: "I am watching the sunset.",
      c: "I enjoy watching the sunset.", // Correct answer
      d: "I have enjoyed watching the sunset.",
    },
    answer: "c",
    explanation:
      "This sentence uses the present tense 'enjoy' to express a current habit or preference of watching the sunset.",
  },
  {
    question: "I lost my wallet at the mall.",
    options: {
      a: "I am losing my wallet at the mall.",
      b: "I lost my wallet at the mall.", // Correct answer
      c: "I have lost my wallet at the mall.",
      d: "I lose my wallet at the mall.",
    },
    answer: "b",
    explanation:
      "The sentence uses the simple past tense 'lost' to describe an event that happened at a specific time in the past.",
  },
  {
    question: "Can you recommend a good restaurant nearby?",
    options: {
      a: "Can you recommended a good restaurant nearby?",
      b: "Can you recommends a good restaurant nearby?",
      c: "Can you recommend a good restaurant nearby?", // Correct answer
      d: "Can you recommending a good restaurant nearby?",
    },
    answer: "c",
    explanation:
      "The sentence uses the base form of the verb 'recommend' after the modal verb 'can' to ask for a suggestion.",
  },
  {
    question: "I will finish this project by tomorrow.",
    options: {
      a: "I finished this project by tomorrow.",
      b: "I am finishing this project by tomorrow.",
      c: "I will finish this project by tomorrow.", // Correct answer
      d: "I had finished this project by tomorrow.",
    },
    answer: "c",
    explanation:
      "This sentence uses the future tense 'will finish' to describe an action that will be completed by a specific time in the future (tomorrow).",
  },
  {
    question: "I forgot to send the email.",
    options: {
      a: "I have forgotten to send the email.",
      b: "I forgot to send the email.", // Correct answer
      c: "I am forgetting to send the email.",
      d: "I will forget to send the email.",
    },
    answer: "b",
    explanation:
      "The sentence uses the simple past tense 'forgot' to describe something that happened in the past, indicating that the email wasn't sent.",
  },
  {
    question: "The sunset was beautiful yesterday.",
    options: {
      a: "The sunset will be beautiful yesterday.",
      b: "The sunset is beautiful yesterday.",
      c: "The sunset was beautiful yesterday.", // Correct answer
      d: "The sunset had been beautiful yesterday.",
    },
    answer: "c",
    explanation:
      "The sentence uses the past tense 'was' to describe the beauty of the sunset on a specific day in the past (yesterday).",
  },
  {
    question: "I need to book a flight.",
    options: {
      a: "I need to book a flight.", // Correct answer
      b: "I needed to book a flight.",
      c: "I have to book a flight.",
      d: "I will be booking a flight.",
    },
    answer: "a",
    explanation:
      "This sentence uses the present tense 'need' to express an immediate necessity to book a flight.",
  },

  {
    question: "I need to wake up early tomorrow.",
    options: {
      a: "I woke up early tomorrow.",
      b: "I am waking up early tomorrow.",
      c: "I need to wake up early tomorrow.", // Correct answer
      d: "I have woken up early tomorrow.",
    },
    answer: "c",
    explanation:
      "This sentence uses the present tense 'need' to express a future action, implying an obligation to wake up early in the future (tomorrow).",
  },
  {
    question: "The movie was better than the book.",
    options: {
      a: "The movie was better than the book.", // Correct answer
      b: "The movie is better than the book.",
      c: "The movie will be better than the book.",
      d: "The movie had been better than the book.",
    },
    answer: "a",
    explanation:
      "This sentence uses the simple past tense 'was' to compare the movie and the book, indicating that this comparison took place in the past.",
  },
  {
    question: "I will call you when I arrive.",
    options: {
      a: "I call you when I arrive.",
      b: "I will call you when I arrive.", // Correct answer
      c: "I had called you when I arrived.",
      d: "I am calling you when I arrive.",
    },
    answer: "b",
    explanation:
      "This sentence uses the future tense 'will call' to describe an action that will happen in the future when the person arrives.",
  },
  {
    question: "I enjoy watching the sunset.",
    options: {
      a: "I enjoyed watching the sunset.",
      b: "I am watching the sunset.",
      c: "I enjoy watching the sunset.", // Correct answer
      d: "I have enjoyed watching the sunset.",
    },
    answer: "c",
    explanation:
      "This sentence uses the present tense 'enjoy' to express a current habit or preference of watching the sunset.",
  },
  {
    question: "I lost my wallet at the mall.",
    options: {
      a: "I am losing my wallet at the mall.",
      b: "I lost my wallet at the mall.", // Correct answer
      c: "I have lost my wallet at the mall.",
      d: "I lose my wallet at the mall.",
    },
    answer: "b",
    explanation:
      "The sentence uses the simple past tense 'lost' to describe an event that happened at a specific time in the past.",
  },
  {
    question: "Can you recommend a good restaurant nearby?",
    options: {
      a: "Can you recommended a good restaurant nearby?",
      b: "Can you recommends a good restaurant nearby?",
      c: "Can you recommend a good restaurant nearby?", // Correct answer
      d: "Can you recommending a good restaurant nearby?",
    },
    answer: "c",
    explanation:
      "The sentence uses the base form of the verb 'recommend' after the modal verb 'can' to ask for a suggestion.",
  },
  {
    question: "I will finish this project by tomorrow.",
    options: {
      a: "I finished this project by tomorrow.",
      b: "I am finishing this project by tomorrow.",
      c: "I will finish this project by tomorrow.", // Correct answer
      d: "I had finished this project by tomorrow.",
    },
    answer: "c",
    explanation:
      "This sentence uses the future tense 'will finish' to describe an action that will be completed by a specific time in the future (tomorrow).",
  },
  {
    question: "I forgot to send the email.",
    options: {
      a: "I have forgotten to send the email.",
      b: "I forgot to send the email.", // Correct answer
      c: "I am forgetting to send the email.",
      d: "I will forget to send the email.",
    },
    answer: "b",
    explanation:
      "The sentence uses the simple past tense 'forgot' to describe something that happened in the past, indicating that the email wasn't sent.",
  },
  {
    question: "The sunset was beautiful yesterday.",
    options: {
      a: "The sunset will be beautiful yesterday.",
      b: "The sunset is beautiful yesterday.",
      c: "The sunset was beautiful yesterday.", // Correct answer
      d: "The sunset had been beautiful yesterday.",
    },
    answer: "c",
    explanation:
      "The sentence uses the past tense 'was' to describe the beauty of the sunset on a specific day in the past (yesterday).",
  },
  {
    question: "I need to book a flight.",
    options: {
      a: "I need to book a flight.", // Correct answer
      b: "I needed to book a flight.",
      c: "I have to book a flight.",
      d: "I will be booking a flight.",
    },
    answer: "a",
    explanation:
      "This sentence uses the present tense 'need' to express an immediate necessity to book a flight.",
  },
    {
      question: "He will have been working here for ten years by next month.",
      options: {
        a: "He will have worked here for ten years by next month.",
        b: "He will have been working here for ten years by next month.", // Correct answer
        c: "He had been working here for ten years by next month.",
        d: "He has worked here for ten years by next month."
      },
      answer: "b",
      explanation: "The future perfect continuous tense 'will have been working' is used to describe an action that will be ongoing and completed at a specific time in the future."
    },
    {
      question: "They have been playing soccer for two hours.",
      options: {
        a: "They have been playing soccer for two hours.", // Correct answer
        b: "They are playing soccer for two hours.",
        c: "They had played soccer for two hours.",
        d: "They will play soccer for two hours."
      },
      answer: "a",
      explanation: "The present perfect continuous tense 'have been playing' describes an action that started in the past and is still ongoing."
    },
    {
      question: "She had already left when I arrived.",
      options: {
        a: "She had already left when I arrived.", // Correct answer
        b: "She has already left when I arrived.",
        c: "She was leaving when I arrived.",
        d: "She will have left when I arrived."
      },
      answer: "a",
      explanation: "The past perfect tense 'had left' indicates that one action (leaving) was completed before another action (arriving)."
    },
    {
      question: "I will be cooking dinner at 7 PM.",
      options: {
        a: "I was cooking dinner at 7 PM.",
        b: "I will be cooking dinner at 7 PM.", // Correct answer
        c: "I had been cooking dinner at 7 PM.",
        d: "I will have cooked dinner at 7 PM."
      },
      answer: "b",
      explanation: "The future continuous tense 'will be cooking' is used to describe an action that will be happening at a specific time in the future."
    },
    {
      question: "We were playing chess when the power went out.",
      options: {
        a: "We were playing chess when the power went out.", // Correct answer
        b: "We are playing chess when the power went out.",
        c: "We have been playing chess when the power went out.",
        d: "We will be playing chess when the power went out."
      },
      answer: "a",
      explanation: "The past continuous tense 'were playing' is used to describe an action that was interrupted by another action in the past."
    },
    {
      question: "He has already eaten dinner.",
      options: {
        a: "He is already eating dinner.",
        b: "He has already eaten dinner.", // Correct answer
        c: "He had already eaten dinner.",
        d: "He will have already eaten dinner."
      },
      answer: "b",
      explanation: "The present perfect tense 'has eaten' indicates that the action (eating dinner) was completed before now, with relevance to the present."
    },
    {
      question: "I am not going to the party tonight.",
      options: {
        a: "I was not going to the party tonight.",
        b: "I am not going to the party tonight.", // Correct answer
        c: "I had not gone to the party tonight.",
        d: "I will not go to the party tonight."
      },
      answer: "b",
      explanation: "The present continuous 'am not going' is used to describe an action that is planned or ongoing in the present (tonight)."
    },
    {
      question: "They will have completed the project by the end of the week.",
      options: {
        a: "They have completed the project by the end of the week.",
        b: "They will be completing the project by the end of the week.",
        c: "They will have completed the project by the end of the week.", // Correct answer
        d: "They had completed the project by the end of the week."
      },
      answer: "c",
      explanation: "The future perfect tense 'will have completed' is used to describe an action that will be finished before a certain point in the future."
    },
    {
      question: "I had been studying for hours before the test began.",
      options: {
        a: "I have been studying for hours before the test began.",
        b: "I had been studying for hours before the test began.", // Correct answer
        c: "I will have studied for hours before the test began.",
        d: "I was studying for hours before the test began."
      },
      answer: "b",
      explanation: "The past perfect continuous 'had been studying' is used to describe an action that was ongoing and completed before another action (the test beginning)."
    },
    {
      question: "She is going to visit her grandmother next weekend.",
      options: {
        a: "She will visit her grandmother next weekend.",
        b: "She is visiting her grandmother next weekend.",
        c: "She is going to visit her grandmother next weekend.", // Correct answer
        d: "She was going to visit her grandmother next weekend."
      },
      answer: "c",
      explanation: "The 'going to' future tense is used to indicate a planned event in the near future."
    },
    {
      question: "We had been living in Paris for three years before we moved to London.",
      options: {
        a: "We have been living in Paris for three years before we moved to London.",
        b: "We will have been living in Paris for three years before we moved to London.",
        c: "We had been living in Paris for three years before we moved to London.", // Correct answer
        d: "We are living in Paris for three years before we moved to London."
      },
      answer: "c",
      explanation: "The past perfect continuous 'had been living' describes an ongoing action that was completed before another action (moving to London)."
    },
    {
      question: "He was reading a book when I entered the room.",
      options: {
        a: "He was reading a book when I entered the room.", // Correct answer
        b: "He is reading a book when I entered the room.",
        c: "He had read a book when I entered the room.",
        d: "He will be reading a book when I entered the room."
      },
      answer: "a",
      explanation: "The past continuous 'was reading' is used to describe an action that was ongoing when another action occurred (entering the room)."
    },
    {
      question: "By next year, I will have been working here for five years.",
      options: {
        a: "By next year, I will work here for five years.",
        b: "By next year, I have worked here for five years.",
        c: "By next year, I will have been working here for five years.", // Correct answer
        d: "By next year, I will be working here for five years."
      },
      answer: "c",
      explanation: "The future perfect continuous 'will have been working' describes an action that will be ongoing up until a specific time in the future (next year)."
    },
    {
      question: "I have been working on this project all day.",
      options: {
        a: "I am working on this project all day.",
        b: "I have been working on this project all day.", // Correct answer
        c: "I had worked on this project all day.",
        d: "I will be working on this project all day."
      },
      answer: "b",
      explanation: "The present perfect continuous 'have been working' is used to describe an action that started in the past and is still ongoing."
    },
    {
      question: "I will call you when I finish my work.",
      options: {
        a: "I called you when I finish my work.",
        b: "I will call you when I finish my work.", // Correct answer
        c: "I have called you when I finish my work.",
        d: "I call you when I finish my work."
      },
      answer: "b",
      explanation: "The future tense 'will call' is used to describe an action that will happen after another action (finishing the work) in the future."
    },
    {
      question: "She is learning to play the piano.",
      options: {
        a: "She is learning to play the piano.", // Correct answer
        b: "She was learning to play the piano.",
        c: "She has learned to play the piano.",
        d: "She had been learning to play the piano."
      },
      answer: "a",
      explanation: "The present continuous 'is learning' is used to describe an action that is currently in progress."
    }
    
];
