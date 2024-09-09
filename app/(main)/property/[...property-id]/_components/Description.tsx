const Description: React.FC<{ description: string }> = ({ description }) => {
  return (
    <div className='w-full py-8 px-4 lg:px-32'>
      <h2 className='text-2xl font-bold pb-4 border-b border-secondary'>
        About this place
      </h2>
      <div className='w-full break-words overflow-hidden border-b border-grey-text py-4'>
        {description}
      </div>
    </div>
  )
}
export default Description
