# The simple dapp demo for REI Wallet

It's a simple demo app to interact with REI Wallet. The deployed link is https://demo-app.reiwallet.io/

More details about how to integrate REI Wallet with your dapp can be find [here](https://docs.reiwallet.io).

In this demo, you will see different methods to interact with REI Wallet.


## Prepare
Please install REI Wallet first.

https://chromewebstore.google.com/detail/rei-wallet/jacbgghlojlggfgljfhhlcddicacmbek

## Run locally

You can run the demo locally. 

Run `npm install` to install the packages needed.

To start the demo, you can run below command👇
```
npm run dev
```

And you will see the page `http://localhost:5173/`. Open this webpage in your Chrome, then you can play it!


## How to ask for help?

If you have any question of problem with REI Wallet, please join the tg group https://t.me/reiwallet

## Usage

### 1. Get wallet address

```
await window.ckb.request({method:"ckb_requestAccounts"})
```


### 2. Get Public Key

```
await window.ckb.request({method:"ckb_getPublicKey"})
```



### 3. Get Capacity
```
await window.ckb.request({method:"ckb_getCapacity",data:[address:"ckb....."]})
```
address: Your ckb address



### 4. Sign Message

```
 await window.ckb.request({method:"ckb_signMessage",data:{message:"Hello REI Wallet"}})
```
message: This is message that wants to sign with rei wallet




### 5. Send CKB
```
await window.ckb.request({method:"ckb_sendCKB",data:{
    amount:1000,
    to:"ckb....."
}})
```
amount: This is amount that wants to send 
to: This is address that wants to send 


### 6. Get Network

Get REI wallet's current network
```
await window.ckb.request({method:"ckb_getNetwork"})
```



### 7. Switch Network
```
await window.ckb.request({method:"ckb_switchNetwork",data:"testnet"})
```
data: Two networks are supported here: "mainnet","testnet" 



### 8. Get Fee Rate
```
await window.ckb.request({method:"ckb_getFeeRate"})
```

### 9. Get Connected Status
```
await window.ckb.isConnected()
```

### 10. Off/On 
Disable/Enable listening state
```
window.ckb.on('chainChanged', chainChangesFunction)
```
```
window.ckb.off('accountsChanged', accountChangesFunction)
```

### 11. Send DOB
```
await window.ckb.request({method:"ckb_sendDOB",data:{
    outPoint:{
        index:"0x..",
        txHash:"0x..."
    },
    to:"ckb....."
}})

```
index: DOB's out_point index(RPC)

txHash: DOB's out_point tx_hash(RPC)

to: This is address that wants to send 

### 12. Send Cluster

```
await window.ckb.request({method:"ckb_sendCluster",data:{
    outPoint:{
         index:"0x..",
        txHash:"0x..."
    },
      to:"ckb....."
}})

```
index: Cluster's out_point index

txHash: Cluster's out_point tx_hash

to: This is address that wants to send 


### 13. Send SUDT
```
await window.ckb.request({method:"ckb_sendSUDT",data:{
    amount:1000,
    to:"ckb....."
    token:"0x..."
}})
```
amount: This is amount that wants to send
to: This is address that wants to send 
token: SUDT's args(RPC)

### 14. Send XUDT/RGB++
```
 await window.ckb.request({method:"ckb_sendXUDT",data:{
    amount:1000,
    to:"ckb....."
    typeScript:{
        args:"0x...",
        code_hash:"0x...",
        hash_type:"type"
    }
}})
```
amount: This is amount that wants to send
to: This is address that wants to send. Two format is supported here: "BTC","CKB"
args: XUDT's args(RPC)
code_hash: XUDT's code_hash(RPC)
hash_type: XUDT's hash_type(RPC)

### 15. Sign Raw Transaction
```
await window.ckb.request({method:"ckb_signRawTransaction",data:{
    txSkeleton:{...}
}})

```
TxSkeleton format is the same with txSkeleton that generated from ckb lumos:
```
{
    "cellProvider":{
        "medianTimeEmitters":[],
        "emitters":[],
        "isSubscribeRunning":false,
        "ckbIndexerUrl":"https://....ckb.dev/indexer",
        "ckbRpcUrl":"https://....ckb.dev/rpc",
        "uri":"https://....ckb.dev/rpc",
        "ckbIndexerUri":"https://....ckb.dev/indexer"
    },
    "cellDeps":[
        {
            "outPoint":{
                "txHash":"0x...",
                "index":"0x..."
            },
            "depType":"depGroup"
        }
    ],
    "headerDeps":[...],
    "inputs":[
        {
            "cellOutput":{
                "capacity":"0x...",
                "lock":{
                    "args":"0x....",
                    "codeHash":"0x...",
                    "hashType":"..."
                },
                "type":null
            },
            "data":"0x",
            "outPoint":{
                "index":"0x...",
                "txHash":"0x..."
            },
            "blockNumber":"0x..."
        }
    ],
    "outputs":[
        {
            "cellOutput":{
                "capacity":"0x...",
                "lock":{
                    "codeHash":"0x...",
                    "hashType":"type",
                    "args":"0x..."
                }
            },
            "data":"0x"
        },
        {
            "cellOutput":{
                "capacity":"0x...",
                "lock":{
                    "codeHash":"0x...",
                    "hashType":"type",
                    "args":"0x..."
                }
            },
            "data":"0x"
        }
    ],
    "witnesses":["0x..."],
    "fixedEntries":[],
    "signingEntries":[],
    "inputSinces":{}
}

```

### 16. Send Raw Transaction
```
await window.ckb.request({method:"ckb_sendRawTransaction",data:{
    txSkeleton:{...}
}})

```
```
TxSkeleton format is the same  as above
```
