import { defaultDisallowedRegions } from 'api/mapping'
import { useQuery } from 'react-query'

import { useStakePoolMetadata } from './useStakePoolMetadata'

export const useUserRegion = () => {
  const { data: stakePoolMetadata } = useStakePoolMetadata()

  return useQuery<{
    countryCode: string
    countryName: string
    isAllowed: boolean | undefined
  }>(
    [
      'useUserRegion',
      defaultDisallowedRegions
        .concat(stakePoolMetadata?.disallowRegions || [])
        .map((r) => `${r.code}}`),
    ],
    async () => {
      const response = await fetch(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.GEO_LOCATION_API_KEY}`
      )
      const json = (await response.json()) as {
        country_code2: string
        country_name: string
      }
      return {
        countryName: json.country_name ?? 'Unknown',
        countryCode: json.country_code2,
        isAllowed:
          !!json.country_code2 &&
          !defaultDisallowedRegions
            .concat(stakePoolMetadata?.disallowRegions || [])
            .some((r) => r.code === json.country_code2),
      }
    }
  )
}
