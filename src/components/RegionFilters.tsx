import { useFilters } from '../context/FiltersContext'
import { COUNTRY_DATA } from './utils'

// Continent, region, subregion, type
// Continent limits available regions and subregions
// Region limits available subregions and defines continent
// Subregion defines region and continent
// Type is independent
const countryTypes = [...new Set(COUNTRY_DATA.map((c) => c.type))]

function RegionFilters() {
  const {
    filters,
    availableContinents,
    availableRegions,
    availableSubregions,
    setType,
    setRegion,
  } = useFilters()

  const updateFilters = (e: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget)
    const continent = formData.get('continent') as string
    // const region = formData.get('region') as string
    // const subregion = formData.get('subregion') as string
    const type = formData.get('type') as string

    console.log('update!', continent)
    if (continent !== filters.continent) {
      setRegion({ continent: continent || null, region: null, subregion: null })
    }
    if (type !== filters.type) {
      setType(type || null)
    }
  }

  return (
    <div>
      <form onChange={updateFilters}>
        <select name='continent' id='continent-select'>
          <option value=''>--Select Continent--</option>
          {availableContinents.map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>
        <select name='region' id='region-select'>
          <option value=''>--Select Region--</option>
          {availableRegions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        <select name='subregion' id='subregion-select'>
          <option value=''>--Select Subregion--</option>
          {availableSubregions.map((subregion) => (
            <option key={subregion} value={subregion}>
              {subregion}
            </option>
          ))}
        </select>
        <select name='type' id='type-select' value={filters.type || ''}>
          <option value=''>--Select Type--</option>
          {countryTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </form>
    </div>
  )
}

export default RegionFilters
