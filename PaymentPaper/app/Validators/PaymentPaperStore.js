'use strict'

class PaymentPaperStore {
  get rules () {
    return {
        company_id: 'required|in:1,2,3,4,5',
        releaseDate: 'required|date'
    }
  }
}

module.exports = PaymentPaperStore
