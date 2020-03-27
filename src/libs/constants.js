const GROUPS = {
  affNetwork: 22,
  browser: 15,
  browserVersion: 16,
  campaigns: 33,
  carrier: 6,
  city: 20,
  connection: 30,
  conversionStatus: 34,
  conversionStatus2: 38,
  country: 19,
  cpc: 35,
  crawler: 49,
  dataSpeed: 14,
  dayOfWeek: 25,
  days: 31,
  deviceBrand: 11,
  deviceModel: 12,
  deviceName: 29,
  deviceResolution: 13,
  deviceType: 10,
  event1: 101,
  event2: 102,
  event3: 103,
  event4: 104,
  event5: 105,
  event6: 106,
  event7: 107,
  event8: 108,
  event9: 109,
  event10: 110,
  hourOfDay: 26,
  ip: 7,
  ipRange1: 8,
  ipRange2: 9,
  landers: 4,
  language: 21,
  offers: 3,
  organization: 42,
  osName: 17,
  osVersion: 18,
  path: 2,
  proxy: 48,
  refererDomain: 24,
  refererURL: 23,
  region: 43,
  rotation: 39,
  rules: 5,
  t1: 27,
  t2: 282,
  t3: 283,
  t4: 284,
  t5: 285,
  t6: 286,
  uniquennes: 40
}

const DATES = {
  all: 9,
  customDate: 12,
  customTime: 10,
  last2day: 13,
  last3day: 14,
  last7day: 3,
  last14days: 4,
  lastYear: 8,
  month: 5,
  today: 1,
  week: 11,
  year: 7,
  yesterday: 2
}

class BinomConstants {
  static get groups () {
    return GROUPS
  }

  static get dates () {
    return DATES
  }
}

module.exports = BinomConstants
