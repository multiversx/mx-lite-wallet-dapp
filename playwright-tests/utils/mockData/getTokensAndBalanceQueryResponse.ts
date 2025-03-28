export const getTokensAndBalanceQueryResponse = {
  swap: {
    amountIn: '1000000000000000',
    tokenInID: 'EGLD',
    tokenInPriceUSD: '27.11354306705012408107787404715049015128233',
    tokenInExchangeRateDenom: '6532723.081761538151261',
    amountOut: '6532723081761538151261',
    tokenOutID: 'MEX-a659d0',
    tokenOutPriceUSD:
      '0.000004137967794945746881166907774827473676894520602775344168343556496430443132',
    tokenOutExchangeRateDenom: '0.000000153075522639',
    fees: ['0.000003'],
    swapType: 0,
    tokenRoute: ['WEGLD-a28c59', 'MEX-a659d0'],
    pricesImpact: ['0.000017431879656883'],
    maxPriceDeviationPercent: 0.9,
    tokensPriceDeviationPercent: null,
    intermediaryAmounts: ['1000000000000000', '6532723081761538151261'],
    pairs: [
      {
        address:
          'erd1qqqqqqqqqqqqqpgqzw0d0tj25qme9e4ukverjjjqle6xamay0n4s5r0v9g',
        firstToken: {
          balance: null,
          decimals: 18,
          name: 'WrappedEGLD',
          identifier: 'WEGLD-a28c59',
          ticker: 'WEGLD',
          owner:
            'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
          assets: {
            website: 'https://xexchange.com',
            description:
              'wEGLD is an ESDT token that has the same value as EGLD, the native coin of the MultiversX blockchain.',
            status: 'active',
            pngUrl:
              'https://devnet-media.elrond.com/tokens/asset/WEGLD-a28c59/logo.png',
            svgUrl:
              'https://devnet-media.elrond.com/tokens/asset/WEGLD-a28c59/logo.svg',
            __typename: 'AssetsModel'
          },
          price: '27.11354306705012408107787404715049015128233',
          type: 'Core',
          __typename: 'EsdtToken'
        },
        firstTokenPrice: '6552381.36463205876784572609978588941565588918',
        firstTokenPriceUSD: '27.11354306705012408107787404715049015128233',
        firstTokenVolume24h:
          '351802050490594624.0000000000000000000000000000000000000000000000000000000000000000',
        firstTokenLockedValueUSD:
          '155073.33837607012589317828740677497788009340889354125610733108576',
        secondToken: {
          balance: null,
          decimals: 18,
          name: 'MEX',
          identifier: 'MEX-a659d0',
          ticker: 'MEX',
          owner:
            'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
          assets: {
            website: 'https://xexchange.com',
            description:
              'MEX the token used to incentivize liquidity provision to the xExchange.',
            status: 'active',
            pngUrl:
              'https://devnet-media.elrond.com/tokens/asset/MEX-a659d0/logo.png',
            svgUrl:
              'https://devnet-media.elrond.com/tokens/asset/MEX-a659d0/logo.svg',
            __typename: 'AssetsModel'
          },
          price:
            '0.000004137967794945746881166907774827473676894520602775344168343556496430443132',
          type: 'Core',
          __typename: 'EsdtToken'
        },
        secondTokenPrice: '0.0000001526162694677271456764092389404',
        secondTokenPriceUSD:
          '0.000004137967794945746881166907774827473676894520602775344168343556496430443132',
        secondTokenVolume24h:
          '2298679322466094840975635.0000000000000000000000000000000000000000000000000000000000000000',
        secondTokenLockedValueUSD:
          '155073.33837607012589317828740677092541034854403020837198306613848104480572487827494884723139553155776',
        liquidityPoolToken: {
          balance: null,
          decimals: 18,
          name: 'EGLDMEXLP',
          identifier: 'EGLDMEX-95c6d5',
          ticker: 'EGLDMEX',
          owner:
            'erd1qqqqqqqqqqqqqpgqa7hv0nahgsl8tz0psat46x0tchm0wuyc0n4s6q28ad',
          assets: {
            website: 'https://xexchange.com',
            description:
              'Liquidity Provider (LP) Token obtained by adding liquidity in the EGLD/MEX pool on the xExchange.',
            status: 'active',
            pngUrl:
              'https://devnet-media.elrond.com/tokens/asset/EGLDMEX-95c6d5/logo.png',
            svgUrl:
              'https://devnet-media.elrond.com/tokens/asset/EGLDMEX-95c6d5/logo.svg',
            __typename: 'AssetsModel'
          },
          price: '0',
          type: 'Unlisted',
          __typename: 'EsdtToken'
        },
        state: 'Active',
        type: 'Core',
        lockedValueUSD:
          '310146.67675214025178635657481354590329044195292374962809039722424104480572487827494884723139553155776',
        info: {
          reserves0: '5719405169312741592672',
          reserves1: '37475723848185072883697979680',
          totalSupply: '5843866457534183991489',
          __typename: 'PairInfoModel'
        },
        feesAPR: '0.00002247492535854162',
        feesUSD24h:
          '0.0286459866172770840800000000000000000000000000000000000000000000',
        volumeUSD24h:
          '9.5340791620596836136000000000000000000000000000000000000000000000',
        totalFeePercent: 0.003,
        specialFeePercent: 0.001,
        lockedTokensInfo: null,
        __typename: 'PairModel'
      }
    ],
    transactions: [
      {
        value: '1000000000000000',
        receiver:
          'erd1qqqqqqqqqqqqqpgqepsrmke5dwvf8098dv5xyzhtlhsdmgp60n4sgk7gu2',
        gasPrice: 1000000000,
        gasLimit: 40200000,
        data: 'Y29tcG9zZVRhc2tzQDAwMDAwMDBhNGQ0NTU4MmQ2MTM2MzUzOTY0MzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMGEwMTVlYTIxZjlkYzExOTQ2NjQwN0BAQDAyQDAwMDAwMDE0NzM3NzYxNzA1NDZmNmI2NTZlNzM0NjY5Nzg2NTY0NDk2ZTcwNzU3NDAwMDAwMDBhNGQ0NTU4MmQ2MTM2MzUzOTY0MzAwMDAwMDAwYTAxNWVhMjFmOWRjMTE5NDY2NDA3',
        chainID: 'D',
        version: 1,
        __typename: 'TransactionModel'
      }
    ],
    __typename: 'AutoRouteModel'
  },
  tokens: [
    {
      balance: null,
      decimals: 18,
      name: 'WrappedEGLD',
      identifier: 'WEGLD-a28c59',
      ticker: 'WEGLD',
      owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
      assets: {
        website: 'https://xexchange.com',
        description:
          'wEGLD is an ESDT token that has the same value as EGLD, the native coin of the MultiversX blockchain.',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/WEGLD-a28c59/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/WEGLD-a28c59/logo.svg',
        __typename: 'AssetsModel'
      },
      price: '8.765483746358635844836834711608378084402624',
      type: 'Core',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'MEX',
      identifier: 'MEX-a659d0',
      ticker: 'MEX',
      owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
      assets: {
        website: 'https://xexchange.com',
        description:
          'MEX the token used to incentivize liquidity provision to the xExchange.',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/MEX-a659d0/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/MEX-a659d0/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '0.00003702523417825839228946160623614926408392025094925341464673058710238215030528',
      type: 'Core',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 6,
      name: 'USDC',
      identifier: 'usdc-123',
      ticker: 'USDC',
      owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
      assets: {
        website: null,
        description:
          'USDC stablecoin originating on Ethereum, bridged as an ESDT token on MultiversX. 1 USDC = 1 WrappedUSDC',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/USDC-350c4e/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/USDC-350c4e/logo.svg',
        __typename: 'AssetsModel'
      },
      price: '0.99988035464743019999393742383252298342178702947081486251553792',
      type: 'Core',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'RIDE',
      identifier: 'RIDE-05b1bb',
      ticker: 'RIDE',
      owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
      assets: {
        website: 'https://www.holoride.com',
        description:
          'The RIDE token is essential for building a vibrant and sustainable economy for the holoride ecosystem, connecting car manufacturers, content creators, brands, and passengers and enabling them to capture value along the way.',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/RIDE-05b1bb/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/RIDE-05b1bb/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '29.39782245714800763561205563329408325567868002749144080739511004808108024359326144',
      type: 'Core',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'ITHEUM',
      identifier: 'ITHEUM-fce905',
      ticker: 'ITHEUM',
      owner: 'erd1h45j98675dh8rl747w88g879l6c24cxhlyx3g9t9x46flqyt463qu6c68u',
      assets: {
        website: 'https://itheum.io',
        description:
          'The ITHEUM token forms the foundation for a decentralized web3 data economy, enabling vibrant and personalized metaverse worlds where data is traded with shared value between data creators and data consumers.',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/ITHEUM-fce905/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/ITHEUM-fce905/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '36.0116425650734878189048177012398973297231521876428974850441827432726722878790816',
      type: 'Core',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'UTK',
      identifier: 'UTK-14d57d',
      ticker: 'UTK',
      owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
      assets: {
        website: 'https://utrust.com/',
        description: 'Web3 L1 Payments Technology',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/UTK-14d57d/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/UTK-14d57d/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '0.03287152942702344790379056836310439457964950165576758696835287639833643658647232',
      type: 'Core',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'CRT',
      identifier: 'CRT-f55762',
      ticker: 'CRT',
      owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
      assets: {
        website: 'https://cantinaroyale.io',
        description:
          'The CRT token is essential for powering in-game utilities like NFT character progression, NFT recruiting, staking, and unlocking in-game assets inside of the Cantina Royale ecosystem.',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/CRT-f55762/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/CRT-f55762/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '0.953232698834321442165779565699550564974951374831838484902688658359110989488752',
      type: 'Core',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'ASH',
      identifier: 'ASH-e3d1b7',
      ticker: 'ASH',
      owner: 'erd1f0dwxpl3vxe936cla2mkky7nym4g3xn4vgfz497dpupqul8uktzshxqj5l',
      assets: {
        website: 'https://ashswap.io',
        description:
          'AshSwap is the first stable-swap DEX built on the MultiversX blockchain that allows users to trade stable assets with high volume and small slippage.',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/ASH-e3d1b7/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/ASH-e3d1b7/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '0.05405727068387925677008614730250953733777052486014885799590205507106833979149312',
      type: 'Core',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'Cryptgain',
      identifier: 'XCR-010281',
      ticker: 'XCR',
      owner: 'erd1qqqqqqqqqqqqqpgqy2h9w4jgy7f4ffrdy6nedgxz7f3srard0fuswqctup',
      assets: {
        website: 'https://pub-devnet.cryptgain.com',
        description:
          'Cryptgains are the Reward tokens for Delegators and Liquidity Providers on the CryptGain Platform. It is the basis for the minting of the GToken. CryptGain is a Liquidity Accelerator and Maintainer for DeFi on and Security of MultiversX blockchain.',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/XCR-010281/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/XCR-010281/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '0.00875538370289789899655915334859276032734528578117772887152834262582911698926848',
      type: 'Experimental',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 8,
      name: 'WrappedBTC',
      identifier: 'WBTC-05fd5b',
      ticker: 'WBTC',
      owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
      assets: {
        website: 'https://xexchange.com',
        description:
          'WBTC originating on Ethereum, bridged as an ESDT token on MultiversX. 1 WBTC = 1 WrappedBTC',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/WBTC-05fd5b/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/WBTC-05fd5b/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '13045.86045777840682219762032699066213686601347890920972034242092823678595166992770816',
      type: 'Experimental',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'WrappedETH',
      identifier: 'WETH-bbe4ab',
      ticker: 'WETH',
      owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
      assets: {
        website: 'https://xexchange.com',
        description:
          'WETH originating on Ethereum, bridged as an ESDT token on MultiversX. 1 WETH = 1 WrappedEth',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/WETH-bbe4ab/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/WETH-bbe4ab/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '536.57388442166207131517826145713992303927493706752123723179737242651618311405510016',
      type: 'Experimental',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'WrappedBUSD',
      identifier: 'BUSD-866948',
      ticker: 'BUSD',
      owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
      assets: {
        website: 'https://xexchange.com',
        description:
          'BUSD stablecoin originating on Ethereum, bridged as an ESDT token on MultiversX. 1 BUSD = 1 WrappedBUSD',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/BUSD-866948/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/BUSD-866948/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '0.36078347030676028713686184491923831611956697268738971094605895289237404670860992',
      type: 'Experimental',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 6,
      name: 'WrappedUSDT',
      identifier: 'USDT-58d5d0',
      ticker: 'USDT',
      owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
      assets: {
        website: 'https://xexchange.com',
        description:
          'USDT stablecoin originating on Ethereum, bridged as an ESDT token on MultiversX. 1 USDT = 1 WrappedUSDT',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/USDT-58d5d0/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/USDT-58d5d0/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '3.21495427131575408360495049515083493789252880209916671719242117085724261333393856',
      type: 'Experimental',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'Hatom',
      identifier: 'HTM-23a1da',
      ticker: 'HTM',
      owner: 'erd1crcnh3lmf5qzxlulmpqxtesrd8c3wfhkk67wrwahhz5j9tyw3qks2fxnak',
      assets: {
        website: 'https://hatom.com/',
        description:
          'HTM is the utility and governance token of Hatom, a liquidity protocol that empowers DeFi in the MultiversX blockchain',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/HTM-23a1da/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/HTM-23a1da/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '0.92967193812916735127757807457463808411404529833771046678263572336951572735683904',
      type: 'Experimental',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'OneDex',
      identifier: 'ONE-83a7c0',
      ticker: 'ONE',
      owner: 'erd1tkc62psh0flcj6anm6gt227gqqu7sp4xc3c3cc0fcmgk9ax6vcqs2w8h2s',
      assets: {
        website: 'https://devnet.onedex.app',
        description:
          'This is a permissionless exchange on the MultiversX blockchain',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/ONE-83a7c0/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/ONE-83a7c0/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '0.02350263879624598246856547385370557120093881221780639708787094912613327136625536',
      type: 'Experimental',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'LiquidEGLD',
      identifier: 'LEGLD-e8378b',
      ticker: 'LEGLD',
      owner: 'erd1qqqqqqqqqqqqqpgqe2hgwvy3mnxhr29em0243zashhy470lvvcqsf5fnxr',
      assets: {
        website: 'https://devnet-liquid.staking.agency',
        description:
          'This is the Liquid EGLD token of SALSA - Staking Agency Liquid Staking Algorithm.',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/LEGLD-e8378b/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/LEGLD-e8378b/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '14.64606127866382967620191660470099395209589632830051091242719975192212122226601152',
      type: 'Experimental',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 4,
      name: 'DBA',
      identifier: 'DBA-d182b4',
      ticker: 'DBA-d182b4',
      owner: 'erd1uwrjevgev47hxa4detygy7cjdxpqyrpf7y9xh3nxj3t3h3889chs8v48k0',
      assets: {
        website: null,
        description: null,
        status: null,
        pngUrl: null,
        svgUrl: null,
        __typename: 'AssetsModel'
      },
      price:
        '0.00026300186778258566748292434765649506830579867939960075404478182930037801271936',
      type: 'Experimental',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'PROTEO',
      identifier: 'PROTEO-6ca7c8',
      ticker: 'PROTEO-6ca7c8',
      owner: 'erd1hz8jd3dcq7j5dwx8ayv20q2rtxaed5hew6cygkg4yl5htmp5ec6qtkq9m9',
      assets: {
        website: null,
        description: null,
        status: null,
        pngUrl: null,
        svgUrl: null,
        __typename: 'AssetsModel'
      },
      price:
        '0.09190885539445322275038812546460776288737105313578114627297626954654453662452992',
      type: 'Experimental',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'Test1',
      identifier: 'TEST001-787cb5',
      ticker: 'TEST001-787cb5',
      owner: 'erd1qnxej25jf7s30sxfylu4rpvqxpx04yr2sk4sv08kmhwyf6vp6txsvperv7',
      assets: {
        website: null,
        description: null,
        status: null,
        pngUrl: null,
        svgUrl: null,
        __typename: 'AssetsModel'
      },
      price:
        '0.08845658116815581820537853050905073802391234415817738194387530124488854792836096',
      type: 'Experimental',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'CryptERD',
      identifier: 'CEGLD-b22b50',
      ticker: 'CEGLD',
      owner: 'erd1qqqqqqqqqqqqqpgqu56tqfpqgf6atlxhyel85934x6qxcnrt0fusrz7esh',
      assets: {
        website: 'https://pub-devnet.cryptgain.com',
        description:
          'CryptERD is the Liquid Version of Staked EGLD on the CryptGain Platform',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/CEGLD-b22b50/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/CEGLD-b22b50/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '1.31161738141548118641488450308179055179625144387278064925248014784411308532944',
      type: 'Experimental',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'SUPER',
      identifier: 'SUPER-19c5c5',
      ticker: 'SUPER-19c5c5',
      owner: 'erd1kc7v0lhqu0sclywkgeg4um8ea5nvch9psf2lf8t96j3w622qss8sav2zl8',
      assets: {
        website: null,
        description: null,
        status: null,
        pngUrl: null,
        svgUrl: null,
        __typename: 'AssetsModel'
      },
      price:
        '0.00511951261787800325482141914579832806780910695072584013772170337722862375723392',
      type: 'Experimental',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'sayanu',
      identifier: 'SAYANU-20d3cf',
      ticker: 'SAYANU-20d3cf',
      owner: 'erd1kyyepw297mmu4u48az9tl2pryed7kmz3m2c5huseczg4u8elpa2q9m2czv',
      assets: {
        website: null,
        description: null,
        status: null,
        pngUrl: null,
        svgUrl: null,
        __typename: 'AssetsModel'
      },
      price:
        '0.00050088478550620776256210484066333586549305352468961187189475796683320547313536',
      type: 'Experimental',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'first',
      identifier: 'FIRST-f56bf0',
      ticker: 'FIRST-f56bf0',
      owner: 'erd1hpulp028jrghyh9pmgrv7ch0gszxn3l3nkc9rslhvjrrfpv0vtcqcdvn2p',
      assets: {
        website: null,
        description: null,
        status: null,
        pngUrl: null,
        svgUrl: null,
        __typename: 'AssetsModel'
      },
      price: '0.0008765483746358635844836834711608378084402624',
      type: 'Experimental',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'Burnify',
      identifier: 'BBFY-1bb288',
      ticker: 'BBFY-1bb288',
      owner: 'erd1793tlju2h2ps3f5klqy3rkyj88h9njgx40ys5pkyz0cufhecxhrsenyyam',
      assets: {
        website: null,
        description: null,
        status: null,
        pngUrl: null,
        svgUrl: null,
        __typename: 'AssetsModel'
      },
      price:
        '0.02657408053148205100714788974853981189148905886861687870810859104354847801987712',
      type: 'Experimental',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'TokenTeeist',
      identifier: 'TEIST-c749b0',
      ticker: 'TEIST-c749b0',
      owner: 'erd19leefpxr7pm2ldp7l6kvnqsm94ay3vmwtf7pq7zz08wpeqermtvsp7hvs3',
      assets: {
        website: null,
        description: null,
        status: null,
        pngUrl: null,
        svgUrl: null,
        __typename: 'AssetsModel'
      },
      price: '0.000035061934985434543379347338846433512337610496',
      type: 'Experimental',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 4,
      name: 'Ofero',
      identifier: 'OFE-ce8cc5',
      ticker: 'OFE',
      owner: 'erd1gnwydt65ejpv0pyhxwk657d2wxktq0lccwqd2nan7pmcpxv5260q67havt',
      assets: {
        website: 'https://www.ofero.network/',
        description:
          'The utility token for Ofero Network an On-chain Financial Ecosystem (OFE)',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/OFE-ce8cc5/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/OFE-ce8cc5/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '0.00004294488683178907395798535587262175289808001797508720722546056591981488950656',
      type: 'Experimental',
      __typename: 'EsdtToken'
    },
    {
      balance: null,
      decimals: 18,
      name: 'MYTOKEN',
      identifier: 'MYTKN-ff031b',
      ticker: 'MYTKN-ff031b',
      owner: 'erd1z64ts8f9zd09lt5pjpl45qc75ryrrenjuygtvndlz5fuuwwf8ypsac53ec',
      assets: {
        website: null,
        description: null,
        status: null,
        pngUrl: null,
        svgUrl: null,
        __typename: 'AssetsModel'
      },
      price: '0.000026296451239075907534510504134825134253207872',
      type: 'Experimental',
      __typename: 'EsdtToken'
    }
  ],
  userTokens: [
    {
      balance: '74533625780835852234',
      decimals: 18,
      name: 'ASH',
      identifier: 'ASH-e3d1b7',
      ticker: 'ASH',
      owner: 'erd1f0dwxpl3vxe936cla2mkky7nym4g3xn4vgfz497dpupqul8uktzshxqj5l',
      assets: {
        website: 'https://ashswap.io',
        description:
          'AshSwap is the first stable-swap DEX built on the MultiversX blockchain that allows users to trade stable assets with high volume and small slippage.',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/ASH-e3d1b7/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/ASH-e3d1b7/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '0.05405727068387925677008614730250953733777052486014885799590205507106833979149312',
      type: 'Core',
      __typename: 'UserToken',
      valueUSD:
        '4.02908438388560509327119558596473844140958143003060372274463250672838243840137493410602421854763008'
    },
    {
      balance: '525764160779280897',
      decimals: 18,
      name: 'CRT',
      identifier: 'CRT-f55762',
      ticker: 'CRT',
      owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
      assets: {
        website: 'https://cantinaroyale.io',
        description:
          'The CRT token is essential for powering in-game utilities like NFT character progression, NFT recruiting, staking, and unlocking in-game assets inside of the Cantina Royale ecosystem.',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/CRT-f55762/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/CRT-f55762/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '0.953232698834321442165779565699550564974951374831838484902688658359110989488752',
      type: 'Core',
      __typename: 'UserToken',
      valueUSD:
        '0.501175589929996024807620541942471337834196927399843592180873102877793143133137084739672229970544'
    },
    {
      balance: '2333030074409783090',
      decimals: 18,
      name: 'ITHEUM',
      identifier: 'ITHEUM-fce905',
      ticker: 'ITHEUM',
      owner: 'erd1h45j98675dh8rl747w88g879l6c24cxhlyx3g9t9x46flqyt463qu6c68u',
      assets: {
        website: 'https://itheum.io',
        description:
          'The ITHEUM token forms the foundation for a decentralized web3 data economy, enabling vibrant and personalized metaverse worlds where data is traded with shared value between data creators and data consumers.',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/ITHEUM-fce905/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/ITHEUM-fce905/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '36.0116425650734878189048177012398973297231521876428974850441827432726722878790816',
      type: 'Core',
      __typename: 'UserToken',
      valueUSD:
        '84.016245133211911267868945355988404172417190106906473153099609906781599621031235410984498004410144'
    },
    {
      balance: '3737919608934972370767565',
      decimals: 18,
      name: 'MEX',
      identifier: 'MEX-a659d0',
      ticker: 'MEX',
      owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
      assets: {
        website: 'https://xexchange.com',
        description:
          'MEX the token used to incentivize liquidity provision to the xExchange.',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/MEX-a659d0/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/MEX-a659d0/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '0.00003702523417825839228946160623614926408392025094925341464673058710238215030528',
      type: 'Core',
      __typename: 'UserToken',
      valueUSD:
        '138.3973488603213828072050750965799595183355184364436573765611168660562501232327327361038203126722432'
    },
    {
      balance: '408556886',
      decimals: 18,
      name: 'RIDE',
      identifier: 'RIDE-05b1bb',
      ticker: 'RIDE',
      owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
      assets: {
        website: 'https://www.holoride.com',
        description:
          'The RIDE token is essential for building a vibrant and sustainable economy for the holoride ecosystem, connecting car manufacturers, content creators, brands, and passengers and enabling them to capture value along the way.',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/RIDE-05b1bb/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/RIDE-05b1bb/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '29.39782245714800763561205563329408325567868002749144080739511004808108024359326144',
      type: 'Core',
      __typename: 'UserToken',
      valueUSD:
        '0.00000001201068279827325844070988415359738857716482332862229744792267193287131641983858434451027584'
    },
    {
      balance: '210813227',
      decimals: 6,
      name: 'USDC',
      identifier: 'usdc-123',
      ticker: 'USDC',
      owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
      assets: {
        website: null,
        description:
          'USDC stablecoin originating on Ethereum, bridged as an ESDT token on MultiversX. 1 USDC = 1 WrappedUSDC',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/USDC-350c4e/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/USDC-350c4e/logo.svg',
        __typename: 'AssetsModel'
      },
      price: '0.99988035464743019999393742383252298342178702947081486251553792',
      type: 'Core',
      __typename: 'UserToken',
      valueUSD:
        '210.78800417712920771797732875420087768681442578948658348646188655606784'
    },
    {
      balance: '6481329380291',
      decimals: 18,
      name: 'UTK',
      identifier: 'UTK-14d57d',
      ticker: 'UTK',
      owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
      assets: {
        website: 'https://utrust.com/',
        description: 'Web3 L1 Payments Technology',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/UTK-14d57d/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/UTK-14d57d/logo.svg',
        __typename: 'AssetsModel'
      },
      price:
        '0.03287152942702344790379056836310439457964950165576758696835287639833643658647232',
      type: 'Core',
      __typename: 'UserToken',
      valueUSD:
        '0.00000021305120945046725391100104743869007598985844400656311285151899581583721660432586121942504512'
    },
    {
      balance: '104902009905869211661',
      decimals: 18,
      name: 'WrappedEGLD',
      identifier: 'WEGLD-a28c59',
      ticker: 'WEGLD',
      owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
      assets: {
        website: 'https://xexchange.com',
        description:
          'wEGLD is an ESDT token that has the same value as EGLD, the native coin of the MultiversX blockchain.',
        status: 'active',
        pngUrl:
          'https://devnet-media.elrond.com/tokens/asset/WEGLD-a28c59/logo.png',
        svgUrl:
          'https://devnet-media.elrond.com/tokens/asset/WEGLD-a28c59/logo.svg',
        __typename: 'AssetsModel'
      },
      price: '8.765483746358635844836834711608378084402624',
      type: 'Core',
      __typename: 'UserToken',
      valueUSD:
        '919.516862790249185764002570590374659664648563152250322999798464'
    }
  ],
  wrappingInfo: [
    {
      wrappedToken: {
        balance: null,
        decimals: 18,
        name: 'WrappedEGLD',
        identifier: 'WEGLD-a28c59',
        ticker: 'WEGLD',
        owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
        assets: {
          website: 'https://xexchange.com',
          description:
            'wEGLD is an ESDT token that has the same value as EGLD, the native coin of the MultiversX blockchain.',
          status: 'active',
          pngUrl:
            'https://devnet-media.elrond.com/tokens/asset/WEGLD-a28c59/logo.png',
          svgUrl:
            'https://devnet-media.elrond.com/tokens/asset/WEGLD-a28c59/logo.svg',
          __typename: 'AssetsModel'
        },
        price: '8.765483746358635844836834711608378084402624',
        type: 'Core',
        __typename: 'EsdtToken'
      },
      __typename: 'WrapModel'
    },
    {
      wrappedToken: {
        balance: null,
        decimals: 18,
        name: 'WrappedEGLD',
        identifier: 'WEGLD-a28c59',
        ticker: 'WEGLD',
        owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
        assets: {
          website: 'https://xexchange.com',
          description:
            'wEGLD is an ESDT token that has the same value as EGLD, the native coin of the MultiversX blockchain.',
          status: 'active',
          pngUrl:
            'https://devnet-media.elrond.com/tokens/asset/WEGLD-a28c59/logo.png',
          svgUrl:
            'https://devnet-media.elrond.com/tokens/asset/WEGLD-a28c59/logo.svg',
          __typename: 'AssetsModel'
        },
        price: '8.765483746358635844836834711608378084402624',
        type: 'Core',
        __typename: 'EsdtToken'
      },
      __typename: 'WrapModel'
    },
    {
      wrappedToken: {
        balance: null,
        decimals: 18,
        name: 'WrappedEGLD',
        identifier: 'WEGLD-a28c59',
        ticker: 'WEGLD',
        owner: 'erd1x39tc3q3nn72ecjnmcz7x0qp09kp97t080x99dgyhx7zh95j0n4szskhlv',
        assets: {
          website: 'https://xexchange.com',
          description:
            'wEGLD is an ESDT token that has the same value as EGLD, the native coin of the MultiversX blockchain.',
          status: 'active',
          pngUrl:
            'https://devnet-media.elrond.com/tokens/asset/WEGLD-a28c59/logo.png',
          svgUrl:
            'https://devnet-media.elrond.com/tokens/asset/WEGLD-a28c59/logo.svg',
          __typename: 'AssetsModel'
        },
        price: '8.765483746358635844836834711608378084402624',
        type: 'Core',
        __typename: 'EsdtToken'
      },
      __typename: 'WrapModel'
    }
  ],
  factory: {
    defaultSlippage: 0.01,
    slippageValues: [0.001, 0.005, 0.01],
    minSlippage: 0.001,
    maxSlippage: 0.05,
    minSwapAmount: 0.0005,
    maintenance: false,
    __typename: 'FactoryModel'
  }
};
