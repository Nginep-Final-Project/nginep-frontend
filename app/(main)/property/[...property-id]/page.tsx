import Description from './_components/Description'
import FacilityList from './_components/FacilityList'
import ImageGallery from './_components/ImageGallery'

const PropertyDetail = () => {
  return (
    <div>
      <ImageGallery
        images={[
          'https://dummyimage.com/300x200/000/fff',
          'https://dummyimage.com/400x300/00ff00/000',
          'https://dummyimage.com/600x400/0000ff/fff',
          'https://dummyimage.com/300x200/000/fff',
          'https://dummyimage.com/400x300/00ff00/000',
          'https://dummyimage.com/400x300/00ff00/000',
          'https://dummyimage.com/600x400/0000ff/fff',
        ]}
      />
      <div className='grid md:grid-cols-2'>
        <div>
          <Description description='https://dummyimage.com/300x200/000/fffhttps://dummyimage.com/400x300/00ff00/000https://dummyimage.com/600x400/0000ff/fffhttps://dummyimage.com/300x200/000/fffhttps://dummyimage.com/400x300/00ff00/000https://dummyimage.com/400x300/00ff00/000https://dummyimage.com/600x400/0000ff/fff' />
        </div>
        <div></div>
      </div>
      <FacilityList
        amenities={[
          'Wifi',
          'TV',
          'Private Pool',
          'Free parking on premises',
          'TV',
        ]}
      />
    </div>
  )
}
export default PropertyDetail
