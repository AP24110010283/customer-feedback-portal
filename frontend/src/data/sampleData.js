export const sampleFeatures = [
  {
    _id: "sample-1",
    title: "Dark mode support",
    description: "Add system theme detection and a toggle for dark/light mode across all pages. This would improve accessibility and reduce eye strain during nighttime usage.",
    votes: Array.from({ length: 42 }, (_, i) => `voter-${i}`),
    status: "implemented",
    createdAt: "2026-04-20T10:00:00Z",
    user: { _id: "demo-user", username: "Alex Chen" }
  },
  {
    _id: "sample-2",
    title: "Export reports as CSV",
    description: "Allow users to download analytics and feature request data as CSV files for offline analysis and stakeholder presentations.",
    votes: Array.from({ length: 25 }, (_, i) => `voter-${i}`),
    status: "reviewed",
    createdAt: "2026-04-18T14:30:00Z",
    user: { _id: "demo-user-2", username: "Sarah Kim" }
  },
  {
    _id: "sample-3",
    title: "Mobile optimization",
    description: "Improve responsive layout for tablets and phones. Navigation should collapse into a hamburger menu, and cards should stack vertically on small screens.",
    votes: Array.from({ length: 18 }, (_, i) => `voter-${i}`),
    status: "pending",
    createdAt: "2026-04-22T09:15:00Z",
    user: { _id: "demo-user-3", username: "Jordan Lee" }
  },
  {
    _id: "sample-4",
    title: "Real-time notifications",
    description: "Push notifications when someone votes on your feature request or replies to your feedback. Integrate with browser notification API.",
    votes: Array.from({ length: 31 }, (_, i) => `voter-${i}`),
    status: "reviewed",
    createdAt: "2026-04-15T16:45:00Z",
    user: { _id: "demo-user-4", username: "Priya Sharma" }
  },
  {
    _id: "sample-5",
    title: "API access for integrations",
    description: "Provide a public REST API so teams can integrate feedback data into their existing project management tools like Jira, Linear, or Notion.",
    votes: Array.from({ length: 14 }, (_, i) => `voter-${i}`),
    status: "pending",
    createdAt: "2026-04-24T11:00:00Z",
    user: { _id: "demo-user-5", username: "Marcus Wright" }
  },
];

export const sampleFeedback = [
  {
    _id: "fb-sample-1",
    title: "Improve UI spacing",
    description: "Padding between cards and section headers feels inconsistent. Some areas have 24px gaps while others have 16px. A unified spacing scale would help.",
    category: "UI",
    user: { _id: "demo-user", username: "Alex Chen" }
  },
  {
    _id: "fb-sample-2",
    title: "Add smooth animations",
    description: "Interactions feel abrupt — adding subtle fade-ins, slide transitions, and hover effects would make the experience feel much more polished and modern.",
    category: "Suggestion",
    user: { _id: "demo-user-2", username: "Sarah Kim" }
  },
  {
    _id: "fb-sample-3",
    title: "Loading states needed",
    description: "When data is being fetched, the page just shows empty space. Skeleton loaders or a spinner would communicate that content is on its way.",
    category: "Bug",
    user: { _id: "demo-user-3", username: "Jordan Lee" }
  },
  {
    _id: "fb-sample-4",
    title: "Search and filter feedback",
    description: "As the number of feedback entries grows, it becomes hard to find specific ones. A search bar and category filter would be very helpful.",
    category: "Suggestion",
    user: { _id: "demo-user-4", username: "Priya Sharma" }
  },
];
