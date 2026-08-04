export type WrittenDrill = {
  title: string;
  prompt: string;
  placeholder: string;
  /** What a strong answer contains — used for self-scoring. */
  criteria: string[];
};

export type PillarLab = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  accent: string;
  accentSoft: string;
  /** Rated statements, scored 0–5. */
  statements: string[];
  /** Written practice with self-scored answers, 0–5 each. */
  drills: WrittenDrill[];
  /** Real-world reps to run this week. */
  reps: string[];
  bands: { max: number; name: string; copy: string }[];
};

const scaleBands = (
  pillar: string,
  low: string,
  mid: string,
  high: string,
  top: string,
): PillarLab["bands"] => [
  { max: 25, name: `${pillar} — Starting Out`, copy: low },
  { max: 50, name: `${pillar} — Building`, copy: mid },
  { max: 75, name: `${pillar} — Practised`, copy: high },
  { max: 100, name: `${pillar} — Fluent`, copy: top },
];

export const pillarLabs: PillarLab[] = [
  {
    slug: "communication",
    name: "Communication",
    tagline: "Say it so it actually lands",
    intro:
      "Communication is not how well you talk — it's how reliably your meaning survives the trip into someone else's head. This lab rates your habits, then makes you write real sentences under real constraints.",
    accent: "oklch(0.56 0.12 190)",
    accentSoft: "oklch(0.9 0.06 190)",
    statements: [
      "I let people finish their thought before I respond.",
      "I adjust my vocabulary and tone to the person in front of me.",
      "I check that the other person understood, not just that I said it.",
      "I can explain something complicated without jargon.",
      "I ask a clarifying question before I disagree.",
      "I summarise what I heard back to the speaker.",
      "I notice when I'm talking more than half the time.",
      "I say hard things plainly instead of burying them.",
    ],
    drills: [
      {
        title: "The 30-word explanation",
        prompt:
          "Explain something you know well — your job, a hobby, a concept — to a curious 12-year-old. Maximum 30 words. No jargon.",
        placeholder: "Write your 30-word explanation…",
        criteria: [
          "Under 30 words",
          "Zero jargon or insider terms",
          "Uses a concrete image or comparison",
          "A 12-year-old could repeat it back",
        ],
      },
      {
        title: "Rewrite the vague ask",
        prompt:
          "Turn \"Hey, can you sort that thing out at some point?\" into a request that is specific, warm and impossible to misread.",
        placeholder: "Write the rewritten request…",
        criteria: [
          "Names the exact task",
          "Includes a deadline or timeframe",
          "Stays warm rather than demanding",
          "Leaves room for them to say no or renegotiate",
        ],
      },
      {
        title: "The reflection line",
        prompt:
          "A friend says: \"I'm fine, work's just been a lot lately.\" Write one sentence that reflects back what you heard — no advice, no fixing.",
        placeholder: "Write your reflection…",
        criteria: [
          "Names the feeling, not just the facts",
          "Contains no advice",
          "Invites them to continue",
          "Sounds like you, not a therapist script",
        ],
      },
      {
        title: "Disagree without friction",
        prompt:
          "Someone proposes an idea you think is wrong, in front of other people. Write what you'd actually say out loud.",
        placeholder: "Write your response…",
        criteria: [
          "Acknowledges something real in their idea",
          "States your objection clearly, not vaguely",
          "Attacks the idea, never the person",
          "Ends with a question or an opening, not a verdict",
        ],
      },
    ],
    reps: [
      "Summarise the other person's point before you make yours — three conversations today.",
      "Cut one sentence out of every message before you send it.",
      "Ask \"what would make this useful for you?\" once in a meeting.",
      "Explain one work thing to someone outside your field without jargon.",
    ],
    bands: scaleBands(
      "Communication",
      "Your meaning is often clear to you and blurry to everyone else. Start with one habit: reflect back before you respond.",
      "You're understood most of the time. The gap now is pressure — keeping the same clarity when you're rushed or challenged.",
      "You communicate deliberately and people notice. Push into the harder territory: saying uncomfortable things plainly and kindly.",
      "You shape conversations rather than just take part in them. Use it to make other people clearer, not just yourself.",
    ),
  },
  {
    slug: "confidence",
    name: "Confidence",
    tagline: "Steady under mild social pressure",
    intro:
      "Confidence isn't volume. It's the absence of frantic self-monitoring — being able to enter, speak, be wrong, and stay. This lab measures your steadiness, then rehearses the moments that shake it.",
    accent: "oklch(0.55 0.17 36)",
    accentSoft: "oklch(0.78 0.11 48)",
    statements: [
      "I can enter a room of strangers without needing someone to lead the way.",
      "I say what I think even when I expect pushback.",
      "I recover from an awkward moment instead of replaying it for hours.",
      "My posture and eye contact match how confident I want to seem.",
      "I can sit in a silence without rushing to fill it.",
      "I can be visibly wrong in front of people without spiralling.",
      "I ask for what I want directly instead of hinting.",
      "I take up an appropriate amount of space — physically and verbally.",
    ],
    drills: [
      {
        title: "The cold open",
        prompt:
          "You're at an event alone. Write the exact first line you'd use to join a group of three people already talking.",
        placeholder: "Write your opening line…",
        criteria: [
          "Under 15 words",
          "References the room or their conversation, not yourself",
          "Ends in a way they can easily respond to",
          "No apology for interrupting",
        ],
      },
      {
        title: "Recover the fumble",
        prompt:
          "You mispronounce a word, make a joke that dies, or forget someone's name mid-sentence. Write what you say next.",
        placeholder: "Write your recovery line…",
        criteria: [
          "Acknowledges it lightly, once",
          "Doesn't over-apologise or explain",
          "Moves the conversation forward",
          "Would take under four seconds to say",
        ],
      },
      {
        title: "The direct ask",
        prompt:
          "Write a request you've been avoiding — a raise, a favour, a boundary, a second date. Say it in two sentences, no hedging.",
        placeholder: "Write the ask…",
        criteria: [
          "No \"just\", \"sorry\", \"maybe\", or \"if that's okay\"",
          "States exactly what you want",
          "Gives a reason, not a justification",
          "You could send it today",
        ],
      },
      {
        title: "Hold the line",
        prompt:
          "Someone pushes back hard on something you believe. Write your reply that neither caves nor escalates.",
        placeholder: "Write your reply…",
        criteria: [
          "Restates your position without raising the temperature",
          "Shows you genuinely heard them",
          "Doesn't apologise for having the view",
          "Leaves the relationship intact",
        ],
      },
    ],
    reps: [
      "Enter one room today without checking your phone first.",
      "Let one silence run three seconds longer than is comfortable.",
      "Make one direct ask with no softening words.",
      "Say \"I don't know\" once, out loud, without explaining.",
    ],
    bands: scaleBands(
      "Confidence",
      "Most of your energy goes into monitoring yourself. Pick the smallest rep — one direct ask — and repeat it until it's boring.",
      "You're steady in familiar rooms and shaky in new ones. Practise entering unfamiliar spaces on purpose, weekly.",
      "You hold your ground and recover quickly. Your edge now is the uncomfortable ask and the unpopular opinion.",
      "You're rarely destabilised socially. Use it to make other people feel safe rather than to dominate the room.",
    ),
  },
  {
    slug: "humour",
    name: "Humour",
    tagline: "Lightness that closes distance",
    intro:
      "Humour is a social tool before it's a performance. Used well it lowers threat and builds trust; used badly it creates distance. This lab tests your timing, your read, and your willingness to be the joke.",
    accent: "oklch(0.58 0.15 300)",
    accentSoft: "oklch(0.86 0.09 305)",
    statements: [
      "I recognise sarcasm and subtle jokes without needing them explained.",
      "I use humour to ease tension rather than to deflect.",
      "I can laugh at myself without it feeling forced.",
      "I read the room before making a joke.",
      "My humour brings people closer rather than putting anyone down.",
      "I can let a joke die without panicking.",
      "I notice which people in a group my humour actually works on.",
      "I know when a moment should stay serious.",
    ],
    drills: [
      {
        title: "Self-deprecation, done right",
        prompt:
          "Write one line making fun of yourself that's genuinely funny but doesn't ask anyone to reassure you.",
        placeholder: "Write your line…",
        criteria: [
          "Targets a habit or choice, not your worth",
          "Specific rather than generic",
          "Doesn't fish for reassurance",
          "You'd say it to a stranger",
        ],
      },
      {
        title: "The observation",
        prompt:
          "Describe something you noticed this week that was quietly absurd. One or two sentences — the setup and the turn.",
        placeholder: "Write your observation…",
        criteria: [
          "Concrete detail, not a general complaint",
          "The funny part lands at the end",
          "No explanation after the punchline",
          "Under 40 words",
        ],
      },
      {
        title: "Defuse the tension",
        prompt:
          "A meeting or dinner has gone tense and quiet. Write the line you'd use to release pressure without dismissing what happened.",
        placeholder: "Write the line…",
        criteria: [
          "Doesn't mock anyone in the room",
          "Acknowledges the tension rather than pretending",
          "Gives people permission to exhale",
          "Would still be fine if it didn't get a laugh",
        ],
      },
      {
        title: "Banter, returned",
        prompt:
          "Someone teases you: \"You're always the last one to get it.\" Write a comeback that's warm, not defensive.",
        placeholder: "Write your comeback…",
        criteria: [
          "Accepts the tease instead of denying it",
          "Escalates playfully rather than retaliating",
          "Short — a comeback that needs a run-up isn't one",
          "Keeps them on your side",
        ],
      },
    ],
    reps: [
      "Notice one absurd detail a day and write it down in one line.",
      "Let one of your jokes die without rescuing it.",
      "Use humour once to lower tension instead of to get attention.",
      "Laugh first at something you did, before anyone else can.",
    ],
    bands: scaleBands(
      "Humour",
      "Your instinct is probably to hold back or over-explain. Start by noticing what's funny before trying to be funny.",
      "You get laughs, inconsistently. Focus on timing and reading the room rather than on better material.",
      "Your humour usually connects. The next level is restraint — knowing which moments deserve seriousness.",
      "You use lightness deliberately and people relax around you. Now use it to include the quietest person in the room.",
    ),
  },
  {
    slug: "human-behaviour",
    name: "Human Behaviour",
    tagline: "Read what isn't said out loud",
    intro:
      "Most of the information in a conversation never becomes words. This lab trains observation: noticing shifts, reading motive charitably, and mapping the dynamics of a group before you act inside it.",
    accent: "oklch(0.48 0.13 145)",
    accentSoft: "oklch(0.84 0.09 140)",
    statements: [
      "I can tell when someone is uncomfortable even if they don't say so.",
      "I notice shifts in someone's energy during a conversation.",
      "I consider what might be driving behaviour before I judge it.",
      "People seem to feel heard after talking with me.",
      "I pick up unspoken group dynamics — who's close, who's tense, who's excluded.",
      "I notice when someone's words and body language disagree.",
      "I can name the emotion behind someone's reaction, not just the reaction.",
      "I check my read against evidence instead of trusting my first impression.",
    ],
    drills: [
      {
        title: "The observation log",
        prompt:
          "Describe one person you observed this week: posture, pace, where their attention went. Facts only — no interpretation yet.",
        placeholder: "Write what you actually saw…",
        criteria: [
          "At least three concrete physical details",
          "No adjectives about their personality",
          "Includes something about timing or pace",
          "You could show it to them without offence",
        ],
      },
      {
        title: "Three explanations",
        prompt:
          "Think of someone whose behaviour annoyed you recently. Write three different, plausible reasons for it — none of which are \"they're just like that\".",
        placeholder: "1)…  2)…  3)…",
        criteria: [
          "Three genuinely different explanations",
          "At least one is generous to them",
          "At least one involves something you can't see",
          "None rely on a character flaw",
        ],
      },
      {
        title: "Map the room",
        prompt:
          "Pick a group you're part of. Write who holds influence, who's on the edge, and one alliance that isn't obvious.",
        placeholder: "Write your map…",
        criteria: [
          "Names influence separately from job title or volume",
          "Identifies someone on the periphery",
          "Cites evidence for the alliance",
          "Avoids labelling anyone as the villain",
        ],
      },
      {
        title: "The mismatch",
        prompt:
          "Recall a time someone's words said one thing and their body said another. Describe both, then what you now think was true.",
        placeholder: "Write the mismatch…",
        criteria: [
          "Describes the words and the signals separately",
          "Names the specific signal that gave it away",
          "Offers a read, held loosely",
          "Says what you'd do differently next time",
        ],
      },
    ],
    reps: [
      "Spend one conversation watching hands and feet instead of faces.",
      "Before judging a behaviour, generate one generous explanation.",
      "Name one person's emotional state to yourself, then look for evidence against it.",
      "In one group, identify who hasn't spoken — and bring them in.",
    ],
    bands: scaleBands(
      "Human Behaviour",
      "You're reading words and missing signals. Start with pure observation: watch, don't interpret, for a week.",
      "You catch the obvious shifts and miss the quiet ones. Practise generating alternative explanations before you conclude.",
      "You read people accurately and they feel it. Your edge is holding reads loosely — testing rather than trusting them.",
      "You see group dynamics as they happen. Use it to redistribute attention toward whoever has the least.",
    ),
  },
];

export const scaleLabels = ["Never", "Rarely", "Sometimes", "Often", "Usually", "Always"];
