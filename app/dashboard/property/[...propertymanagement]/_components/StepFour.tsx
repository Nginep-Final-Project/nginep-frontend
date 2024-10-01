import { Button } from '@/components/ui/button'
import moment from 'moment'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import PeakSeasonRate, { PeakSeasonRateFormValues } from './PeakSeasonRate'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PropertyCreatePeakSeasonSchema } from '@/utils/schema'
import { Progress } from '@/components/ui/progress'
import { CREATE_PROPERTY_STEP_FOUR } from '@/utils/constanta'

const StepFour: React.FC<{
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>
}> = ({ currentStep, setCurrentStep }) => {
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
  })

  useEffect(() => {
    if (currentStep === 4) {
      const storageData = sessionStorage.getItem(CREATE_PROPERTY_STEP_FOUR)
      if (storageData) {
        const parseData = JSON.parse(storageData)
        console.log(parseData)
        reset(parseData)
      }
    }
  }, [currentStep, reset])

  const handleSavePeakSeasonRate = (
    peakSeasonRate: PeakSeasonRateFormValues
  ) => {
    const currentPeakSeasonRates = watch('peakSeasonRate') || []
    if (editingPeakSeason) {
      setValue(
        'peakSeasonRate',
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
      setValue('peakSeasonRate', [
        ...currentPeakSeasonRates,
        { ...peakSeasonRate, id: Date.now().toString() },
      ])
    }
    setEditingPeakSeason(null)
    setIsPeakSeasonPriceOpen(false)
  }

  const handleEditPeakSeasonRate = (
    peakSeasonRate: PeakSeasonRateFormValues
  ) => {
    setEditingPeakSeason(peakSeasonRate)
    setIsPeakSeasonPriceOpen(true)
  }

  const handleDeletePeakSeason = (id: string) => {
    const currentPeakSeason = watch('peakSeasonRate') || []
    setValue(
      'peakSeasonRate',
      currentPeakSeason.filter((peakSeasonRate) => peakSeasonRate.id !== id)
    )
  }

  const onSubmit = (data: z.infer<typeof PropertyCreatePeakSeasonSchema>) => {
    console.log('submit')
    console.log(data)
    sessionStorage.setItem(CREATE_PROPERTY_STEP_FOUR, JSON.stringify(data))
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className='flex gap-x-4 items-center'>
            <h3 className='text-sm font-medium'>Peak Season Rate Management</h3>
            <Button
              type='button'
              onClick={() => setIsPeakSeasonPriceOpen(true)}
            >
              Add Peak Season
            </Button>
          </div>

          {errors.peakSeasonRate && (
            <p className='text-red-500 mt-1'>{errors.peakSeasonRate.message}</p>
          )}

          <div className='mt-1 mb-4 space-y-4'>
            {watch('peakSeasonRate')?.map((peakSeason) => (
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
                    <p className='text-sm'>Rp{peakSeason.rateValue} /night</p>
                  )}
                </div>
                <div className='flex flex-col items-start px-4'>
                  <Button
                    variant='link'
                    onClick={() => handleEditPeakSeasonRate(peakSeason)}
                    className='font-semibold p-0'
                  >
                    Edit
                  </Button>
                  <Button
                    variant='link'
                    onClick={() => handleDeletePeakSeason(peakSeason.id!)}
                    className='font-semibold text-primary p-0'
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
          <Button type='submit'>Save</Button>
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
