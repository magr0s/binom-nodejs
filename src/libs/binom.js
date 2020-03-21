const fetch = require('node-fetch-npm')
const querystring = require('querystring')

const { DATES } = require('./constants')

class Binom {
  constructor (apiURL, apiKey) {
    this.apiURL = apiURL
    this.apiKey = apiKey
  }

  /**
   * Get a campaign report
   * @param {object} params
   * @param {string|array|number} params.camps
   * @param {array} params.groups
   * @param {string|number} params.date
   * @param {array} params.dateRange
   * @returns {Promise<*>}
   */
  getCampaignReport (params = {}) {
    const {
      camps,
      groups,
      dateRange,
      date,
      ...props
    } = params

    if (!camps) {
      throw new Error('Camps cannot be empty.')
    }

    if (Array.isArray(dateRange) && dateRange.length > 2) {
      throw new Error('Incorrect dateRange.')
    }

    const queryParams = {
      page: 'Stats',
      camps: Array.isArray(camps) ? camps.join(',') : camps,
      api_key: this.apiKey
    }

    if (Array.isArray(groups)) {
      Object.assign(
        queryParams,
        groups.reduce((obj, group, i) => {
          obj[`group${++i}`] = group

          return obj
        }, {})
      )
    }

    if (dateRange) {
      const dateParams = {
        date: DATES.CUSTOM_DATE
      }

      const [ dateS, dateE ] = dateRange

      dateS && Object.assign(dateParams, { date_s: dateS })
      dateE && Object.assign(dateParams, { date_e: dateE })

      Object.assign(queryParams, dateParams)
    } else if (date) {
      Object.assign(queryParams, { date })
    }

    const qs = querystring.stringify({ ...queryParams, ...props })

    return fetch(`${this.apiURL}?${qs}`)
      .then(res => (res.json()))
  }
}

module.exports = Binom
