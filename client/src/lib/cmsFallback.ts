import type { BlogPost, CmsContent } from "./sanity";

function block(text: string) {
  return {
    _type: "block",
    _key: text.slice(0, 12),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: "span", text, marks: [] }],
  };
}

const fallbackBlogPosts: BlogPost[] = [
  {
    _id: "fallback-blog-1",
    title: "How to Choose the Right Career Path",
    slug: "how-to-choose-the-right-career-path",
    excerpt: "Discover proven strategies for identifying your ideal career through self-assessment and market analysis.",
    author: "Dr. Shrikant Kallurkar",
    publishedAt: "2026-06-01T09:00:00.000Z",
    featured: true,
    body: [
      block("Choosing the right career path is one of the most significant decisions you will make. It affects your financial stability, personal fulfillment, and overall happiness."),
      block("Start with self-assessment: identify your interests, values, personality traits, and skills. Psychometric assessments provide valuable insights."),
      block("Research market opportunities and validate your choices through mentorship conversations and real-world exposure before committing."),
    ],
  },
  {
    _id: "fallback-blog-2",
    title: "Stream Selection After Class 10: A Complete Guide",
    slug: "stream-selection-after-class-10",
    excerpt: "Make informed decisions about Science, Commerce, or Humanities with expert guidance and data-driven insights.",
    author: "Dr. Shrikant Kallurkar",
    publishedAt: "2026-05-15T09:00:00.000Z",
    featured: false,
    body: [
      block("Stream selection after Class 10 is a pivotal moment. The choice between Science, Commerce, and Humanities shapes your academic and professional trajectory."),
      block("Consider your aptitude, interests, and long-term career goals rather than peer pressure or short-term trends."),
    ],
  },
  {
    _id: "fallback-blog-3",
    title: "Building a Strong Profile for College Admissions",
    slug: "building-profile-college-admissions",
    excerpt: "Strategic tips for developing an academic and extracurricular profile that stands out to top institutions.",
    author: "Dr. Shrikant Kallurkar",
    publishedAt: "2026-05-01T09:00:00.000Z",
    featured: false,
    body: [
      block("A strong profile goes beyond grades. Admissions committees look for well-rounded candidates with clear passions and demonstrated initiative."),
      block("Focus on consistent extracurricular involvement, leadership roles, and authentic personal projects that reflect your interests."),
    ],
  },
];

export const CMS_FALLBACK: CmsContent = {
  standardPlans: [
    { _id: "fallback-pkg-1", planId: "pkg-1", title: "Discover", subgroup: "8-10", price: 5500, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Live webinar invites"] },
    { _id: "fallback-pkg-2", planId: "pkg-2", title: "Discover Plus+", subgroup: "8-10", price: 15000, features: ["Psychometric assessments", "8 career counselling sessions (1/year)", "Custom reports & study abroad guidance", "CV building"] },
    { _id: "fallback-pkg-3", planId: "pkg-3", title: "Achieve Online", subgroup: "10-12", price: 5999, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
    { _id: "fallback-pkg-4", planId: "pkg-4", title: "Achieve Plus+", subgroup: "10-12", price: 10599, features: ["Psychometric assessment", "4 career counselling sessions", "Custom reports & study abroad guidance", "CV reviews"] },
    { _id: "fallback-pkg-5", planId: "pkg-5", title: "Ascend Online", subgroup: "college", price: 6499, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
    { _id: "fallback-pkg-6", planId: "pkg-6", title: "Ascend Plus+", subgroup: "college", price: 10599, features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"] },
    { _id: "fallback-mp-3", planId: "mp-3", title: "Ascend Online", subgroup: "working", price: 6499, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
    { _id: "fallback-mp-2", planId: "mp-2", title: "Ascend Plus+", subgroup: "working", price: 10599, features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"] },
  ],
  customPlans: [
    { _id: "fallback-career-report", planId: "career-report", title: "Career Report", price: 1500, description: "Get a detailed report of your psychometric assessment for a scientific analysis of your interests. Find out where your interests lie and which future paths you can potentially consider." },
    { _id: "fallback-career-report-counselling", planId: "career-report-counselling", title: "Career Report + Career Counselling", price: 3000, description: "Connect with India's top career coaches to analyse your psychometric report and shortlist the top three career paths you're most likely to enjoy and excel at." },
    { _id: "fallback-knowledge-gateway", planId: "knowledge-gateway", title: "Knowledge Gateway + Career Helpline Access", price: 100, description: "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline. Validate your career decisions from now until you land a job you love." },
    { _id: "fallback-one-to-one-session", planId: "one-to-one-session", title: "One-to-One Session with a Career Expert", price: 3500, description: "Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field." },
    { _id: "fallback-college-admission-planning", planId: "college-admission-planning", title: "College Admission Planning", price: 3000, description: "Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner." },
    { _id: "fallback-exam-stress-management", planId: "exam-stress-management", title: "Exam Stress Management", price: 1000, description: "Get expert guidance on tackling exam stress, planning your study schedule, revision tips and more from India's top educators. Increase your chances of acing exams with a calm and clear mind." },
    { _id: "fallback-cap-100", planId: "cap-100", title: "College Admissions Planner - 100 (CAP-100)", price: 199, description: "Rs.199 for a ranked list of the top 100 colleges in your course. Get an expert-curated list of colleges based on verified cut-offs. CAP-100 ranks the top 100 colleges into four tiers to help you plan smarter: Indian Ivy League, Target, Smart Backup, and Safe Bet colleges. You can then shortlist colleges based on where you stand!" },
  ],
  blogPosts: fallbackBlogPosts,
  testimonials: [
    { _id: "fallback-testimonial-1", name: "Dr. Gaurav Shivaji Wagh", role: "Cyber Security Engineer", quote: "A truly transformative experience. Dr. Kallurkar's innovative approach using the Bhagwad Geeta had a profound impact on my life, providing invaluable clarity and resilience.", rating: 5 },
    { _id: "fallback-testimonial-2", name: "Ashish Jain", role: "Delivery Manager, IT Services", quote: "Srikant Sir makes complex Vedic wisdom incredibly practical. His guidance was instrumental in significantly improving my self-confidence and stress management skills.", rating: 5 },
    { _id: "fallback-testimonial-3", name: "Dr. Shweta", role: "HOD Electronics, Renowned Engineering College", quote: "His mentorship was pivotal. He helped me confront the fears that were holding me back and gave me the courage to pursue a dream I had long since buried.", rating: 5 },
  ],
  services: [
    { _id: "fallback-service-1", title: "Mid-Career Strategic Guidance", description: "For professionals seeking to pivot or advance into leadership roles. Navigate career transitions with expert insights from decades of industry experience.", link: "/services" },
    { _id: "fallback-service-2", title: "Academic & Research Mentorship", description: "Comprehensive guidance for Ph.D. candidates and senior researchers. From research methodology to publication strategy and academic career development.", link: "/services" },
    { _id: "fallback-service-3", title: "Corporate & Institutional Advisory", description: "High-level consulting for colleges and corporations on technical education quality, curriculum development, and institutional excellence.", link: "/services" },
    { _id: "fallback-service-4", title: "Vedic Techniques for Goal and Personality Mastery", description: "Ancient Vedic wisdom combined with modern psychology for holistic personal development. Master goal-setting, self-awareness, and personality transformation through time-tested techniques.", link: "/services" },
  ],
};
