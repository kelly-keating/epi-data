type Country = {
  id: number
  iso_a2: string | null
  name_long: string
  continent: string
  region_un: string
  subregion: string
  type: string
  area_km2: number | null
  pop: number | null
  lifeExp: number | null
  gdpPerCap: number | null
}

type SummaryData = {
  total: number | null
  avg: number | null
  med: number | null
  min: number | null
  max: number | null
}

type RegionTree = {
  [continentName: string]: ContinentNode
}

type ContinentNode = {
  [regionName: string]: RegionNode
}

type RegionNode = {
  continent: string
  subregions: {
    [subregionName: string]: SubRegionNode
  }
}

type SubRegionNode = {
  region: string
  countries: {
    [countryName: string]: Country
  }
}

type RegionSelection =
  | { continent: null; region: null; subregion: null }
  | { continent: string; region: null; subregion: null }
  | { continent: string; region: string; subregion: null }
  | { continent: string; region: string; subregion: string }

type FilterSelection = RegionSelection & {
  type: string | null
}
