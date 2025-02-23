import { App as AppAntd,Button,Input,ConfigProvider } from 'antd';
import {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import GlobalStyle from "./utils/GlobalStyle";
import {formatUnit, parseUnit} from "@ckb-lumos/bi";

import { commons,helpers, Indexer,config,BI,hd } from "@ckb-lumos/lumos";
import Logo from "./images/logo.png";
import GithubImg from "./images/GitHub.png";
import TelegramImg from "./images/Telegram.svg";
import {ckbHash} from "@ckb-lumos/base/lib/utils.js";

import { ParamsFormatter} from "@ckb-lumos/rpc";

const FlexBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    margin-bottom: 40px;
    .rhtTop{
        display: flex;
        justify-content: flex-end;
        gap: 20px;
        img{
            width:30px;
        }
    }
 

`


const LogoBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    a{
        margin-bottom: -15px;
        opacity: 0.5;
    }
    img{
        height: 80px;
    }
`

const Box = styled.div`
    margin: 40px auto ;
    max-width: 1270px;
    
    ul{
        display: flex;
        flex-direction: column;
        li{
            display: flex;
            align-content: center;
            gap: 20px;
            border-bottom: 1px solid #ddd;
            padding: 10px 0;
            line-height: 40px;
            &.noFlex{
                flex-direction: column;
             
            }
        }
    }
    .jsonBg{
        background: #f5f5f5;
        padding: 20px;
        white-space: pre-wrap;
        height: 300px;
        overflow-y: auto;
        line-height: 1.5em;
        word-break: break-all;
    }
    .flex{
        display: flex;
        align-items: center;
        gap: 10px;
        span{
            flex-shrink: 0;
            min-width: 210px;
            background: #f2f2f2;
            text-align: center;
            text-transform: capitalize;
        }
        
    }
    .sig{
        width: 60%;
        word-break: break-all;
        line-height: 1em;
    }
    button{
        color: #000;
        min-width: 210px;
        text-transform: capitalize;
    }
    input{
        min-width: 210px;
    }
    .flex10{
        display: flex;
        align-items: center;
        gap: 20px;
    }
`

const BalanceBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    .tit{
        margin-right: 10px;
    }
`

const TipsBox = styled.div`
    width: 100%;
    height: 98vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
    @font-face {
        font-family:Roboto-Regular;
        src: local('Roboto-Regular'), url(./fonts/Roboto-Regular.ttf)
    }
    a{
        text-align: center;
        text-decoration: none;
        color: #000;
    }
    .tips{
        opacity: 0.6;
        font-size:20px;
        font-family:Roboto-Regular,-apple-system,BlinkMacSystemFont,
        "Segoe UI",Roboto,"Helvetica Neue",
        Arial,sans-serif,"Apple Color Emoji",
        "Segoe UI Emoji","Segoe UI Symbol";
        background: #fff;
        padding:10px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 10px rgba(0,0,0,0.1);
        border: 1px solid #f1f1f1;
    }
    .Btm{
        display: flex;
        align-content: center;
        gap: 20px;
        margin-top: 30px;
        img{
            width:40px;
        }
    }
`

const FlexRhtBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`



function App() {

    const [address,setAddress] = useState('')
    const [balance,setBalance] = useState(null);
    const [message,setMessage] = useState("");
    const [signature,setSignature] =useState('');
    const [sendTo,setSendTo] =useState('ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqf5kmkgn25z8xajscwkw88ew3hagjfd5uqttnscm');
    const [amount,setAmount] =useState('100');
    const [txHash,setTxhash] = useState('')
    const [network,setNetwork] = useState('')
    const [feeRate,setFeeRate] = useState(null)
    const [txIndex,setTxIndex] = useState('')
    const [txDobHash,setTxDobHash] = useState('')
    const [DobHash,setDobHash] = useState('')
    const [sendDOBTo,setSendDOBTo] =useState('ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqf5kmkgn25z8xajscwkw88ew3hagjfd5uqttnscm');

    const [sendClusterTo,setSendClusterTo] =useState('ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqf5kmkgn25z8xajscwkw88ew3hagjfd5uqttnscm');
    const [ClusterIndex,setClusterIndex] = useState('')
    const [ClusterHash,setClusterHash] = useState('')
    const [ClusterTx,setClusterTx] = useState('')

    const [sendToSUDT,setSendToSUDT] =useState('ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqf5kmkgn25z8xajscwkw88ew3hagjfd5uqttnscm');
    const [SUDTamount,setSUDTAmount] =useState('100');
    const [SUDTHash,setSUDThash] = useState('')
    const [token,setToken] = useState('')

    const [sendToXUDT,setSendToXUDT] =useState('ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqf5kmkgn25z8xajscwkw88ew3hagjfd5uqttnscm');
    const [XUDTamount,setXUDTAmount] =useState('10');
    const [XUDTHash,setXUDThash] = useState('')
    const [XUDTargs,setXUDTargs] = useState('0xece07a9588dcc4de97686b0305fb295e6508d607f9eb2afce9e9e3e453c6a1e9')
    const [XUDTcodehash,setXUDTcodehash] = useState('0x25c29dc317811a6f6f3985a7a9ebc4838bd388d19d0feeecf0bcd60f6c0975bb')
    const [XUDTtype,setXUDTtype] = useState('type')

    const [PublicKey,setPublikey] = useState('')
    const [rawHash,setRawHash] = useState('')
    const [rawHashRPC,setRawHashRPC] = useState('')
    const [rawSignObj,setRawSignObj] = useState('')
    const [rawSignObjRPC,setRawSignObjRPC] = useState('')
    const [showTips,setShowTips] = useState(true)
    const [isConnected,setIsConnected] = useState('')

    const [signValid,setSignValid] = useState("")

    const {  notification } = AppAntd.useApp();


    useEffect(() => {
        if(!window.rei?.ckb) {
            setShowTips(true)
        }else{
            setShowTips(false)
        }

    }, [window.rei?.ckb]);


    const  accountChangesFun =  useCallback((data) => {
        console.log("==accountsChanged==",data)
    },[])

    useEffect(()=>{
        if(!window.rei?.ckb) return;
        window.rei.ckb.on('accountsChanged', accountChangesFun);
        window.rei.ckb.on('chainChanged', function (data) {

            console.log("==chainChanged==",data)
        });

    },[])

    const connect = async() =>{
        try{
            let addr =  await window.rei.ckb.request({method:"ckb_requestAccounts"})
            setAddress(addr)
        }catch (e) {
            console.error("==connect=",e)

            notification.error({
                message: "Connect wallet",
                description:e
            });
        }

    }


    const getCapacity = async () =>{
        try{

            let rt =  await window.rei.ckb.request({method:"ckb_getCapacity",data:[address]})
            const {capacity,occupied} = rt;
            setBalance({
                capacity:formatUnit(capacity,"ckb"),
                occupied:formatUnit(occupied,"ckb")
            })
        }catch (e) {
            console.error("==getBalance=",e)

            notification.error({
                message: "Get Balance",
                description:e
            });
        }
    }

    const testSign = async() =>{
        try{
            let rt = await window.rei.ckb.request({method:"ckb_signMessage",data:{message}})
            setSignature(rt);
        }catch (e) {
            console.error("==signMessage=",e)

            notification.error({
                message: "Sign Message",
                description:e
            });
        }
    }


    const verifyMessage = async() =>{

        const buffer = Buffer.from( `Nervos Message:${message}`, 'utf-8')
        const newMessage = ckbHash(buffer);

       let rt= hd.key.recoverFromSignature(newMessage,signature)

        let publickey = await window.rei.ckb.request({method:"ckb_getPublicKey"})
        setSignValid(publickey === rt?"valid":"invalid")

        console.log(rt)

    }


    const handleSend = async() =>{
        try{
            let rt = await window.rei.ckb.request({method:"ckb_sendCKB",data:{
                    amount,
                    to:sendTo
                }})

            setTxhash(rt);
        }catch (e) {
            console.error("==ckb_sendCKB=",e)

            notification.error({
                message: "Sign Message",
                description:e
            });
        }
    }

    const handleInput = (e) =>{
        const {value,name} = e.target;
        switch (name){
            case "message":
                setMessage(value)
                break;
            case "sendTo":
                setSendTo(value)
                break;
            case "amount":
                setAmount(value)
                break;
            case "txIndex":
                setTxIndex(value)
                break;
            case "txDobHash":
                setTxDobHash(value)
                break;
            case "sendDOBTo":
                setSendDOBTo(value)
                break;
            case "sendClusterTo":
                setSendClusterTo(value)
                break;
            case "ClusterIndex":
                setClusterIndex(value)
                break;
            case "ClusterHash":
                setClusterHash(value)
                break;
            case "sendToSUDT":
                setSendToSUDT(value)
                break;
            case "SUDTamount":
                setSUDTAmount(value)
                break;
            case "token":
                setToken(value)
                break;
            case "sendToXUDT":
                setSendToXUDT(value)
                break;
            case "XUDTamount":
                setXUDTAmount(value)
                break;
            case "XUDTargs":
                setXUDTargs(value)
                break;
            case "XUDTcodehash":
                setXUDTcodehash(value)
                break;
            case "XUDTtype":
                setXUDTtype(value)
                break;
        }
    }

    const getNetwork = async() =>{
        try{
            let rt = await window.rei.ckb.request({method:"ckb_getNetwork"})
            setNetwork(rt);
        }catch (e) {
            console.error("==ckb_sendCKB=",e)
        }
    }
    const switchNetwork = async() =>{
        let data = network === "mainnet"?'testnet':"mainnet"
        try{
            let rt = await window.rei.ckb.request({method:"ckb_switchNetwork",data})
            await getNetwork()
            console.log(rt)
        }catch (e) {
            console.error("==switch Network=",e)
            notification.error({
                message: "switch Network",
                description:e
            });
        }
    }

    const getFeeRate = async() =>{
        try{
            let rt = await window.rei.ckb.request({method:"ckb_getFeeRate"})
            setFeeRate(rt)
            return rt;
        }catch (e) {
            console.error("==getFeeRate=",e)
            notification.error({
                message: "Fee Rate",
                description:e
            });
        }
    }

    const getConnected = async() =>{
        try{
            let rt = await window.rei.ckb.isConnected()
            console.log(rt)
            setIsConnected(rt)

        }catch (e) {
            console.error("==getConnected=",e)
            notification.error({
                message: "Connected",
                description:e
            });
        }
    }

    const offAccount = () =>{

       window.rei.ckb.off('accountsChanged', accountChangesFun)
        notification.success({
            message: "off Account Successful",
        });


    }

    const handleSendDob = async() =>{
        try{
            let rt = await window.rei.ckb.request({method:"ckb_sendDOB",data:{
                    outPoint:{
                        index:txIndex,
                        txHash:txDobHash
                    },
                    to:sendDOBTo
                }})

            setDobHash(rt);
        }catch (e) {
            console.error("==SendDob=",e)

            notification.error({
                message: "Send Dob",
                description:e
            });
        }
    }



const handleCluster= async() =>{
        try{
            let rt = await window.rei.ckb.request({method:"ckb_sendCluster",data:{
                    outPoint:{
                        index:ClusterIndex,
                        txHash:ClusterHash
                    },
                    to:sendClusterTo
                }})

            setClusterTx(rt);
        }catch (e) {
            console.error("==ckb_sendCluster=",e)
            notification.error({
                message: "Send Cluster",
                description:e
            });
        }
    }

    // const handleSendSUDT = async() =>{
    //     try{
    //         let rt = await window.ckb.request({method:"ckb_sendSUDT",data:{
    //                 amount:SUDTamount,
    //                 to:sendToSUDT,
    //                 token
    //             }})
    //
    //         setSUDThash(rt);
    //     }catch (e) {
    //         console.error("==ckb_sendSUDT=",e)
    //         notification.error({
    //             message: "Send Cluster",
    //             description:e
    //         });
    //     }
    // }
    const handleSendXUDT = async() =>{

        try{
            let rt = await window.rei.ckb.request({method:"ckb_sendXUDT",data:{
                    amount:XUDTamount,
                    to:sendToXUDT,
                    typeScript:{
                        args:XUDTargs,
                        code_hash:XUDTcodehash,
                        hash_type:XUDTtype
                    }
                }})

            setXUDThash(rt);
        }catch (e) {
            console.error("==ckb_sendXUDT=",e)

            notification.error({
                message: "Send XUDT",
                description:e
            });
        }
    }

    const handleSignTransaction = async () =>{
        const txSkeleton = await createTransaction()
        const txObj = helpers.transactionSkeletonToObject(txSkeleton)

        console.log(txObj)


        try{
            let rt = await window.rei.ckb.request({method:"ckb_signRawTransaction",data:{
                    txSkeleton:txObj
                }})
            setRawSignObj(rt)
        }catch (e) {
            console.error("==Send Transaction=",e)

            notification.error({
                message: "Send Transaction",
                description:e
            });
        }

    }
    const handleSignTransactionRPC = async () =>{
        const txSkeleton = await createTransaction()
        const txObj = helpers.createTransactionFromSkeleton(txSkeleton)
        const resultObj = ParamsFormatter.toRawTransaction(txObj)

        console.log(JSON.stringify(resultObj))

        try{
            let rt = await window.rei.ckb.request({method:"ckb_signTransaction",data:{
                    txSkeleton:resultObj
                }})
            setRawSignObjRPC(rt)
            await connect()
        }catch (e) {
            console.error("==Sign Transaction=",e)

            notification.error({
                message: "Sign Transaction",
                description:e
            });
        }

    }
    const handleSendTransactionRPC = async () =>{
        const txSkeleton = await createTransaction()
        const txObj = helpers.createTransactionFromSkeleton(txSkeleton)
        const resultObj = ParamsFormatter.toRawTransaction(txObj)

        try{
            let rt = await window.rei.ckb.request({method:"ckb_sendTransaction",data:{
                    txSkeleton:resultObj
                }})
            setRawHashRPC(rt)
        }catch (e) {
            console.error("==Send Transaction=",e)

            notification.error({
                message: "Send Transaction",
                description:e
            });
        }

    }



    const createTransaction = async() =>{
        let feeRate = await getFeeRate();
        await getNetwork();


        if(!feeRate)return;

        if(network === "mainnet"){
            config.initializeConfig(config.predefined.LINA);
        }else{
            config.initializeConfig(config.predefined.AGGRON4);
        }



        let fee = feeRate.median;
        let feeFormat = BI.from(fee)

        const indexer = new Indexer("https://testnet.ckb.dev/indexer", "https://testnet.ckb.dev/rpc");
        let txSkeleton = helpers.TransactionSkeleton({ cellProvider: indexer });

        let amountFormat = parseUnit(amount, "ckb");


        txSkeleton = await commons.common.transfer(txSkeleton, [address], sendTo, amountFormat);
        txSkeleton = await commons.common.payFeeByFeeRate(txSkeleton, [address], feeFormat /*fee_rate*/);
        return txSkeleton;
    }

    const handleSendTransaction = async() =>{

        const txSkeleton = await createTransaction()
        const txObj = helpers.transactionSkeletonToObject(txSkeleton)

        console.log(txObj)

        try{
            let rt = await window.rei.ckb.request({method:"ckb_sendRawTransaction",data:{
                txSkeleton:txObj
                }})
            setRawHash(rt)
        }catch (e) {
            console.error("==Send Transaction=",e)

            notification.error({
                message: "Send Transaction",
                description:e
            });
        }

    }

    const getPublicKey = async() =>{
        try{
            let rt = await window.rei.ckb.request({method:"ckb_getPublicKey"})
            setPublikey(rt)
        }catch (e) {
            console.error("==ckb_getPublicKey=",e)
            notification.error({
                message: "Public key",
                description:e
            });
        }
    }
    if(showTips) return <TipsBox>
        <a href="https://reiwallet.io" target="_blank" rel="noreferrer"><img src={Logo} alt=""/>
            <div className="tips">Please install REI Wallet</div>
        </a>
        <div className="Btm">
            <a href="https://github.com/TeamTaoist/reiwallet-dapp-demo" target="_blank" rel="noreferrer"><img
                src={GithubImg} alt=""/></a>
            <a href="https://t.me/reiwallet" target="_blank" rel="noreferrer"><img src={TelegramImg} alt=""/></a>
        </div>
    </TipsBox>
    return (

        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: 'rgb(0, 255, 157)',
                    fontFamily: "Roboto-Regular",
                },
                components: {
                    Button: {
                        colorPrimary: 'rgb(0, 255, 157)',
                      paddingInlineLG:"30px",
                      borderRadiusLG:"5px"
                  }
              }
          }}
      >


    <Box>
        <FlexBox>
            <LogoBox>
                <img src={Logo} alt=""/>
                <a href="https://reiwallet.io" target="_blank" rel="noreferrer">reiwallet.io</a>

            </LogoBox>
            <div className="rhtTop">
                <a href="https://github.com/TeamTaoist/reiwallet-dapp-demo" target="_blank" rel="noreferrer"><img src={GithubImg} alt=""/></a>
                <a href="https://t.me/reiwallet" target="_blank" rel="noreferrer"><img src={TelegramImg} alt=""/></a>
            </div>
        </FlexBox>

        <ul>
            <li>
                <div>
                    <Button type="primary" onClick={() => connect()} size="large">connect wallet</Button>
                </div>

                <div>{address}</div>
            </li>

            <li>
                <div>
                    <Button type="primary" onClick={() => getPublicKey()} size="large">get PublicKey</Button>
                </div>

                <div>{PublicKey}</div>
            </li>
            <li>
                <div>
                    <Button type="primary" onClick={() => getCapacity()} size="large">get Capacity</Button>
                </div>

                <BalanceBox>
                    <div>
                        <span className="tit">Capacity</span>
                        <span>{balance?.capacity ? balance?.capacity : "--"} CKB</span>
                    </div>
                    <div>
                        <span className="tit">Occupied</span>
                        <span>{balance?.occupied ? balance?.occupied : "--"} CKB</span>
                    </div>

                </BalanceBox>
            </li>


            <li>
                <div>
                    <Input type="text" name="message" value={message} onChange={(e) => handleInput(e)} size="large"/>
                </div>
                <FlexRhtBox>
                    <Button type="primary" onClick={() => testSign()} size="large">sign message</Button>
                    <Button type="primary" disabled={!signature} onClick={() => verifyMessage()} size="large">verify
                        message</Button>
                </FlexRhtBox>

            </li>
            <li className="noFlex">
                <div className="sig">{signature}</div>
                <div className="verify">{signValid}</div>
            </li>

            <li className="noFlex">
                <div>
                    <div className="flex"><span>Transfer To</span><Input value={sendTo} name="sendTo" size="large"
                                                                         onChange={(e) => handleInput(e)}/></div>

                </div>
                <div>
                    <div className="flex"><span>Amount</span>
                        <Input value={amount} name="amount" size="large"
                               onChange={(e) => handleInput(e)}/></div>
                </div>
                <div>{txHash}</div>
                <div>
                    <Button type="primary" onClick={() => handleSend()} size="large">Send CKB</Button>
                </div>
            </li>

            <li>
                <div>
                    <Button type="primary" onClick={() => getNetwork()} size="large">get Network</Button>
                </div>

                <div>{network}</div>
            </li>
            <li>
                <div>
                    <Button type="primary" onClick={() => switchNetwork()} size="large">switch Network</Button>
                </div>
            </li>
            <li>
                <div>
                    <Button type="primary" onClick={() => getFeeRate()} size="large">Fee rate</Button>
                </div>
                <div className="flex10">
                    <span>mean:{Number(feeRate?.mean ?? 0)}</span>
                    <span>median:{Number(feeRate?.median ?? 0)}</span>
                </div>
            </li>
            <li>
                <div>
                    <Button type="primary" onClick={() => getConnected()} size="large">IsConnected</Button>
                </div>
                <div>{isConnected !== "" && JSON.stringify(isConnected)}</div>
            </li>
            <li>
                <div>
                    <Button type="primary" onClick={() => offAccount()} size="large">Off </Button>
                </div>
            </li>

            <li className="noFlex">
                <div>
                    <div className="flex"><span>Transfer To</span><Input value={sendDOBTo} name="sendDOBTo" size="large"
                                                                         onChange={(e) => handleInput(e)}/></div>

                </div>
                <div>
                    <div className="flex"><span>Index (OutPoint)</span><Input value={txIndex} name="txIndex"
                                                                              size="large"
                                                                              onChange={(e) => handleInput(e)}/></div>
                </div>
                <div>
                    <div className="flex"><span>TxHash (OutPoint)</span><Input value={txDobHash} name="txDobHash"
                                                                               size="large"
                                                                               onChange={(e) => handleInput(e)}/></div>
                </div>
                <div>{DobHash}</div>
                <div>
                    <Button type="primary" onClick={() => handleSendDob()} size="large">Send DOB</Button>
                </div>
            </li>

            <li className="noFlex">
                <div>
                    <div className="flex"><span>Transfer To</span><Input value={sendClusterTo} name="sendClusterTo"
                                                                         size="large"
                                                                         onChange={(e) => handleInput(e)}/></div>

                </div>
                <div>
                    <div className="flex"><span>Index (OutPoint)</span><Input value={ClusterIndex} name="ClusterIndex"
                                                                              size="large"
                                                                              onChange={(e) => handleInput(e)}/></div>
                </div>
                <div>
                    <div className="flex"><span>TxHash (OutPoint)</span><Input value={ClusterHash} name="ClusterHash"
                                                                               size="large"
                                                                               onChange={(e) => handleInput(e)}/></div>
                </div>
                <div>{ClusterTx}</div>
                <div>
                    <Button type="primary" onClick={() => handleCluster()} size="large">Send Cluster</Button>
                </div>
            </li>

            {/*<li className="noFlex">*/}
            {/*    <div>*/}
            {/*        <div className="flex"><span>Transfer To</span><Input value={sendToSUDT} name="sendToSUDT"  size="large"*/}
            {/*                                                             onChange={(e) => handleInput(e)}/></div>*/}

            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <div className="flex"><span>Amount</span><Input value={SUDTamount} name="SUDTamount"  size="large"*/}
            {/*                                                        onChange={(e) => handleInput(e)}/></div>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <div className="flex"><span>Token</span><Input value={token} name="token"  size="large"*/}
            {/*                                                       onChange={(e) => handleInput(e)}/></div>*/}
            {/*    </div>*/}
            {/*    <div>{SUDTHash}</div>*/}
            {/*    <div>*/}
            {/*        <Button type="primary" onClick={() => handleSendSUDT()} size="large">Send SUDT</Button>*/}
            {/*    </div>*/}
            {/*</li>*/}
            <li className="noFlex">
                <div>
                    <div className="flex"><span>Transfer To</span><Input value={sendToXUDT} name="sendToXUDT"
                                                                         size="large"
                                                                         onChange={(e) => handleInput(e)}/></div>

                </div>
                <div>
                    <div className="flex"><span>Amount</span><Input value={XUDTamount} name="XUDTamount" size="large"
                                                                    onChange={(e) => handleInput(e)}/></div>
                </div>
                <div>
                    <div className="flex"><span>Args(OutPoint)</span><Input value={XUDTargs} name="XUDTargs"
                                                                            size="large"
                                                                            onChange={(e) => handleInput(e)}/></div>
                </div>
                <div>
                    <div className="flex"><span>CodeHash(OutPoint)</span><Input value={XUDTcodehash} name="XUDTcodehash"
                                                                                size="large"
                                                                                onChange={(e) => handleInput(e)}/></div>
                </div>
                <div>
                    <div className="flex"><span>Type(OutPoint)</span><Input value={XUDTtype} name="XUDTtype"
                                                                            size="large"
                                                                            onChange={(e) => handleInput(e)}/></div>
                </div>
                <div>{XUDTHash}</div>
                <div>
                    <Button type="primary" onClick={() => handleSendXUDT()} size="large">Send XUDT / RGB++</Button>
                </div>
            </li>

            <li>
                <div>
                    <Button type="primary" onClick={() => handleSignTransactionRPC()} size="large">Sign
                        transaction</Button>

                </div>
                <div className="jsonBg">{JSON.stringify(rawSignObjRPC, null, 4)}</div>
            </li>

            <li>
                <div>
                    <Button type="primary" onClick={() => handleSendTransactionRPC()} size="large">Send
                        Transaction</Button>

                </div>
                <div>{rawHashRPC}</div>
            </li>


            <li>
                <div>
                    <Button onClick={() => handleSignTransaction()} size="large">Sign
                        transaction(deprecated)</Button>

                </div>
                <div className="jsonBg">{JSON.stringify(rawSignObj, null, 4)}</div>
            </li>

            <li>
                <div>
                    <Button onClick={() => handleSendTransaction()} size="large">Send
                        Transaction(deprecated)</Button>

                </div>
                <div>{rawHash}</div>
            </li>


        </ul>

        <GlobalStyle/>
    </Box>
        </ConfigProvider>

    )
}

export default App
