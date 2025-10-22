import fs from 'fs'
import path from 'path'

/**
 * Reads raw CSV data and initiates cleaning process
 * Saves cleaned data to both CSV and JSON files
 */
function readData() {
  const filePath = path.resolve('./data/worldData.csv')

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) console.log(err)
    else {
      const cleanData = getCleanedEntries(data)

      saveDataToCsv(cleanData)
      saveDataToJson(cleanData)
    }
  })
}

/**
 * Preps CSV data by:
 *  - merging duplicates
 *  - removing invalid data entries
 *  - converting numbers for json
 *
 * @param data - Raw CSV string
 * @returns Object containing:
 * - `keys` Header keys
 * - `countries` Cleaned country data array
 */
function getCleanedEntries(data) {
  data = data.replace(/\r/g, '')
  const lines = data.split('\n')

  // First line is header keys, last should be empty (and is removed)
  let keys = lines.shift().split(',')
  keys[0] = 'id'
  keys[11] = 'gdpPerCap'
  if (!lines[lines.length - 1].length) lines.pop()

  // All other lines are countries
  const uniqueCountries = lines.reduce((countries, line) => {
    const values = line.split(',')
    const id = values[0]

    if (!countries[id]) countries[id] = {}

    keys.forEach((key, i) => {
      let value = isValid(values[i]) ? values[i] : null
      if (value !== null && !isNaN(value)) value = Number(value)

      if (key === 'lifeExp' && value && value > 100) {
        value = null
      }

      // Fill in missing or invalid data
      if (!countries[id][key]) {
        countries[id][key] = value
      }
    })

    return countries
  }, {})

  //  Remove duplicate headers (iso_a2, or any others)
  keys = [...new Set(keys)]

  return {
    keys,
    countries: Object.values(uniqueCountries),
  }
}

/**
 * Saves cleaned data to CSV file after converting nulls back to #N/A
 */
function saveDataToCsv(countryData) {
  const { keys, countries } = countryData

  const countryStrs = countries.map((country) =>
    Object.values(country)
      .map((value) => (value !== null ? value : '#N/A'))
      .join(',')
  )

  keys[0] = ''
  // Add header keys as first line, and merge all strings
  countryStrs.unshift(keys.join(','))
  const fullStr = countryStrs.join('\n')

  const filePath = path.resolve('./data/worldData_clean.csv')
  fs.writeFile(filePath, fullStr, (err) => {
    if (err) console.log(err)
    else console.log('Cleaned data saved to worldData_clean.csv')
  })
}

/**
 * Saves cleaned data to JSON file
 */
function saveDataToJson(countryData) {
  const { countries } = countryData

  const jsonData = JSON.stringify(countries, null, 2)
  const filePath = path.resolve('./data/worldData_clean.json')

  fs.writeFile(filePath, jsonData, (err) => {
    if (err) console.log(err)
    else console.log('Cleaned data saved to worldData_clean.json')
  })
}

/**
 * Checks if a value is valid (not #N/A, not null, not empty, and greater than 0 if a number)
 */
function isValid(value) {
  if (value === '#N/A' || value === null) return false
  if (!isNaN(value) && Number(value) <= 0) return false
  return value.trim().length > 0
}

// ----- Run -----
readData()
