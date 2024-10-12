'use client'
import { Button } from '@/components/ui/button'
import PropertyCard from '../_component/PropertyCard'
import usePropertyList from '@/hooks/usePropertyList'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import usePropertyManagement from '@/hooks/usePropertyManagement'
import { useRouter } from 'next/navigation'
import PropertyListCardSkeleton from '../_component/PropertyListCardSkeleton'

const initialParams = {
  page: 0,
  size: 12,
}

const PropertyList = () => {
  const { data, setData, loading, error, refetch } =
    usePropertyList(initialParams)
  const { handleDeleteProperty, loading: loadingDelete } =
    usePropertyManagement()
  const router = useRouter()

  const handleEdit = (propertyId: number) => {
    router.push(`property/edit/${propertyId}`)
    console.log(`Edit button clicked for ${propertyId}`)
  }

  const handleDelete = async (propertyId: number) => {
    const result = await handleDeleteProperty(propertyId)
    if (result?.success) {
      const newData = data.content.filter((e) => e.id !== propertyId)
      setData((prevData) => {
        return {
          ...prevData,
          content: newData,
        }
      })
    }
    console.log(`Delete button clicked for ${propertyId}`)
  }

  const handleViewMore = () => {
    if (data) {
      refetch({ page: (data.pageable.pageNumber || 0) + 1 }, true)
    }
  }

  if (error) {
    return <Error />
  }

  if (loading || loadingDelete) {
    return <PropertyListCardSkeleton count={12} />
  }

  return (
    <>
      <div className='p-8 flex flex-col items-center'>
        {data.content.map((property) => (
          <PropertyCard
            key={property.id}
            propertyId={property.id}
            name={property.propertyName}
            location={`${property.propertyCity}, ${property.propertyProvince}`}
            rooms={property.rooms.map((e) => e.name)}
            imageUrl={property.propertyImage.map((e) => e.path)}
            onEdit={() => handleEdit(property.id)}
            onDelete={() => handleDelete(property.id)}
          />
        ))}
        {data.last === false && (
          <Button
            className='bg-black text-white rounded-3xl mt-4 mb-16 md:mt-8 lg:mb-36'
            onClick={handleViewMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Show more'}
          </Button>
        )}
      </div>
      {(loading || loadingDelete) && <Loading />}
    </>
  )
}
export default PropertyList
