// Hardcoded fixture: Rosa's case, used in place of a real API for the prototype.
export const rosaCase = {
  caseCode: 'NNW-482931',
  applicant: { name: 'Rosa M.', language: 'es' },
  overallStatus: 'action_needed',
  programs: [
    { id: 'nnw', nameKey: 'nourishNow', status: 'action_needed' },
    { id: 'cah', nameKey: 'coverAllHealth', status: 'in_review' },
  ],
  caseworker: { name: 'Elena Vargas', phone: '(555) 204-8812', ext: '214' },
  timeline: [
    { date: '2026-09-10', eventKey: 'applicationSubmitted', completed: true },
    { date: '2026-09-13', eventKey: 'identityVerified', completed: true },
    { date: '2026-09-15', eventKey: 'documentReview', completed: false, current: true },
    { date: null, eventKey: 'eligibilityDetermination', completed: false },
    { date: null, eventKey: 'decisionIssued', completed: false },
  ],
  requirements: [
    {
      id: 'req-001',
      labelKey: 'proofOfIncome',
      descriptionKey: 'proofOfIncomeDescription',
      deadline: '2026-09-28',
      urgent: true,
      fulfilled: false,
    },
    {
      id: 'req-002',
      labelKey: 'proofOfAddress',
      descriptionKey: 'proofOfAddressDescription',
      deadline: '2026-09-28',
      urgent: false,
      fulfilled: false,
    },
  ],
  submittedDocs: [],
}
