'use client'

import { useEffect, useState } from 'react'
import StepTwo from './_components/StepTwo'
import StepOne from './_components/StepOne'
import StepThree from './_components/StepThree'
import StepFour from './_components/StepFour'
import useProperty from '@/hooks/useProperty'
import { PropertyDetail } from '@/types/property'
import {
  CREATE_PROPERTY_STEP_FOUR,
  CREATE_PROPERTY_STEP_ONE,
  CREATE_PROPERTY_STEP_THREE,
  CREATE_PROPERTY_STEP_TWO,
} from '@/utils/constanta'

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

  useEffect(() => {
    sessionStorage.removeItem(CREATE_PROPERTY_STEP_ONE)
    sessionStorage.removeItem(CREATE_PROPERTY_STEP_TWO)
    sessionStorage.removeItem(CREATE_PROPERTY_STEP_THREE)
    sessionStorage.removeItem(CREATE_PROPERTY_STEP_FOUR)
  }, [])

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
        />
      )}
      {currentStep === 2 && (
        <StepTwo
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          propertyData={propertyData.result}
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
