import { PlusIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'

export type ButtonIncrementProps = {
  onClick: () => void
  className?: string
  disabled?: boolean
}

export const ButtonIncrement = ({
  onClick,
  className,
  disabled,
}: ButtonIncrementProps) => {
  return (
    <button
      disabled={disabled}
      className={classNames([
        'flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-gray-600 p-2 ring ring-gray-600',
        className,
        { 'cursor-not-allowed bg-gray-500 opacity-30': disabled },
      ])}
      onClick={onClick}
    >
      <PlusIcon className="h-4 w-4 text-gray-400" />
    </button>
  )
}
