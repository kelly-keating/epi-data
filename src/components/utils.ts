import data from '../../data/worldData_clean.json'
export const COUNTRY_DATA: Country[] = data

export function getDataSummary(data: number[]): SummaryData {
  return {
    total: sum(data),
    avg: avg(data),
    med: median(data),
    min: min(data),
    max: max(data),
  }
}

export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0)
}

export function avg(arr: number[]): number {
  if (arr.length === 0) return 0
  const sum = arr.reduce((acc, val) => acc + val, 0)
  return sum / arr.length
}

export function median(arr: number[]): number {
  if (arr.length === 0) return 0
  const sorted = [...arr].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)

  // If even, average two middle numbers
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid]
}

/*
[1, 1, 1, 1, 1]   l = 5 > 2.5   m = 2
[1, 1, 1, 1]      l = 4 > 2     m = 2 & 1
*/

export function min(arr: number[]): number | null {
  if (arr.length === 0) return null
  return Math.min(...arr)
}

export function max(arr: number[]): number | null {
  if (arr.length === 0) return null
  return Math.max(...arr)
}
