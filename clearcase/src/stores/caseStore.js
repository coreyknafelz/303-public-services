import { defineStore } from 'pinia'
import { rosaCase } from '@/data/rosaCase'

const CODE_FORMAT = /^[A-Z]{3}-\d{6}$/

export const useCaseStore = defineStore('case', {
  state: () => ({
    isAuthenticated: false,
    caseCode: null,
    applicant: null,
    programs: [],
    overallStatus: null,
    requirements: [],
    caseworker: null,
    timeline: [],
    submittedDocs: [],
  }),
  getters: {
    pendingRequirements: (state) => state.requirements.filter((r) => !r.fulfilled),
    hasActionNeeded: (state) => state.overallStatus === 'action_needed',
  },
  actions: {
    /**
     * Simulates looking up a case by its code. Returns an object describing
     * success or a specific failure reason so the UI can show a precise message.
     */
    authenticateWithCode(rawCode) {
      const code = rawCode.trim().toUpperCase()

      if (!CODE_FORMAT.test(code)) {
        return { ok: false, reason: 'invalid_format' }
      }
      if (code === 'NNW-000000') {
        return { ok: false, reason: 'expired' }
      }
      if (code !== rosaCase.caseCode) {
        return { ok: false, reason: 'not_found' }
      }

      this.$patch({ ...structuredClone(rosaCase), isAuthenticated: true, caseCode: code })
      return { ok: true }
    },
    /** Demo-only sign-in: any well-formed email/password combination succeeds. */
    signInWithEmail(email, password) {
      if (!email.includes('@') || password.length < 4) {
        return { ok: false, reason: 'invalid_credentials' }
      }
      this.$patch({ ...structuredClone(rosaCase), isAuthenticated: true, caseCode: rosaCase.caseCode })
      return { ok: true }
    },
    markRequirementFulfilled(id) {
      const req = this.requirements.find((r) => r.id === id)
      if (req) req.fulfilled = true
      if (this.requirements.every((r) => r.fulfilled)) {
        this.overallStatus = 'in_review'
      }
    },
    addSubmittedDoc(doc) {
      this.submittedDocs.push(doc)
    },
    signOut() {
      this.$reset()
    },
  },
})
