/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'
import { getCountriesByFilter, REGION_TREE } from './utils'

export type FiltersContextValue = {
  filters: FilterSelection
  setRegion: (selection: RegionSelection) => void
  setType: (type: string | null) => void
  availableContinents: string[]
  availableRegions: string[]
  availableSubregions: string[]
  filteredCountries: Country[]
}

export const FiltersContext = createContext<FiltersContextValue | null>(null)

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterSelection>({
    continent: null,
    region: null,
    subregion: null,
    type: null,
  })

  const setRegion = (selection: RegionSelection) => {
    console.log('setRegion', selection)
    setFilters((prev) => ({ ...prev, ...selection }))
  }

  const setType = (type: string | null) => {
    setFilters((prev) => ({ ...prev, type }))
  }

  const availableRegions = filters.continent
    ? Object.keys(REGION_TREE[filters.continent] || {})
    : []

  const availableSubregions =
    filters.continent && filters.region
      ? Object.keys(
          REGION_TREE[filters.continent]?.[filters.region]?.subregions || {}
        )
      : []

  const filteredCountries = useMemo(
    () => getCountriesByFilter(REGION_TREE, filters),
    [filters]
  )

  console.log('filteredCountries', filteredCountries)

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setRegion,
        setType,
        availableContinents: Object.keys(REGION_TREE),
        availableRegions,
        availableSubregions,
        filteredCountries,
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

export function useFilters() {
  const ctx = useContext(FiltersContext)
  if (!ctx) throw new Error('useFilters must be used inside FiltersProvider')
  return ctx
}
