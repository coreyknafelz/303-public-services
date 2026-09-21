// Hardcoded fixture: Rosa's case, used in place of a real API for the prototype.
export const rosaCase = {
  caseCode: 'NNW-482931',
  applicant: { name: 'Rosa M.', language: 'es' },
  overallStatus: 'action_needed',
  programs: [
    { id: 'nnw', name: 'NourishNow', status: 'action_needed', statusLabel: 'Action Needed' },
    { id: 'cah', name: 'CoverAll Health', status: 'in_review', statusLabel: 'In Review' },
  ],
  caseworker: { name: 'Elena Vargas', phone: '(555) 204-8812', ext: '214' },
  timeline: [
    { date: '2026-09-10', event: 'Application submitted', completed: true },
    { date: '2026-09-13', event: 'Identity verified', completed: true },
    { date: '2026-09-15', event: 'Document review', completed: false, current: true },
    { date: null, event: 'Eligibility determination', completed: false },
    { date: null, event: 'Decision issued', completed: false },
  ],
  requirements: [
    {
      id: 'req-001',
      label: 'Proof of income',
      description: 'A pay stub, award letter, or self-employment statement from the past 30 days.',
      deadline: '2026-09-28',
      urgent: true,
      fulfilled: false,
    },
    {
      id: 'req-002',
      label: 'Proof of address',
      description: 'A utility bill, lease agreement, or official mail showing your current address.',
      deadline: '2026-09-28',
      urgent: false,
      fulfilled: false,
    },
  ],
  submittedDocs: [],
}
