const Description: React.FC<{ description: string }> = ({ description }) => {
  return (
    <div className=' h-full p-4 lg:pl-32 overflow-hidden'>
      <h2 className='text-xl sm:text-2xl font-bold pb-4 border-b border-secondary'>
        About this place
      </h2>
      <div className='py-4 md:py-14 overflow-y-auto border-b border-secondary'>
        <p className='whitespace-pre-wrap break-words'>{description}</p>
      </div>
    </div>
  )
}
export default Description
