import { useMemo } from 'react'
import { getDataSummary } from './utils'

import RegionFilters from './RegionFilters'
import { useFilters } from '../context/FiltersContext'

function DataDisplay() {
  const { filteredCountries } = useFilters()

  const summaryData = useMemo(() => {
    const dataPoints: Record<string, number[]> = {
      area_km2: [],
      pop: [],
      lifeExp: [],
      gdpPerCap: [],
    }

    filteredCountries.forEach((country) => {
      if (country.area_km2) dataPoints.area_km2.push(country.area_km2)
      if (country.pop) dataPoints.pop.push(country.pop)
      if (country.lifeExp) dataPoints.lifeExp.push(country.lifeExp)
      if (country.gdpPerCap) dataPoints.gdpPerCap.push(country.gdpPerCap)
    })

    return {
      area_km2: getDataSummary(dataPoints.area_km2),
      pop: getDataSummary(dataPoints.pop),
      lifeExp: getDataSummary(dataPoints.lifeExp),
      gdpPerCap: getDataSummary(dataPoints.gdpPerCap),
    }
  }, [filteredCountries])

  return (
    <div>
      <h2>Data Display</h2>
      <RegionFilters />
      <div style={{ display: 'flex', gap: '2rem' }}>
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.id}>{country.name_long}</li>
          ))}
        </ul>
        <div>
          <h3>Summary Statistics</h3>
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Total</th>
                <th>Average</th>
                <th>Median</th>
                <th>Min</th>
                <th>Max</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summaryData).map(([metric, summary]) => (
                <tr key={metric}>
                  <td>{metric}</td>
                  <td>{summary.total?.toFixed(2) ?? 'N/A'}</td>
                  <td>{summary.avg?.toFixed(2) ?? 'N/A'}</td>
                  <td>{summary.med?.toFixed(2) ?? 'N/A'}</td>
                  <td>{summary.min?.toFixed(2) ?? 'N/A'}</td>
                  <td>{summary.max?.toFixed(2) ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DataDisplay
