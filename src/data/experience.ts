export type Experience = {
  startDate: string;
  endDate: string;
  city: string;
  company: string;
  title: string;
  description: string;
  highlights: string[];
  technologies: string[];
  longDescription?: string;
};

// Replace these deliberately generic entries with your actual experience.
export const experience: Experience[] = [
  {
    startDate: 'YYYY', endDate: 'Present', city: 'City, Country',
    company: 'Current company or independent practice', title: 'Software Engineer',
    description: 'A focused placeholder for your current role and the kind of problems you solve.',
    highlights: ['Add a meaningful outcome or responsibility.', 'Add a product, system, or team contribution.'],
    technologies: ['TypeScript', 'Web platform'],
  },
  {
    startDate: 'YYYY', endDate: 'YYYY', city: 'City, Country',
    company: 'Previous company or school', title: 'Role or degree',
    description: 'Use this space for a concise description of the work, study, or focus area.',
    highlights: ['Replace this placeholder with a specific contribution.'],
    technologies: ['Technology', 'Technology'],
  },
];
