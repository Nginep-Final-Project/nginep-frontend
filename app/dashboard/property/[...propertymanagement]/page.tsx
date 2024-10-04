'use client'

import { useEffect, useState } from 'react'
import StepTwo from './_components/StepTwo'
import StepOne from './_components/StepOne'
import StepThree from './_components/StepThree'
import StepFour from './_components/StepFour'
import useProperty from '@/hooks/useProperty'
import { PropertyDetail } from '@/types/property'

interface PropertyManagementProps {
  params: { propertymanagement: string[] }
}

const PropertyManagement: React.FC<PropertyManagementProps> = ({ params }) => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const mode = params.propertymanagement[0]
  const propertyId = params.propertymanagement[1]
  const isEditMode = mode === 'edit'
  const propertyData = useProperty(Number(propertyId))
  console.log('propertyData', propertyData.result)
  return (
    <div className='p-4 lg:px-32 '>
      <h2 className='font-semibold md:text-2xl mb-4'>
        {`${isEditMode ? 'Edit' : 'Create'}`} Property
      </h2>
      {currentStep === 1 && (
        <StepOne currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 2 && (
        <StepTwo currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 3 && (
        <StepThree currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}
      {currentStep === 4 && (
        <StepFour
          isEditingMode={isEditMode}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      )}
    </div>
  )
}
export default PropertyManagement
