function toRelativeTime(date) {
  const formatter = new Intl.RelativeTimeFormat('en-us', { style: 'short' })
  const dateNow = new Date()

  const diff = getDifferenceBetweenDates(dateNow, date)
  const max = __getMax(diff)

  return formatter.format(max.value, max.key)
}

function getDifferenceBetweenDates(present, past) {
  const diffTime = present - past
  const minutes = 1000 * 60
  const hours = minutes * 60
  const days = hours * 24
  const weeks = days * 7
  const months = days * 30
  const years = months * 12
  
  return {
    days: (diffTime / days),
    weeks: (diffTime / weeks),
    months: (diffTime / months),
    years: (diffTime / years)
  }
}

/**
 * @param {DateDifference} difference
 */
function __getMax(difference) {
  const maxValue = Math.max(...Object.values(difference))
  const maxKey = Object.keys(difference).find(key => difference[key] === maxValue)

  return {
    key: maxKey,
    value: maxValue
  }
}

/**
 * @typedef {Object} DateDifference
 * @property {number} days
 * @property {number} months
 * @property {number} years
 * @property {number} weeks
 */

export { toRelativeTime }