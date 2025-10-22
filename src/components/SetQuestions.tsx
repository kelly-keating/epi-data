import { COUNTRY_DATA } from './utils'

function SetQuestions() {
  const continentCount: Record<string, number> = {}
  const regionSize: Record<string, number> = {}
  let longestLifeExp: { country: string; lifeExp: number } = {
    country: '',
    lifeExp: 0,
  }
  const gdpBySubregion: Record<string, number[]> = {}

  // As this doesn't rerender, using forEach here, but could use useMemo if needed
  COUNTRY_DATA.forEach((country) => {
    const { continent } = country

    continentCount[continent] = continentCount[continent]
      ? continentCount[continent] + 1
      : 1

    if (country.area_km2) {
      regionSize[country.region_un] = regionSize[country.region_un]
        ? regionSize[country.region_un] + country.area_km2
        : country.area_km2
    }

    if (country.lifeExp && country.lifeExp > longestLifeExp.lifeExp) {
      longestLifeExp = {
        country: country.name_long,
        lifeExp: country.lifeExp,
      }
    }

    if (country.gdpPerCap) {
      if (!gdpBySubregion[country.subregion]) {
        gdpBySubregion[country.subregion] = []
      }

      gdpBySubregion[country.subregion].push(country.gdpPerCap)
    }
  })

  const topContinent = Object.entries(continentCount).reduce(
    (currentTop, [name, count]) => {
      return count > currentTop.count ? { name, count } : currentTop
    },
    { name: '', count: 0 }
  )

  const biggestRegion = Object.entries(regionSize).reduce(
    (currentBiggest, [name, size]) => {
      return size > currentBiggest.size ? { name, size } : currentBiggest
    },
    { name: '', size: 0 }
  )

  const avgGdps = Object.entries(gdpBySubregion).reduce(
    (extremes, [name, gdps]) => {
      const avgGdp = gdps.reduce((a, b) => a + b) / gdps.length

      if (avgGdp < extremes.min.avgGdp) extremes.min = { name, avgGdp }
      if (avgGdp > extremes.max.avgGdp) extremes.max = { name, avgGdp }

      return extremes
    },
    {
      min: { name: '', avgGdp: Infinity },
      max: { name: '', avgGdp: 0 },
    }
  )

  return (
    <div>
      <h2>SetQuestions</h2>
      <ul>
        <li>
          Which continent has the most countries in the data?{' '}
          {topContinent.name} with {topContinent.count} countries
        </li>
        <li>
          Which region has the largest combined area in sq. km?{' '}
          {biggestRegion.name} with {biggestRegion.size} km²
        </li>
        <li>
          Which country has the highest life expectancy?{' '}
          {longestLifeExp.country} with {longestLifeExp.lifeExp} years
        </li>
        <li>
          Which subregion has the lowest / highest average GDP per capita?{' '}
          {avgGdps.min.name} has the lowest at ${avgGdps.min.avgGdp.toFixed(2)}{' '}
          and {avgGdps.max.name} has the highest with $
          {avgGdps.max.avgGdp.toFixed(2)}
        </li>
      </ul>
    </div>
  )
}

export default SetQuestions
