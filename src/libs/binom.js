const fetch = require('node-fetch-npm')
const querystring = require('querystring')

const BinomConstants = require('./constants')

class Binom {
  constructor (apiURL, apiKey) {
    if (typeof (apiURL) !== 'string' || !apiURL) {
      throw new Error('The API URL is incorrect.')
    }

    if (typeof (apiKey) !== 'string' || !apiKey) {
      throw new Error('The API key is incorrect.')
    }

    this.apiURL = apiURL
    this.apiKey = apiKey
  }

  /**
   * Get a campaign report
   * @param {object} params
   * @param {string|number} params.camps
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

    if (
      (typeof (camps) !== 'string' || typeof (camps) !== 'number') &&
      !camps
    ) {
      throw new Error('The camps is incorrect.')
    }

    if (
      Array.isArray(dateRange) &&
      (!dateRange.length || dateRange.length > 2)) {
      throw new Error('The dateRange is incorrect.')
    }

    const queryParams = {
      page: 'Stats',
      camps,
      api_key: this.apiKey
    }

    if (Array.isArray(groups)) {
      groups.slice(0, 3)
          .reduce((obj, group, i) => {
            obj[`group${++i}`] = group

            return obj
          }, queryParams)
    }

    if (dateRange) {
      const [ dateS, dateE ] = dateRange

      const dateParams = {
        date: BinomConstants.dates.customDate
      }

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

  updateCosts (params) {
    const {
      campId,
      date,
      dateRange,
      timezone = 3,
      tokenNumber,
      tokenValue,
      cost = 0,
      cpc = 0
    } = params;

    if (typeof (campId) !== 'string' && typeof (campId) !== 'number')
      throw new TypeError('CampId is not a string or number.');

    if (!date && !dateRange)
      throw new Error('Date settings undefined.');

    if (!cost && !cpc)
      throw new Error('Cost or CPC required.');

    const queryParams = {
      page: 'save_update_costs',
      api_key: this.apiKey,
      camp_id: campId
    };

    if (Array.isArray(dateRange) && dateRange.length === 2) {
      Object.assign(queryParams, {
        date: 12,
        date_s: dateRange[0],
        date_e: dateRange[1]
      });
    } else {
      Object.assign(queryParams, { date });
    }

    timezone && Object.assign(queryParams, { timezone });
    tokenNumber && Object.assign(queryParams, { token_number: tokenNumber });
    tokenValue && Object.assign(queryParams, { token_value: tokenValue });

    if (cost) Object.assign(queryParams, { cost });
    else if (cpc) Object.assign(queryParams, { cpc });

    const qs = querystring.stringify(queryParams);

    return fetch(`${this.apiURL}?${qs}`)
      .then(res => (res.json()));
  }
}

module.exports = Binom
