/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from '@/components/ui/use-toast'
import { emptyPropertyData, Properties, Property } from '@/types/property'
import { response } from '@/types/response'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

interface SearchResponse {
  statusCode: number
  message: string
  success: boolean
  data: Properties
}

interface QueryParams {
  propertyName?: string
  propertyCategory?: string
  propertyCity?: string
  checkinDate?: string
  checkoutDate?: string
  totalGuests?: number
  sortBy?: string
  sortDirection?: string
  page?: number
  size?: number

  [key: string]: string | number | undefined
}

const useSearchProperty = (initialParams: QueryParams = {}) => {
  const [data, setData] = useState<Properties>(emptyPropertyData.properties)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | unknown>()
  const router = useRouter()
  const searchParams = useSearchParams()

  const fetchProperty = async (
    params: QueryParams,
    append: boolean = false
  ) => {
    setLoading(true)

    const filteredParams = Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value !== '' && value !== undefined) {
          acc[key] = value.toString()
        }
        return acc
      },
      {} as Record<string, string>
    )

    const queryString = new URLSearchParams(filteredParams).toString()

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/property?${queryString}`
      )

      const result: SearchResponse = await response.json()

      if (!result.success) {
        toast({
          variant: 'destructive',
          title: 'Ups something error',
          description: result.message,
        })
        return
      }

      setData((prevData) => {
        if (append && prevData) {
          return {
            ...result.data,
            content: [...prevData.content, ...result.data.content],
          }
        }

        return result.data
      })
      setLoading(false)

      router.push(`?${queryString}`, { scroll: false })
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProperty(initialParams)
  }, [])

  const refetch = useCallback(
    (newParams: QueryParams = {}, append: boolean = false) => {
      const currentParams = Object.fromEntries(searchParams.entries())
      const combinedParams = {
        ...initialParams,
        ...currentParams,
        ...newParams,
      }

      const filteredParams = Object.entries(combinedParams).reduce<QueryParams>(
        (acc, [key, value]) => {
          if (value !== '' && value !== undefined) {
            acc[key as keyof QueryParams] = value
          }
          return acc
        },
        {} as QueryParams
      )

      fetchProperty(filteredParams, append)
    },
    [searchParams, initialParams]
  )

  return { data, loading, error, refetch }
}
export default useSearchProperty
