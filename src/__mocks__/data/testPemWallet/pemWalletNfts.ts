import { keystoreAccount } from '../testKeystoreWallet';

export const pemWalletNfts = [
  {
    identifier: 'CHRISTMAS-27d3e2-01',
    collection: 'CHRISTMAS-27d3e2',
    attributes: 'dGFnczpDaHJpc3RtYXMsRGF5IE9uZSxuZnQtdGlja2V0',
    nonce: 1,
    type: 'SemiFungibleESDT',
    name: 'Day One',
    creator: keystoreAccount.address,
    royalties: 6,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1iZkd4d1dER25VTmNXNHIxRHdQdkU5aFJtMTl2azZQdmtGSG1pQnJjSEsyVw=='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmbfGxwWDGnUNcW4r1DwPvE9hRm19vk6PvkFHmiBrcHK2W',
    media: [
      {
        url: 'https://devnet-media.elrond.com/nfts/asset/QmbfGxwWDGnUNcW4r1DwPvE9hRm19vk6PvkFHmiBrcHK2W',
        originalUrl:
          'https://ipfs.io/ipfs/QmbfGxwWDGnUNcW4r1DwPvE9hRm19vk6PvkFHmiBrcHK2W',
        thumbnailUrl:
          'https://devnet-media.elrond.com/nfts/thumbnail/CHRISTMAS-27d3e2-0baaa417',
        fileType: 'image/png',
        fileSize: 1066627
      }
    ],
    isWhitelistedStorage: true,
    tags: ['Christmas', 'Day One', 'nft-ticket'],
    metadata: {},
    balance: '1',
    ticker: 'CHRISTMAS-27d3e2',
    isNsfw: false
  },
  {
    identifier: 'NOT-678420-01',
    collection: 'NOT-678420',
    attributes:
      'bWV0YWRhdGE6UW1ZZmNxQ2ZMVjJXMm5ZdTVKa3JuUDFKSFZzeWRKVG5qcDF0cEx3d1p1REZzTi84Lmpzb247dGFnczp0ZXN0',
    nonce: 1,
    type: 'NonFungibleESDT',
    name: 'nothing #8',
    creator: 'erd1qqqqqqqqqqqqqpgq0358sm3p4jkhtpk78t6lydp2ekj3yexju00sspvwdr',
    royalties: 0.2,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1ZZmNxQ2ZMVjJXMm5ZdTVKa3JuUDFKSFZzeWRKVG5qcDF0cEx3d1p1REZzTi84Lm1wNA==',
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1ZZmNxQ2ZMVjJXMm5ZdTVKa3JuUDFKSFZzeWRKVG5qcDF0cEx3d1p1REZzTi84Lmpzb24=',
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1ZZmNxQ2ZMVjJXMm5ZdTVKa3JuUDFKSFZzeWRKVG5qcDF0cEx3d1p1REZzTi9jb2xsZWN0aW9uLmpzb24='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmYfcqCfLV2W2nYu5JkrnP1JHVsydJTnjp1tpLwwZuDFsN/8.mp4',
    media: [
      {
        url: 'https://devnet-media.elrond.com/nfts/asset/QmYfcqCfLV2W2nYu5JkrnP1JHVsydJTnjp1tpLwwZuDFsN/8.mp4',
        originalUrl:
          'https://ipfs.io/ipfs/QmYfcqCfLV2W2nYu5JkrnP1JHVsydJTnjp1tpLwwZuDFsN/8.mp4',
        thumbnailUrl:
          'https://devnet-media.elrond.com/nfts/thumbnail/NOT-678420-59086e8a',
        fileType: 'video/mp4',
        fileSize: 16075584
      }
    ],
    isWhitelistedStorage: true,
    tags: ['test'],
    metadata: {
      name: 'EPONYMOUS #8',
      itheum_data_stream_url:
        'eyJBIjoiM2EzZTFhMjVkMDU5NTg1MjhhZWM0MWE3YzA3ZDkxZTljYzk0MTMwMDY4NTU2ODA4IiwiQiI6ImY1NGVmNWQ2ZWUyYTgxNDdhMDQzNWMzYWE4ZThmMzcxNjUxODM4N2U5MDNlMTc0MTEzOWYyZDRkMDg5MTdkODAiLCJDIjoiNGY0MGI3ZjUxYWFlMGE2MzU1ZjU5NTYxODA1NGJmNzc5YzcxY2UxMTJjNTk3NWRlMmQyOGVmYTdiM2E3ZWJmZSIsIkQiOiJiNmI3NDBhNDczZmJhZGZmNDkyMTU2ZDlhODc2Nzg2MGZmNzg3MzMzMjMwMjZlMjRkMWYyNDRhMmE4ZjNjODg3ODhkYzQwZDBkODI1NTViYWFiNzE4ZDczNDJhMzY3NzdlMWQ5NDQzYWQyOTM5MTIzYzFkYjE0Yzc0OWE2MDg5NWE2NjZkNWJiZjUxNjIyOTlmYmFkMTkwZTVkZDJkYjVlNDFjNDZkYjQ5NzhkNzI4OTY0N2I4NzY5Nzk4M2Y4MTRkNDk2MzRhODE5OWI1MzAzZWQwNDM2YTcyOGZkNTE1Y2UyM2U4NzQ4MDUzMzY2NDBkMDhkNGU4NWVlMjFmZmM2YWE3MzA0MDFhNmY2YjEyZTIxMDM0NDE5MWIwZThmMzljZTNjMWNmYjg5N2NiNGFmNzA1NGYzMTc1M2MwY2QxZWQ1OGE1NWY0M2JhZmYzN2M3NWI0OTA0ZGQxNTZkZWYwMzJkOTljNTRmYzIxMjJlYjkzODFjMTYzYWNlNzNjYjc2OGY5ZjZkYmFjMGJiMjE4OTE2ZjQyMWEzYjlhNTUwMThiODc5NDJiMmJmYjE3NDkiLCJFIjoiYzc0MzVjOGQ1NzNjZTliOTVhZWIwYmExMmE1MWQ5YzdkODZkNmRlMjhhM2ZhMmJjZWNjNTQ1YmU5NDVmZTZiMmUxZGQ2MzM5NjVhMzA4NGQ4ZGJlMDM3OTczMWUwMWE5ZjBhODE0MTkxZGI2MTI2YjNkNDZlZmEwM2ZiN2UyMDcifQ==',
      itheum_creator:
        'erd1kl2jpuupga5py5m90edg4hka2skt5atxzyhqjl6hwqhpu269y68su0ycq7',
      attributes: [
        {
          trait_type: 'Album',
          value: 'EPONYMOUS'
        }
      ],
      image: 'ipfs://ethereal_echoes/8.mp4'
    },
    ticker: 'NOT-678420',
    score: 0,
    rank: 4
  },
  {
    identifier: 'NOT-678420-02',
    collection: 'NOT-678420',
    attributes:
      'bWV0YWRhdGE6UW1ZZmNxQ2ZMVjJXMm5ZdTVKa3JuUDFKSFZzeWRKVG5qcDF0cEx3d1p1REZzTi81Lmpzb247dGFnczp0ZXN0',
    nonce: 2,
    type: 'NonFungibleESDT',
    name: 'nothing #5',
    creator: 'erd1qqqqqqqqqqqqqpgq0358sm3p4jkhtpk78t6lydp2ekj3yexju00sspvwdr',
    royalties: 0.2,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1ZZmNxQ2ZMVjJXMm5ZdTVKa3JuUDFKSFZzeWRKVG5qcDF0cEx3d1p1REZzTi81Lm1wNA==',
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1ZZmNxQ2ZMVjJXMm5ZdTVKa3JuUDFKSFZzeWRKVG5qcDF0cEx3d1p1REZzTi81Lmpzb24=',
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1ZZmNxQ2ZMVjJXMm5ZdTVKa3JuUDFKSFZzeWRKVG5qcDF0cEx3d1p1REZzTi9jb2xsZWN0aW9uLmpzb24='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmYfcqCfLV2W2nYu5JkrnP1JHVsydJTnjp1tpLwwZuDFsN/5.mp4',
    media: [
      {
        url: 'https://devnet-media.elrond.com/nfts/asset/QmYfcqCfLV2W2nYu5JkrnP1JHVsydJTnjp1tpLwwZuDFsN/5.mp4',
        originalUrl:
          'https://ipfs.io/ipfs/QmYfcqCfLV2W2nYu5JkrnP1JHVsydJTnjp1tpLwwZuDFsN/5.mp4',
        thumbnailUrl:
          'https://devnet-media.elrond.com/nfts/thumbnail/NOT-678420-6b46fea8',
        fileType: 'video/mp4',
        fileSize: 16496385
      }
    ],
    isWhitelistedStorage: true,
    tags: ['test'],
    metadata: {
      name: 'EPONYMOUS #5',
      description: '',
      itheum_data_stream_url:
        'eyJBIjoiM2EzZTFhMjVkMDU5NTg1MjhhZWM0MWE3YzA3ZDkxZTljYzk0MTMwMDY4NTU2ODA4IiwiQiI6ImY1NGVmNWQ2ZWUyYTgxNDdhMDQzNWMzYWE4ZThmMzcxNjUxODM4N2U5MDNlMTc0MTEzOWYyZDRkMDg5MTdkODAiLCJDIjoiNGY0MGI3ZjUxYWFlMGE2MzU1ZjU5NTYxODA1NGJmNzc5YzcxY2UxMTJjNTk3NWRlMmQyOGVmYTdiM2E3ZWJmZSIsIkQiOiJiNmI3NDBhNDczZmJhZGZmNDkyMTU2ZDlhODc2Nzg2MGZmNzg3MzMzMjMwMjZlMjRkMWYyNDRhMmE4ZjNjODg3ODhkYzQwZDBkODI1NTViYWFiNzE4ZDczNDJhMzY3NzdlMWQ5NDQzYWQyOTM5MTIzYzFkYjE0Yzc0OWE2MDg5NWE2NjZkNWJiZjUxNjIyOTlmYmFkMTkwZTVkZDJkYjVlNDFjNDZkYjQ5NzhkNzI4OTY0N2I4NzY5Nzk4M2Y4MTRkNDk2MzRhODE5OWI1MzAzZWQwNDM2YTcyOGZkNTE1Y2UyM2U4NzQ4MDUzMzY2NDBkMDhkNGU4NWVlMjFmZmM2YWE3MzA0MDFhNmY2YjEyZTIxMDM0NDE5MWIwZThmMzljZTNjMWNmYjg5N2NiNGFmNzA1NGYzMTc1M2MwY2QxZWQ1OGE1NWY0M2JhZmYzN2M3NWI0OTA0ZGQxNTZkZWYwMzJkOTljNTRmYzIxMjJlYjkzODFjMTYzYWNlNzNjYjc2OGY5ZjZkYmFjMGJiMjE4OTE2ZjQyMWEzYjlhNTUwMThiODc5NDJiMmJmYjE3NDkiLCJFIjoiYzc0MzVjOGQ1NzNjZTliOTVhZWIwYmExMmE1MWQ5YzdkODZkNmRlMjhhM2ZhMmJjZWNjNTQ1YmU5NDVmZTZiMmUxZGQ2MzM5NjVhMzA4NGQ4ZGJlMDM3OTczMWUwMWE5ZjBhODE0MTkxZGI2MTI2YjNkNDZlZmEwM2ZiN2UyMDcifQ==',
      itheum_creator:
        'erd1kl2jpuupga5py5m90edg4hka2skt5atxzyhqjl6hwqhpu269y68su0ycq7',
      attributes: [
        {
          trait_type: 'Album',
          value: 'EPONYMOUS'
        }
      ],
      image: 'ipfs://ethereal_echoes/5.mp4'
    },
    ticker: 'NOT-678420',
    score: 0,
    rank: 3
  },
  {
    identifier: 'NOT-678420-03',
    collection: 'NOT-678420',
    attributes:
      'bWV0YWRhdGE6UW1ZZmNxQ2ZMVjJXMm5ZdTVKa3JuUDFKSFZzeWRKVG5qcDF0cEx3d1p1REZzTi8yLmpzb247dGFnczp0ZXN0',
    nonce: 3,
    type: 'NonFungibleESDT',
    name: 'nothing #2',
    creator: 'erd1qqqqqqqqqqqqqpgq0358sm3p4jkhtpk78t6lydp2ekj3yexju00sspvwdr',
    royalties: 81.92,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1ZZmNxQ2ZMVjJXMm5ZdTVKa3JuUDFKSFZzeWRKVG5qcDF0cEx3d1p1REZzTi8yLm1wNA==',
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1ZZmNxQ2ZMVjJXMm5ZdTVKa3JuUDFKSFZzeWRKVG5qcDF0cEx3d1p1REZzTi8yLmpzb24=',
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1ZZmNxQ2ZMVjJXMm5ZdTVKa3JuUDFKSFZzeWRKVG5qcDF0cEx3d1p1REZzTi9jb2xsZWN0aW9uLmpzb24='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmYfcqCfLV2W2nYu5JkrnP1JHVsydJTnjp1tpLwwZuDFsN/2.mp4',
    media: [
      {
        url: 'https://devnet-media.elrond.com/nfts/asset/QmYfcqCfLV2W2nYu5JkrnP1JHVsydJTnjp1tpLwwZuDFsN/2.mp4',
        originalUrl:
          'https://ipfs.io/ipfs/QmYfcqCfLV2W2nYu5JkrnP1JHVsydJTnjp1tpLwwZuDFsN/2.mp4',
        thumbnailUrl:
          'https://devnet-media.elrond.com/nfts/thumbnail/NOT-678420-e2750322',
        fileType: 'video/mp4',
        fileSize: 17851560
      }
    ],
    isWhitelistedStorage: true,
    tags: ['test'],
    metadata: {
      name: 'EPONYMOUS #2',
      description: '',
      itheum_data_stream_url:
        'eyJBIjoiM2EzZTFhMjVkMDU5NTg1MjhhZWM0MWE3YzA3ZDkxZTljYzk0MTMwMDY4NTU2ODA4IiwiQiI6ImY1NGVmNWQ2ZWUyYTgxNDdhMDQzNWMzYWE4ZThmMzcxNjUxODM4N2U5MDNlMTc0MTEzOWYyZDRkMDg5MTdkODAiLCJDIjoiNGY0MGI3ZjUxYWFlMGE2MzU1ZjU5NTYxODA1NGJmNzc5YzcxY2UxMTJjNTk3NWRlMmQyOGVmYTdiM2E3ZWJmZSIsIkQiOiJiNmI3NDBhNDczZmJhZGZmNDkyMTU2ZDlhODc2Nzg2MGZmNzg3MzMzMjMwMjZlMjRkMWYyNDRhMmE4ZjNjODg3ODhkYzQwZDBkODI1NTViYWFiNzE4ZDczNDJhMzY3NzdlMWQ5NDQzYWQyOTM5MTIzYzFkYjE0Yzc0OWE2MDg5NWE2NjZkNWJiZjUxNjIyOTlmYmFkMTkwZTVkZDJkYjVlNDFjNDZkYjQ5NzhkNzI4OTY0N2I4NzY5Nzk4M2Y4MTRkNDk2MzRhODE5OWI1MzAzZWQwNDM2YTcyOGZkNTE1Y2UyM2U4NzQ4MDUzMzY2NDBkMDhkNGU4NWVlMjFmZmM2YWE3MzA0MDFhNmY2YjEyZTIxMDM0NDE5MWIwZThmMzljZTNjMWNmYjg5N2NiNGFmNzA1NGYzMTc1M2MwY2QxZWQ1OGE1NWY0M2JhZmYzN2M3NWI0OTA0ZGQxNTZkZWYwMzJkOTljNTRmYzIxMjJlYjkzODFjMTYzYWNlNzNjYjc2OGY5ZjZkYmFjMGJiMjE4OTE2ZjQyMWEzYjlhNTUwMThiODc5NDJiMmJmYjE3NDkiLCJFIjoiYzc0MzVjOGQ1NzNjZTliOTVhZWIwYmExMmE1MWQ5YzdkODZkNmRlMjhhM2ZhMmJjZWNjNTQ1YmU5NDVmZTZiMmUxZGQ2MzM5NjVhMzA4NGQ4ZGJlMDM3OTczMWUwMWE5ZjBhODE0MTkxZGI2MTI2YjNkNDZlZmEwM2ZiN2UyMDcifQ==',
      itheum_creator:
        'erd1kl2jpuupga5py5m90edg4hka2skt5atxzyhqjl6hwqhpu269y68su0ycq7',
      attributes: [
        {
          trait_type: 'Album',
          value: 'EPONYMOUS'
        }
      ],
      image: 'ipfs://ethereal_echoes/2.mp4'
    },
    ticker: 'NOT-678420',
    score: 0,
    rank: 2,
    isNsfw: false
  },
  {
    identifier: 'NOT-678420-04',
    collection: 'NOT-678420',
    attributes:
      'bWV0YWRhdGE6UW1ZZmNxQ2ZMVjJXMm5ZdTVKa3JuUDFKSFZzeWRKVG5qcDF0cEx3d1p1REZzTi82Lmpzb247dGFnczp0ZXN0',
    nonce: 4,
    type: 'NonFungibleESDT',
    name: 'nothing #6',
    creator: 'erd1qqqqqqqqqqqqqpgq0358sm3p4jkhtpk78t6lydp2ekj3yexju00sspvwdr',
    royalties: 20,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1ZZmNxQ2ZMVjJXMm5ZdTVKa3JuUDFKSFZzeWRKVG5qcDF0cEx3d1p1REZzTi82Lm1wNA==',
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1ZZmNxQ2ZMVjJXMm5ZdTVKa3JuUDFKSFZzeWRKVG5qcDF0cEx3d1p1REZzTi82Lmpzb24=',
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1ZZmNxQ2ZMVjJXMm5ZdTVKa3JuUDFKSFZzeWRKVG5qcDF0cEx3d1p1REZzTi9jb2xsZWN0aW9uLmpzb24='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmYfcqCfLV2W2nYu5JkrnP1JHVsydJTnjp1tpLwwZuDFsN/6.mp4',
    media: [
      {
        url: 'https://devnet-media.elrond.com/nfts/asset/QmYfcqCfLV2W2nYu5JkrnP1JHVsydJTnjp1tpLwwZuDFsN/6.mp4',
        originalUrl:
          'https://ipfs.io/ipfs/QmYfcqCfLV2W2nYu5JkrnP1JHVsydJTnjp1tpLwwZuDFsN/6.mp4',
        thumbnailUrl:
          'https://devnet-media.elrond.com/nfts/thumbnail/NOT-678420-a19bac85',
        fileType: 'video/mp4',
        fileSize: 16786744
      }
    ],
    isWhitelistedStorage: true,
    tags: ['test'],
    metadata: {
      name: 'EPONYMOUS #6',
      description: '',
      itheum_data_stream_url:
        'eyJBIjoiM2EzZTFhMjVkMDU5NTg1MjhhZWM0MWE3YzA3ZDkxZTljYzk0MTMwMDY4NTU2ODA4IiwiQiI6ImY1NGVmNWQ2ZWUyYTgxNDdhMDQzNWMzYWE4ZThmMzcxNjUxODM4N2U5MDNlMTc0MTEzOWYyZDRkMDg5MTdkODAiLCJDIjoiNGY0MGI3ZjUxYWFlMGE2MzU1ZjU5NTYxODA1NGJmNzc5YzcxY2UxMTJjNTk3NWRlMmQyOGVmYTdiM2E3ZWJmZSIsIkQiOiJiNmI3NDBhNDczZmJhZGZmNDkyMTU2ZDlhODc2Nzg2MGZmNzg3MzMzMjMwMjZlMjRkMWYyNDRhMmE4ZjNjODg3ODhkYzQwZDBkODI1NTViYWFiNzE4ZDczNDJhMzY3NzdlMWQ5NDQzYWQyOTM5MTIzYzFkYjE0Yzc0OWE2MDg5NWE2NjZkNWJiZjUxNjIyOTlmYmFkMTkwZTVkZDJkYjVlNDFjNDZkYjQ5NzhkNzI4OTY0N2I4NzY5Nzk4M2Y4MTRkNDk2MzRhODE5OWI1MzAzZWQwNDM2YTcyOGZkNTE1Y2UyM2U4NzQ4MDUzMzY2NDBkMDhkNGU4NWVlMjFmZmM2YWE3MzA0MDFhNmY2YjEyZTIxMDM0NDE5MWIwZThmMzljZTNjMWNmYjg5N2NiNGFmNzA1NGYzMTc1M2MwY2QxZWQ1OGE1NWY0M2JhZmYzN2M3NWI0OTA0ZGQxNTZkZWYwMzJkOTljNTRmYzIxMjJlYjkzODFjMTYzYWNlNzNjYjc2OGY5ZjZkYmFjMGJiMjE4OTE2ZjQyMWEzYjlhNTUwMThiODc5NDJiMmJmYjE3NDkiLCJFIjoiYzc0MzVjOGQ1NzNjZTliOTVhZWIwYmExMmE1MWQ5YzdkODZkNmRlMjhhM2ZhMmJjZWNjNTQ1YmU5NDVmZTZiMmUxZGQ2MzM5NjVhMzA4NGQ4ZGJlMDM3OTczMWUwMWE5ZjBhODE0MTkxZGI2MTI2YjNkNDZlZmEwM2ZiN2UyMDcifQ==',
      itheum_creator:
        'erd1kl2jpuupga5py5m90edg4hka2skt5atxzyhqjl6hwqhpu269y68su0ycq7',
      attributes: [
        {
          trait_type: 'Album',
          value: 'EPONYMOUS'
        }
      ],
      image: 'ipfs://ethereal_echoes/6.mp4'
    },
    ticker: 'NOT-678420',
    score: 0,
    rank: 1
  },
  {
    identifier: 'TEST-aba7d4-01',
    collection: 'TEST-aba7d4',
    attributes:
      'dGFnczpUZXN0O21ldGFkYXRhOlFtU1pyckJ1TGJDYVFNSERvUzFtMXg3dWRWaHliamFVY3lzUGk4c3JZczVEdlM=',
    nonce: 1,
    type: 'NonFungibleESDT',
    name: 'Test',
    creator: 'erd1dc3yzxxeq69wvf583gw0h67td226gu2ahpk3k50qdgzzym8npltq7ndgha',
    royalties: 5,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1TZExucWFWRjdFVWNTaUZmOXppenU5NWZ1RHptakRKd1MxVzJkeVRSU2JRZw=='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmSdLnqaVF7EUcSiFf9zizu95fuDzmjDJwS1W2dyTRSbQg',
    media: [
      {
        url: 'https://devnet-media.elrond.com/nfts/asset/QmSdLnqaVF7EUcSiFf9zizu95fuDzmjDJwS1W2dyTRSbQg',
        originalUrl:
          'https://ipfs.io/ipfs/QmSdLnqaVF7EUcSiFf9zizu95fuDzmjDJwS1W2dyTRSbQg',
        thumbnailUrl:
          'https://devnet-media.elrond.com/nfts/thumbnail/TEST-aba7d4-f33bbd47',
        fileType: 'image/png',
        fileSize: 372780
      }
    ],
    isWhitelistedStorage: true,
    tags: ['Test'],
    metadata: {
      description: 'Test'
    },
    ticker: 'TEST-aba7d4',
    isNsfw: false
  },
  {
    identifier: 'TEST-aba7d4-02',
    collection: 'TEST-aba7d4',
    attributes:
      'dGFnczp0ZXN0O21ldGFkYXRhOlFtZEVDbW04Mno3MW5BTDRwV1pDeVkyQXRxM21yUlhBeGhtTXVLNlpQYUg2d2E=',
    nonce: 2,
    type: 'NonFungibleESDT',
    name: 'Test2',
    creator: 'erd1dc3yzxxeq69wvf583gw0h67td226gu2ahpk3k50qdgzzym8npltq7ndgha',
    royalties: 5,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1WODhtV0VXN3hnVHpqZFRXaEtpMmZHMXFkTW10YkN6eVZxaldwUEhEdmJoUQ=='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmV88mWEW7xgTzjdTWhKi2fG1qdMmtbCzyVqjWpPHDvbhQ',
    media: [
      {
        url: 'https://devnet-media.elrond.com/nfts/asset/QmV88mWEW7xgTzjdTWhKi2fG1qdMmtbCzyVqjWpPHDvbhQ',
        originalUrl:
          'https://ipfs.io/ipfs/QmV88mWEW7xgTzjdTWhKi2fG1qdMmtbCzyVqjWpPHDvbhQ',
        thumbnailUrl:
          'https://devnet-media.elrond.com/nfts/thumbnail/TEST-aba7d4-1a013aaf',
        fileType: 'image/png',
        fileSize: 396456
      }
    ],
    isWhitelistedStorage: true,
    tags: ['test'],
    metadata: {
      description: 'test'
    },
    ticker: 'TEST-aba7d4',
    isNsfw: false
  },
  {
    identifier: 'TEST-aba7d4-06',
    collection: 'TEST-aba7d4',
    attributes:
      'dGFnczp0ZXN0O21ldGFkYXRhOlFtUzNlUmY5cmdHNG9nNWdWaW5XN0NHYlpwM2JucEFucmtmVUdDM29oTWZhRGY=',
    nonce: 6,
    type: 'NonFungibleESDT',
    name: 'Test',
    creator: 'erd1dc3yzxxeq69wvf583gw0h67td226gu2ahpk3k50qdgzzym8npltq7ndgha',
    royalties: 5,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1kS2pEQ1daQzN2RHZ5amZvQkJYQmd4Z1ZQejNUMzJnNTV6RTlRMjJZcmZmZw=='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmdKjDCWZC3vDvyjfoBBXBgxgVPz3T32g55zE9Q22Yrffg',
    media: [
      {
        url: 'https://devnet-media.elrond.com/nfts/asset/QmdKjDCWZC3vDvyjfoBBXBgxgVPz3T32g55zE9Q22Yrffg',
        originalUrl:
          'https://ipfs.io/ipfs/QmdKjDCWZC3vDvyjfoBBXBgxgVPz3T32g55zE9Q22Yrffg',
        thumbnailUrl:
          'https://devnet-media.elrond.com/nfts/thumbnail/TEST-aba7d4-3a5059ec',
        fileType: 'image/jpeg',
        fileSize: 91636
      }
    ],
    isWhitelistedStorage: true,
    tags: ['test'],
    metadata: {
      description: 'TEST'
    },
    ticker: 'TEST-aba7d4',
    isNsfw: false
  },
  {
    identifier: 'TEST-aba7d4-07',
    collection: 'TEST-aba7d4',
    attributes:
      'dGFnczo7bWV0YWRhdGE6UW1kRUNtbTgyejcxbkFMNHBXWkN5WTJBdHEzbXJSWEF4aG1NdUs2WlBhSDZ3YQ==',
    nonce: 7,
    type: 'NonFungibleESDT',
    name: 'test',
    creator: 'erd1dc3yzxxeq69wvf583gw0h67td226gu2ahpk3k50qdgzzym8npltq7ndgha',
    royalties: 5,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1RZzJZVVhYemE1Z0xoc3BMR2l2VmN1ODl1TWVyTTNnOFhjcm44ZWo4MVA3UQ=='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmQg2YUXXza5gLhspLGivVcu89uMerM3g8Xcrn8ej81P7Q',
    media: [
      {
        url: 'https://devnet-media.elrond.com/nfts/asset/QmQg2YUXXza5gLhspLGivVcu89uMerM3g8Xcrn8ej81P7Q',
        originalUrl:
          'https://ipfs.io/ipfs/QmQg2YUXXza5gLhspLGivVcu89uMerM3g8Xcrn8ej81P7Q',
        thumbnailUrl:
          'https://devnet-media.elrond.com/nfts/thumbnail/TEST-aba7d4-ca11a7cf',
        fileType: 'image/jpeg',
        fileSize: 41805
      }
    ],
    isWhitelistedStorage: true,
    tags: [''],
    metadata: {
      description: 'test'
    },
    ticker: 'TEST-aba7d4',
    isNsfw: false
  },
  {
    identifier: 'TEST-aba7d4-08',
    collection: 'TEST-aba7d4',
    attributes:
      'dGFnczo7bWV0YWRhdGE6UW1kRUNtbTgyejcxbkFMNHBXWkN5WTJBdHEzbXJSWEF4aG1NdUs2WlBhSDZ3YQ==',
    nonce: 8,
    type: 'NonFungibleESDT',
    name: 'TEST',
    creator: 'erd1dc3yzxxeq69wvf583gw0h67td226gu2ahpk3k50qdgzzym8npltq7ndgha',
    royalties: 5,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1kS2pEQ1daQzN2RHZ5amZvQkJYQmd4Z1ZQejNUMzJnNTV6RTlRMjJZcmZmZw=='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmdKjDCWZC3vDvyjfoBBXBgxgVPz3T32g55zE9Q22Yrffg',
    media: [
      {
        url: 'https://devnet-media.elrond.com/nfts/asset/QmdKjDCWZC3vDvyjfoBBXBgxgVPz3T32g55zE9Q22Yrffg',
        originalUrl:
          'https://ipfs.io/ipfs/QmdKjDCWZC3vDvyjfoBBXBgxgVPz3T32g55zE9Q22Yrffg',
        thumbnailUrl:
          'https://devnet-media.elrond.com/nfts/thumbnail/TEST-aba7d4-3a5059ec',
        fileType: 'image/jpeg',
        fileSize: 91636
      }
    ],
    isWhitelistedStorage: true,
    tags: [''],
    metadata: {
      description: 'test'
    },
    ticker: 'TEST-aba7d4',
    isNsfw: false
  },
  {
    identifier: 'TEST-aba7d4-09',
    collection: 'TEST-aba7d4',
    attributes:
      'dGFnczo7bWV0YWRhdGE6UW1kRUNtbTgyejcxbkFMNHBXWkN5WTJBdHEzbXJSWEF4aG1NdUs2WlBhSDZ3YQ==',
    nonce: 9,
    type: 'NonFungibleESDT',
    name: 'test',
    creator: 'erd1dc3yzxxeq69wvf583gw0h67td226gu2ahpk3k50qdgzzym8npltq7ndgha',
    royalties: 5,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1kS2pEQ1daQzN2RHZ5amZvQkJYQmd4Z1ZQejNUMzJnNTV6RTlRMjJZcmZmZw=='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmdKjDCWZC3vDvyjfoBBXBgxgVPz3T32g55zE9Q22Yrffg',
    media: [
      {
        url: 'https://devnet-media.elrond.com/nfts/asset/QmdKjDCWZC3vDvyjfoBBXBgxgVPz3T32g55zE9Q22Yrffg',
        originalUrl:
          'https://ipfs.io/ipfs/QmdKjDCWZC3vDvyjfoBBXBgxgVPz3T32g55zE9Q22Yrffg',
        thumbnailUrl:
          'https://devnet-media.elrond.com/nfts/thumbnail/TEST-aba7d4-3a5059ec',
        fileType: 'image/jpeg',
        fileSize: 91636
      }
    ],
    isWhitelistedStorage: true,
    tags: [''],
    metadata: {
      description: 'test'
    },
    ticker: 'TEST-aba7d4',
    isNsfw: false
  },
  {
    identifier: 'TEST-aba7d4-0a',
    collection: 'TEST-aba7d4',
    attributes:
      'dGFnczo7bWV0YWRhdGE6UW1aYlF2cVVCazJKVFNHeUZxTmg0ZTVjTFBLNjRjakVTd3VGaVlQQkdpUWVUVA==',
    nonce: 10,
    type: 'NonFungibleESDT',
    name: 'dada',
    creator: 'erd1dc3yzxxeq69wvf583gw0h67td226gu2ahpk3k50qdgzzym8npltq7ndgha',
    royalties: 5,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1TZzREUWVGZXFYdmltUFlxWThTYXBVdlNpSmZVampZUzhoSzYxWWs5OFlkdQ=='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmSg4DQeFeqXvimPYqY8SapUvSiJfUjjYS8hK61Yk98Ydu',
    media: [
      {
        url: 'https://devnet-media.elrond.com/nfts/asset/QmSg4DQeFeqXvimPYqY8SapUvSiJfUjjYS8hK61Yk98Ydu',
        originalUrl:
          'https://ipfs.io/ipfs/QmSg4DQeFeqXvimPYqY8SapUvSiJfUjjYS8hK61Yk98Ydu',
        thumbnailUrl:
          'https://devnet-media.elrond.com/nfts/thumbnail/TEST-aba7d4-ee134fb2',
        fileType: 'image/jpeg',
        fileSize: 41440
      }
    ],
    isWhitelistedStorage: true,
    tags: [''],
    metadata: {},
    ticker: 'TEST-aba7d4',
    isNsfw: false
  },
  {
    identifier: 'TEST-aba7d4-0b',
    collection: 'TEST-aba7d4',
    attributes:
      'dGFnczo7bWV0YWRhdGE6UW1UZE1IQ2k1WGlvY1NYcmtSdG5idjNTRWNOWVFhbktYV05wbVJQa3JEZDhvSg==',
    nonce: 11,
    type: 'NonFungibleESDT',
    name: 'sasa',
    creator: 'erd1dc3yzxxeq69wvf583gw0h67td226gu2ahpk3k50qdgzzym8npltq7ndgha',
    royalties: 5,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1TZExucWFWRjdFVWNTaUZmOXppenU5NWZ1RHptakRKd1MxVzJkeVRSU2JRZw=='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmSdLnqaVF7EUcSiFf9zizu95fuDzmjDJwS1W2dyTRSbQg',
    media: [
      {
        url: 'https://devnet-media.elrond.com/nfts/asset/QmSdLnqaVF7EUcSiFf9zizu95fuDzmjDJwS1W2dyTRSbQg',
        originalUrl:
          'https://ipfs.io/ipfs/QmSdLnqaVF7EUcSiFf9zizu95fuDzmjDJwS1W2dyTRSbQg',
        thumbnailUrl:
          'https://devnet-media.elrond.com/nfts/thumbnail/TEST-aba7d4-f33bbd47',
        fileType: 'image/png',
        fileSize: 372780
      }
    ],
    isWhitelistedStorage: true,
    tags: [''],
    metadata: {
      description: 'sasa'
    },
    ticker: 'TEST-aba7d4',
    isNsfw: false
  },
  {
    identifier: 'TESTD-37df5c-01',
    collection: 'TESTD-37df5c',
    attributes: 'dGFnczpUZXN0RCxHZW5lcmFsLG5mdC10aWNrZXQ=',
    nonce: 1,
    type: 'SemiFungibleESDT',
    name: 'General',
    creator: 'erd1dc3yzxxeq69wvf583gw0h67td226gu2ahpk3k50qdgzzym8npltq7ndgha',
    royalties: 6,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1iWHZiMmJDNlR1NGlRTEZFOGUyR1RKdUhnTEJmdTRZYVFBRTYzcFFkVHp5Qg=='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmbXvb2bC6Tu4iQLFE8e2GTJuHgLBfu4YaQAE63pQdTzyB',
    media: [
      {
        url: 'https://devnet-media.elrond.com/nfts/asset/QmbXvb2bC6Tu4iQLFE8e2GTJuHgLBfu4YaQAE63pQdTzyB',
        originalUrl:
          'https://ipfs.io/ipfs/QmbXvb2bC6Tu4iQLFE8e2GTJuHgLBfu4YaQAE63pQdTzyB',
        thumbnailUrl:
          'https://devnet-media.elrond.com/nfts/thumbnail/TESTD-37df5c-1b3ae237',
        fileType: 'image/jpeg',
        fileSize: 104286
      }
    ],
    isWhitelistedStorage: true,
    tags: ['TestD', 'General', 'nft-ticket'],
    metadata: {},
    balance: '199',
    ticker: 'TESTD-37df5c',
    isNsfw: false
  },
  {
    identifier: 'TESTD-37df5c-02',
    collection: 'TESTD-37df5c',
    attributes:
      'dGFnczo7bWV0YWRhdGE6UW1SY1A5NGtYcjV6WmpSR3ZpN21KNnVuN0xweFVoWVZSNFI0UnBpY3h6Z1lrdA==',
    nonce: 2,
    type: 'SemiFungibleESDT',
    name: 'TEST',
    creator: 'erd1dc3yzxxeq69wvf583gw0h67td226gu2ahpk3k50qdgzzym8npltq7ndgha',
    royalties: 25,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1TN3E5Q1lxcGg4Q05uU0hQd3h1Q1ZUTk1OQ1lqVENTNDJlUjI0ZTZaZGR5Qw=='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmS7q9CYqph8CNnSHPwxuCVTNMNCYjTCS42eR24e6ZddyC',
    media: [
      {
        url: 'https://devnet-media.elrond.com/nfts/asset/QmS7q9CYqph8CNnSHPwxuCVTNMNCYjTCS42eR24e6ZddyC',
        originalUrl:
          'https://ipfs.io/ipfs/QmS7q9CYqph8CNnSHPwxuCVTNMNCYjTCS42eR24e6ZddyC',
        thumbnailUrl:
          'https://devnet-media.elrond.com/nfts/thumbnail/TESTD-37df5c-eb211aa3',
        fileType: 'image/png',
        fileSize: 252268
      }
    ],
    isWhitelistedStorage: true,
    tags: [''],
    metadata: {
      error: {
        code: 'empty_metadata',
        message: 'Metadata value is empty',
        timestamp: 1709723845
      }
    },
    balance: '29',
    ticker: 'TESTD-37df5c',
    isNsfw: false
  },
  {
    identifier: 'TESTD-d5e295-01',
    collection: 'TESTD-d5e295',
    attributes:
      'dGFnczo7bWV0YWRhdGE6UW1SY1A5NGtYcjV6WmpSR3ZpN21KNnVuN0xweFVoWVZSNFI0UnBpY3h6Z1lrdA==',
    nonce: 1,
    type: 'SemiFungibleESDT',
    name: 'test',
    creator: 'erd1dc3yzxxeq69wvf583gw0h67td226gu2ahpk3k50qdgzzym8npltq7ndgha',
    royalties: 25,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1hZ1lzOTRNQXVGeFRYOGVSVFVBMmpObjhhRVlWbXZmdTFkTkdrQlM0TE5HVA=='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmagYs94MAuFxTX8eRTUA2jNn8aEYVmvfu1dNGkBS4LNGT',
    media: [
      {
        url: 'https://media.elrond.com/nfts/thumbnail/default.png',
        originalUrl: 'https://media.elrond.com/nfts/thumbnail/default.png',
        thumbnailUrl: 'https://media.elrond.com/nfts/thumbnail/default.png',
        fileType: 'image/png',
        fileSize: 29512
      }
    ],
    isWhitelistedStorage: true,
    tags: [''],
    metadata: {
      error: {
        code: 'empty_metadata',
        message: 'Metadata value is empty',
        timestamp: 1711530613
      }
    },
    balance: '1',
    ticker: 'TESTD-d5e295'
  },
  {
    identifier: 'TESTD-d5e295-02',
    collection: 'TESTD-d5e295',
    attributes:
      'dGFnczo7bWV0YWRhdGE6UW1SY1A5NGtYcjV6WmpSR3ZpN21KNnVuN0xweFVoWVZSNFI0UnBpY3h6Z1lrdA==',
    nonce: 2,
    type: 'SemiFungibleESDT',
    name: 'test2',
    creator: 'erd1dc3yzxxeq69wvf583gw0h67td226gu2ahpk3k50qdgzzym8npltq7ndgha',
    royalties: 25,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1ZeHFIQ1VtNVNRY29DYjZWemI3bnNWZVhzQm5iR1k5ZkdaTGROdHVFaHl1Wg=='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmYxqHCUm5SQcoCb6Vzb7nsVeXsBnbGY9fGZLdNtuEhyuZ',
    media: [
      {
        url: 'https://media.elrond.com/nfts/thumbnail/default.png',
        originalUrl: 'https://media.elrond.com/nfts/thumbnail/default.png',
        thumbnailUrl: 'https://media.elrond.com/nfts/thumbnail/default.png',
        fileType: 'image/png',
        fileSize: 29512
      }
    ],
    isWhitelistedStorage: true,
    tags: [''],
    metadata: {
      error: {
        code: 'empty_metadata',
        message: 'Metadata value is empty',
        timestamp: 1711531879
      }
    },
    balance: '1',
    ticker: 'TESTD-d5e295'
  },
  {
    identifier: 'TESTD-d5e295-03',
    collection: 'TESTD-d5e295',
    attributes:
      'dGFnczo7bWV0YWRhdGE6UW1SY1A5NGtYcjV6WmpSR3ZpN21KNnVuN0xweFVoWVZSNFI0UnBpY3h6Z1lrdA==',
    nonce: 3,
    type: 'SemiFungibleESDT',
    name: 'test',
    creator: 'erd1dc3yzxxeq69wvf583gw0h67td226gu2ahpk3k50qdgzzym8npltq7ndgha',
    royalties: 25,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1Tb1NUN3hRbWRzTUFxamFGRHNWVUZjdEM2UHhLcDNUUW9SWTgyS0dmNWFYcA=='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmSoST7xQmdsMAqjaFDsVUFctC6PxKp3TQoRY82KGf5aXp',
    media: [
      {
        url: 'https://devnet-media.elrond.com/nfts/asset/QmSoST7xQmdsMAqjaFDsVUFctC6PxKp3TQoRY82KGf5aXp',
        originalUrl:
          'https://ipfs.io/ipfs/QmSoST7xQmdsMAqjaFDsVUFctC6PxKp3TQoRY82KGf5aXp',
        thumbnailUrl:
          'https://devnet-media.elrond.com/nfts/thumbnail/TESTD-d5e295-6f59fa98',
        fileType: 'video/mp4',
        fileSize: 8009289
      }
    ],
    isWhitelistedStorage: true,
    tags: [''],
    metadata: {
      error: {
        code: 'empty_metadata',
        message: 'Metadata value is empty',
        timestamp: 1711532503
      }
    },
    balance: '1',
    ticker: 'TESTD-d5e295',
    isNsfw: false
  },
  {
    identifier: 'TESTT-51e996-01',
    collection: 'TESTT-51e996',
    attributes:
      'dGFnczp0ZXN0O21ldGFkYXRhOlFtUmNQOTRrWHI1elpqUkd2aTdtSjZ1bjdMcHhVaFlWUjRSNFJwaWN4emdZa3Q=',
    nonce: 1,
    type: 'NonFungibleESDT',
    name: 'TEST31',
    creator: 'erd1dc3yzxxeq69wvf583gw0h67td226gu2ahpk3k50qdgzzym8npltq7ndgha',
    royalties: 25,
    uris: [
      'aHR0cHM6Ly9pcGZzLmlvL2lwZnMvUW1TN3E5Q1lxcGg4Q05uU0hQd3h1Q1ZUTk1OQ1lqVENTNDJlUjI0ZTZaZGR5Qw=='
    ],
    url: 'https://devnet-media.elrond.com/nfts/asset/QmS7q9CYqph8CNnSHPwxuCVTNMNCYjTCS42eR24e6ZddyC',
    media: [
      {
        url: 'https://devnet-media.elrond.com/nfts/asset/QmS7q9CYqph8CNnSHPwxuCVTNMNCYjTCS42eR24e6ZddyC',
        originalUrl:
          'https://ipfs.io/ipfs/QmS7q9CYqph8CNnSHPwxuCVTNMNCYjTCS42eR24e6ZddyC',
        thumbnailUrl:
          'https://devnet-media.elrond.com/nfts/thumbnail/TESTT-51e996-eb211aa3',
        fileType: 'image/png',
        fileSize: 252268
      }
    ],
    isWhitelistedStorage: true,
    tags: ['test'],
    metadata: {
      error: {
        code: 'empty_metadata',
        message: 'Metadata value is empty',
        timestamp: 1704310519
      }
    },
    ticker: 'TESTT-51e996',
    isNsfw: false
  }
];
