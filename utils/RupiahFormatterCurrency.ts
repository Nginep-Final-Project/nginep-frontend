export const formatRupiah = (value: number | string): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(numValue)) {
    throw new Error('Invalid input: cannot be converted to a number')
  }

  const formattedNumber = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numValue)

  return formattedNumber.replace('Rp', 'IDR').replace(/\s/g, '')
}
