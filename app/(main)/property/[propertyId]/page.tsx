import { Metadata } from 'next'
import DetailProperty from './_components/DetailProperty'
import { response } from '@/types/response'

type Props = {
  params: {
    propertyId: number
  }
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/property/${params.propertyId}`
  )

  if (!response.ok) {
    return {
      title: `${params.propertyId}`,
    }
  }

  const result: response = await response.json()
  return {
    title: `${result?.data.propertyName}`,
  }
}

const PropertyId: React.FC<Props> = ({ params }) => {
  return <DetailProperty propertyId={params.propertyId} />
}
export default PropertyId
