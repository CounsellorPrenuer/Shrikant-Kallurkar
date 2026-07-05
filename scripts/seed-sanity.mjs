import { createClient } from "@sanity/client";

const token = process.env.SANITY_EDITOR_TOKEN;
const projectId = process.env.SANITY_PROJECT_ID || "viwfdiol";
if (!token) throw new Error("SANITY_EDITOR_TOKEN is required");

const client = createClient({
  projectId,
  dataset: "production",
  apiVersion: "2026-06-01",
  token,
  useCdn: false,
});

async function uploadFromUrl(url, label) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch image: ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename: `${label}.jpg` });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: label };
}

const imageSources = [
  ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80", "Career counselling"],
  ["https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80", "Stream selection"],
  ["https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80", "Profile building"],
  ["https://images.unsplash.com/photo-1562774053-701939374585?w=900&q=80", "College selection"],
  ["https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=900&q=80", "Career insights blog"],
];
const uploadedImages = [];
for (const [url, label] of imageSources) {
  uploadedImages.push(await uploadFromUrl(url, label));
}
const [careerImage, streamImage, profileImage, collegeImage, blogImage] = uploadedImages;

const standardPlans = [
  ["pkg-1", "Discover", "8-10", 5500, ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Live webinar invites"]],
  ["pkg-2", "Discover Plus+", "8-10", 15000, ["Psychometric assessments", "8 career counselling sessions (1/year)", "Custom reports & study abroad guidance", "CV building"]],
  ["pkg-3", "Achieve Online", "10-12", 5999, ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"]],
  ["pkg-4", "Achieve Plus+", "10-12", 10599, ["Psychometric assessment", "4 career counselling sessions", "Custom reports & study abroad guidance", "CV reviews"]],
  ["pkg-5", "Ascend Online", "college", 6499, ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"]],
  ["pkg-6", "Ascend Plus+", "college", 10599, ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"]],
  ["mp-3", "Ascend Online", "working", 6499, ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"]],
  ["mp-2", "Ascend Plus+", "working", 10599, ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"]],
];

const customPlans = [
  ["career-report", "Career Report", 1500, "Get a detailed report of your psychometric assessment for a scientific analysis of your interests. Find out where your interests lie and which future paths you can potentially consider."],
  ["career-report-counselling", "Career Report + Career Counselling", 3000, "Connect with India's top career coaches to analyse your psychometric report and shortlist the top three career paths you're most likely to enjoy and excel at."],
  ["knowledge-gateway", "Knowledge Gateway + Career Helpline Access", 100, "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline. Validate your career decisions from now until you land a job you love."],
  ["one-to-one-session", "One-to-One Session with a Career Expert", 3500, "Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field."],
  ["college-admission-planning", "College Admission Planning", 3000, "Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner."],
  ["exam-stress-management", "Exam Stress Management", 1000, "Get expert guidance on tackling exam stress, planning your study schedule, revision tips and more from India's top educators. Increase your chances of acing exams with a calm and clear mind."],
  ["cap-100", "College Admissions Planner - 100 (CAP-100)", 199, "Rs.199 for a ranked list of the top 100 colleges in your course. Get an expert-curated list of colleges based on verified cut-offs. CAP-100 ranks the top 100 colleges into four tiers to help you plan smarter: Indian Ivy League, Target, Smart Backup, and Safe Bet colleges. You can then shortlist colleges based on where you stand!"],
];

const block = (text) => ({
  _type: "block",
  _key: crypto.randomUUID().slice(0, 12),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: crypto.randomUUID().slice(0, 12), text, marks: [] }],
});

const planImages = [careerImage, streamImage, profileImage, collegeImage];

const documents = [
  ...standardPlans.map(([planId, title, subgroup, price, features], order) => ({
    _id: `standard-plan-${planId}`,
    _type: "standardPlan",
    planId, title, subgroup, price, features, order: order + 1,
    image: planImages[order % planImages.length],
  })),
  ...customPlans.map(([planId, title, price, description], order) => ({
    _id: `custom-plan-${planId}`,
    _type: "customPlan",
    planId, title, price, description, order: order + 1,
    image: planImages[order % planImages.length],
  })),
  {
    _id: "service-career-counselling", _type: "services", title: "Mid-Career Strategic Guidance",
    description: "For professionals seeking to pivot or advance into leadership roles. Navigate career transitions with expert insights from decades of industry experience.",
    link: "/services", image: careerImage, order: 1,
  },
  {
    _id: "service-stream-selection", _type: "services", title: "Academic & Research Mentorship",
    description: "Comprehensive guidance for Ph.D. candidates and senior researchers. From research methodology to publication strategy and academic career development.",
    link: "/services", image: streamImage, order: 2,
  },
  {
    _id: "service-profile-building", _type: "services", title: "Corporate & Institutional Advisory",
    description: "High-level consulting for colleges and corporations on technical education quality, curriculum development, and institutional excellence.",
    link: "/services", image: profileImage, order: 3,
  },
  {
    _id: "service-college-selection", _type: "services", title: "Vedic Techniques for Goal and Personality Mastery",
    description: "Ancient Vedic wisdom combined with modern psychology for holistic personal development. Master goal-setting, self-awareness, and personality transformation.",
    link: "/services", image: collegeImage, order: 4,
  },
  {
    _id: "testimonial-1", _type: "testimonials", name: "Dr. Gaurav Shivaji Wagh", role: "Cyber Security Engineer",
    quote: "A truly transformative experience. Dr. Kallurkar's innovative approach using the Bhagwad Geeta had a profound impact on my life, providing invaluable clarity and resilience.",
    rating: 5, image: careerImage, order: 1,
  },
  {
    _id: "testimonial-2", _type: "testimonials", name: "Ashish Jain", role: "Delivery Manager, IT Services",
    quote: "Srikant Sir makes complex Vedic wisdom incredibly practical. His guidance was instrumental in significantly improving my self-confidence and stress management skills.",
    rating: 5, image: streamImage, order: 2,
  },
  {
    _id: "testimonial-3", _type: "testimonials", name: "Dr. Shweta", role: "HOD Electronics, Renowned Engineering College",
    quote: "His mentorship was pivotal. He helped me confront the fears that were holding me back and gave me the courage to pursue a dream I had long since buried.",
    rating: 5, image: profileImage, order: 3,
  },
  {
    _id: "blog-career-path", _type: "blogPost", title: "How to Choose the Right Career Path",
    slug: { _type: "slug", current: "how-to-choose-the-right-career-path" },
    excerpt: "Discover proven strategies for identifying your ideal career through self-assessment and market analysis.",
    author: "Dr. Shrikant Kallurkar", publishedAt: "2026-06-01T09:00:00.000Z", featured: true, image: blogImage,
    body: [
      block("Choosing the right career path is one of the most significant decisions you will make. It affects your financial stability, personal fulfillment, and overall happiness."),
      block("Start with self-assessment: identify your interests, values, personality traits, and skills. Psychometric assessments provide valuable insights."),
      block("Research market opportunities and validate your choices through mentorship conversations and real-world exposure before committing."),
    ],
  },
  {
    _id: "blog-stream-selection", _type: "blogPost", title: "Stream Selection After Class 10: A Complete Guide",
    slug: { _type: "slug", current: "stream-selection-after-class-10" },
    excerpt: "Make informed decisions about Science, Commerce, or Humanities with expert guidance and data-driven insights.",
    author: "Dr. Shrikant Kallurkar", publishedAt: "2026-05-15T09:00:00.000Z", featured: false, image: collegeImage,
    body: [
      block("Stream selection after Class 10 is a pivotal moment. The choice between Science, Commerce, and Humanities shapes your academic and professional trajectory."),
      block("Consider your aptitude, interests, and long-term career goals rather than peer pressure or short-term trends."),
    ],
  },
  {
    _id: "blog-profile-building", _type: "blogPost", title: "Building a Strong Profile for College Admissions",
    slug: { _type: "slug", current: "building-profile-college-admissions" },
    excerpt: "Strategic tips for developing an academic and extracurricular profile that stands out to top institutions.",
    author: "Dr. Shrikant Kallurkar", publishedAt: "2026-05-01T09:00:00.000Z", featured: false, image: profileImage,
    body: [
      block("A strong profile goes beyond grades. Admissions committees look for well-rounded candidates with clear passions and demonstrated initiative."),
      block("Focus on consistent extracurricular involvement, leadership roles, and authentic personal projects that reflect your interests."),
    ],
  },
];

let transaction = client.transaction();
for (const document of documents) transaction = transaction.createOrReplace(document);
await transaction.commit();

console.log(`Seeded ${documents.length} Sanity documents for Dr. Shrikant Kallurkar.`);
