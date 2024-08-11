import { defineStore } from 'pinia'

interface Appellant {
  id: number
  name: string
  phone: number
  email: string
  interest: string
  image?: string
}
export const useCounterStore = defineStore('contactUs', {
  state: () => ({ appellants: <Appellant[]>[], XTotalCount: <number>0, currentOffset: 0 }),
  actions: {
    async fetchAppellants(offset: number = 0, limit: number = 10) {
      const params = new URLSearchParams()
      params.append('limit', limit.toString())
      params.append('offset', offset.toString())

      return await fetch(APP_SERVER_URL + 'appellants' + '?' + params.toString()).then(
        async (response) => {
          if (response.status == 200) {
            const serverAppellants = await response.json()

            this.currentOffset = this.currentOffset + serverAppellants.length

            const totalServerCount = response.headers.get('x-total-count')
            this.XTotalCount = totalServerCount ? Number(totalServerCount) : 0

            if (!this.appellants.length) {
              this.appellants = serverAppellants
            } else {
              serverAppellants.forEach((serverAppellant: Appellant) => {
                const appellantIndex = this.appellants.findIndex(
                  (appellant) => appellant.id === serverAppellant.id
                )
                if (appellantIndex === -1) {
                  this.appellants.push(serverAppellant)
                }
              })
            }
          }
        }
      )
    },

    async postAppellant(formData: FormData) {
      return await fetch(APP_SERVER_URL + 'appellants', {
        body: formData,
        method: 'POST'
      })
    }
  }
})
