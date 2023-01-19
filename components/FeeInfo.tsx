import { Tooltip } from 'common/Tooltip'
import { useClaimRewardsPaymentInfo } from 'hooks/useClaimRewardsPaymentInfo'
import { useMintDecimals } from 'hooks/useMintDecimals'
import { isStakePoolV2, useStakePoolData } from 'hooks/useStakePoolData'
import { useEffect } from 'react'
import { BsFillCreditCardFill, BsFillInfoCircleFill } from 'react-icons/bs'

export const FeeInfo: React.FC = () => {
  const { data: stakePool } = useStakePoolData()
  const { data: claimRewardsPaymentInfo } = useClaimRewardsPaymentInfo()
  // const { data: unstakePaymentInfo } = useUnstakePaymentInfo()
  // const { data: stakePaymentInfo } = useStakePaymentInfo()
  const { data: claimRewardsPaymentMintDecimals } = useMintDecimals(
    claimRewardsPaymentInfo?.parsed
      ? claimRewardsPaymentInfo.parsed.paymentMint
      : undefined
  )
  // const { data: unstakePaymentMintDecimals } = useMintDecimals(
  //   unstakePaymentInfo?.parsed
  //     ? claimRewardsPaymentInfo.parsed.paymentMint
  //     : undefined
  // )
  // const { data: stakePaymentMintDecimals } = useMintDecimals(
  //   stakePaymentInfo?.parsed
  //     ? claimRewardsPaymentInfo.parsed.paymentMint
  //     : undefined
  // )

  useEffect(() => {
    console.log(
      'claimRewardsPaymentMintDecimals',
      claimRewardsPaymentMintDecimals
    )
    // console.log('unstakePaymentMintDecimals', unstakePaymentMintDecimals)
    // console.log('stakePaymentMintDecimals', stakePaymentMintDecimals)

    console.log('mintDecimals', claimRewardsPaymentMintDecimals)
  }, [claimRewardsPaymentInfo, claimRewardsPaymentMintDecimals])

  return (
    <div className="flex space-x-8">
      {!!stakePool?.parsed && (
        <div>
          <Tooltip
            title={`This is the version of the stake pool protocol that this stake pool is using. Each version handles fees differently.`}
          >
            <div className="flex cursor-pointer flex-row items-center justify-center gap-2">
              <BsFillInfoCircleFill className="text-medium-4" />
              <div className="text-medium-4">Protocol version: </div>
              <div className="text-light-1">
                {isStakePoolV2(stakePool.parsed) ? 'V2' : 'V1'}
              </div>
            </div>
          </Tooltip>
        </div>
      )}
      {!!stakePool?.parsed && !isStakePoolV2(stakePool.parsed) && (
        <div className="flex flex-row items-center justify-center gap-2">
          <BsFillCreditCardFill className="text-medium-4" />
          <div className="text-medium-4">Fee: </div>
          <a
            className="text-gray-400 underline"
            target="_blank"
            rel="noreferrer"
            href="//cardinal-labs.notion.site/Cardinal-Staking-Costs-14e66a64fb2d4615892937c5dbaa91cc"
          >
            View staking costs
          </a>
        </div>
      )}
      {!!stakePool?.parsed && isStakePoolV2(stakePool.parsed) && (
        <div className="flex flex-row items-center justify-center gap-8">
          {/* <div className="flex items-center gap-2">
            <TagIcon className="h-5 w-5 text-medium-4" />
            <div className="text-medium-4">Reward Claim Fee: </div>
            {claimRewardsPaymentInfo?.formattedAmountWithSymbol
              ? claimRewardsPaymentInfo?.formattedAmountWithSymbol
              : undefined}
          </div>
          <div className="flex items-center gap-2">
            <ArrowUpOnSquareIcon className="h-5 w-5 text-medium-4" />
            <div className="text-medium-4">Unstake Fee: </div>
            {unstakePaymentInfo?.formattedAmountWithSymbol
              ? unstakePaymentInfo?.formattedAmountWithSymbol
              : undefined}
          </div>
          <div className="flex items-center gap-2">
            <ArrowDownOnSquareIcon className="h-5 w-5 text-medium-4" />
            <div className="text-medium-4">Stake Fee: </div>
            {stakePaymentInfo?.formattedAmountWithSymbol
              ? stakePaymentInfo?.formattedAmountWithSymbol
              : undefined}
          </div> */}
        </div>
      )}
    </div>
  )
}
