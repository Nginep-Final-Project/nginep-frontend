'use client'

import { useState } from 'react'
import StepTwo from './_components/StepTwo'
import StepOne from './_components/StepOne'
import StepThree from './_components/StepThree'
import StepFour from './_components/StepFour'
import useProperty from '@/hooks/useProperty'

interface PropertyManagementProps {
  params: { propertymanagement: string[] }
}

const PropertyManagement: React.FC<PropertyManagementProps> = ({ params }) => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const mode = params.propertymanagement[0]
  const propertyId = params.propertymanagement[1]
  const isEditMode = mode === 'edit'
  const propertyData = useProperty(Number(propertyId))

  return (
    <div className='p-4 lg:px-32 '>
      <h2 className='font-semibold md:text-2xl mb-4'>
        {`${isEditMode ? 'Edit' : 'Create'}`} Property
      </h2>
      {currentStep === 1 && (
        <StepOne
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          propertyData={propertyData.result}
          isEditingMode={isEditMode}
        />
      )}
      {currentStep === 2 && (
        <StepTwo
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          propertyData={propertyData.result}
          isEditingMode={isEditMode}
        />
      )}
      {currentStep === 3 && (
        <StepThree
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          propertyData={propertyData.result}
        />
      )}
      {currentStep === 4 && (
        <StepFour
          isEditingMode={isEditMode}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          propertyData={propertyData.result}
        />
      )}
    </div>
  )
}
export default PropertyManagement
