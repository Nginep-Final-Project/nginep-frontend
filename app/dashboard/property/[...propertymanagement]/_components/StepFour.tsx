import { Button } from '@/components/ui/button'
import moment from 'moment'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import PeakSeasonRate, { PeakSeasonRateFormValues } from './PeakSeasonRate'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PropertyCreatePeakSeasonSchema } from '@/utils/schema'
import { Progress } from '@/components/ui/progress'
import {
  CREATE_PROPERTY_STEP_FOUR,
  CREATE_PROPERTY_STEP_ONE,
  CREATE_PROPERTY_STEP_THREE,
  CREATE_PROPERTY_STEP_TWO,
} from '@/utils/constanta'
import usePropertyManagement from '@/hooks/usePropertyManagement'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { PropertyDetail } from '@/types/property'
import usePeakSeasonRate from '@/hooks/usePeakSeasonRate'

const StepFour: React.FC<{
  isEditingMode: boolean
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>
  propertyData: PropertyDetail
}> = ({ isEditingMode, currentStep, setCurrentStep, propertyData }) => {
  const [editingPeakSeason, setEditingPeakSeason] =
    useState<PeakSeasonRateFormValues | null>(null)
  const [isPeakSeasonPriceOpen, setIsPeakSeasonPriceOpen] = useState(false)

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<z.infer<typeof PropertyCreatePeakSeasonSchema>>({
    resolver: zodResolver(PropertyCreatePeakSeasonSchema),
    defaultValues: {
      peakSeasonRates: [],
    },
  })
  const router = useRouter()
  const { handleCreateProperty, handleUpdateProperty, loading } =
    usePropertyManagement()
  const {
    handleDeletePeakSeason,
    handleUpdatePeakSeason,
    handleCreatePeakSeason,
    loading: loadingPeakSeason,
  } = usePeakSeasonRate()

  useEffect(() => {
    if (currentStep === 4) {
      const storageData = sessionStorage.getItem(CREATE_PROPERTY_STEP_FOUR)
      if (storageData) {
        const parseData = JSON.parse(storageData)
        reset(parseData)
        return
      }
      if (propertyData.peakSeasonRate.length > 0) {
        reset({
          peakSeasonRates: propertyData.peakSeasonRate,
        })
      }
    }
  }, [currentStep, propertyData, reset])

  const handleSavePeakSeasonRate = async (
    peakSeasonRate: PeakSeasonRateFormValues
  ) => {
    try {
      const currentPeakSeasonRates = watch('peakSeasonRates') || []
      if (editingPeakSeason) {
        console.log('editingPeakSeason', peakSeasonRate)
        if (isEditingMode === true) {
          const result = await handleUpdatePeakSeason({
            id: editingPeakSeason.id!,
            peakSeasonDates: {
              from: peakSeasonRate.peakSeasonDates?.from!,
              to: peakSeasonRate.peakSeasonDates?.to!,
            },
            rateType: peakSeasonRate.rateType,
            rateValue: peakSeasonRate.rateValue,
          })
          if (result?.success) {
            setValue(
              'peakSeasonRates',
              currentPeakSeasonRates.map((p) =>
                p.id === editingPeakSeason.id
                  ? {
                      ...peakSeasonRate,
                      id: editingPeakSeason.id,
                    }
                  : p
              )
            )
          }
          setEditingPeakSeason(null)
          setIsPeakSeasonPriceOpen(false)
          return
        }
        setValue(
          'peakSeasonRates',
          currentPeakSeasonRates.map((p) =>
            p.id === editingPeakSeason.id
              ? {
                  ...peakSeasonRate,
                  id: editingPeakSeason.id,
                }
              : p
          )
        )
      } else {
        if (isEditingMode === true) {
          const result = await handleCreatePeakSeason({
            peakSeasonDates: {
              from: peakSeasonRate.peakSeasonDates?.from!,
              to: peakSeasonRate.peakSeasonDates?.to!,
            },
            rateType: peakSeasonRate.rateType,
            rateValue: peakSeasonRate.rateValue,
            propertyId: propertyData.id,
          })
          if (result?.success) {
            setValue('peakSeasonRates', [
              ...currentPeakSeasonRates,
              { ...peakSeasonRate, id: result.data.id },
            ])
          }
          setEditingPeakSeason(null)
          setIsPeakSeasonPriceOpen(false)
          return
        }
        setValue('peakSeasonRates', [
          ...currentPeakSeasonRates,
          { ...peakSeasonRate, id: Math.floor(Math.random() * 1000000) },
        ])
      }
      setEditingPeakSeason(null)
      setIsPeakSeasonPriceOpen(false)
    } catch (error) {
      console.log('Save peak season error: ', error)
    }
  }

  const handleEdit = (peakSeasonRate: PeakSeasonRateFormValues) => {
    setEditingPeakSeason(peakSeasonRate)
    setIsPeakSeasonPriceOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      if (isEditingMode === true) {
        const result = await handleDeletePeakSeason(id)
        if (result?.success) {
          const currentPeakSeason = watch('peakSeasonRates') || []
          setValue(
            'peakSeasonRates',
            currentPeakSeason.filter(
              (peakSeasonRate) => peakSeasonRate.id !== id
            )
          )
        }
        return
      }
      const currentPeakSeason = watch('peakSeasonRates') || []
      setValue(
        'peakSeasonRates',
        currentPeakSeason.filter((peakSeasonRate) => peakSeasonRate.id !== id)
      )
    } catch (error) {
      console.log('Delete peak season error: ', error)
    }
  }

  const onSubmit = async (
    data: z.infer<typeof PropertyCreatePeakSeasonSchema>
  ) => {
    try {
      console.log('submit')
      sessionStorage.setItem(CREATE_PROPERTY_STEP_FOUR, JSON.stringify(data))
      const stepOneStorage = sessionStorage.getItem(CREATE_PROPERTY_STEP_ONE)
      const stepTwoStorage = sessionStorage.getItem(CREATE_PROPERTY_STEP_TWO)
      const stepThreeStorage = sessionStorage.getItem(
        CREATE_PROPERTY_STEP_THREE
      )
      const parseDataStepOne = JSON.parse(stepOneStorage!)
      const parseDataStepTwo = JSON.parse(stepTwoStorage!)
      const parseDataStepThree = JSON.parse(stepThreeStorage!)

      const request = {
        ...parseDataStepOne,
        ...parseDataStepTwo,
        ...parseDataStepThree,
        ...data,
      }
      console.log('request create property>>>>', request)
      let result
      if (isEditingMode === true) {
        result = await handleUpdateProperty({ ...request, id: propertyData.id })
      } else {
        result = await handleCreateProperty(request)
      }
      if (!result?.success) {
        toast({
          variant: 'destructive',
          title: result?.message,
        })
        return
      }
      toast({
        title: result.message,
      })
      sessionStorage.removeItem(CREATE_PROPERTY_STEP_ONE)
      sessionStorage.removeItem(CREATE_PROPERTY_STEP_TWO)
      sessionStorage.removeItem(CREATE_PROPERTY_STEP_THREE)
      sessionStorage.removeItem(CREATE_PROPERTY_STEP_FOUR)
      router.push('/dashboard/property-list')
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Create Property failed',
      })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='min-h-96'>
          <div className='flex gap-x-4 items-center'>
            <h3 className='text-sm font-medium'>Peak Season Rate Management</h3>
            <Button
              type='button'
              onClick={() => setIsPeakSeasonPriceOpen(true)}
            >
              Add Peak Season
            </Button>
          </div>

          {errors.peakSeasonRates && (
            <p className='text-red-500 mt-1'>
              {errors.peakSeasonRates.message}
            </p>
          )}

          <div className='mt-1 mb-4 space-y-4'>
            {watch('peakSeasonRates')?.map((peakSeason) => (
              <div
                key={peakSeason.id}
                className='grid grid-cols-4 border rounded'
              >
                <div className='border-r p-4'>
                  <h4 className='font-medium'>Date: </h4>
                  <p className='text-sm'>
                    from:{' '}
                    {moment(peakSeason.peakSeasonDates?.from).format(
                      'YYYY-MM-DD'
                    )}
                    <br />
                    to:{' '}
                    {moment(peakSeason.peakSeasonDates?.to).format(
                      'YYYY-MM-DD'
                    )}
                  </p>
                </div>

                <div className='border-r p-4'>
                  <h4 className='font-medium'>Rate value</h4>
                  {peakSeason.rateType === 'PERCENTAGE' ? (
                    <p className='text-sm'>{peakSeason.rateValue}% /night</p>
                  ) : (
                    <p className='text-sm'>IDR{peakSeason.rateValue} /night</p>
                  )}
                </div>
                <div className='flex flex-col items-start px-4'>
                  <Button
                    variant='link'
                    onClick={() => handleEdit(peakSeason)}
                    className='font-semibold p-0'
                    type='button'
                  >
                    Edit
                  </Button>
                  <Button
                    variant='link'
                    onClick={() => handleDelete(peakSeason.id!)}
                    className='font-semibold text-primary p-0'
                    type='button'
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-x-4'>
          <Button
            variant='cancel'
            type='button'
            onClick={() => {
              setCurrentStep(3)
            }}
          >
            Back
          </Button>
          <Progress value={(4 / 4) * 100} className='flex-grow h-2' />
          <Button type='submit' disabled={loading}>
            {loading ? 'Loading...' : isEditingMode ? 'Update' : 'Save'}
          </Button>
        </div>
      </form>
      <PeakSeasonRate
        open={isPeakSeasonPriceOpen}
        onOpenChange={setIsPeakSeasonPriceOpen}
        onSave={handleSavePeakSeasonRate}
        initialPeakSeason={editingPeakSeason}
      />
    </div>
  )
}
export default StepFour
