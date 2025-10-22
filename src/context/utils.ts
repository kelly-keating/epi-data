import { COUNTRY_DATA } from '../components/utils'

export const REGION_TREE: RegionTree = {}

COUNTRY_DATA.forEach((country) => {
  const { continent, region_un, subregion } = country

  if (!REGION_TREE[continent]) REGION_TREE[continent] = {} as ContinentNode
  if (!REGION_TREE[continent][region_un]) {
    REGION_TREE[continent][region_un] = {
      continent,
      subregions: {},
    } as RegionNode
  }
  if (!REGION_TREE[continent][region_un].subregions[subregion]) {
    REGION_TREE[continent][region_un].subregions[subregion] = {
      region: region_un,
      countries: {},
    } as SubRegionNode
  }

  REGION_TREE[continent][region_un].subregions[subregion].countries[
    country.name_long
  ] = country
})

export function getCountriesByFilter(
  tree: RegionTree,
  filters: FilterSelection
): Country[] {
  if (filters.continent && tree[filters.continent]) {
    return getCountriesUnderContinent(filters, tree[filters.continent])
  }

  // No continent selected, return all
  const countries: Country[] = []
  Object.values(tree).forEach((continent) => {
    countries.push(...getCountriesUnderContinent(filters, continent))
  })
  return countries
}

function getCountriesUnderContinent(
  filters: FilterSelection,
  continent: ContinentNode
): Country[] {
  if (filters.region) {
    return getCountriesUnderRegion(filters, continent[filters.region])
  }

  // No region selected, return all
  const countries: Country[] = []
  Object.values(continent).forEach((region) => {
    countries.push(...getCountriesUnderRegion(filters, region))
  })
  return countries
}

function getCountriesUnderRegion(
  filters: FilterSelection,
  region: RegionNode
): Country[] {
  if (filters.subregion) {
    return getCountriesUnderSubregion(
      filters,
      region.subregions[filters.subregion]
    )
  }

  // No subregion selected, return all
  const countries: Country[] = []
  Object.values(region.subregions).forEach((subregion) => {
    countries.push(...getCountriesUnderSubregion(filters, subregion))
  })
  return countries
}

function getCountriesUnderSubregion(
  filters: FilterSelection,
  subregion: SubRegionNode
): Country[] {
  // All the countries!! Unless filtering by type
  const countries: Country[] = []
  Object.values(subregion.countries).forEach((country) => {
    if (!filters.type || country.type === filters.type) {
      countries.push(country)
    }
  })
  return countries
}
